/**
 * 基线验收：截图 + 结构检查 + 控制台报错
 * 用法：node scripts/shoot.mjs baseline/editorial/index.html shots-bl
 */
import puppeteer from '/Users/weini/.workbuddy/binaries/node/workspace/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js';
import fs from 'node:fs';
import path from 'node:path';

const [, , target, outDir = 'shots-bl'] = process.argv;
const abs = path.resolve(target);
const out = path.resolve(outDir);
fs.mkdirSync(out, { recursive: true });

const b = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox', '--allow-file-access-from-files', '--font-render-hinting=none',
    '--force-color-profile=srgb', '--use-gl=angle', '--use-angle=metal',
    '--enable-unsafe-swiftshader'],
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 2 },
});
const p = await b.newPage();
const errs = [];
p.on('pageerror', (e) => errs.push('ERR ' + String(e).slice(0, 160)));
p.on('console', (m) => {
  if (m.type() === 'error' && !m.text().includes('favicon')) errs.push(m.text().slice(0, 160));
});

await p.goto('file://' + encodeURI(abs), { waitUntil: 'networkidle2', timeout: 45000 });
await new Promise((r) => setTimeout(r, 2600));

const shots = [];
async function shot(name, y, wait = 1100) {
  if (y !== undefined) {
    await p.evaluate((v) => window.scrollTo(0, v), y);
    await new Promise((r) => setTimeout(r, wait));
  }
  const f = path.join(out, name + '.png');
  await p.screenshot({ path: f });
  shots.push(f);
}

await shot('01-hero');

const info = await p.evaluate(() => {
  const H = document.body.scrollHeight;
  const h1 = document.querySelector('h1');
  const cs = h1 ? getComputedStyle(h1) : null;
  return {
    height: H,
    h1: cs ? { px: Math.round(parseFloat(cs.fontSize)), lh: cs.lineHeight, ls: cs.letterSpacing, w: cs.fontWeight, fam: cs.fontFamily.split(',')[0] } : null,
    body: getComputedStyle(document.body).fontSize,
    fonts: [...document.fonts].map((f) => f.family).filter((v, i, a) => a.indexOf(v) === i).slice(0, 6),
    st: window.ScrollTrigger ? ScrollTrigger.getAll().length : -1,
    lenis: !!window.lenis,
    canvas: document.querySelectorAll('canvas').length,
    masks: document.querySelectorAll('.mask > span').length,
  };
});

// 依次滚到各段（通用：按总高度比例，可选按 id）
async function atId(id, frac, name) {
  const y = await p.evaluate((i, f) => {
    const el = document.getElementById(i);
    if (!el) return null;
    return el.offsetTop + el.offsetHeight * f;
  }, id, frac);
  if (y === null) return false;
  await shot(name, y);
  return true;
}

const H = await p.evaluate(() => document.body.scrollHeight - innerHeight);
await shot('02-a', Math.round(H * 0.22));
await shot('03-b', Math.round(H * 0.46));
await shot('04-c', Math.round(H * 0.70));
await shot('05-d', Math.round(H * 0.92));

console.log(JSON.stringify({ info, errs: [...new Set(errs)], shots }, null, 1));
await b.close();
