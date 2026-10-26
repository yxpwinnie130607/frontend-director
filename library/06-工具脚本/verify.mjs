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
import path from 'node:path';
import fs from 'node:fs';

/* ---------------- 依赖解析 ----------------
   这个脚本要能在任何机器上跑，所以不写死 node_modules 路径。
   顺序：$PUPPETEER → 本地 puppeteer-core → 本地 puppeteer → 打包机上的绝对路径。
   全失败时给一句能直接照做的提示，而不是一句 MODULE_NOT_FOUND。 */
const PUPPETEER_CANDIDATES = [
  process.env.PUPPETEER,
  'puppeteer-core',
  'puppeteer',
  '/Users/weini/.workbuddy/binaries/node/workspace/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js',
].filter(Boolean);

let puppeteer = null;
for (const spec of PUPPETEER_CANDIDATES) {
  try {
    const mod = await import(spec);
    puppeteer = mod.default || mod;
    break;
  } catch { /* 下一个 */ }
}
if (!puppeteer) {
  console.error(
    '找不到 puppeteer。请任选一种：\n' +
    '  npm i -D puppeteer-core        # 然后设 CHROME_PATH\n' +
    '  PUPPETEER=/abs/path/to/puppeteer-core.js node verify.mjs <path>\n' +
    '（puppeteer 只负责驱动，浏览器用本机已装的 Chrome，不额外下载 Chromium）'
  );
  process.exit(2);
}

const CHROME = process.env.CHROME_PATH || [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
].find((p) => fs.existsSync(p));

if (!CHROME) {
  console.error('找不到 Chrome。设 CHROME_PATH=/path/to/chrome 后重试。');
  process.exit(2);
}

const arg = process.argv[2];
if (!arg) {
  console.error('用法: node scripts/verify.mjs <path|url>');
  process.exit(1);
}
const target = /^https?:/.test(arg) ? arg : 'file://' + encodeURI(path.resolve(arg));

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

  // 行高按字号归一（normal 视为未设）
  const lhRatio = (maxCS && maxCS.lineHeight !== 'normal' && maxPx)
    ? +(parseFloat(maxCS.lineHeight) / maxPx).toFixed(3) : null;

  // 语言判定：取最大字号元素的文本，算 CJK 字符占比。
  // 中文与西文的排版判据不同 —— 中文不能设负字距（会粘连），
  // 大标题行高也不能低于 1.0（汉字字面框比字母满）。用同一套数字
  // 会把合格的中文页面判成失败。
  const maxText = maxEl ? (maxEl.innerText || maxEl.textContent || '') : '';
  const solid = maxText.replace(/\s/g, '');
  const cjkCount = (solid.match(/[\u3400-\u9fff\u3000-\u303f\uff00-\uffef]/g) || []).length;
  const cjkRatio = solid.length ? +(cjkCount / solid.length).toFixed(2) : 0;

  return {
    nEl, maxPx, bodyPx,
    ratio: +(maxPx / bodyPx).toFixed(2),
    weight: maxCS ? maxCS.fontWeight : null,
    lsEm, lhRatio, cjkRatio,
    sizeCount: sizes.size,
    accentCount: accent.length,
    accents: accent.slice(0, 4),
    borders, shadows,
    durations: durs.slice(0, 14),
    eases: [...eases].slice(0, 8),
    // 是否由 JS 驱动动效（GSAP / three / canvas）。全 JS 的页面没有
    // CSS transition，第 8 项不能因此判失败。
    jsMotion: !!(window.gsap || window.ScrollTrigger || window.THREE ||
                 document.querySelectorAll('canvas').length > 0),
    height: document.body.scrollHeight,
    canvas: document.querySelectorAll('canvas').length,
    masks: document.querySelectorAll('.mask > span').length,
  };
};

/* ---------------- 帧耗时 ----------------
   同一个页面的 p95 会在 16ms 和 34ms 之间跳：别的 Chrome 窗口、Spotlight 索引、
   CPU 降频都会算进来。单次测量会把机器噪声当成页面缺陷，让人去改没坏的地方 ——
   比"测不出来"更糟。所以跑 3 轮、每轮丢掉前 10 帧（字体/着色器首帧）、取最优 p95。
   最优值衡量页面能力；三轮都很差，才是真的差。 */
const FRAME_ROUNDS = 3;
const FRAME_WARMUP = 10;
const FRAME_SAMPLE = 80;

