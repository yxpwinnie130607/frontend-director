/**
 * 阶段 2b：纯排版探针（不滚动、不截图，快）
 * 拿的是「字号制度」而不是「h1 标签」——因为很多站的 h1 是隐藏的语义标签，
 * 视觉上的大标题是 div/span。取"页面上最大的可见文字"才是真值。
 */
import puppeteer from '/Users/weini/.workbuddy/binaries/node/workspace/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = '/Users/weini/Desktop/web-motion-archive';
const DATA = path.join(ROOT, 'data');
const PROXY = 'http://127.0.0.1:7890';

const sites = JSON.parse(fs.readFileSync(path.join(DATA, 'tech.json'), 'utf8')).sites
  .filter((s) => s.ok);

const PROBE = () => {
  const vis = (el) => {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) < 0.05) return false;
    const r = el.getBoundingClientRect();
    return r.width > 12 && r.height > 8;
  };
  const ownText = (el) => {
    let t = '';
    for (const n of el.childNodes) if (n.nodeType === 3) t += n.nodeValue;
    return t.trim();
  };

  const typeBySize = new Map();  // px -> {count, samples:[{text,family,weight,ls,tag}], family}
  const familyUse = new Map();
  const colors = new Map();
  const radiusUse = new Map();
  let borderN = 0, shadowN = 0, blurred = 0, nEl = 0;

  for (const el of document.querySelectorAll('body *')) {
    if (el.closest('script,style,noscript,svg')) continue;
    if (!vis(el)) continue;
    const cs = getComputedStyle(el);
    nEl++;
    const px = Math.round(parseFloat(cs.fontSize));
    const fam = cs.fontFamily.replace(/["']/g, '').split(',')[0].trim();
    familyUse.set(fam, (familyUse.get(fam) || 0) + 1);

    const txt = ownText(el);
    if (txt && txt.length > 0) {
      const rec = typeBySize.get(px) || { count: 0, samples: [] };
      rec.count++;
      if (rec.samples.length < 4) {
        rec.samples.push({
          text: txt.replace(/\s+/g, ' ').slice(0, 34),
          family: fam, weight: cs.fontWeight,
          ls: cs.letterSpacing, lh: cs.lineHeight,
          transform: cs.textTransform, tag: el.tagName.toLowerCase(),
        });
      }
      typeBySize.set(px, rec);
    }

    // 颜色（文字 + 背景 + 边框）
    if (cs.color) colors.set('t:' + cs.color, (colors.get('t:' + cs.color) || 0) + 1);
    if (cs.backgroundColor && cs.backgroundColor !== 'rgba(0, 0, 0, 0)')
      colors.set('b:' + cs.backgroundColor, (colors.get('b:' + cs.backgroundColor) || 0) + 1);

    if (cs.borderTopWidth !== '0px' && cs.borderTopStyle !== 'none') borderN++;
    if (cs.boxShadow !== 'none') shadowN++;
    if (cs.backdropFilter && cs.backdropFilter !== 'none') blurred++;
    if (cs.borderRadius !== '0px') {
      const v = cs.borderRadius.split(' ')[0];
      radiusUse.set(v, (radiusUse.get(v) || 0) + 1);
    }
  }

  const sizes = [...typeBySize.entries()].sort((a, b) => b[0] - a[0]);
  const maxSize = sizes[0] ? sizes[0][0] : null;
  const displaySizes = sizes.filter(([px]) => px >= 40).map(([px, v]) => ({
    px, count: v.count, sample: v.samples[0],
  }));

  // 正文字号：出现次数最多、且 >= 13 的字号
  const bodyCandidates = sizes.filter(([px]) => px >= 13 && px <= 22)
    .sort((a, b) => b[1].count - a[1].count);
  const bodyPx = bodyCandidates[0] ? bodyCandidates[0][0] : null;

  const top = (m, n) => [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, n)
    .map(([v, c]) => ({ v, c }));

  // 非中性色：饱和度足够高的颜色
  const accent = [];
  for (const [k, c] of colors) {
    const m = k.match(/rgba?\(([^)]+)\)/);
    if (!m) continue;
    const p = m[1].split(',').map((x) => parseFloat(x));
    if (p.length > 3 && p[3] < 0.15) continue;
    const [r, g, b] = p;
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
    const sat = mx === 0 ? 0 : (mx - mn) / mx;
    if (sat > 0.35 && mx > 40) accent.push({ color: k, sat: +sat.toFixed(2), c });
  }
  accent.sort((a, b) => b.c - a.c);

  return {
    nEl,
    maxSize,
    bodyPx,
    displaySizes,
    allSizes: sizes.map(([px, v]) => ({ px, count: v.count })),
    topFamilies: top(familyUse, 6),
    colorsText: top(new Map([...colors].filter(([k]) => k.startsWith('t:'))), 6)
      .map((o) => ({ v: o.v.slice(2), c: o.c })),
    colorsBg: top(new Map([...colors].filter(([k]) => k.startsWith('b:'))), 6)
      .map((o) => ({ v: o.v.slice(2), c: o.c })),
    accents: accent.slice(0, 6),
    radius: top(radiusUse, 6),
    borders: borderN,
    shadows: shadowN,
    blurred,
  };
};

async function run(site) {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox', '--font-render-hinting=none', '--force-color-profile=srgb',
      '--use-gl=angle', '--use-angle=metal', '--enable-unsafe-swiftshader',
      '--proxy-server=' + PROXY, '--proxy-bypass-list=<-loopback>', '--lang=en-US'],
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
  });
  const page = await browser.newPage();
  try {
    await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 40000 });
  } catch (e) { /* 继续，可能已部分加载 */ }
  await new Promise((r) => setTimeout(r, 3200));
  let d = null;
  try { d = await page.evaluate(PROBE); } catch (e) { d = null; }
  await browser.close();
  if (!d) return { name: site.name, ok: false };
  console.log(`[type] ${site.name.padEnd(11)} max=${String(d.maxSize).padStart(4)} `
    + `body=${String(d.bodyPx).padStart(3)} ratio=${d.maxSize && d.bodyPx ? (d.maxSize / d.bodyPx).toFixed(2) : '-'} `
    + `fonts=${d.topFamilies.length} borders=${d.borders} shadows=${d.shadows}`);
  return { name: site.name, ok: true, type: d };
}

const done = new Map();
const prevPath = path.join(DATA, 'type.json');
if (fs.existsSync(prevPath)) {
  for (const s of JSON.parse(fs.readFileSync(prevPath, 'utf8')).sites) done.set(s.name, s);
}

const queue = sites.filter((s) => !done.has(s.name) || !done.get(s.name).ok);
for (let i = 0; i < queue.length; i += 4) {
  const batch = queue.slice(i, i + 4);
  const res = await Promise.all(batch.map((s) => run(s).catch(() => ({ name: s.name, ok: false }))));
  for (const r of res) done.set(r.name, r);
  fs.writeFileSync(prevPath, JSON.stringify({ generated: '2026-10-25', sites: [...done.values()] }, null, 1));
}
console.log(`\n=== ${[...done.values()].filter((x) => x.ok).length} 个站排版探针完成 ===`);
