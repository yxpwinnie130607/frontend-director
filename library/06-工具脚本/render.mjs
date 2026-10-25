/**
 * 阶段 2：渲染快照 + 审美量化 + 滚动差分（反推"哪些元素被滚动驱动"）
 *
 * 为什么要有滚动差分：
 *   一个站的动效"感觉好"，本质是它有多少元素、在什么位置、以多大幅度响应滚动。
 *   只看 bundle 参数得不到这个；必须实测：滚到 5 个位置，比对每个元素的
 *   transform / opacity 是否变化、变化多少。
 *
 * 输出：data/render.json（每站一条）+ shots/<name>-<step>.png
 */
import puppeteer from '/Users/weini/.workbuddy/binaries/node/workspace/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = '/Users/weini/Desktop/web-motion-archive';
const DATA = path.join(ROOT, 'data');
const SHOTS = path.join(ROOT, 'shots');
const PROXY = 'http://127.0.0.1:7890';

const SITES = JSON.parse(
  fs.readFileSync(path.join(DATA, 'tech.json'), 'utf8')
).sites.filter((s) => s.ok);

const STEPS = [0, 0.22, 0.45, 0.68, 0.90];

/** 页面内执行：采集审美指标 + 元素快照 */
const PROBE = () => {
  const cssPath = (el) => {
    const parts = [];
    let n = el;
    let depth = 0;
    while (n && n.nodeType === 1 && depth < 4) {
      let s = n.tagName.toLowerCase();
      if (n.id) { s += '#' + n.id; parts.unshift(s); break; }
      const cls = (n.className && typeof n.className === 'string')
        ? n.className.trim().split(/\s+/).filter(Boolean).slice(0, 2).join('.')
        : '';
      if (cls) s += '.' + cls;
      parts.unshift(s);
      n = n.parentElement; depth++;
    }
    return parts.join('>');
  };

  const bump = (obj, k) => { if (k) obj[k] = (obj[k] || 0) + 1; };

  const fonts = {}, sizes = {}, weights = {}, lh = {}, ls = {};
  const colorsText = {}, colorsBg = {}, radius = {}, shadows = {};
  let nEl = 0;

  const all = document.querySelectorAll('body *');
  for (const el of all) {
    if (el.closest('script,style,noscript')) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) continue;
    const cs = getComputedStyle(el);
    nEl++;
    bump(fonts, cs.fontFamily.replace(/["']/g, '').split(',')[0].trim());
    bump(sizes, Math.round(parseFloat(cs.fontSize)));
    bump(weights, cs.fontWeight);
    bump(lh, String(cs.lineHeight).slice(0, 6));
    if (cs.letterSpacing !== 'normal') bump(ls, cs.letterSpacing);
    if (cs.color) bump(colorsText, cs.color);
    if (cs.backgroundColor && cs.backgroundColor !== 'rgba(0, 0, 0, 0)') bump(colorsBg, cs.backgroundColor);
    if (cs.borderRadius && cs.borderRadius !== '0px') bump(radius, cs.borderRadius);
    if (cs.boxShadow && cs.boxShadow !== 'none') bump(shadows, cs.boxShadow.slice(0, 60));
  }

  const top = (o, n = 10) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, n)
    .map(([v, c]) => ({ v, c }));

  const heading = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      text: (el.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 60),
      fontSize: Math.round(parseFloat(cs.fontSize)),
      lineHeight: cs.lineHeight,
      letterSpacing: cs.letterSpacing,
      weight: cs.fontWeight,
      family: cs.fontFamily.replace(/["']/g, '').split(',')[0].trim(),
      color: cs.color,
      widthRatio: +(r.width / innerWidth).toFixed(3),
      textTransform: cs.textTransform,
    };
  };

  // WebGL 检测：页面里已有的 canvas 是否被 2d/webgl 占用
  const canvases = [...document.querySelectorAll('canvas')].map((c) => {
    let kind = 'unknown';
    try {
      if (c.getContext('webgl2')) kind = 'webgl2';
      else if (c.getContext('webgl')) kind = 'webgl';
      else if (c.getContext('2d')) kind = '2d';
    } catch (e) { kind = 'error'; }
    const r = c.getBoundingClientRect();
    return { kind, w: Math.round(r.width), h: Math.round(r.height), fixed: getComputedStyle(c).position };
  });

  // 断点：从自有样式表里读
  const breakpoints = new Set();
  for (const sheet of document.styleSheets) {
    let rules;
    try { rules = sheet.cssRules; } catch (e) { continue; } // 跨域跳过
    if (!rules) continue;
    for (const r of rules) {
      if (r.type === CSSRule.MEDIA_RULE && /min-width|max-width/.test(r.conditionText || r.media?.mediaText || '')) {
        breakpoints.add(((r.conditionText || r.media.mediaText) || '').replace(/\s+/g, ''));
      }
    }
  }

  // 元素快照（只看有 transform / 非满 opacity 的）
  const snap = [];
  for (const el of all) {
    const cs = getComputedStyle(el);
    const op = parseFloat(cs.opacity);
    if (cs.transform === 'none' && op >= 1) continue;
    if (snap.length > 260) break;
    const r = el.getBoundingClientRect();
    if (r.width < 4 || r.height < 4) continue;
    snap.push({
      p: cssPath(el),
      t: cs.transform,
      o: +op.toFixed(2),
      top: Math.round(r.top + scrollY),
      h: Math.round(r.height),
    });
  }

  return {
    docHeight: document.body.scrollHeight,
    viewport: [innerWidth, innerHeight],
    sections: document.querySelectorAll('section').length,
    nEl,
    canvases,
    videos: document.querySelectorAll('video').length,
    svgs: document.querySelectorAll('svg').length,
    breakpoints: [...breakpoints].slice(0, 14),
    libs: {
      gsap: !!window.gsap,
      ScrollTrigger: !!(window.ScrollTrigger || window.gsap?.ScrollTrigger),
      Lenis: !!window.lenis || !!window.Lenis,
      THREE: !!window.THREE,
      tweens: (() => { try { return window.gsap.globalTimeline.getChildren().length; } catch (e) { return null; } })(),
      triggers: (() => { try { return window.ScrollTrigger.getAll().length; } catch (e) { return null; } })(),
    },
    typography: {
      fonts: top(fonts, 8),
      sizes: top(sizes, 12).sort((a, b) => b.c - a.c),
      weights: top(weights, 6),
      lineHeights: top(lh, 6),
      letterSpacings: top(ls, 8),
      h1: heading('h1'),
      h2: heading('h2'),
      body: (() => {
        const el = document.querySelector('p');
        if (!el) return null;
        const cs = getComputedStyle(el);
        return { fontSize: Math.round(parseFloat(cs.fontSize)), lineHeight: cs.lineHeight, color: cs.color };
      })(),
    },
    palette: {
      text: top(colorsText, 6),
      bg: top(colorsBg, 8),
      radius: top(radius, 6),
      shadows: top(shadows, 4),
    },
    scrollDriven: [],   // 由外层填充
    snap,
  };
};

async function render(site) {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: [
      '--no-sandbox', '--font-render-hinting=none', '--force-color-profile=srgb',
      '--use-gl=angle', '--use-angle=metal', '--enable-unsafe-swiftshader',
      '--proxy-server=' + PROXY, '--proxy-bypass-list=<-loopback>',
      '--lang=en-US',
    ],
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
  });

  const page = await browser.newPage();
  const errs = [];
  page.on('pageerror', (e) => errs.push(String(e).slice(0, 120)));

  const rec = { name: site.name, url: site.url, ok: false };

  try {
    await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 55000 });
  } catch (e) {
    try {
      await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 35000 });
    } catch (e2) {
      rec.error = 'nav failed';
      await browser.close();
      return rec;
    }
  }

  await new Promise((r) => setTimeout(r, 2600));

  // 关掉明显的 cookie / 年龄门
  try {
    await page.evaluate(() => {
      const words = /accept|agree|allow all|got it|enter site|i am (18|over)|close/i;
      for (const b of document.querySelectorAll('button,a[role=button]')) {
        const t = (b.innerText || b.getAttribute('aria-label') || '').trim();
        if (t.length > 0 && t.length < 24 && words.test(t)) { b.click(); break; }
      }
    });
    await new Promise((r) => setTimeout(r, 700));
  } catch (e) { /* ignore */ }

  let base;
  try {
    base = await page.evaluate(PROBE);
  } catch (e) {
    rec.error = 'probe failed: ' + String(e).slice(0, 80);
    await browser.close();
    return rec;
  }

  rec.ok = true;
  rec.metrics = base;

  // ---------- 滚动差分 ----------
  const snaps = [];
  const H = base.docHeight;
  for (const s of STEPS) {
    const y = Math.round((H - 900) * s);
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await new Promise((r) => setTimeout(r, 1100));
    try {
      snaps.push(await page.evaluate(PROBE).then((d) => ({ y, snap: d.snap })));
    } catch (e) { snaps.push({ y, snap: [] }); }
    const file = path.join(SHOTS, `${site.name}-${String(Math.round(s * 100)).padStart(2, '0')}.png`);
    await page.screenshot({ path: file });
  }

  // 同一 path 在不同滚动位置值不同 → 被滚动驱动
  const key = (o) => o.p;
  const first = new Map(snaps[0].snap.map((o) => [key(o), o]));
  const driven = new Map();
  for (const { y, snap } of snaps.slice(1)) {
    for (const o of snap) {
      const a = first.get(key(o));
      if (!a) continue;
      const dTop = o.top - a.top;
      const tChanged = o.t !== a.t;
      const opChanged = Math.abs(o.o - a.o) > 0.02;
      if (tChanged || opChanged) {
        const cur = driven.get(key(o)) || { p: o.p, at: [] };
        cur.at.push({ y, dTop, t: o.t.slice(0, 70), o: o.o });
        driven.set(key(o), cur);
      }
    }
  }
  const drivenList = [...driven.values()].sort((a, b) => b.at.length - a.at.length).slice(0, 60);
  rec.scrollDrivenCount = drivenList.length;
  rec.scrollDriven = drivenList;
  rec.errs = [...new Set(errs)].slice(0, 5);

  await browser.close();
  console.log(`[render] ${site.name.padEnd(11)} H=${H} sections=${base.sections} `
    + `canvas=${base.canvases.length} scrollDriven=${drivenList.length} errs=${rec.errs.length}`);
  return rec;
}

const out = [];
for (const s of SITES) {
  try {
    out.push(await render(s));
  } catch (e) {
    out.push({ name: s.name, url: s.url, ok: false, error: String(e).slice(0, 100) });
  }
  fs.writeFileSync(path.join(DATA, 'render.json'),
    JSON.stringify({ generated: '2026-10-25', sites: out }, null, 1));
}

console.log(`\n=== ${out.filter((o) => o.ok).length}/${SITES.length} 渲染成功 ===`);
