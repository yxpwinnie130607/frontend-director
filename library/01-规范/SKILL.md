---
name: motion-craft
description: 生成具备 lando / ojo / basement 水准的网页——强 3D、强交互、高审美。当用户要求"高级感""有质感""像 lando 那样""3D 交互""动效要炸""不要 AI 味"时使用。内含三套可运行基线、28 站实测数值、30 条禁令与验收脚本。
---

# 动效与审美施工规范

> 这份 skill 不解风情，只做一件事：**让你交出的页面不像是 AI 做的。**
> 它不提供"灵感"，它提供**约束、基线和验收**。

---

## 0 · 先认三个错

在写第一行代码之前，确认你没有在做这三件事：

**错 1 · 从零开始写。**
你从零写出来的东西，一定长成"hero + 三列卡片 + 渐变 + 居中标题"。这不是能力问题，是训练分布的峰值。**破解办法只有一个：从 `baseline/` 复制，不许新建空白文件。**

**错 2 · 用形容词当需求。**
"高级""有质感""有呼吸感"——这些词不改变你任何一个采样决定。真正改变输出的是数字：`字号比 6.2`、`letter-spacing -0.045em`、`时长 0.45s`。

**错 3 · 上来就写动效。**
版式是 0 分，动效乘 10 还是 0。**先排版，后动效，最后才加那一个签名动作。**

---

## 1 · 强制流程（五步，不许跳）

```
Step 1  定制度        → 三选一，写在回答开头
Step 2  复制基线      → 读 baseline/<制度>/index.html，在此基础上改
Step 3  套数值        → 字号阶梯 / 字重 / 字距 / 时长 / 错开
Step 4  只加一个签名动作
Step 5  跑验收        → scripts/verify.mjs，12 项全过才算完成
```

**每次输出必须先声明制度**，格式：

> 制度：编辑叙事型（Editorial）｜依据：这是一张品牌叙事页，没有 3D 资产，主要目标是让人记住

没有这句声明，说明你在盲目施工。

---

## 2 · 制度判定

```
1. 要展示一个虚拟空间 / 3D 实体吗？
   是 → 【Immersive 3D 沉浸型】  基线 baseline/immersive/
   否 ↓
2. 主要目的是"让人记住一个品牌/一个人"，还是"让人点一个按钮"？
   记住 → 【Editorial 编辑叙事型】 基线 baseline/editorial/
   点击 ↓
3. 有功能模块要介绍、有 CTA、要转化？
   是 → 【Product 产品精细型】     基线 baseline/product/
```

**允许 Editorial + Immersive 叠加**（编辑的骨架 + 3D 的视觉）。
**禁止 Product 与另外两种混**——产品页做成海报会掉转化。

三者互斥的参数：

| | Editorial | Immersive | Product |
|---|---|---|---|
| 字号比（最大÷正文） | **5–18** | 无 DOM 大标题 | **4.0–5.1** |
| 圆角 | 0–8px | — | 10–16px（按钮 pill） |
| 分层手段 | **1px 边框，0 阴影** | canvas 深度 | **柔阴影，0 边框** |
| 动效主力 | ScrollTrigger + scrub | 逐帧 rAF | CSS transition |
| GSAP 需要度 | 高 | 中（只做文字层） | **几乎不需要** |

---

## 3 · 十条硬指标（数值，不是建议）

写 CSS 时逐条核对：

| # | 指标 | 值 |
|---|---|---|
| 1 | 最大字号 ÷ 正文字号 | ≥ 4.0（编辑型 6–8） |
| 2 | 大标题字重 | **400–600**，不要 700+ |
| 3 | 大标题字距 | −0.02 ～ −0.06 **em** |
| 4 | 大标题行高 | 0.85–1.05 |
| 5 | 字号档数 | 6–9 档，跨度大、中间档密 |
| 6 | 全站非中性色 | **≤ 2 个**（多数站是 0–1） |
| 7 | 字体族数 | 2（Variable sans + mono）；编辑型可加 1 衬线 |
| 8 | 动效时长 | 微交互 0.15–0.2 / 进场 0.4–0.5 / 主入场 0.55–0.65 |
| 9 | 错开（stagger） | 逐字 15–30ms / 块级 40–100ms，**总错开 ≤ 400ms** |
| 10 | 滚动驱动元素 | ≥ 8 个（编辑型）／≤ 3 个（产品型） |

> 全部来自 28 个站的浏览器实测。推导过程在 `docs/02-aesthetic-fingerprint.md`。

---

## 4 · 禁令（违反任意一条即视为不合格）

**版式**
- ✕ 三列等宽卡片网格 → 用 1px 分隔线 + 非对称列（7:5）
- ✕ 标题居中 → 左对齐贴边
- ✕ 每个 section 都有大标题 → 交替节奏，全页大标题 ≤ 4
- ✕ 间距均匀 → 用 4 档跨档：24 / 64 / 140 / 280
- ✕ 全站圆角 16px → 要么 0–8，要么 pill

**色彩**
- ✕ 紫/蓝渐变背景
- ✕ 三个以上强调色
- ✕ 渐变文字
- ✕ 玻璃拟态超过 2 处

