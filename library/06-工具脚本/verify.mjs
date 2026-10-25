/**
 * verify.mjs — 动效与审美验收（12 项）
 *
 * 用法：
 *   node scripts/verify.mjs <路径或URL>
 *   例：node scripts/verify.mjs baseline/editorial/index.html
 *
 * 为什么需要这个：
 *   "改完感觉不对"是不可定位的。把感觉换成 11 个可测数字 + 1 个人工项，
 *   你才知道该改哪一行。
 */
import puppeteer from '/Users/weini/.workbuddy/binaries/node/workspace/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js';
import path from 'node:path';
import fs from 'node:fs';

const arg = process.argv[2];
if (!arg) {
  console.error('用法: node scripts/verify.mjs <path|url>');
  process.exit(1);
}
const target = /^https?:/.test(arg) ? arg : 'file://' + encodeURI(path.resolve(arg));

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

/* ---------------- 采集 ---------------- */
const PROBE = () => {
  const vis = (el) => {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity < 0.05) return false;
    const r = el.getBoundingClientRect();
    return r.width > 12 && r.height > 8;
  };
  const own = (el) => {
    let t = '';
    for (const n of el.childNodes) if (n.nodeType === 3) t += n.nodeValue;
    return t.trim();
  };

  const sizes = new Map();
  const colors = new Set();
  const weights = new Map();
  let borders = 0, shadows = 0, nEl = 0;
  let maxEl = null, maxPx = 0;

  for (const el of document.querySelectorAll('body *')) {
    if (el.closest('script,style,noscript,svg')) continue;
    if (!vis(el)) continue;
    const cs = getComputedStyle(el);
    nEl++;
    const px = Math.round(parseFloat(cs.fontSize));

    if (own(el)) {
      sizes.set(px, (sizes.get(px) || 0) + 1);
      weights.set(cs.fontWeight, (weights.get(cs.fontWeight) || 0) + 1);
      if (px > maxPx) { maxPx = px; maxEl = el; }
    }
    const c = cs.color;
    if (c) colors.add(c);
    if (cs.borderTopWidth !== '0px' && cs.borderTopStyle !== 'none') borders++;
    if (cs.boxShadow !== 'none') shadows++;
  }

  const maxCS = maxEl ? getComputedStyle(maxEl) : null;
  const bodyPx = [...sizes.entries()]
    .filter(([p]) => p >= 13 && p <= 22)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || 16;

  const accent = [...colors].filter((c) => {
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return false;
    const p = m[1].split(',').map(Number);
    if (p.length > 3 && p[3] < 0.2) return false;
    const [r, g, b] = p;
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
    return mx > 40 && (mx === 0 ? 0 : (mx - mn) / mx) > 0.35;
  });

  // 时长 / 缓动：直接读样式文本（简写属性在 CSSOM 里不可靠）
  let cssText = '';
  for (const st of document.querySelectorAll('style')) cssText += st.textContent + '\n';
  // 只统计 transition/animation 声明里的时长，避免把 width:200px 之类算进来
  const decls = cssText.match(/(?:transition|animation)[^;{}]*/g) || [];
  const dursMs = new Set();
  for (const dcl of decls) {
    for (const m of dcl.matchAll(/(\d*\.?\d+)(ms|s)\b/g)) {
      const v = parseFloat(m[1]) * (m[2] === 's' ? 1000 : 1);
      if (v >= 50 && v < 20000) dursMs.add(Math.round(v));
    }
  }
  const eases = new Set();
  for (const dcl of decls) {
    for (const m of dcl.matchAll(/cubic-bezier\([^)]+\)|\b(?:ease|ease-in|ease-out|ease-in-out|linear|steps\([^)]+\))/g)) {
      eases.add(m[0]);
    }
  }
  const durs = [...dursMs].sort((a, b) => a - b).map((v) => v + 'ms');

  const ls = maxCS ? maxCS.letterSpacing : null;
  const lsEm = (ls && ls !== 'normal' && maxPx)
    ? +(parseFloat(ls) / maxPx).toFixed(4) : null;

  return {
    nEl, maxPx, bodyPx,
    ratio: +(maxPx / bodyPx).toFixed(2),
    weight: maxCS ? maxCS.fontWeight : null,
    lsEm,
    sizeCount: sizes.size,
    accentCount: accent.length,
    accents: accent.slice(0, 4),
    borders, shadows,
    durations: durs.slice(0, 14),
    eases: [...eases].slice(0, 8),
    height: document.body.scrollHeight,
    canvas: document.querySelectorAll('canvas').length,
    masks: document.querySelectorAll('.mask > span').length,
  };
};

/* ---------------- 帧耗时 ---------------- */
async function frameCost(page) {
  return page.evaluate(() => new Promise((res) => {
    const t = [];
    let last = performance.now(), n = 0, y = 0;
    const H = document.body.scrollHeight - innerHeight;
    const step = () => {
      y = Math.min(H, y + H / 60);
      window.scrollTo(0, y);
      const now = performance.now();
      t.push(now - last); last = now; n++;
      if (n < 70) requestAnimationFrame(step);
      else {
        const s = t.slice().sort((a, b) => a - b);
        res({
          median: +s[Math.floor(s.length * 0.5)].toFixed(1),
          p95: +s[Math.floor(s.length * 0.95)].toFixed(1),
        });
      }
    };
    requestAnimationFrame(step);
  }));
}

