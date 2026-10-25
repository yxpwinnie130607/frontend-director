#!/usr/bin/env node
/**
 * verify.mjs —— 动效验收（8 项硬指标）
 *
 * 用法：
 *   node scripts/verify.mjs                       # 验 preview.html
 *   node scripts/verify.mjs http://localhost:5173 # 验 dev server
 *
 * 依赖：
 *   npm i -D puppeteer-core        （并准备本机 Chrome / Chromium）
 *   可用环境变量指定：
 *     CHROME_PATH=/Applications/Google Chrome.app/Contents/MacOS/Google Chrome
 *     PUPPETEER=puppeteer-core      （或自定义模块路径）
 */
import { createRequire } from 'node:module';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const PUPPETEER = process.env.PUPPETEER || 'puppeteer-core';
const CHROME =
  process.env.CHROME_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const target = process.argv[2]
  ? process.argv[2]
  : pathToFileURL(path.resolve('preview.html')).href;

const results = [];
const check = (name, ok, detail = '') => {
  results.push({ name, ok, detail });
  console.log(`${ok ? '✓' : '✗'} ${name}${detail ? '  ' + detail : ''}`);
};

const puppeteer = (await import(PUPPETEER)).default ?? (await import(PUPPETEER));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--allow-file-access-from-files', '--disable-dev-shm-usage'],
  defaultViewport: { width: 1440, height: 900 },
});

// ---------- 1. 常规加载 ----------
const page = await browser.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(String(e).slice(0, 160)));
page.on('console', (m) => {
  if (m.type() === 'error' && !m.text().includes('favicon')) errors.push(m.text().slice(0, 160));
});

await page.goto(target, { waitUntil: 'networkidle2', timeout: 60000 });
await new Promise((r) => setTimeout(r, 2500));

check('控制台零报错', errors.length === 0, errors[0] ?? '');

const info = await page.evaluate(() => {
  const st = window.__lab?.ScrollTrigger?.getAll?.() ?? [];
  return {
    stCount: st.length,
    pinCount: st.filter((t) => t.vars && t.vars.pin).length,
    hasLenis: !!window.__lab?.lenis,
    bodyH: document.body.scrollHeight,
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  };
});
check('ScrollTrigger ≤ 25', info.stCount > 0 && info.stCount <= 25, `当前 ${info.stCount}`);
check('没有使用 pin', info.pinCount === 0, `pin ${info.pinCount}`);
check('Lenis 已接管滚动', info.hasLenis);
check('无横向溢出', info.overflow <= 1, `差 ${info.overflow}px`);

// ---------- 2. 横向轨道走到末尾 ----------
const h = await page.evaluate(() => {
  const sec = document.getElementById('horizontal') || document.querySelector('.ht');
  const track = document.getElementById('track') || document.querySelector('.ht-track');
  if (!sec || !track) return null;
  return { top: sec.offsetTop, h: sec.offsetHeight, w: track.scrollWidth, iw: innerWidth };
});
if (h) {
  const vh = await page.evaluate(() => innerHeight);
  await page.evaluate((y) => scrollTo(0, y), h.top + h.h - vh);
  await new Promise((r) => setTimeout(r, 1400));
  const x = await page.evaluate(() => {
    const track = document.getElementById('track') || document.querySelector('.ht-track');
    return Math.abs(parseFloat(getComputedStyle(track).transform.split(',')[4] || '0'));
  });
  const expected = Math.max(0, h.w - h.iw);
  check('横向轨道在末尾走到位', Math.abs(x - expected) < 40, `x ${Math.round(x)} / 期望 ${expected}`);
} else {
  check('横向轨道存在', false, '页面里没有 .ht / #horizontal');
}

// ---------- 3. 遮罩掀字复位（先整页滚一遍，让 once 触发器全部触发）----------
await page.evaluate(async () => {
  const H = document.body.scrollHeight;
  for (let y = 0; y < H; y += 400) {
    scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 50));
  }
  scrollTo(0, H);
});
await new Promise((r) => setTimeout(r, 1500));

const mask = await page.evaluate(() => {
  const els = [...document.querySelectorAll('.mr-inner')];
  if (!els.length) return null;
  const bad = els.filter((el) => {
    const m = new DOMMatrix(getComputedStyle(el).transform);
    return Math.abs(m.f) > 2; // 残留位移
  });
  return { total: els.length, bad: bad.length };
});
if (mask) check('遮罩掀字全部落位', mask.bad === 0, `${mask.total - mask.bad}/${mask.total}`);

// ---------- 4. 帧率 ----------
await page.evaluate(() => scrollTo(0, 0));
await new Promise((r) => setTimeout(r, 600));
const fps = await page.evaluate(
  () =>
    new Promise((res) => {
      const t = [];
      let last = performance.now();
      let n = 0;
      let y = 0;
      const iv = setInterval(() => {
        y += 24;
        scrollTo(0, y);
      }, 16);
      const tick = (now) => {
        t.push(now - last);
        last = now;
        if (++n < 120) requestAnimationFrame(tick);
        else {
          clearInterval(iv);
          const avg = t.reduce((a, b) => a + b, 0) / t.length;
          res(Math.round(1000 / avg));
        }
      };
      requestAnimationFrame(tick);
    })
);
check('滚动中 ≥ 55fps', fps >= 55, `${fps}fps`);

// ---------- 5. 390px 无溢出 ----------
const mob = await browser.newPage();
await mob.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await mob.goto(target, { waitUntil: 'networkidle2', timeout: 60000 });
await new Promise((r) => setTimeout(r, 1800));
const m = await mob.evaluate(() => ({
  over: document.documentElement.scrollWidth - document.documentElement.clientWidth,
}));
check('390px 无横向溢出', m.over <= 1, `差 ${m.over}px`);
await mob.close();

// ---------- 6. reduced-motion ----------
const rm = await browser.newPage();
await rm.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
await rm.setViewport({ width: 1440, height: 900 });
await rm.goto(target, { waitUntil: 'networkidle2', timeout: 60000 });
await new Promise((r) => setTimeout(r, 1600));
const reduced = await rm.evaluate(() => {
  const hidden = [...document.querySelectorAll('.card, .mr-inner, .ps-panel')].filter((el) => {
    const s = getComputedStyle(el);
    return parseFloat(s.opacity) < 0.9;
  }).length;
  const clipped = [...document.querySelectorAll('.mr-inner')].filter((el) => {
    const m = new DOMMatrix(getComputedStyle(el).transform);
    return Math.abs(m.f) > 2;
  }).length;
  return { hidden, clipped, textLen: document.body.innerText.length };
});
check('reduced-motion：无隐藏元素', reduced.hidden === 0, `${reduced.hidden} 个`);
check('reduced-motion：文字未偏移', reduced.clipped === 0);
check('reduced-motion：内容完整', reduced.textLen > 300, `${reduced.textLen} 字`);
await rm.close();

await browser.close();

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} 通过`);
process.exit(failed.length ? 1 : 0);