**字体**
- ✕ 全站单一 Inter
- ✕ 字距用默认值
- ✕ 所有文字行高 1.5

**动效**
- ✕ 全站 `fade + y:40`
- ✕ 所有动画同时开始
- ✕ 用默认 `ease`
- ✕ `pin: true` 做横向（28 站实测 pin 出现 0 次）
- ✕ 在 `onUpdate` 里用 `gsap.to`（必须 `set`）
- ✕ rAF 驱动的元素再加 CSS `transition: transform`

**文案**
- ✕ Lorem ipsum / "这里是标题"
- ✕ "Revolutionize your workflow" 式空话
- ✕ emoji 当图标

完整 30 条与理由：`docs/05-anti-patterns.md`

---

## 5 · 技术选型（先问"要不要"，再问"用哪个"）

```
需要 GSAP 吗？
├ 有接力关系（A 结束 B 才起）        → 要
├ 有 stagger 且元素 > 6              → 要
├ 需要 seek / reverse / pause        → 要
├ 需要一条进度驱动十几个值（scrub）  → 要
└ 只是 hover / focus / 进入视口一次  → 不要，CSS 够了
```

- **产品型默认不用 GSAP。** 实测 vercel / linear / superlist 的 GSAP 缓动是 **0 次**。
- 需要 Lenis 吗？内容 < 5 屏，或没有视差/固定段 → **不要**。
- 需要 three.js 吗？没有真实 3D 资产 → **用 CSS 3D 或图片序列替代**，成本 1/10。

---

## 6 · 组合方式（必须这样接）

```js
// 单时钟：Lenis 挂到 gsap.ticker，prioritize = true
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000), false, true);   // ← 第三个参数
gsap.ticker.lagSmoothing(0);
```

```js
// 横向：sticky，不用 pin
gsap.to(track, {
  x: () => -dist(),                    // 函数值
  ease: 'none',
  scrollTrigger: {
    trigger: sec, start: 'top top', end: 'bottom bottom',
    scrub: 1,                          // 主位移 1；装饰 true；跑马灯 0
    invalidateOnRefresh: true,
  }
});
```

```html
<!-- 遮罩掀字：必须有 padding-bottom，否则中文尾笔被切 -->
<span class="mask"><span>第一行</span></span>
```
```css
.mask{display:block;overflow:hidden;padding-bottom:.06em;margin-bottom:-.06em}
```

---

## 7 · 一个页面的时间预算

```
0.00 – 0.20s   背景/氛围先到（不能留空场）
0.20 – 0.45s   主标题（遮罩掀起，逐行 60–80ms）
0.45 – 0.90s   副标 / 注释（和标题重叠 0.15s，形成接力）
0.90 – 1.40s   次要信息、按钮
1.40s+         交棒给一个无限循环（自转 / 呼吸 / 光标）
```

**总时长不超过 1.8 秒。** 超过 2 秒用户已经在滚了。

---

## 8 · 验收（做完必须跑）

```bash
node scripts/verify.mjs <你的页面路径>
```

12 项判据：

```
1. 控制台零报错
2. 最大字号 ÷ 正文 ≥ 4.0
3. 非中性色 ≤ 2
4. 大标题字重 ≤ 600
5. 大标题字距 ≤ -0.02em
6. 字号档数 ≥ 6
7. 滚动驱动元素 ≥ 6（编辑型）
8. 时长档位 ≥ 2 且 ≤ 4
9. reduced-motion 下所有动画停用
10. 移动端（390px）无横向溢出
11. 滚动中帧耗时 p95 ≤ 20ms
12. 页面可见一个"签名动作"（人工确认）
```

不过就改，不要交付。详细判据：`docs/07-verification.md`

---

## 9 · 参考文件

| 文件 | 内容 | 什么时候读 |
|---|---|---|
| `docs/00-diagnosis.md` | 为什么普通写法出不来效果 | 第一次用这份 skill 时 |
| `docs/01-taxonomy.md` | 三套制度的完整规格 | Step 1 定制度时 |
| `docs/02-aesthetic-fingerprint.md` | 28 站实测数值 + 可粘贴 CSS | Step 3 套数值时 |
| `docs/03-motion-recipes.md` | 6 个动效配方 + 真实代码片段 | Step 4 加动效时 |
| `docs/04-webgl-recipes.md` | 3D 材质/光照/相机/shader | 做 Immersive 时 |
| `docs/05-anti-patterns.md` | 30 条禁令与对照 | 交付前自查 |
| `docs/06-build-playbook.md` | 从需求到成品的完整流程 | 遇到复杂需求时 |
| `docs/07-verification.md` | 验收清单 | 最后一步 |
| `baseline/editorial/` | 可运行的编辑型基线 | Step 2 |
| `baseline/immersive/` | 可运行的 3D 基线 | Step 2 |
| `baseline/product/` | 可运行的产品型基线 | Step 2 |
| `data/snippets/*.txt` | 每个站的真实 GSAP 配置原文 | 需要"别人怎么写的"证据时 |

---

## 10 · 一句话记住

> **先选制度，再从基线改，用数字代替形容词，只加一个签名动作，然后跑验收。**
>
> 你不需要"更有创意"，你需要**少做错事**。