/* ---------------- 主流程 ---------------- */
const browser = await puppeteer.launch({
  executablePath: CHROME, headless: 'new',
  args: ['--no-sandbox', '--allow-file-access-from-files', '--font-render-hinting=none',
    '--use-gl=angle', '--use-angle=metal', '--enable-unsafe-swiftshader'],
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
});

const page = await browser.newPage();
const errs = [];
page.on('pageerror', (e) => errs.push(String(e).slice(0, 120)));
page.on('console', (m) => {
  if (m.type() === 'error' && !m.text().includes('favicon')) errs.push(m.text().slice(0, 120));
});

await page.goto(target, { waitUntil: 'networkidle2', timeout: 45000 });
await new Promise((r) => setTimeout(r, 2200));
const d = await page.evaluate(PROBE);
const frame = await frameCost(page);

/*
 * 滚动驱动元素：滚到 5 个位置，比对 transform/opacity 变化
 */
const driven = await page.evaluate(async () => {
  const H = document.body.scrollHeight - innerHeight;
  const snap = () => [...document.querySelectorAll('body *')].map((el) => {
    const cs = getComputedStyle(el);
    if (cs.transform === 'none' && +cs.opacity >= 1) return null;
    const r = el.getBoundingClientRect();
    if (r.width < 4 || r.height < 4) return null;
    return el;
  }).filter(Boolean);
  const sig = (el) => {
    const cs = getComputedStyle(el);
    return cs.transform + '|' + (+cs.opacity).toFixed(2);
  };
  const list = snap();
  const before = new Map(list.map((el) => [el, sig(el)]));
  let changed = 0;
  for (const p of [0.2, 0.4, 0.6, 0.8]) {
    window.scrollTo(0, H * p);
    await new Promise((r) => setTimeout(r, 420));
    for (const el of list) {
      if (before.get(el) !== sig(el)) { before.set(el, sig(el)); changed++; }
    }
  }
  window.scrollTo(0, 0);
  return new Set(list.filter((el) => before.get(el) !== undefined)).size && changed;
});

/*
 * 移动端溢出
 */
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await new Promise((r) => setTimeout(r, 900));
const mob = await page.evaluate(() => ({
  sw: document.documentElement.scrollWidth,
  cw: document.documentElement.clientWidth,
}));

/*
 * reduced-motion
 */
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
await page.reload({ waitUntil: 'networkidle2' });
await new Promise((r) => setTimeout(r, 1600));
const rm = await page.evaluate(() => {
  const probe = document.querySelector('h1, .mask > span, [data-rise]');
  if (!probe) return { ok: true, note: '未找到可测元素' };
  const cs = getComputedStyle(probe);
  const dur = parseFloat(cs.transitionDuration) || 0;
  const anim = parseFloat(cs.animationDuration) || 0;
  return { ok: dur <= 0.02 && anim <= 0.02, dur, anim };
});

await browser.close();

/* ---------------- 评分 ---------------- */
const isEditorial = d.ratio >= 5 && d.borders > d.shadows;
const isProduct = d.ratio >= 3.8 && d.ratio <= 5.4 && d.shadows >= d.borders;

const rows = [
  ['1  控制台零报错', errs.length === 0, `${errs.length} 个错误` + (errs[0] ? ` · ${errs[0]}` : '')],
  ['2  字号比 ≥ 4.0', d.ratio >= 4, `${d.maxPx} / ${d.bodyPx} = ${d.ratio}`],
  ['3  非中性色 ≤ 2', d.accentCount <= 2, `${d.accentCount} 个 ${d.accents.join(' ')}`],
  ['4  大标题字重 ≤ 600', +d.weight <= 600, `w${d.weight}`],
  ['5  大标题字距 ≤ -0.02em', d.lsEm !== null && d.lsEm <= -0.02, d.lsEm === null ? 'normal（未设）' : `${d.lsEm}em`],
  ['6  字号档数 ≥ 5', d.sizeCount >= 5, `${d.sizeCount} 档`],
  ['7  滚动驱动 ≥ 4', driven >= 4, `${driven} 个元素`],
  ['8  时长档位 1–6', d.durations.length >= 1 && d.durations.length <= 6, `${d.durations.length} 种 ${d.durations.slice(0,6).join(' ')}`],
  ['9  reduced-motion 生效', rm.ok, rm.ok ? '已降级' : `transition ${rm.dur}s / anim ${rm.anim}s`],
  ['10 移动端无横向溢出', mob.sw <= mob.cw + 1, `scrollWidth ${mob.sw} / client ${mob.cw}`],
  ['11 帧耗时 p95 ≤ 20ms', frame.p95 <= 20, `median ${frame.median}ms / p95 ${frame.p95}ms`],
  ['12 签名动作（人工）', null, '需人工确认：这个页面有一个只属于它的动作吗？'],
];

console.log('\n' + '─'.repeat(74));
console.log(`  验收：${target.replace(/^file:\/\/.*?\/web-motion-archive\//, '')}`);
console.log('─'.repeat(74));
let pass = 0, total = 0;
for (const [name, ok, detail] of rows) {
  const mark = ok === null ? '○' : (ok ? '✓' : '✕');
  if (ok === true) pass++;
  if (ok !== null) total++;
  console.log(`  ${mark}  ${name.padEnd(26)} ${detail}`);
}
console.log('─'.repeat(74));
console.log(`  自测通过 ${pass}/${total}　` +
  `结构：${isEditorial ? '编辑型' : isProduct ? '产品型' : '自定义'}　` +
  `画布 ${d.canvas}　遮罩 ${d.masks}　页高 ${d.height}px`);
console.log('─'.repeat(74) + '\n');

process.exit(pass === total ? 0 : 1);