function frameRound(page) {
  return page.evaluate(({ warmup, sample }) => new Promise((res) => {
    const t = [];
    let last = performance.now(), n = 0, y = 0;
    const H = document.body.scrollHeight - innerHeight;
    const step = () => {
      y = Math.min(H, y + H / 60);
      window.scrollTo(0, y);
      const now = performance.now();
      if (n >= warmup) t.push(now - last);
      last = now; n++;
      if (n < sample) requestAnimationFrame(step);
      else {
        const s = t.slice().sort((a, b) => a - b);
        res({
          median: +s[Math.floor(s.length * 0.5)].toFixed(1),
          p95: +s[Math.floor(s.length * 0.95)].toFixed(1),
        });
      }
    };
    window.scrollTo(0, 0);
    requestAnimationFrame(step);
  }), { warmup: FRAME_WARMUP, sample: FRAME_SAMPLE });
}

async function frameCost(page) {
  let best = null;
  for (let i = 0; i < FRAME_ROUNDS; i++) {
    const r = await frameRound(page);
    if (!best || r.p95 < best.p95) best = r;
  }
  return best;
}

/* ---------------- 本机基线帧时 ----------------
   绝对阈值 20ms 只在 60Hz 上成立。实测：同一批页面在低电量模式 / 后台窗口 /
   30Hz 外接屏上会全部锁死在 33.3ms —— 那是浏览器的 rAF 频率，不是页面在掉帧。
   用绝对数字判，会让每次环境变化都报一次假失败，然后有人去改没坏的页面。
   所以先量一个空页的 rAF 间隔，判据改成"相对基线的倍数"。 */
async function measureBase(page) {
  await page.goto('about:blank');
  return page.evaluate(() => new Promise((res) => {
    const t = [];
    let last = performance.now(), n = 0;
    const step = () => {
      const now = performance.now();
      if (n > 5) t.push(now - last);
      last = now; n++;
      if (n < 40) requestAnimationFrame(step);
      else {
        const s = t.slice().sort((a, b) => a - b);
        res(+s[Math.floor(s.length / 2)].toFixed(1));
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
const baseFrame = await measureBase(page);   // 本机 rAF 间隔（16.7 = 60Hz / 33.3 = 30Hz）
const errs = [];
page.on('pageerror', (e) => errs.push(String(e).slice(0, 120)));
page.on('console', (m) => {
  if (m.type() === 'error' && !m.text().includes('favicon')) errs.push(m.text().slice(0, 120));
});

await page.goto(target, { waitUntil: 'networkidle2', timeout: 45000 });
await new Promise((r) => setTimeout(r, 2200));
const d = await page.evaluate(PROBE);

/*
 * 滚动驱动元素：滚到 4 个位置，比对 transform/opacity 变化。
 *
 * 顺序很重要：必须在 frameCost 之前跑。frameCost 会把整页滚 3 遍，
 * 页面上 once:true 的动画到那时已经全部播完，再测就一个都测不到
 * （实测 driven 会从 16 掉到 3，Product 掉到 0 —— 页面没问题，是测晚了）。
 */
const drivenProbe = await page.evaluate(async () => {
  // 必须在滚动之前读：once:true 的 ScrollTrigger 触发后会被 gsap 销毁，
  // 滚动完再数就只剩没被触发的那几个（实测 11 → 2）。
  const st0 = (window.ScrollTrigger && window.ScrollTrigger.getAll) ? window.ScrollTrigger.getAll().length : 0;
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
  /*
   * 两个来源取大者：
   *   dom — 4 个滚动位置上真的看到 transform/opacity 变了的元素数。
   *         它能证明"跟着滚动动了"，但受时序影响：once 动画播完就不变了，
   *         1px 的规则线又会被尺寸过滤掉。单靠它会在同一份文件上报 4 或 16。
   *   st  — 页面上注册的 ScrollTrigger 数。与时序无关，是"滚动驱动了多少处"
   *         的权威下界。没有 GSAP 的页面（Product 用 IntersectionObserver）为 0，
   *         那就只有 dom 这一路。
   */
  const dom = new Set(list.filter((el) => before.get(el) !== undefined)).size && changed;
  return { dom: dom || 0, st: st0 };
});

const driven = Math.max(drivenProbe.dom, drivenProbe.st);

const frame = await frameCost(page);

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
/* 结构判定：先看"用什么分隔内容"（线 vs 阴影），再看字号比。
   上限放到 6.5：低密度产品页（一屏一个念头、大字、仍用卡片和柔阴影）
   会读到 5.5–6，卡在 5.4 会把一份正常的产品页判成"自定义"。
   判定只影响这一行的标签，不影响任何一项的通过与否。 */
const isEditorial = d.ratio >= 5 && d.borders >= d.shadows;
const isProduct = d.shadows > d.borders && d.ratio >= 3.8 && d.ratio <= 6.5;

/* 中文/西文两套判据
   中文：字距 −0.02…+0.05em（可 normal）；大标题行高 1.0–1.5
   西文：字距 ≤ −0.02em（必须设）；大标题行高 0.85–1.15

   字号分级：≥96px 的大字放宽到 −0.045em / 字重 ≤700。
   排版规律是字号越大字距越负（128px 的 −0.03em 只占字面 3%，
   汉字不会粘连），Apple/Linear/offerstudio 的 128px 级标题全是 w600–700。
   一刀切的 −0.02 会把正常的大字判成失败。 */
const isCJK = d.cjkRatio >= 0.3;
const bigType = d.maxPx >= 96;
const lsOK = isCJK
  ? (d.lsEm === null || (d.lsEm >= (bigType ? -0.045 : -0.02) && d.lsEm <= 0.05))
  : (d.lsEm !== null && d.lsEm <= -0.02);
const lhOK = d.lhRatio === null
  ? true
  : (isCJK ? (d.lhRatio >= 1.0 && d.lhRatio <= 1.5)
           : (d.lhRatio >= 0.85 && d.lhRatio <= 1.15));
const weightOK = +d.weight <= (bigType ? 700 : 600);

const lsText = d.lsEm === null ? (isCJK ? 'normal' : 'normal（未设）') : `${d.lsEm}em`;
const lhText = d.lhRatio === null ? 'normal' : String(d.lhRatio);

const hz = Math.round(1000 / baseFrame);
const frameBudget = +(baseFrame * 1.25).toFixed(1);

const rows = [
  ['1  控制台零报错', errs.length === 0, `${errs.length} 个错误` + (errs[0] ? ` · ${errs[0]}` : '')],
  ['2  字号比 ≥ 4.0', d.ratio >= 4, `${d.maxPx} / ${d.bodyPx} = ${d.ratio}`],
  ['3  非中性色 ≤ 2', d.accentCount <= 2, `${d.accentCount} 个 ${d.accents.join(' ')}`],
  ['4  大标题字重', weightOK, `w${d.weight} @ ${d.maxPx}px（≥96px 放宽到 700）`],
  ['5  字距与行高', lsOK && lhOK,
    `ls ${lsText} ｜ lh ${lhText} ｜ ${isCJK ? '中文判据 -0.02…+0.05 / 1.0…1.5' : '西文判据 ≤-0.02 / 0.85…1.15'}`],
  ['6  字号档数 ≥ 5', d.sizeCount >= 5, `${d.sizeCount} 档`],
  ['7  滚动驱动 ≥ 4', driven >= 4,
    `${driven} 处（DOM 变化 ${drivenProbe.dom} · ScrollTrigger ${drivenProbe.st}）`],
  ['8  时长档位 1–6', (d.durations.length >= 1 && d.durations.length <= 6)
      || (d.durations.length === 0 && d.jsMotion),
    d.durations.length
      ? `${d.durations.length} 种 ${d.durations.slice(0,6).join(' ')}`
      : (d.jsMotion ? '无 CSS 时长，动效全由 JS 驱动' : '无动效')],
  ['9  reduced-motion 生效', rm.ok, rm.ok ? '已降级' : `transition ${rm.dur}s / anim ${rm.anim}s`],
  ['10 移动端无横向溢出', mob.sw <= mob.cw + 1, `scrollWidth ${mob.sw} / client ${mob.cw}`],
  ['11 帧耗时（相对基线）', frame.p95 <= frameBudget,
    `p95 ${frame.p95}ms / 预算 ${frameBudget}ms（${hz}Hz 基线 ${baseFrame}ms · 3 轮取最优）`],
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
  `语言：${isCJK ? '中文' : '西文'}（CJK ${d.cjkRatio}）　` +
  `画布 ${d.canvas}　遮罩 ${d.masks}　页高 ${d.height}px`);
console.log('─'.repeat(74) + '\n');

process.exit(pass === total ? 0 : 1);
