# 动效与审美施工包 · 单文件版

> 这是给**网页版 AI** 用的合并版（如果你能读目录，用文件夹版更准确）。
> 全文约 130KB（3.6 千行），按顺序读完再动手。
> 为控制体积，这里省略了完整的 baseline HTML 与 9 个 React 组件——
> 它们在第 6、5 部分有核心摘录，完整版在文件夹版里。

**这份材料解决一个问题**：AI 生成的网页总是带着"模板味"——三列卡片、居中标题、渐变背景、无意义的淡入。
读完并按里面的流程执行，能把它从那条默认路径上拽下来。

**怎么用**：先读第 1 部分（作业说明），再读第 2 部分（施工规范），
第 3 部分是按需查阅的参考，第 4–6 部分是可直接复制的代码。

---
# 第 1 部分 · 作业说明

这个包只为一件事：**让接手的 AI 产出接近 landonorris.com 的页面。**

34 个文件，2.7MB。不含任何原始 bundle、不含无关样本。

---

## 一、先看这四行

```
SKILL.md              ★ 强制流程（定制度→复制基线→套数值→加签名动作→验收）
baseline/editorial/   ★ 目标长什么样（直接双击打开）
react/motion/         ★ 在 React/Next 里怎么落地（8 个效果 + 2 个 hook + 底座）
data/*.txt            ★ 别人怎么写的（5 个站的真实配置原文）
```

其余是解释和验收。

---

## 二、给 AI 的开场指令（直接粘贴）

```
你要用这套材料做一个网页。先读 SKILL.md，然后严格按它的五步流程走，不要跳步。

三条硬性要求：

1. 不许从零写。必须复制 baseline/editorial/index.html 作为起点，
   在此基础上替换内容和配色。如果你重新组织结构，视为失败。

2. 不许用形容词描述你的方案。所有视觉决定必须给出具体数值
   （字号、字距、行高、时长、错开、强调色数量），数值取自
   docs/02-aesthetic-fingerprint.md 的实测表。

3. 交付前必须跑 node scripts/verify.mjs <你的文件>，
   11 项自测全部通过才算完成。不过就改。

我的项目技术栈是 Next.js + React。如果要复用组件，
从 react/motion/ 里取（SmoothScroll / MaskReveal / HorizontalTrack /
Parallax / Magnetic / Marquee / StaggerGrid / PinScene / VelocitySkew），
不要自己重写这些效果。
```

---

## 三、两个目录的分工（别搞混）

| 目录 | 它回答什么 | 什么时候用 |
|---|---|---|
| `baseline/editorial/` | **长什么样** —— 贴边大字、1px 分隔线、非对称列、sticky 横向 | 需要看目标形态、或做纯静态站 |
| `baseline/immersive/` | **3D 怎么做** —— three.js、程序化光箱、滚动驱动相机 | 有 3D 资产时 |
| `react/motion/` | **在 React 里怎么写** —— 每个效果一个组件，含清理逻辑 | 你的项目是 React/Next |

`react/motion/` 里每个组件都做了两件 HTML 版做不到的事：

1. `useEffect` 返回清理函数（`ScrollTrigger.kill()`、`gsap.context().revert()`），避免路由切换后动画残留
2. 用 `useRef` 持有 timeline，不依赖全局变量

**如果你的 AI 直接照 HTML 基线写 React，它会漏掉这两点**——页面能跑，但切页面会出问题。

---

## 四、三个最容易做错的地方

**① 把 lando 的密度照搬。**
它有 479 处缓动、117 处 scrub，因为它是 12 个 section、21 个 canvas 的叙事页。
你的页面如果有 5 个区块，滚动配置应该在 8–15 个，不是 100 个。

**② 以为"加 3D"就是 lando。**
lando 的 3D 只占视觉的 30%。另外 70% 是排版（字号比 6.47、字距 −0.02em、贴边、1px 线）和照片。
**先把排版做对，再往里塞 3D。顺序反了就是模板。**

**③ 忽略"一个签名动作"。**
lando 能记住，是因为它有 Rive 动画、自定义光标、扫描线——但每一样都和内容有关。
不要做"粒子背景 + 光标跟随 + 渐变光晕"三件套，那是最容易被识别为 AI 生成的东西。

---

## 五、验收怎么读

```
node scripts/verify.mjs baseline/editorial/index.html
```

11 项数字 + 1 项人工。重点看这三项：

```
2  字号比 ≥ 4.0        ← 低于 3 就是"温吞的层级"
3  非中性色 ≤ 2        ← 超过 2 个就是"后台管理面板"
8  时长档位 1–6        ← 超过 6 种说明没有节奏制度
```

第 12 项（签名动作）测不出来，要你自己看：**把这个动作换成"淡入"，页面会变差吗？** 不会就删掉。

---

## 六、文件清单

```
START-HERE.md                 本文件
SKILL.md                      skill 本体（含 frontmatter，可直接装）
docs/
  00-diagnosis.md             为什么要这么做（六个病因）
  01-taxonomy.md              三套制度 + 判定树
  02-aesthetic-fingerprint.md ★28 站实测数值 + 可粘贴 CSS
  03-motion-recipes.md        6 个动效配方（含真实片段）
  04-webgl-recipes.md         3D 材质/光照/相机
  05-anti-patterns.md         ★30 条 AI 味清单
  06-build-playbook.md        施工 SOP
  07-verification.md          12 项判据 + 逐项改法
baseline/
  editorial/index.html        ★编辑叙事型（单文件，双击可开）
  immersive/index.html        3D 沉浸型
react/
  motion/                     SmoothScroll + 8 个效果组件 + 2 个 hook + index
  styles-reference.css        这些组件的配套样式
data/
  lando.txt                   5.5MB bundle 里抽出的真实配置
  basement.txt
  terminal.txt
  cuberto.txt
  darkroom.txt
scripts/
  verify.mjs                  12 项验收
shots/
  lando-00/45, basement-00/45 视觉参照（如果你的 AI 支持看图）
```

---

## 七、一句话

**这个包能让它做出"结构正确的 lando"，做不出"lando"。**

差的不是文件，是内容——见下一条。

---

## 八、文件之外还差什么（重要）

lando 的水准 60% 来自内容：

- 专业 F1 摄影（多机位、4:3 与 16:9 混排）
- 真实的人物叙事（"It doesn't matter where you start, it's how you progress from there."）
- 21 个媒体元素（照片 / 视频 / WebGL）

如果你的页面内容是"三个功能卡片 + 一段产品介绍"，**再好的 skill 也做不出那个层次**——因为没有足够的视觉素材撑起非对称版式。

所以真正该准备的是：

```
□ 至少 6–10 张高质量图片（能错落排布的尺寸比例）
□ 一句能被记住的话（不是"赋能创作者"这种）
□ 一个具体的数字（不是"10x 提效"，是"42 篇样本"）
□ 一个真的能用鼠标操作的交互点
```

**没有这些，先别谈 lando 的效果。**


---

## 九、怎么验证"你的 AI 写出来的 skill"是对的

如果你的 AI 的任务是**写/改一个 skill**（而不是直接做页面），那有个问题：
**你怎么知道它写的 skill 比原来那个好？**

不要看文档写得多漂亮，用这个闭环：

### 四步验证

```
1. 让它用新写的 skill，做同一个需求三次（换三个主题，比如咖啡店 / 开发者工具 / 摄影工作室）
2. 每次交付后跑：node scripts/verify.mjs <产物>
3. 把三次的截图和 baseline/editorial/index.html 并排
4. 三条都要满足：
   □ 11 项数字全过
   □ 版式没有退回"三列卡片 + 居中标题 + 渐变"
   □ 字号比 ≥ 5（编辑型）
```

### 判断标准

| 现象 | 说明 skill 的问题在哪 |
|---|---|
| 三次都过，但版式几乎一样 | skill 里**只有模板没有制度判定**，它在复制而不是选择 |
| 数字过了但看起来还是"AI 味" | skill 缺**禁令**（`docs/05-anti-patterns.md` 的 30 条） |
| 换了主题就崩 | skill 缺**内容无关的结构**（structure 依赖具体文案） |
| 第一次好，第二次差 | skill 缺**强制脚手架**（它在自由发挥，没有复制基线） |

### 一句关键

**skill 的质量不体现在它写了什么，体现在"用了它的产物能不能过验收"。**

所以给 AI 的任务描述里要包含这句话：

```
你写完 skill 之后，必须用它生成三个不同主题的页面，
每个都跑 verify.mjs，并把结果贴出来。11 项没过就回去改 skill，
不要改产物。
```

**改 skill，不改产物**——这一条能防止它"手工修出一个好看的页面"来糊弄验收。

---
# 第 2 部分 · 施工规范（SKILL）

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

---
# 第 3 部分 · 参考文档


## 3.1 · 为什么普通写法出不来效果（六个病因）

> 这份文档不写给模型看，写给你看。
> 因为在修 skill 之前，得先确认你要修的是它身上的哪个病。
> 结论先说：**你缺的不是"更好的描述"，你缺的是"可复制的基线 + 数字化的标准 + 可执行的禁令"。**

---

## 一、先看一个实测数字

我把 28 个站抓下来，统计每个站的 bundle 里 `ease:` 出现多少次（也就是写了多少处缓动）：

| 站点 | 缓动调用数 | 滚动配置数 | `pin:true` | 类型 |
|---|---:|---:|---:|---|
| landonorris.com | **479** | **117** | 0 | 编辑叙事型 |
| bruno-simon.com | 70 | 0 | 0 | 3D 沉浸型 |
| terminal-industries.com | 41 | 2 | 0 | 编辑叙事型 |
| family.co | 44 | 0 | 0 | 产品精细型 |
| **vercel.com** | **0** | 0 | 0 | 产品精细型 |
| **linear.app** | **0** | 0 | 0 | 产品精细型 |
| **superlist.com** | **0** | 0 | 0 | 产品精细型 |
| **rauno.me** | **2**（CSS 为主） | 0 | 0 | 产品精细型 |

注意最后四行。**vercel、linear、superlist 的 GSAP 缓动是 0 次**，但它们看起来"很贵"。

这条数据直接推翻一个假设：**"高级感"不等于"上 GSAP"。** 如果 skill 的核心是"教模型用 GSAP 做动效"，那它从一开始就只覆盖了问题的一小部分——而且是最不影响观感的那部分。

lando 有 479 处缓动，是因为它是一个**运动员传记**，需要用滚动讲一条时间线。把你的 SaaS 落地页做成 479 处 scrub，结果不是"高级"，是"卡且乱"。

**所以第一个病：把动效当成了审美。**

---

## 二、六个真病因

### 病 1 · Skill 传的是形容词，形容词对采样没有约束力

你的 skill 里大概写着这类话：「要有 3D」「要有质感」「要有强交互」「要有高级感」。

问题在于：模型生成网页时，要做几百个具体决定——字族、字号、行高、字距、留白、列数、圆角、阴影、色彩数量、动效曲线。每个决定它都有一个**概率分布**，而这个分布的峰值就是"最常见、最安全、最像模板"的那一档。

"要有质感"这句话，**不改变任何一个决定的分布**。它只是加了一个形容词，模型点了个头，然后继续按原来的峰值采样。

真正能改变分布的是**具体数字**：

```
× "有质感"                          → 无效
√ "h1 = 正文字号 × 6.2，letter-spacing -0.045em，
   line-height 0.92，全站只用 1 个强调色，
   区域之间用 1px 全宽分隔线而不是卡片"   → 有效
```

因为后者是可执行的约束，前者是情绪。

### 病 2 · 没有"范例在上下文里"

模型学风格靠 in-context 例子，不靠形容词。这是它的架构决定的，不是态度问题。

我抓下来的每个站，bundle 里都有几百个真实的配置片段，比如：

```js
// 从 lando 的 bundle 里原样抽出来的（min 化后变量名变了，对象键没变）
{trigger:e,start:"top bottom",end:"bottom top",scrub:!0,
 onUpdate:()=>{...}}
```

这种 80 个字符的片段，对模型的信息量**远大于**一段"它的滚动动画非常顺滑"的描述。

你现在的 skill 里如果没有 20–50 个真实片段，模型就是在**凭记忆画**。凭记忆画出来的东西，就是"平均的、安全的、像所有模板的"。

### 病 3 · 没有强制脚手架，模型会退回默认路径

模型的默认路径极强：`hero + 三列卡片网格 + 渐变 + 居中标题 + 圆角 16px + 阴影`。

如果你的 skill 只写"建议使用 GSAP 实现滚动动画"，它会写：

```js
gsap.from('.card', { y: 40, opacity: 0, stagger: 0.1 });   // ← 就是这三行
```

这三行没错，但它就是所有人都在写的那三行。

**要打破默认路径，唯一有效的办法是：不让它从零写。**

skill 必须规定：「不许新建页面，必须从 `baseline/editorial/index.html` 开始改」。给了基线，它就只能改内容，改不出"卡片汤"。

### 病 4 · 参数离开了结构会失效

lando 的参数（`lerp 0.1`、`scrub 117 处`、`0 pin`）只有在它的结构里成立：

- 它有 12 个 section、21 个 canvas、13579px 页高
- 它的内容本身是"照片 + 时间线 + 语录"

把这些参数搬到"产品功能介绍页"，就像把 F1 赛车的悬挂装在家用车上——每个零件都对，合起来不能开。

**所以 skill 不能只给参数表，必须先给"制度选型"。**

### 病 5 · 审美被当成一个东西，其实是三套互斥的制度

我实测出来至少有三种完全不同的"好看"，做法彼此冲突：

| 制度 | 代表 | 核心手法 | 字号比（大/正文） | 圆角 | 阴影 |
|---|---|---|---|---|---|
| **编辑叙事型** | lando / basement / darkroom | 非对称网格、贴边大字、1px 分隔线、单色 | 6–20 倍 | 0–7px | 几乎不用 |
| **3D 沉浸型** | bruno / lusion / igloo | 全屏 canvas、DOM 只做 HUD 层 | 无 DOM 级大标题 | — | — |
| **产品精细型** | vercel / linear / superlist | CSS transition、微交互、柔和层次 | 4–5 倍 | 6–9999px | 柔投影 |

**把三套混在一起，就是四不像。** 你现在的 skill 大概率在混：一边要 lando 的 3D，一边要产品的卡片，一边要 darkroom 的斜体大字。

### 病 6 · 没有验收，所以"调不动"

你说"不管怎么调都没用"。这句话能成立，前提是**你能测出改之前和改之后的差别**。

如果你只凭"感觉"，那每一次改动都是随机的，你无法知道是"参数不对"还是"结构不对"，只能一直试。

可测的判据其实很简单，我在 `07-verification.md` 里给了 12 项。比如：

- 最大字号 / 正文字号 ≥ **4.0**（低于 3 就是"温吞的层级"）
- 全站非中性色 ≤ **2** 个
- 首屏可见文字块 ≤ **6** 个
- 滚动驱动元素 ≥ **8** 个（否则就是一屏一屏地"翻页"，不是滚动叙事）
- 滚动中帧耗时 p95 ≤ **20ms**

改完跑一遍脚本，哪一项没过就改哪一项。**这样才叫"调"。**

---

## 三、所以这份材料怎么用

你现在缺的三样东西，我按重要性排：

| 优先级 | 缺什么 | 我给了什么 |
|---|---|---|
| 1 | **可复制的基线**（不让模型从零写） | `baseline/` 三套可跑文件 |
| 2 | **数字化的审美标准**（换掉形容词） | `02-aesthetic-fingerprint.md` 实测表 |
| 3 | **强制禁令**（打断默认路径） | `05-anti-patterns.md` 30 条 |
| 4 | 真实范例（给模型看原文） | `data/snippets/*.txt` 每站一封 |
| 5 | 制度选型（先分流再施工） | `01-taxonomy.md` |
| 6 | 验收（让"调"有意义） | `07-verification.md` + 可跑脚本 |

**最重要的那句话：**

> 你不需要一份"更详细的描述 Lando 有多好"的文档。
> 你需要一份"照着做就一定是这个水准"的施工规格。

后者才叫 skill。前者叫观后感。

---

## 四、一个必须接受的边界

模型不会因为读了这份材料就拥有"审美"。它能做到的是：

- ✅ 在给定制度内，做出**结构正确、比例正确、细节到位**的页面
- ✅ 不犯那 30 个"AI 味"错误
- ✅ 用真实范例的写法，而不是它的记忆
- ❌ 不会自己发明一种新的视觉语言

所以 skill 的正确形态是**"约束 + 范例 + 验收"**，不是"灵感注入"。

你要的"激发模型全部前端能力"，本质上就是：**把它从默认路径上拽下来，逼它在正确的约束里发挥。** 约束越具体，它发挥得越好——这跟人的创作规律正好相反，但对模型成立。

---

*数据来源：`data/tech.json`（bundle 统计）、`data/render.json`（渲染实测）、`data/type.json`（排版探针）。抓取时间 2026-10-25。*

## 3.2 · 三套制度与判定树

> 最重要的判断：**"好看"不是一个东西。**
> 我实测的 28 个站，至少分成三套互斥的制度。它们的参数不能互换，混在一起就是四不像。
> 你的 skill 第一步必须做的事是：**判定该用哪一套**，而不是直接开始写代码。

---

## 判定树（三步）

```
需求进来，先问三个问题：

1. 这个页面要展示一个"虚拟空间/产品实体"吗？（3D 模型、场景、可探索的环境）
   ├─ 是 → 【B 3D 沉浸型】
   └─ 否 ↓

2. 主要目的是"让人记住一个品牌/一个人"还是"让人点一个按钮"？
   ├─ 记住 → 【A 编辑叙事型】
   └─ 点击 ↓

3. 有明确的功能模块要介绍、有 CTA、要转化？
   └─ 是 → 【C 产品精细型】
```

**注意：A 和 B 可以叠加**（lando 就是 A 的骨架 + B 的视觉），但**C 不能和 A/B 混**——产品页做成海报，转化率会掉。

---

## A · 编辑叙事型（Editorial）

**它是什么：** 用杂志/画册的排版逻辑做网页。内容本身是主角，动效只是让内容"有节奏地出现"。

**代表：** landonorris.com、basement.studio、darkroom.engineering、terminal-industries.com、abhishek.design

### 骨架特征（必须全部满足）

| 项 | 规格 |
|---|---|
| 网格 | 12 栏，但内容只占 1–8 栏；**右侧或左侧故意留空** |
| 贴边 | 内容距视口边缘 `clamp(20px, 4vw, 64px)`，**不居中** |
| 分隔 | **1px 全宽实线**（`border-top: 1px solid`），不用卡片、不用圆角 |
| 图片 | 不同高度、不同宽度、错位排布（不是整齐三列） |
| 层级 | 靠**字号 + 留白**，不靠阴影、不靠边框 |

### 排版规格

```
最大字号 ÷ 正文 = 6 – 20        （实测：darkroom 20.0、ustwo 13.5、basement 7.25、abhishek 6.91）
大标题 letter-spacing = -0.02 – -0.05em
大标题 line-height = 0.85 – 0.95
正文字号 = 11 – 17px（偏小！）
正文 line-height = 1.5 – 1.65
标签 = mono，10–11px，全大写，letter-spacing +0.18em
字体族数 = 2 – 3（display + body + mono）
```

### 色彩规格

```
底色：1 个（黑 / 白 / 米 / 深墨绿）
强调：0 – 1 个（实测 13/22 个站是 0–1 个）
灰阶：3 档（从底色推导，不用 #666）
```

### 动效规格

| 手法 | 参数 |
|---|---|
| 遮罩掀字 | 容器 `overflow:hidden`，内层 `yPercent: 115 → 0`，`expo.out`，逐行 `stagger 0.1` |
| 图片视差 | `yPercent: ±(5–12)`，`scrub: true`，`ease: none` |
| 图片揭示 | `clip-path: inset(0 0 100% 0) → inset(0)`，`scrub: 0.6` |
| 横向轨道 | `position:sticky` + `x: () => -dist` + `scrub: 1` |
| 滚动驱动密度 | **≥ 8 个元素**（实测 lando 25 个、darkroom 3 个、family 6 个） |
| 总原则 | **大部分运动是滚动的函数，不是"播放一次"** |

### 技术栈

```
必需：无（纯 CSS + IntersectionObserver 也能做 70%）
推荐：GSAP + ScrollTrigger（因为需要时间线编排）
可选：Lenis（内容 > 5 屏时才值得）
禁止：pin: true（用 sticky）
```

### 什么时候用

品牌站 / 个人站 / 工作室作品集 / 发布会页 / 长图文叙事 / 招聘页

---

## B · 3D 沉浸型（Immersive）

**它是什么：** 整个视口就是一个 3D 场景，DOM 退化成 HUD（抬头显示）。用户是在"操作一个空间"，不是在"读一个页面"。

**代表：** bruno-simon.com、lusion.co、igloo.inc、resn.co.nz、waaark.com、14islands.com

### 骨架特征

| 项 | 规格 |
|---|---|
| canvas | 1 个（有时 2–3 个分层），`position: fixed` 或 `100vh`，全屏 |
| DOM | 极少：导航 + 一句标题 + 2–3 个操作提示。实测 bruno / resn / igloo 渲染后 `sections = 0` |
| 滚动 | 可能不用滚动（键盘/指针驱动），也可能用滚动驱动相机 |
| 文字 | 大部分文字在 canvas 里，或只有一句 |

### 动效规格

**它不用 CSS transition，用的是逐帧循环：**

```
每帧：
  1. 读取输入（指针 / 滚动 / 键盘 / 时间）
  2. 用阻尼插值（lerp 0.04 – 0.12）把状态推向目标
  3. 更新相机 / uniform / 顶点
  4. 渲染
```

关键参数：

| 参数 | 常见值 | 说明 |
|---|---|---|
| 阻尼 | `0.04 – 0.12` | 越小越"重"，越大越"跟手" |
| 相机 fov | `35 – 55` | 小于 35 会产生"长焦压缩"，大于 60 会畸变 |
| 粒子数 | `10k – 50k` | 超过 50k 要考虑 GPU 实例化 |
| 后处理 | bloom `strength 0.4–0.9`、`radius 0.4–0.8` | 不要叠三种以上 |
| 材质 | `MeshPhysicalMaterial` + `roughness 0.2–0.6` | 或自定义 shader |

### 技术栈

```
3D 库：three.js（90%）/ OGL（轻量，lando 用）/ pixi（2D 为主）
shader：GLSL（顶点位移、溶解、置换、流体）
后处理：EffectComposer + RenderPass + UnrealBloomPass
物理：rapier（bruno 用了）
```

### 什么时候用

有真实 3D 资产 / 需要展示一个空间（房间、产品拆解、地图）/ 想做"体验"而不是"页面"

### 什么时候**不要**用

- 没有 3D 资产，只想"看起来有 3D 感" → 用 A 的排版 + CSS 3D transform，成本 1/10
- 页面主要任务是转化（表单、定价）→ 3D 会分心
- 移动端为主 → 帧率和发热会崩

---

## C · 产品精细型（Product）

**它是什么：** 标准的产品落地页骨架，但每个细节都打磨到极致。**不用 GSAP，不用 Lenis，靠 CSS 和微交互取胜。**

**代表：** vercel.com、linear.app、superlist.com、rauno.me、family.co、mercury.com

### 骨架特征

| 项 | 规格 |
|---|---|
| 容器 | max-width `1080–1280px`，居中（这一类**允许**居中） |
| 区块 | 明确的 section，每个有自己的背景（白 / 浅灰 / 深色） |
| 卡片 | 允许，但**层次靠边框+背景差，不靠阴影堆叠** |
| 圆角 | 6–12px（卡片）/ 9999px（按钮 pill） |
| 图标 | 1px 细线 SVG，几何形 |

### 排版规格

```
最大字号 ÷ 正文 = 4 – 5          （实测：family 4.86、linear 4.27、vercel 4.0）
大标题 letter-spacing = -0.02 – -0.06em
大标题 line-height = 1.0 – 1.1
正文字号 = 15 – 17px
正文 line-height = 1.5 – 1.6
字体族数 = 1 – 2
```

### 动效规格

| 手法 | 参数 |
|---|---|
| 进入视口 | `IntersectionObserver` + `translateY(16px) → 0`，`400–600ms`，`cubic-bezier(0.16,1,0.3,1)` |
| hover | `150–200ms`，只改背景/边框/文字色，位移 ≤ 2px |
| 按下 | `scale(0.98)` 或 `translateY(1px)` |
| 数字滚动 | 只在关键指标用一次 |
| 滚动绑定 | **基本不用**（实测 vercel 0 个、linear 3 个、rauno 3 个） |

### 技术栈

```
必需：CSS（transition + @keyframes）
可选：Web Animations API（复杂序列）
可选：IntersectionObserver（入场）
禁止：GSAP 全站铺开（会变成"过度动画的产品页"）
```

### 什么时候用

SaaS 落地页 / 定价页 / 功能页 / 文档站 / 任何要转化的页面

---

## 混合型的正确做法

lando 是 **A 的骨架 + B 的视觉**：

```
骨架 = 编辑叙事（贴边、非对称、1px 分隔线、mono 小标）
视觉 = 3D（21 个 canvas：照片 / 视频 / WebGL 元素）
动效 = 479 处缓动 + 117 处 scrub
```

**顺序不能反**：先把排版做对，再往里塞 3D。如果先做 3D，排版会退化成"给 3D 让路"的居中布局，那就是模板。

---

## 技术栈决策表（防止过度工程）

| 问题 | 判定 | 结论 |
|---|---|---|
| 内容 > 5 屏，且有视差/固定段？ | 是 | 上 Lenis；否则**别上**（会拖慢首屏） |
| 有多个元素需要**接力编排**（A 结束后 B 起手）？ | 是 | 用 GSAP timeline；否则**别用**，CSS 够 |
| 需要真实几何/光照/材质？ | 是 | three.js；只是 2D 图像扭曲 → 单独写 shader，不必上 three |
| 需要 3D 但没资产？ | — | **不要假装**。用 CSS `perspective` + 多层位移，成本低 10 倍且不违和 |
| 移动端为主？ | 是 | 砍掉 WebGL，保留排版和 CSS 动效 |

---

*制度判定之后，去 `02-aesthetic-fingerprint.md` 取该制度的精确数值，再去 `06-build-playbook.md` 按步骤施工。*

## 3.3 · 审美指纹：28 站实测数值 ★ 最重要

> 这份表的作用：**把"高级感"翻译成可粘贴的数值。**
> 每个数字都是浏览器里用 `getComputedStyle` 实测的，不是估的。
> 数据源：`data/type.json`、`data/timing.json`、`data/matrix.json`。

---

## 一、最反直觉的一条：标题字重不大

统计 28 个站、279 处 `font-weight` 声明：

| 字重 | 次数 | 占比 |
|---|---:|---:|
| **500** | 96 | **34%** |
| **400** | 87 | **31%** |
| 600 | 61 | 22% |
| 700 | 22 | 8% |
| 300 | 6 | 2% |
| 900 | 4 | 1% |

**700 以上只占 9%。**

实测的大标题字重：

```
vercel   64px  w400   ← 不是 bold
terminal 70px  w400
cuberto  81px  w500
family   68px  w500
linear   72px  w510   ← 变量字体的半档
basement 76px  w600
lando   110px  w700   ← 唯一的例外，但它是衬线 display（Brier）
```

**规则：大标题用 400–600。**
把标题设成 `font-weight: 800` 是最快掉档的写法之一——它会让文字变"胖"，撑大视觉体积却不增加精致度。

**什么时候可以用 700+**：只在两种情况下——① 用的是压缩体（condensed）；② 用的是衬线 display（衬线本身笔画细，需要更重才立得住）。

---

## 二、字号制度：7–11 档，不是 3–5 档

实测每站的可见字号（出现 ≥2 次的）：

```
lando     110 / 106 / 98 / 93 / 73 / 70 / 63 / 60 / 32 / 27 / 17   （11 档）
linear     72 / 48 / 32 / 24 / 16 / 15 / 14 / 13 / 12 / 11 / 10    （11 档）
cuberto    81 / 72 / 38 / 29 / 23 / 22 / 18 / 16 / 14              （9 档）
terminal   70 / 48 / 46 / 44 / 40 / 35 / 34 / 27 / 23 / 22         （10 档）
family     68 / 44 / 23 / 19 / 17 / 15 / 14 / 13                   （8 档）
basement   87 / 76 / 38 / 24 / 20 / 13 / 12                        （7 档）
vercel     64 / 56 / 24 / 16 / 14 / 13 / 11                        （7 档）
```

注意两件事：

1. **大字号之间有密集的中间档**（lando 有 110/106/98/93/73/70/63/60）——这不是"乱"，是因为不同区块需要不同的视觉重量，而它们的字号是**按比例**算出来的，不是随手定的。
2. **小字号之间也有密集档**（linear 有 16/15/14/13/12/11/10）——这些是 UI 的微层级。

**照抄用的 7 档阶梯（以正文 16px 为基准）：**

| 角色 | 字号 | 与正文比 | 用途 |
|---|---:|---:|---|
| display | **96–110px** | 6–7× | 首屏主标题，一句 |
| h2 | **56–64px** | 3.5–4× | 区块标题 |
| h3 | **32–38px** | 2–2.4× | 卡片标题 / 小标题 |
| lead | **20–22px** | 1.3× | 导语段落 |
| body | **16–17px** | 1× | 正文 |
| small | **13–14px** | 0.85× | 注释、次要信息 |
| label | **10–11px** | 0.65× | eyebrow / 序号 / 单位，mono + 全大写 |

**display ÷ body 的实测区间：**

```
产品型（C）：4.0 – 5.1     ← vercel 4.57、family 4.00、superlist 4.00、linear 5.14、mercury 4.06
编辑型（A）：5.4 – 18      ← abhishek 5.43、lando 6.47、basement 4.35*、ustwo 15.4、darkroom 17.9
极端海报：50+              ← rauno.me 720px 的巨型字（单场景）
```

**低于 3.0 就是"温吞"**，这是量化的判定线。

---

## 三、字距：按 em 设，同一个站共用一个值

实测（括号内是换算成 em 的值）：

| 站 | 字号 | letter-spacing | em |
|---|---:|---:|---:|
| vercel | 64px | −3.84px | **−0.060** |
| vercel | 56px | −3.36px | −0.060 |
| darkroom | 200px | −10px | **−0.050** |
| darkroom | 120px | −6px | −0.050 |
| terminal | 70px | −3.6px | **−0.051** |
| basement | 87px | −3.48px | **−0.040** |
| basement | 76px | −3.04px | −0.040 |
| family | 68px | −1.36px | −0.020 |
| cuberto | 81px | −0.81px | −0.010 |
| abhishek | 76px | −1.52px | −0.020 |

**规律：负值，−0.01 到 −0.06em，同一站内大标题共用一个值（按 em 设就会自动等比）。**

取值建议：

```
−0.06em   极端紧凑，适合 grotesk 无衬线（vercel）
−0.04em   标准紧凑，最稳（basement）
−0.02em   温和，适合可变字体或衬线（family / abhishek）
+0.18em   标签专用（全大写 + mono）
0          永远不是"中性选择"，是不设计
```

**警告：负字距只用于 ≥ 32px 的标题。** 小字加负字距会粘在一起。

---

## 四、行高：0.8–1.1，全部很紧

```
darkroom  200px  lh 160px   = 0.80
lando     110px  lh 91.3px  = 0.83
basement   87px  lh 78px    = 0.90
terminal   70px  lh 70px    = 1.00
linear     72px  lh 72px    = 1.00
vercel     64px  lh 64px    = 1.00
abhishek   76px  lh 76px    = 1.00
family     68px  lh 74.8px  = 1.10
```

**规则：**

```
大标题（多行）   0.85 – 0.95
大标题（单行）   1.00 – 1.05
正文            1.50 – 1.65
标签            1.00 – 1.20
```

大标题用 1.5 是"AI 味"的强信号——它会让两行标题之间出现一条"空洞"，破坏整块的紧凑感。

---

## 五、字族：2 族制（1 Variable sans + 1 mono）

实测：

| 站 | sans | mono / 第二族 |
|---|---|---|
| lando | Mona Sans Variable | Brier（衬线 display） |
| vercel | GeistSans | Geist Mono |
| linear | Inter Variable | Berkeley Mono |
| basement | Geist | Geist Mono |
| terminal | SuisseIntl | Geist Mono |
| family | Family（自定义） | Inter |
| darkroom | therma（压缩体） | sauce / mono |
| abhishek | Geist Medium | Bluu Next Bold（衬线） |
| cuberto | Suisse Intl | （无，单族） |

**规则：**

```
sans  → 必须是 Variable 字体（可以出 450 / 510 这种半档字重）
mono  → 所有数字、序号、时间、eyebrow、单位
可选  → 一个衬线或压缩体，只用于 display
```

**为什么 Variable 重要**：上面看到 linear 用 `w510`、vercel 用 `w450`——这是变量字体才能做到的半档。普通字体只能 400/500/700，跳档就会"突兀"。

免费可用的 Variable sans：**Inter Variable**（最稳）、**Geist**（Vercel 开源）、**Mona Sans**（GitHub 开源）。

---

## 六、色彩：强调色 0–1 个

实测 22 个可读的站：

```
0 个强调色：13 站   ← vercel / linear / darkroom / cuberto / apple / basement(仅 1 次) ...
1 个强调色： 7 站
2 个强调色： 2 站
```

具体例子：

| 站 | 强调色 | 使用次数 | 用法 |
|---|---|---:|---|
| lando | `rgb(210,255,0)` 荧光黄绿 | 52 文字 + 43 背景 | **品牌色，大量用** |
| basement | `rgb(255,77,0)` 橙 | **1 次** | 只在一个"● Online"状态点 |
| terminal | `rgb(171,255,2)` 荧光绿 | 3 次 | 只在高亮标签 |
| family | 橙 `rgb(249,115,22)` / 蓝 `rgb(26,136,248)` | 3 / 3 | 图标 |
| vercel | 无 | 0 | 纯黑白灰 |
| linear | 无（UI） | 0 | 柔光插画里才有淡色 |
| cuberto | 无 | 0 | 纯黑白 |
| darkroom | 无（红算主色） | — | 黑 + 红两色 |

**两种合法形态：**

```
形态 1：0 个强调色。纯黑白灰，靠字号和留白建立层级。（vercel / cuberto / darkroom）
形态 2：1 个强调色，且只在"状态/动作"上用 1–5 次。（basement / terminal）
```

**品牌色可以大量用**（lando 的荧光绿用了 95 次），但前提是**只有这一个**。

**永远不要**：3 个以上强调色、渐变文字、彩色阴影。

---

## 七、圆角与阴影：二选一，不要混

实测：

| 站 | 圆角众数 | 边框数 | 阴影数 | 路线 |
|---|---:|---:|---:|---|
| darkroom | **0px** | 34 | 0 | 边框派 |
| locomotive | 0px | 12 | 0 | 边框派 |
| basement | 9999px（仅按钮） | 6 | 0 | 边框派 |
| lando | 7.2px | 8 | 0 | 边框派 |
| abhishek | 3px | 0 | 9 | 阴影派（轻） |
| vercel | 6px | 4 | 16 | 阴影派 |
| linear | 9999px（按钮） | **83** | **35** | 混合（但层次分明） |
| family | 10px | 0 | **37** | 阴影派 |
| superlist | 10px | 0 | **35** | 阴影派 |
| apple | 980px（圆形按钮） | 36 | 0 | 边框派 |

**两条合法路线：**

```
路线 1（编辑型）：1px 边框 + 0 阴影 + 圆角 0–8px
路线 2（产品型）：0 边框 + 柔和阴影 + 圆角 10–16px
按钮例外：pill（9999px）在两派里都合法
```

**不要**：边框 + 阴影同时用在一个元素上（那叫"没想清楚"）。

---

## 八、动效时长：0.3 / 0.5 / 0.6 是三档主力

统计 537 处 `duration`：

| 时长 | 次数 | 占比 |
|---:|---:|---:|
| **0.5s** | 115 | 21% |
| **0.3s** | 87 | 16% |
| **0.6s** | 83 | 15% |
| 0.2s | 44 | 8% |
| 0.8s | 41 | 8% |
| 0.4s | 37 | 7% |
| 0.25s | 32 | 6% |
| 0.1s | 21 | 4% |

**关键：0.8s 以上合计不到 12%，1.2s 几乎不存在。**

我之前给过"进场 780ms / 1200ms"的建议，按这个数据是偏慢的。**实测的主流是 500–600ms。**

**三档建议：**

```
微交互（hover / 按下）   0.15 – 0.20s
区块进场                0.40 – 0.50s
主导进场 / 遮罩          0.55 – 0.65s
```

---

## 九、错开：15–30ms 与 80–200ms 两个簇

统计 103 处 `stagger`：

```
0.020  33 次  ██████████████████████████████████
0.015  20 次  ██████████████████████
0.030  12 次  ██████████████
0.040  10 次  ████████████
0.050   9 次  ██████████
0.060   5 次  ██████
0.080   5 次  ██████
0.100   4 次  █████
0.200   3 次  ███
```

两个明显的簇：

```
15–30ms   → 逐字 / 密集元素（lando 用 20ms ×28、15ms ×20）
80–200ms  → 块级卡片（cuberto 用 100ms）
```

**更可靠的判据：控制总错开时长，而不是单步。**

```
总错开 = stagger × 元素数 ≤ 400ms

例：8 张卡 → stagger ≤ 50ms
    12 个字 → stagger 30ms（总 360ms）
    4 张卡 → stagger 100ms（总 300ms）
```

我之前建议的"块级固定 80ms"在 8 张卡上会得到 560ms 的总延迟——**这就是"等了一下"的来源**。

---

## 十、直接可粘贴的 CSS（照抄区）

```css
:root{
  /* 字号阶梯：正文 16px 为基准 */
  --t-display: clamp(56px, 7.4vw, 110px);
  --t-h2:      clamp(38px, 4.2vw, 62px);
  --t-h3:      clamp(24px, 2.2vw, 34px);
  --t-lead:    clamp(18px, 1.4vw, 21px);
  --t-body:    16px;
  --t-small:   13px;
  --t-label:   10.5px;

  /* 行高 */
  --lh-display: 0.9;
  --lh-title:   1.0;
  --lh-body:    1.55;
  --lh-label:   1.1;

  /* 字距（em，只用于 ≥32px） */
  --ls-display: -0.045em;
  --ls-h2:      -0.03em;
  --ls-label:    0.18em;

  /* 时长 */
  --dur-fast: 180ms;
  --dur-mid:  450ms;
  --dur-slow: 620ms;

  /* 缓动 */
  --ease-out:   cubic-bezier(0.16, 1, 0.3, 1);
  --ease-inout: cubic-bezier(0.4, 0, 0.2, 1);

  /* 间距（4 档，必须跨档） */
  --sp-1: 24px;
  --sp-2: 64px;
  --sp-3: 140px;
  --sp-4: 280px;
}

.display{
  font-size: var(--t-display);
  font-weight: 500;              /* 不是 700 */
  line-height: var(--lh-display);
  letter-spacing: var(--ls-display);
}
.label{
  font-family: var(--mono);
  font-size: var(--t-label);
  font-weight: 500;
  letter-spacing: var(--ls-label);
  text-transform: uppercase;
}
```

---

## 十一、这张表怎么用

不要一次全抄。按这个顺序：

1. **先定制度**（`01-taxonomy.md`）→ 决定用边框派还是阴影派
2. **套字号阶梯**（上面第二节）→ 这一步就解决 40% 的问题
3. **套字重 400–600 + 负字距 −0.04em** → 再解决 20%
4. **把强调色砍到 ≤1** → 再解决 15%
5. **时长改 0.18/0.45/0.62，stagger 按"总≤400ms"算** → 再解决 15%
6. **剩下的 10% 才是"动效创意"**

**顺序不能反。** 前 4 步没做，第 6 步做再多也没用——这就是你现在遇到的情况。

---

*全部数字来自 2026-10-25 的实测抓取。原始数据：`data/type.json`、`data/timing.json`、`data/matrix.json`、`data/tech.json`。*

## 3.4 · 动效配方（含真实代码片段）

> 全部片段来自实测 bundle，可在 `data/snippets/<站名>.txt` 找到原文。
> min 化后变量名被改了，但**对象键（`scrub` / `start` / `containerAnimation`）不会变**，所以配置是可信的。

---

## 零、先看密度：为什么 lando 是 479，vercel 是 0

| 站 | 缓动 | 滚动配置 | start 分布 | 结构 |
|---|---:|---:|---|---|
| lando | 479 | 117 | `top bottom`×52、`top 90%`×28、`top 95%`×8、`top top`×8 | 12 section / 21 canvas / 13579px |
| terminal | 41 | 2 | `top bottom`×3、`top 85%`×1 | 文字 + SplitText 逐字 |
| cuberto | 24 | 1 | — | 9 档字号 / 大量逐字 |
| vercel | 0 | 0 | — | 10 section / 纯 CSS |

**这不是"水平差异"，是"内容形态差异"。**

lando 有 12 个 section、21 个 canvas、几十张照片——每一块都需要自己的进入方式，所以有 117 个滚动配置。

vercel 的页面是"产品截图 + 文案 + 按钮"，每个区块的入场用同一个 CSS transition 就够，所以是 0。

**结论：动效数量应该由"内容块的数量"决定，不是由"想要多炫"决定。**

经验公式：

```
滚动配置数 ≈ 内容区块数 × 1.5
（lando: 12 × ~10 = 117，因为它每块里有多个元素各自绑定）
（终端: 3 块 × 0.7 = 2）
```

---

## 一、驱动源只有三种，别混

| 驱动源 | 用什么 | 什么时候用 | 实测占比 |
|---|---|---|---|
| **时间线** | `gsap.timeline()` + 绝对时间 | 进场编排、多元素接力 | 中等 |
| **滚动** | `ScrollTrigger` + `scrub` | 与阅读进度绑定 | lando 117 处 / 其余 0–3 处 |
| **指针** | `quickTo` 或每帧 lerp | 跟随、磁性、倾斜 | 普遍但量少 |

**铁律：同一个元素只能有一个驱动源。**
同时被 timeline 和 scrub 驱动的元素，会在滚动时"跳回入场状态"——这是最常见的 bug。

---

## 二、配方 1 · 遮罩掀字（最高性价比）

**为什么它比 `fade + y:40` 高级：** 文字是从"一条缝"里长出来的，有物理感；淡入只是透明度变化。

### 结构

```html
<h1 class="display">
  <span class="mask"><span>Your draft is</span></span>
  <span class="mask"><span>your strongest</span></span>
  <span class="mask"><span>weapon.</span></span>
</h1>
```

```css
.mask{ display:block; overflow:hidden; padding-bottom:.06em; }  /* 留一点，防切字脚 */
.mask > span{ display:block; will-change:transform; }
```

```js
gsap.set('.mask > span', { yPercent: 115 });
gsap.to('.mask > span', {
  yPercent: 0, duration: 0.62, ease: 'expo.out', stagger: 0.08, delay: 0.15
});
```

**参数（实测）：** 时长 0.55–0.65，`expo.out` 或 `power3.out`，行间 stagger 0.06–0.1。

### 坑

1. `padding-bottom: .06em` 不能省，否则中文的"j/q/尾笔"会被切掉。
2. 容器 `overflow:hidden` 会让 `box-shadow` 失效。
3. 行高 < 1 时，遮罩高度可能小于字高 → 用 `.mask{ line-height: inherit }` 并给内层 `padding` 修正。

### 进阶：逐字（terminal 的做法）

terminal 用 `SplitText`：

```
type: "chars, lines"
charsClass: "--char"
linesClass: "--line"
```

然后：

```js
gsap.fromTo(char, { yPercent: 100 }, {
  yPercent: 0, ease: 'expo.out', duration: 1, stagger: { each: 0.04, from: 'end' }
});
```

**注意 `from: 'end'`** —— 从最后一个字开始往回错开。这个细节让入场"有设计感"，成本为零。

---

## 三、配方 2 · 横向轨道（不要用 pin）

**实测：28 个站里 `pin: true` 出现 0 次。** 全部用 sticky。

### 结构

```html
<section class="ht" data-horizontal>
  <div class="ht-sticky">
    <div class="ht-track">
      <article class="ht-item">…</article>
      <article class="ht-item">…</article>
    </div>
  </div>
</section>
```

```css
.ht{ position:relative; height: calc(400vh); }         /* 高度由 JS 算，见下 */
.ht-sticky{ position:sticky; top:0; height:100vh; overflow:hidden; }
.ht-track{ display:flex; gap:2vw; will-change:transform; }
```

```js
const sec = document.querySelector('.ht');
const track = sec.querySelector('.ht-track');
const dist = () => track.scrollWidth - window.innerWidth;

sec.style.height = (dist() + window.innerHeight) + 'px';

gsap.to(track, {
  x: () => -dist(),
  ease: 'none',
  scrollTrigger: {
    trigger: sec,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1,
    invalidateOnRefresh: true,
  },
});
```

**这三个点必须对：**

1. `x: () => -dist()` 写成**函数**，配合 `invalidateOnRefresh: true` —— 窗口尺寸变化后自动重算，不用重建动画。
2. `scrub: 1` —— 1 秒追上，横移有"重量"。装饰性视差用 `scrub: true`。
3. **外层高度 = 距离 + 一屏**，否则最后一张卡看不到。

### 轨道内的视差（lando 的真实写法）

原始片段（`data/snippets/lando.txt`）：

```js
m.timeline({
  scrollTrigger: {
    trigger: Z,
    containerAnimation: G,        // ← 关键：跟上主横移动画
    start: "left right",
    end: "right left",
    scrub: true,
    onUpdate: (q) => {
      let W = 4 * q.progress;
      m.set(H, { x: `${W}rem` });   // ← set，不是 to
    }
  }
});
```

**两个关键：**

- `containerAnimation` 让这个 trigger 沿"横向位移"而不是"垂直滚动"计算进度。
- `onUpdate` 里用 `gsap.set()` 每帧直接写值。用 `.to()` 会每帧新建一个 tween，十几个元素同屏时必然掉帧。

---

## 四、配方 3 · 滚动驱动的相机（3D 站的通用做法）

lando 的真实配置：

```js
m.fromTo(cameraGroup.position, { z: 0 }, {
  z: -1,
  ease: "power1.inOut",
  scrollTrigger: {
    trigger: '[data-gl-track="head"]',
    scrub: true,
    start: () => "top top",
    end: () => `top+=${sizes.height} top`,   // ← 函数值
  }
});
```

**要点：**

1. 相机位移用 `scrub: true`，不用时间线——滚动停了相机就停。
2. `start` / `end` 写成**函数**，因为 `sizes.height` 会在 resize 后变。
3. 位移量很小（`z: 0 → -1`，即一个单位），大位移会让用户晕。

### 同一条 ScrollTrigger 驱动 uniform（溶解、刮擦）

```js
m.fromTo(material.uniforms.uFilter, { value: 0 }, {
  value: 1, duration: 0.25, ease: "power1.inOut",
  scrollTrigger: { /* 同上 */ }
});
```

**这就是"3D 情节"的做法：不是切换场景，是让同一个材质随滚动从 0 到 1。**

---

## 五、配方 4 · 指针磁性（150ms 内必须有反应）

```js
const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });

el.addEventListener('pointermove', (e) => {
  const r = el.getBoundingClientRect();
  xTo((e.clientX - r.left - r.width / 2) * 0.18);
  yTo((e.clientY - r.top - r.height / 2) * 0.18);
});
el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
```

**参数：**

```
系数 0.15 – 0.25      超过 0.3 会"飘出去"
duration 0.4 – 0.6    有阻尼感
范围限制 ±12px        再大就不像"磁吸"，像"逃跑"
只在 pointer: fine    触屏没有 hover
```

**别给磁性元素加 `transition: transform`** —— 会和 quickTo 抢同一属性，表现为"迟钝 + 抖动"。这条我在你的 mediacoach 项目里实际修过三处。

---

## 六、配方 5 · 可逆的进出场（被忽略的细节）

terminal 的写法：

```js
scrollTrigger: {
  trigger: el,
  start: 'top 85%',
  end: 'bottom 20%',
  toggleActions: 'play none none reverse',   // ← 关键
}
```

`toggleActions` 四段分别对应：进入 / 离开 / 回到上方 / 回到下方。

`play none none reverse` 的含义：**进入时正向播放，滚回去时倒放。**

这带来一个"昂贵感"：你往上滚，动画跟着退回去，画面像是有记忆的。而 `once: true` 的写法是"演完就锁死"，滚回去再滚下来时没有反应。

**代价**：倒放会让 `onComplete` 回调重复触发，要确保幂等。

---

## 七、配方 6 · 跑马灯（不是自动播放）

```js
gsap.timeline({
  scrollTrigger: { trigger: el, start: '0% 100%', end: '100% 0%', scrub: 0 }
}).fromTo(text, { x: '9vw' }, { x: '-9vw', ease: 'none' });
```

`scrub: 0` = 立即跟随，不带惯性。页面停它就停，往回滚它倒着走。

**为什么会比 `xPercent: -100, repeat: -1` 好：** 自动播放的跑马灯在"演给你看"，滚动驱动的在"回应你的手"。前者再精致也显得廉价，因为输入和反应对不上。

---

## 八、编排：三种关系就是全部

```
tl.from('.a', {...}, 0)          // 绝对时间
  .from('.b', {...}, '<')        // 和上一个同时开始（接力）
  .from('.c', {...}, '<0.15')    // 上一个开始后 0.15s（重叠，多米诺）
  .from('.d', {...}, '+=0.3')    // 上一个结束后留白 0.3s（呼吸）
```

**实测的缓动分布（lando 479 次）：**

```
power2.out   144   ← 进场主力
none          72   ← 所有滚动位移
power2.inOut  62   ← 原位切换
expo.inOut    48   ← 遮罩/大幅位移
power1.inOut  44
power3.out    40
expo.in       20
expo.out      20
```

**这就是全部。** 不需要 12 种缓动——`power2.out` + `none` + `power2.inOut` 覆盖 80%。

---

## 九、scrollTrigger 的 start 取值（实测频率）

lando：

```
"top bottom"  52 次   ← 元素刚进入视口底部（默认首选）
"top 90%"     28 次   ← 更早一点，元素进入 90% 高度时
"top 95%"      8 次
"top top"      8 次   ← 用于固定场景
"top 80%"      4 次
"left right"   4 次   ← 横向容器内
"left 95%"     4 次
"0% 100%"      4 次   ← 跑马灯
```

**规则：**

```
普通入场        top 88% – 90%（比默认的 bottom 早一点，避免"等到才出现"）
固定场景        top top
横向轨道内      left right
```

**用百分比（`top 90%`）而不是 `top bottom`** —— 后者等于 `top 100%`，元素完全进视口才开始，会有"迟一拍"的感觉。

---

## 十、性能红线（掉帧就在这里）

| 红线 | 原因 | 正确做法 |
|---|---|---|
| `onUpdate` 里用 `gsap.to` | 每帧新建 tween | 用 `gsap.set` |
| 动画 `width` / `height` / `top` / `left` | 触发 layout | 只用 `transform` + `opacity` |
| 同一个元素两个 transition 抢 `transform` | 后者覆盖前者 | rAF 驱动的元素不许加 transition |
| 每帧 `getBoundingClientRect` | 强制回流 | 缓存，或在 resize 时重算 |
| 超过 50k 粒子 | GPU 瓶颈 | 用 `InstancedMesh` 或降数量 |
| `filter: blur()` 大面积动画 | 极贵 | 用小面积 + `will-change`，或改 opacity |
| 20 个以上 ScrollTrigger 同时 `scrub` | 每帧多次计算 | 合并到一条 timeline / 用 `batch` |

---

## 十一、什么时候"不加动效"才是对的

实测里最反直觉的一条：**vercel 的缓动是 0，但它看起来比谁都稳。**

因为：

1. 它的排版已经撑住了（字号比 4.57、字距 −0.06em、Geist 变量字体）
2. 它的动效全部由 CSS transition 完成，用户感知不到"动画在跑"
3. 加 GSAP 只会让它变成"一个有很多动画的网站"，不再是"一个很快的产品"

**判断标准：**

```
如果页面的主要任务是"转化"（点按钮、填表单、看定价）
→ 只做 CSS transition，不做滚动编排

如果页面的主要任务是"让人记住"
→ 才值得上 ScrollTrigger 和 3D
```

---

*原始片段：`data/snippets/lando.txt`（5.5MB bundle 的抽取）、`data/snippets/terminal.txt`、`data/snippets/cuberto.txt`。*

## 3.5 · 3D 与 WebGL 的实现路径

> 核心结论先说：**3D 的质感不来自模型复杂度，来自材质、光照和相机。**
> lusion 首页的物体就是三个圆柱交叉成一个十字，几何简单到不能再简单，但看起来像产品广告。
> 原因是：`roughness 低 + 有环境反射 + 景深 + 软阴影`。

---

## 一、三种装法，先选对

### 装法 A · 全屏 canvas（最激进）

**代表：** bruno-simon.com、resn.co.nz、igloo.inc

```
渲染后实测：页面高度 = 视口高度（900px），DOM 里 section 数 = 0
```

整页就是一个 3D 场景，DOM 只剩 logo 和 2–3 个提示。

- ✅ 沉浸感最强
- ❌ 需要真的有一个"场景"（房间、地图、可探索空间）
- ❌ 移动端帧率和发热是硬伤
- ❌ 文字全在 canvas 里 → SEO 归零、无法选中复制

**什么时候用：** 有游戏化体验需求、有 3D 资产、受众在桌面端。

### 装法 B · 容器内 canvas（最实用）★ 推荐

**代表：** lusion.co

实测 lusion 的首屏：

```
logo 左上 / 标题居中偏左（44px，weight 400）
主视觉 = 一个圆角矩形窗口：宽 78vw、高 520px、居中
窗口内 = 3D 渲染（十字形物件堆叠，白/蓝/黑三色，景深明显）
底部 = "SCROLL TO EXPLORE" + 四个 + 号装饰
```

**这是最值得抄的一种。** 因为：

- 排版和 3D 各占一块，互不干扰 → 文字永远可读
- 3D 只渲染一个矩形区域 → 性能好 5–10 倍
- 容器可以有圆角/边框 → 3D 变成"一个物件"，而不是"一个环境"

```html
<section class="stage">
  <h1>…</h1>
  <div class="canvas-wrap"><canvas id="gl"></canvas></div>
</section>
```
```css
.canvas-wrap{
  width: 78vw; max-width: 1200px; height: 520px; margin: 0 auto;
  border-radius: 18px; overflow: hidden;      /* ← 这一行让它变成"窗口" */
  background: #0b0b0d;                        /* 3D 背景色，和页面底色分开 */
}
```

### 装法 C · 分层 canvas（最贵）

**代表：** landonorris.com —— 实测 **21 个 canvas**

它的做法：照片、视频、WebGL 元素各自一个 canvas，全部用同一套滚动进度驱动。

- ✅ 可以在同一页面里混用实拍照片和 3D，整体感极强
- ❌ 需要极强的编排能力（lando 有 117 处 scrollTrigger）
- ❌ 21 个 canvas = 21 个渲染上下文，必须严格按需激活

**不要一开始就做 C。** 先用 B 做出一页，再考虑扩到 C。

---

## 二、材质：质感的第一来源

### 实测参数

| 站 | roughness | metalness | 结论 |
|---|---|---|---|
| lando | **0.05** ×12 | **1** ×10 | 抛光金属（赛车/奖杯） |
| bruno | 1 | 1 | 卡通/纯色（配 Toon 材质） |
| locomotive | 1 | 1/0 | 同上 |

**规律：**

```
抛光金属      roughness 0.05 – 0.15, metalness 0.9 – 1.0
哑光塑料      roughness 0.35 – 0.55, metalness 0
陶瓷/搪瓷    roughness 0.15 – 0.25, metalness 0
磨砂玻璃      roughness 0.6 – 0.75, transmission 0.9
```

**最容易犯的错：`roughness: 0.5, metalness: 0.5`。** 这是"什么都没决定"的默认值，看起来像橡皮泥。

**要么很光滑（0.05–0.2），要么很粗糙（0.7–0.9）。中间值最廉价。**

### 光照：不要用点光源

```js
// ❌ 廉价：一个 DirectionalLight 打天下
scene.add(new THREE.DirectionalLight(0xffffff, 1));

// ✅ 真实：HDRI 环境贴图 + 一盏很弱的补光
const pmrem = new THREE.PMREMGenerator(renderer);
const env = await new THREE.RGBELoader().loadAsync('/hdri/studio.hdr');
scene.environment = pmrem.fromEquirectangular(env.texture).texture;
scene.add(new THREE.DirectionalLight(0xffffff, 0.3));   // 只做方向感
```

**为什么 HDRI 关键：** 金属材质的"贵"，几乎全部来自它反射了什么。没有环境贴图的金属，会是一块灰色塑料。免费 HDRI：`polyhaven.com`（CC0）。

### 色调映射

```js
renderer.toneMapping = THREE.ACESFilmicToneMapping;   // 电影感
renderer.toneMappingExposure = 0.9 – 1.2;
renderer.outputColorSpace = THREE.SRGBColorSpace;
```

不设的话，高光会"死白"，整体发灰。

---

## 三、相机：小位移，大 FOV

实测参考：

```
fov 35 – 55             小于 35 是长焦（压缩感），大于 60 会畸变
相机位移 z: 0 → -1        lando 的实测值，只有 1 个单位
阻尼 lerp 0.04 – 0.12    越小越"重"
```

**规律：3D 的高级感来自"镜头在缓慢地动"，不是"物体在飞"。**

```js
// 滚动驱动相机（lando 的真实写法）
gsap.fromTo(camGroup.position, { z: 0 }, {
  z: -1, ease: 'power1.inOut',
  scrollTrigger: {
    trigger: '[data-gl-track]',
    scrub: true,
    start: () => 'top top',
    end: () => `top+=${sizes.height} top`,   // 函数值，resize 后自动重算
  }
});
```

**别做：** 相机绕场景飞一圈、快速推拉、每屏切换机位。那会让用户晕，且暴露"这是特效"。

---

## 四、后处理：最多两种

实测 bloom 参数：

```
daybreak   radius 0.375（×5）
family     radius 0.5（×6）
waaark     strength 0.4
```

```js
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(
  new THREE.Vector2(w, h),
  0.4,    // strength  ← 0.3–0.6，超过 0.8 就"糊"
  0.4,    // radius
  0.85    // threshold ← 只让高光发光
);
composer.addPass(bloom);
```

**最多叠两种**（bloom + 一个）。叠三种以上必然掉帧且发灰。

---

## 五、DPR：必须限，实测只到 1.25–2.0

```js
// lando: 1.25 和 2 都用过（按设备）
// lusion: 1.5
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
```

**为什么不设 3/4：** Retina 上 `dpr = 2` 已是 4 倍像素量，`dpr = 3` 是 9 倍。视觉收益 < 5%，帧率掉一半。

---

## 六、Shader：六个实际用途

从 bundle 里能看到 shader 关键词的站：lando（472 次）、locomotive（232）、islands（262）、lusion、bruno、apple。

| 用途 | 干什么 | 典型代码 |
|---|---|---|
| **顶点位移** | 让平面起伏 / 波浪 / 呼吸 | `pos.z += sin(pos.x*3.0 + uTime) * 0.1` |
| **溶解 / 揭示** | 物体按噪声逐渐消失 | `if(noise(vUv) > uProgress) discard;` |
| **置换贴图** | 用图片高度让平面凸起 | `pos.z += texture2D(uHeight, uv).r * uAmount` |
| **扫描线** | 一道光从下往上扫过 | `float m = smoothstep(uScan-0.02, uScan, vUv.y);` |
| **流体/扭曲** | 背景像液体一样流动 | `uv += sin(uv*42.0 + uTime*0.72) * 0.006` |
| **边缘光** | 轮廓发光 | `pow(1.0 - dot(N, V), 3.0)` |

### 一个完整的顶点位移示例（可直接用）

```glsl
// vertex
uniform float uTime;
uniform float uAmp;
varying vec2 vUv;
void main(){
  vUv = uv;
  vec3 p = position;
  float w = sin(p.x * 2.4 + uTime * 0.8) * cos(p.y * 1.8 - uTime * 0.6);
  p.z += w * uAmp;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
```

```js
// js
const uniforms = { uTime: { value: 0 }, uAmp: { value: 0.12 } };
gsap.ticker.add(() => { uniforms.uTime.value += 0.016; });
```

**⚠️ 精度坑（我实际踩过）：** 片元着色器里新增的 `uniform float` 必须显式写 `highp`，否则和顶点着色器（默认 highp）精度不一致 → `Precisions of uniform differ` → **整个材质不渲染，白屏**。控制台只有一行警告。

```glsl
uniform highp float uProgress;   // ← 必须这样写
```

---

## 七、粒子：量级与正确姿势

```js
// 大小：别用 300/-z
gl_PointSize = clamp(uSize * uPx * (14.0 / max(0.001, -mvPosition.z)), 1.0, 6.0 * uPx);

// 透明度：加性混合下 2 万点必须 ≤ 0.35
float a = soft * 0.2;

// 混合模式
blending: THREE.AdditiveBlending    // 深底发光
blending: THREE.NormalBlending      // 白底/浅底（必须换，否则看不见！）
```

**数量参考：** 10k–50k 点用 `Points` 就够；超过 50k 用 `InstancedMesh`（可以带几何和材质）。

---

## 八、没有 3D 资产怎么办（大多数情况）

**不要硬做 3D。** 三种替代，成本依次递增：

### 替代 1 · CSS 3D（成本 1/20，效果 70%）

```css
.scene{ perspective: 1200px; }
.card{
  transform: rotateX(8deg) rotateY(-12deg) translateZ(0);
  transform-style: preserve-3d;
  will-change: transform;
}
```
配合指针倾斜（`pointermove` → `rotateY(x*6deg)`），已经有"3D 感"。

**适用：** 产品截图、卡片、UI mockup

### 替代 2 · 图片序列 + 滚动（成本 1/5，效果 85%）

```js
// 60 张图，滚动 0→1 映射到帧 0→59
const frame = Math.round(progress * 59);
img.src = `/seq/${String(frame).padStart(3,'0')}.webp`;
```
**适用：** 产品旋转展示（拍一圈照片）、爆炸图

### 替代 3 · 简单几何 + 好材质（成本 1/3，效果 95%）

用 `BoxGeometry` / `TorusKnotGeometry` / `IcosahedronGeometry` 这种基础体，配 HDRI + 正确 roughness。

lusion 的十字形就是三个 `CylinderGeometry` 拼的。**几何不是问题，材质才是。**

---

## 九、性能红线

| 红线 | 具体值 | 后果 |
|---|---|---|
| DPR | ≤ 1.75 | 超过掉一半帧率 |
| 后处理 pass | ≤ 2 | 超过发灰 + 掉帧 |
| 同屏 canvas | ≤ 3 | 每个 context 都要显存 |
| 每帧 draw call | ≤ 150 | 超过要考虑合并几何 |
| 阴影贴图 | 1024–2048 | 4096 在移动端直接崩 |
| shader 里的循环 | ≤ 8 次 | 超过要预计算 |
| 页面不可见时 | 必须暂停 | `visibilitychange` → 停 rAF |

```js
// 离开视口就停渲染（lando 这类站都做）
document.addEventListener('visibilitychange', () => {
  if (document.hidden) renderer.setAnimationLoop(null);
  else renderer.setAnimationLoop(render);
});
```

---

## 十、检查清单（做完对着看）

- [ ] 材质 `roughness` 不在 0.3–0.7 之间（要么光要么糙）
- [ ] 有 HDRI 环境贴图（不是只有 DirectionalLight）
- [ ] `toneMapping = ACESFilmic`，exposure 0.9–1.2
- [ ] DPR ≤ 1.75
- [ ] 后处理 ≤ 2 个 pass
- [ ] bloom strength 0.3–0.6
- [ ] 相机位移 ≤ 1 个单位，fov 35–55
- [ ] 页面隐藏时暂停渲染
- [ ] 3D 区域有明确的边界（容器/圆角/遮罩），不是无边界的全屏（除非刻意）
- [ ] 文字不在 canvas 里（可选中、可搜索）

---

*3D 参数来源：`data/webgl.json`（bundle 正则提取）。视觉参照：`shots/lusion-00.png`、`shots/bruno-00.png`。*

## 3.6 · 反模式清单：30 条 ★ 交付前必查

> 用法：把这份清单原样放进 skill，作为**强制条款**。
> 每条都是「错误做法 → 为什么错 → 正确做法（带数字）」。
> 模型的默认路径就是这 30 条的总和。删掉它们，剩下的才是设计。

---

## A 组 · 版式（最致命，占"AI 味"的一半）

**A1 · 三列等宽卡片网格**
为什么错：等宽等距 = 无主次 = 观众不知道该看哪。全站最典型的模板特征。
正确：用 **1px 全宽分隔线** 划分区域；需要并列时用**非对称列**（7:5 或 8:3），不要 1:1:1。

**A2 · 标题居中**
为什么错：居中构图没有方向感，也不产生张力。
正确：**左对齐、贴边距**（`padding-left: clamp(20px, 4vw, 64px)`）。若必须居中，只留一个，其余全部左对齐。

**A3 · 标题只比正文大 1.5–2 倍**
为什么错：这是"温吞的层级"，读起来像是把正文加粗了一下。
正确：最大字号 ÷ 正文字号 **≥ 4.0**，编辑型要 **6–8**，海报型 **12–20**。
实测：darkroom 20.0、ustwo 13.5、basement 7.25、abhishek 6.91、family 4.86、linear 4.27。

**A4 · 每个 section 都有一个大标题**
为什么错：全部强调 = 没有强调，页面变成一叠 PPT。
正确：**交替节奏**——大字 section 之后接一个"只有一行小字注释 + 大量留白"的 section。全页大标题不超过 4 个。

**A5 · 间距均匀（每段 64px）**
为什么错：均匀间距没有呼吸，读者不知道哪里该停。
正确：用 **4 档间距**，并且必须跨档使用：`24 / 64 / 140 / 280 px`（140 用于 section 之间，280 用于"换章"）。

**A6 · 内容塞在 1200px 居中容器里**
为什么错：容器一居中，四周留白就都成了"均等的空白"，页面失去边缘张力。
正确：**贴边或单侧偏置**。要么全宽 + 内边距，要么 12 栏网格里只占 1–9 栏，右边空着。

**A7 · 全站圆角 16px**
为什么错：16px 圆角是"Bootstrap 之后最常见的默认值"，一眼可辨。
正确：只有两种合法值——**硬边 0–4px**（编辑/工业）或 **pill 9999px**（按钮）。中间态只用在一个地方：浮层。

**A8 · 每个卡片都有 box-shadow**
为什么错：阴影是"浮起来"的语义，全站都浮 = 都不浮。
正确：15 个站里 **15 个几乎不用 box-shadow**（实测：shadow 非空的有 7 个，其余全为空）。用 1px 边框或背景明度差分层。

**A9 · 卡片 hover 抬升 + 阴影加深**
为什么错：这是最常见的"假交互"，看起来像 Bootstrap 模板。
正确：hover 只改 **文字颜色** 或 **图片轻微 scale 1.03**，位移不超过 2px，时长 150–200ms。

---

## B 组 · 色彩（第二致命）

**B1 · 紫色/蓝色渐变背景**
为什么错：这是"AI 生成"的最强视觉指纹。
正确：**单一实色底**（黑 / 白 / 米 / 深墨）。要氛围就加一层 3–6% 的径向光斑，不要渐变过渡。

**B2 · 三个以上强调色**
为什么错：色彩越多，越像后台管理面板。
正确：**非中性色 ≤ 2 个**。实测 13 个站是 0–1 个强调色。

**B3 · 渐变文字 / 彩色描边标题**
为什么错：把"渐变"当装饰，是 2023 年后最泛滥的做法。
正确：标题纯色。要强调就**换字体样式**（衬线斜体）或**换一个字**的颜色。

**B4 · 玻璃拟态到处都是**
为什么错：半透明叠半透明，对比度全线崩塌，可读性变差。
正确：一个页面最多 **2 处**玻璃（导航 + 一个浮层）。其余用实色。

**B5 · 灰字用 #666 / #999**
为什么错：这是默认灰，和背景的关系没有设计过。
正确：从背景色推导——黑底用 `rgba(255,255,255,.62)`，白底用 `rgba(20,33,61,.58)`。

---

## C 组 · 字体（决定"贵"的 40%）

**C1 · 全站一个 Inter**
为什么错：无对比 = 无性格。Inter 本身没问题，问题是"只有它"。
正确：**两族制**——display 用衬线（Iowan / Times / 思源宋体）或 condensed grotesk；body 用 grotesk；标签用 mono。实测一半以上的好站是两族或三族。

**C2 · 字距用默认值**
为什么错：大字号下默认字距会显得松垮，小标签下会显得挤。
正确：大标题 `letter-spacing: -0.03em ~ -0.05em`；小标签 `+0.15em ~ +0.25em`（并且全大写）。实测：-0.02 / -0.04 / -0.05 / -0.06 都出现过。

**C3 · 所有文字行高 1.5**
为什么错：大标题 1.5 会散架，标签 1.5 会飘。
正确：display `0.88–1.05`；正文 `1.5–1.65`；标签 `1.0–1.2`。

**C4 · 不用等宽字体**
为什么错：数字和标签失去"技术感"的对齐。
正确：所有序号、时间、参数、eyebrow 用 mono，并配 `letter-spacing: 0.18em`。

**C5 · 中文用系统默认黑体**
为什么错：PingFang 在屏幕上偏软，撑不起大标题。
正确：中文标题用**宋体**（Songti SC / 思源宋体）承接编辑感；或与英文同一族的黑体（思源黑体）但加大字重到 700。

**C6 · 字号只用 3 档（12/16/24）**
为什么错：层级太少，页面平。
正确：**5–7 档**，且跨度大：`11 / 14 / 18 / 28 / 44 / 72 / 120`。

---

## D 组 · 文案（AI 味最容易被察觉的地方）

**D1 · Lorem ipsum / "这里是标题"**
正确：**写真实文案**。哪怕是假的业务，也要写成能读的句子。

**D2 · "Revolutionize your workflow" 式空话**
为什么错：没有任何信息量，读者读完不知道你做什么。
正确：**具体动词 + 具体数字**。"3 层拆解 / 42 篇样本 / 8 秒出结果"。

**D3 · 每段都三行长**
正确：段落长度要有**长短变化**：一行、三行、一行。视觉上才有节奏。

**D4 · 用 emoji 当图标**
为什么错：emoji 的渲染依平台而变，且破坏了整体的字体系统。
正确：几何 SVG（细线 1px）+ 不用填充色。

**D5 · 数字都用 99.9% / 10x / 100+**
正确：用"不好看但真实"的数字：3 / 42 / 8s / 1。实测：lando 用 23 个年份标签，basement 用 "Showcase 20"、"Blog 129" 这种上标数字。

---

## E 组 · 动效（你最容易过度的地方）

**E1 · 所有元素都是 `fade + y:40`**
为什么错：这是"一种动效用在全站"，看两屏就腻。
正确：**至少三种入场手法**交替：遮罩掀字（`clip` 或 `overflow:hidden` + `yPercent`）、缩放淡入、模糊聚焦（`filter: blur(12px)→0`）。

**E2 · 所有动画同时开始**
正确：分层延迟 `0 / 80 / 160ms`（块级），`0 / 35 / 70ms`（逐字）。实测：80ms 是这些站的共同选择。

**E3 · 用默认 `ease`**
正确：进场 `power3.out` 或 `expo.out`；进退/原位 `power2.inOut`；**所有滚动驱动的位移必须 `none`**。

**E4 · 卡片 stagger 200ms**
为什么错：超过 120ms 就从"一起出现"变成"排队"，用户要等。
正确：卡片 `60–90ms`，逐字 `25–40ms`。

**E5 · 每个元素都有动效**
正确：**一个页面只有一个主角**。其余元素只做 12–20px 的位移，或者干脆不动。

**E6 · 横向滚动用 `pin: true`**
为什么错：pin 会插 spacer，窗口尺寸变化时错位。
正确：`position: sticky` + `x: () => -dist` + `scrub: 1` + `invalidateOnRefresh: true`。实测：28 个站的 `pin` 出现 **0 次**。

**E7 · hover 过渡 300ms**
正确：`150–200ms`。超过 250ms 会感觉"迟钝"。

**E8 · 滚动动画用数字 scrub（`scrub: 0.5`）到处用**
正确：分三级——**主位移 `scrub: 1`（有重量）/ 装饰视差 `scrub: true`（立即）/ 跑马灯 `scrub: 0`**。

**E9 · 进场动画结束后画面完全静止**
正确：留一个无限循环（自转 / 呼吸 / 光标跟随 / 粒子漂移）。静止 = 死。

---

## F 组 · 结构

**F1 · 首屏堆 8 个以上元素**（kicker + h1 + h2 + 副标 + 两个按钮 + 三个标签 + 滚动提示）
正确：首屏可见文字块 **≤ 6**，且必须有"一个大东西"占主导（标题或视觉），其余是它的注释。

**F2 · 每个 section 结构雷同**（kicker + h2 + 副标 + 卡片）
正确：**每个 section 用不同的布局骨架**：左右分栏 / 全宽图 / 只有文字 / 只有图 / 数据带。

**F3 · 没有签名动作**
为什么错：页面"什么都不缺，但没有一个能记住的东西"。
正确：必须有一个**只属于这个页面的动作**——一个形变、一个扫描线、一个光标行为、一个特殊的过渡。一个就够。

---

## 怎么用这 30 条

放进 skill 时，写成**禁令**，而不是建议：

```
禁止：
- 三列等宽卡片网格
- 标题居中
- 渐变背景
- 超过 2 个强调色
- 全站单一 Inter
- fade + y:40 用在全站
- pin:true 做横向
- stagger > 120ms
```

模型对"禁止"的遵守率，远高于对"建议"的遵守率。这是实测经验，不是修辞。

---

*这份清单的每一条都有实测支撑，数据见 `data/type.json` 与 `data/snippets.json`。*

## 3.7 · 施工手册（从需求到成品的 SOP）

> 这份是 SOP，不是参考。按顺序做，不要跳。
> 跳步的地方我标了 ⚠️，那都是"跳了必翻车"的点。

---

## Step 0 · 收需求：先问三个问题

在写代码之前，必须从用户那里拿到（或自己判断出）三件事：

```
1. 这个页面要人记住什么？（一个具体的东西，不是"我们的品牌"）
2. 有没有 3D 资产 / 实拍素材 / 产品截图？（决定能不能做 Immersive）
3. 主要动作是什么？（点按钮 / 留邮箱 / 只是看完）
```

**如果用户只给了"做一个高级的网站"，先自己回答这三问，并在输出开头声明你的假设。** 不要反复追问——先做，再让他改。

⚠️ **不要问"你喜欢什么风格"。** 用户答不出，且答案没有施工价值。

---

## Step 1 · 定制度（5 分钟，决定后面全部）

查 `01-taxonomy.md` 的判定树。结论写一行：

> 制度：Editorial ｜ 依据：品牌叙事页，无 3D 资产，目标是让人记住

**三选一的硬边界：**

| 情况 | 制度 | 不要做什么 |
|---|---|---|
| 品牌/个人/作品集/发布会 | Editorial | 不要做卡片网格 |
| 有 3D 资产，要展示空间 | Immersive | 不要把文字放 canvas 里 |
| 产品功能/定价/转化 | Product | 不要上 ScrollTrigger |

⚠️ **Product 与另外两种不能混。** 产品页做成海报会掉转化，这是最容易被"审美冲动"带偏的地方。

---

## Step 2 · 复制基线（不许新建空白文件）

```bash
cp baseline/editorial/index.html ./index.html
```

然后**只做三件事**：删掉不需要的 section、把占位内容换成真实内容、改配色 token。

⚠️ **不要重写结构。** 基线的价值就是它的结构（贴边、1px 分隔线、非对称列、sticky 横向）。你一旦"重新组织一下"，就会退回你熟悉的卡片网格。

---

## Step 3 · 排版（这一版必须完全没有动效）

**这是最关键的一步，也是最容易被跳过的一步。**

把 JS 全部注释掉，只看静态页面。逐条核对：

```
□ 遮住 logo，这个页面还像"某个特定品牌"吗？还是像任何一个模板？
□ 字号比（最大÷正文）≥ 4.0？编辑型 ≥ 5？
□ 全站非中性色 ≤ 2 个？
□ 大标题字重 ≤ 600？字距 ≤ -0.02em？
□ 有没有至少一处"刻意的空白"（一片什么都没放的地方）？
□ 每个 section 的结构都一样吗？（一样 = 不合格）
□ 遮住所有文字，光看色块和线的排布，构图成立吗？
```

⚠️ **如果静态版不好看，加动效只会让它"动起来的丑"。** 这是 90% 失败案例的真实原因。

**这一步的验收方式**：截图 → 转成灰度 → 还能看出层次吗？能，说明结构对；不能，说明你在靠颜色撑，重做。

---

## Step 4 · 加动效（按优先级，不要一次全加）

顺序固定：

```
① 遮罩掀字（首屏标题）        —— 性价比最高
② 区块进入（IntersectionObserver 或 batch）
③ 图片/图版揭示（clip 或 scaleY）
④ 横向轨道（如果内容够长）
⑤ 磁性 / 指针跟随（如果只剩这一个没做）
```

**每加一层就截一次图，对比上一版。** 如果看不出差别，说明这层白加了，删掉。

⚠️ **动效总数控制**：

| 制度 | 滚动配置数 | 缓动调用数 |
|---|---:|---:|
| Editorial | 内容块数 × 1.5 | 不限（但要复用） |
| Immersive | ≤ 5（文字层） | ≤ 30 |
| Product | ≤ 3 | **0（全 CSS）** |

数字来自 28 站实测。lando 有 117 个滚动配置，因为它是 12 个 section、21 个 canvas 的叙事页。你的 5 个 section 的产品页有 20 个，就是过度。

---

## Step 5 · 只加一个签名动作

签名动作 = **一个只属于这个页面的、能被人记住的动作**。

它不是特效，是"内容的物理形态"。判断标准：

```
✓ 它和内容有关（不是通用的"粒子背景"）
✓ 你关掉它，页面会"变得普通"
✓ 一个页面只有一个
```

四个可直接用的方向：

| 方向 | 例子 | 实现成本 |
|---|---|---|
| **材质的转换** | 光标擦开表面，露出同一个物体的另一面 | 中（mask + 两层） |
| **形式的形变** | 散乱粒子 → 轨道 → 核心（内容即"检索"） | 高（WebGL） |
| **文字的机械** | 逐字升起，且从最后一个字往回 | 低（SplitText 或手写） |
| **尺度的跳跃** | 一个词从 14px 瞬间撑满全屏，再收回 | 中（transform + clip） |

⚠️ **不要做"粒子背景 + 光标跟随 + 渐变光晕"三件套。** 那是最容易被识别为 AI 生成的三件套。

---

## Step 6 · 验收（不许跳过）

```bash
node scripts/verify.mjs index.html
```

11 项自测 + 1 项人工。不过就改，改完再跑。

常见不过项与改法见 `07-verification.md`。

---

## 七、四个典型需求的完整路径

### 需求 A：「做一个像 landonorris 那样的品牌页」

```
制度：Editorial
基线：baseline/editorial
关键改动：
  1. 首屏标题改成 2–3 行短句，最后一行用衬线斜体 + 强调色
  2. 图版换成真实照片（不是抽象图形），高度错落
  3. 项目列表用 1px 分隔线 + 编号 + hover 预览
  4. 加一个深色 section + 横向轨道
  5. 签名动作：图片的 clip-path 揭示（从下往上）
不要做：全屏 3D（除非有真资产）
```

### 需求 B：「产品落地页，要高级但别太花」

```
制度：Product
基线：baseline/product
关键改动：
  1. 字号比 4.0–4.5，字重 500–600
  2. 柔阴影 + 12px 圆角 + pill 按钮
  3. 动效只用 CSS：进入 450ms / hover 180ms
  4. 一个深色 section 做节奏对比
  5. 签名动作：产品窗口的轻微悬浮 + 内部数据条生长
不要做：ScrollTrigger、全屏 canvas、深色主调
```

### 需求 C：「要 3D，很炸」

```
制度：Immersive
基线：baseline/immersive
关键改动：
  1. 三个基础几何 + 程序化 envMap（不要外链 HDR）
  2. 相机只推近 1–1.4 个单位，fov 42
  3. 文字压左侧，canvas 右侧或全屏
  4. DPR ≤ 1.75，后处理 ≤ 2 pass
  5. 签名动作：材质随滚动从粗糙变镜面（或反过来的"成形"）
不要做：相机飞行、每屏换机位、50k+ 粒子
```

### 需求 D：「内容很多，要横向叙事」

```
制度：Editorial（横向是它的子能力）
基线：baseline/editorial 的 .ht 段
关键改动：
  1. sticky + x:()=>-dist() + scrub:1
  2. 外层高度 = 距离 + 一屏
  3. 轨道内每张图用 containerAnimation + set 做二级视差
  4. 卡片宽度 46–64vw（一屏看到 1.5–2 个）
不要做：pin:true（28 站实测 0 次）
```

---

## 八、五条经验（都是踩过的）

**1. 先做灰度版，再加颜色。**
颜色会掩盖构图问题。灰度下成立的构图，上色后一定成立；反之不成立。

**2. 中文大标题要先测宽度，再定字号。**
英文按字符数估算不准。中文一个字 ≈ 1em，`clamp(48px, 6vw, 96px)` 在 1440 下是 86px，一行只能放 11 个字。超出就手动 `<br>`，不要指望自动换行好看。

**3. 动效加完如果"变慢了"，先怀疑 `will-change` 太多。**
每个 `will-change: transform` 都会新建一个合成层。20 个层会吃光显存。

**4. 图片没有时，用 CSS/SVG 生成抽象构成，不要用占位图。**
灰色方块 + "image" 字样的占位图会毁掉整个版式判断。生成 6 种不同的几何构成（同心圆/点阵/斜线/包豪斯/竖条/放射），零外链且风格统一。

**5. 改完立刻截图，不要靠"感觉"。**
`shots/` 里存的是证据。三轮之后你已经记不清第一版长什么样了。

---

## 九、交付前最后一眼

```
□ 用自己的手机打开一次（不是浏览器模拟）
□ 关掉网络打开一次（看 CDN 挂了会怎样）
□ 用 Tab 键走一遍（焦点可见吗）
□ 系统开"减弱动态效果"再打开（有没有东西卡住不动）
□ 把页面缩到 80% 和 125%（有没有错位）
```

## 3.8 · 验收：12 项判据与逐项改法

> 用法：`node scripts/verify.mjs <你的页面>`
> 它会输出 11 个数字判据 + 1 个人工项。全部通过才算完成。

---

## 为什么需要这个

你说"不管怎么调都没用"，前提是你能测出"改之前"和"改之后"的差别。

只看"感觉"的话，每一次改动都是随机的：你无法知道是参数不对、还是结构不对、还是本来就没问题。**只能一直试。**

把感觉换成 11 个数字，你才知道该改哪一行。

---

## 12 项判据与判定线

| # | 判据 | 及格线 | 为什么是这条线 |
|---|---|---|---|
| 1 | 控制台报错 | **0 个** | 有报错说明某个动效根本没跑，你看到的是降级版 |
| 2 | 字号比（最大÷正文） | **≥ 4.0**（编辑型 ≥ 5） | 实测产品型 4.0–5.1、编辑型 5.4–18；低于 3 是"温吞的层级" |
| 3 | 非中性色数量 | **≤ 2** | 22 个站里 13 个是 0–1 个 |
| 4 | 大标题字重 | **≤ 600** | 700 以上只占实测的 9%，重字重显廉价 |
| 5 | 大标题字距 | **≤ −0.02em** | 实测 −0.01 到 −0.06，`normal` 等于没设计 |
| 6 | 字号档数 | **≥ 5**（理想 6–9） | 只有 3 档（12/16/24）页面一定平 |
| 7 | 滚动驱动元素 | **≥ 4**（编辑型 ≥ 8） | 少于 4 说明你在"一屏一屏翻页"，不是滚动叙事 |
| 8 | 时长档位 | **1–6 种**（理想 3） | 超过 6 种说明没有节奏制度，各写各的 |
| 9 | reduced-motion | **生效** | 不是可选项，是可达性要求 |
| 10 | 移动端 390px 溢出 | **scrollWidth ≤ clientWidth** | 1px 溢出就会让整页能左右拖，手感直接崩 |
| 11 | 滚动中帧耗时 p95 | **≤ 20ms** | 超过就会在低端机上明显卡顿 |
| 12 | 签名动作 | **人工确认** | 一个只属于这个页面的、关掉会变普通的动作 |

---

## 每项不过时怎么改

### 1 · 控制台报错

按报错顺序逐个修，不要一次改多处。常见：

```
"Cannot read properties of null"   → 选择器找不到元素（多半是你删了 DOM 没删 JS）
"Precisions of uniform differ"     → 片元里加 `highp`
"THREE is not defined"             → CDN 挂了，或脚本顺序错
```

### 2 · 字号比不够

不要"把标题调大"，要**同时**调：

```css
--t-display: clamp(56px, 7.4vw, 110px);   /* 放大 */
--t-body: 16px;                            /* 保持 */
/* 或者把正文调小到 14–15px —— 这更常见 */
```

正文调到 15px 往往比标题调到 120px 更有效，因为屏幕宽度是固定的。

### 3 · 强调色太多

按这个顺序砍：

```
1. 删掉所有"装饰性"的彩色（渐变球、光晕、彩色阴影）
2. 主色和强调色只留一个
3. 状态色（成功/警告）保留，但只用在小面积（点、标签）
```

### 4 · 字重太重

```
h1, h2  →  weight 500 或 600（不是 700/800）
body    →  400
label   →  500（mono）
```

如果用 Variable 字体，可以试 450 / 510 这种半档，比 400 和 500 都更"准"。

### 5 · 字距没设

```css
.display{ letter-spacing: -0.045em; }   /* ≥32px 才用负值 */
.label  { letter-spacing: 0.18em; }     /* 小标签用正值 + 全大写 */
```

### 6 · 字号档数不够

补中间档。7 档模板：

```
96–110 / 56–64 / 32–38 / 20–22 / 16 / 13–14 / 10–11
```

不要"均匀分布"（16/24/32/40），要"跨度大、中间密"。

### 7 · 滚动驱动元素太少

说明你的页面是"进入视口 → 播一次"。加这三类：

```
① 图片揭示：clip-path 或 scaleY，scrub 0.6
② 视差：yPercent ±6，scrub true
③ 文字位移：yPercent ±10，scrub true
```

⚠️ 别加"每个 section 都 fade up"——那不算滚动驱动，那是进入动画重复 8 次。

### 8 · 时长档位太多

收敛到 3 档：

```
180ms  微交互（hover / 按下 / 边框）
450ms  区块进场
620ms  主进场 / 遮罩
```

全部用 CSS 变量，不许在声明里写字面值。

### 9 · reduced-motion 没生效

```css
@media (prefers-reduced-motion: reduce){
  *,*::before,*::after{
    animation-duration:.01ms!important;
    animation-iteration-count:1!important;
    transition-duration:.01ms!important;
    scroll-behavior:auto!important;
  }
}
```

⚠️ 全局兜底只能压 CSS。**JS 驱动的（GSAP / rAF / canvas）必须自己判断**：

```js
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduced) { /* 直接设终态，不建 timeline */ }
```

### 10 · 移动端溢出

最常见三个原因：

```
① 某个元素 width: 100vw（含滚动条宽度）
② 横向轨道的 track 没有 overflow hidden 的父级
③ 大标题 + 负字距 + 不换行
```

调试一行：

```js
[...document.querySelectorAll('*')]
  .filter(el => el.getBoundingClientRect().right > innerWidth + 1)
  .forEach(el => console.log(el, el.getBoundingClientRect().right));
```

### 11 · 帧耗时超标

按这个顺序排查：

```
1. onUpdate 里用了 gsap.to（改成 set）
2. 动画了 width / height / top / left（改成 transform）
3. will-change 超过 10 个
4. DPR 没限（限到 1.75）
5. canvas 数量 > 3
6. 大面积 filter: blur 在动
```

### 12 · 签名动作（人工）

问自己一个问题：

> **把这个动作换成"淡入"，页面会变差吗？**

如果不会 → 那不是签名动作，删掉。
如果会 → 它必须和内容有关（不是随便找了个特效）。

---

## 一份合格的输出长什么样

`baseline/` 里三套都是 11/11：

```
✓ 1  控制台零报错        0 个错误
✓ 2  字号比 ≥ 4.0       143 / 13 = 11
✓ 3  非中性色 ≤ 2        1 个 rgb(255, 61, 0)
✓ 4  大标题字重 ≤ 600    w400
✓ 5  大标题字距 ≤ -0.02em -0.0449em
✓ 6  字号档数 ≥ 5        12 档
✓ 7  滚动驱动 ≥ 4        4 个元素
✓ 8  时长档位 1–6        3 种 180ms 450ms 620ms
✓ 9  reduced-motion 生效 已降级
✓ 10 移动端无横向溢出    scrollWidth 390 / client 390
✓ 11 帧耗时 p95 ≤ 20ms   median 16.7ms / p95 17.4ms
○ 12 签名动作（人工）    需人工确认
```

**注意**：`11/11` 不代表"好看"，只代表"没犯那 11 个可测的错"。第 12 项才是审美，它测不出来。

---

## 建议的工作循环

```
改一处  →  跑 verify  →  看哪项变了  →  截图对比  →  再改一处
```

**一次只改一处。** 改三处然后跑一次，你无法归因。

---

*脚本：`scripts/verify.mjs`。判据的实测依据：`docs/02-aesthetic-fingerprint.md`。*

---
# 第 4 部分 · 真实配置片段（从线上 bundle 抽出）

这些是从真实站点 min 化后的 JS 里抽出来的。变量名被压缩了，但**对象键没变**
（`scrub` / `start` / `containerAnimation` 都还在），所以配置是可信的。
读它们的目的是让模型知道"别人具体怎么写"，而不是凭记忆编。


## 4.1 · lando.txt

landonorris.com — 5.5MB bundle。479 处缓动、117 处 scrub、0 处 pin。重点看：`containerAnimation` 做横向二级视差、`onUpdate` 里用 `set` 不用 `to`、相机 `fromTo(z:0→-1)` 配 `scrub:true`。

```text
# lando — https://landonorris.com
# bundle 5553794 bytes

ease 分布: {'power2.out': 144, 'none': 72, 'power2.inOut': 62, 'expo.inOut': 48, 'power1.inOut': 44, 'power3.out': 40, 'expo.in': 20, 'expo.out': 20, 'power2.in': 17, 'power1.in': 12}
scrub 分布: {'!0': 105, '0.5': 4, '1': 4, '0': 4}
start 分布: {'top bottom': 52, 'top 90%': 28, 'top 95%': 8, 'top top': 8, 'top 80%': 4, 'left right': 4, 'left 95%': 4, '0% 100%': 4}
pin:true 出现 0 次

===== scrollTrigger: =====
000;setTimeout(()=>Q.pause(),50)},onEnterBack:()=>{Q.play()},onLeaveBack:()=>{if(I)I.value=0;setTimeout(()=>Q.pause(),50)}});if(A.riveScrollControl={timeline:U,scrollTrigger:G},window.lenis){let H=()=>{if(G.isActive){let Z=window.lenis.velocity||0;if(Math.abs(Z)>100){if(Z<0&&G.progress<0.1){if(I)I.value=0}else if(Z>0&&G.progress>0.9){if(I)I.value=1000}}}};window.lenis.on("scroll",H),A.lenisScrollHandler=H}

sition.y=0,this.helmet.wireframeMesh.position.y=0}transition(){m.registerPlugin(TA),m.fromTo(this.cameraTransformGroup.position,{z:0},{z:-1,ease:"power1.inOut",scrollTrigger:{trigger:'[data-gl-track="head"]',scrub:!0,start:()=>"top top",end:()=>`top+=${this.gl.sizes.height} top`}

op",end:()=>`top+=${this.gl.sizes.height} top`}}),m.fromTo(this.renderPlane.mesh.material.uniforms.uFilter,{value:0},{value:1,duration:0.25,ease:"power1.inOut",scrollTrigger:{trigger:'[data-gl-track="head"]',scrub:!0,start:()=>"top top",end:()=>`top+=${this.gl.sizes.height} top`}

===== ScrollTrigger.create( =====
","_last",Q._sort?"_start":0),fZ(B)||(Q._recent=B),I||kD(Q,B),Q._ts<0&&E6(Q,Q._tTime),Q},wD=function A(Q,B){return(PE.ScrollTrigger||Q6("scrollTrigger",B))&&PE.ScrollTrigger.create(B,Q)},PD=function A(Q,B,E,I,C){if(Q7(Q,B,C),!Q._initted)return 1;if(!E&&Q._pt&&!j0&&(Q._dur&&Q.vars.lazy!==!1||!Q._dur&&Q.vars.lazy)&&OD!==RE.frame)return wC.push(Q),Q._lazy=[C,I],1}

","_last",Q._sort?"_start":0),mF(Z)||(Q._recent=Z),K||xR(Q,Z),Q._ts<0&&Uq(Q,Q._tTime),Q},_R=function J(Q,Z){return(ZQ.ScrollTrigger||Wq("scrollTrigger",Z))&&ZQ.ScrollTrigger.create(Z,Q)},yR=function J(Q,Z,$,K,W){if(qO(Q,Z,W),!Q._initted)return 1;if(!$&&Q._pt&&!r9&&(Q._dur&&Q.vars.lazy!==!1||!Q._dur&&Q.vars.lazy)&&wR!==v7.frame)return n$.push(Q),Q._lazy=[W,K],1}

===== containerAnimation: =====
scrub:1,invalidateOnRefresh:!0,onEnter:U}});ML.set(Q,G),I.forEach((H)=>{let Z=H.closest(".horizontal-item-w");if(!Z)return;m.timeline({scrollTrigger:{trigger:Z,containerAnimation:G,start:"left right",end:"right left",scrub:!0,onUpdate:(q)=>{let W=4*q.progress;m.set(H,{x:`${W}rem`})}

r2.inOut"},R+I/2)});let Y=U.closest(".horizontal-item-w")||U;if(Z)TA.create({trigger:Y,start:"top 90%",once:!0,onEnter:()=>q.play()});else TA.create({trigger:Y,containerAnimation:E,start:"left 95%",once:!0,onEnter:()=>q.play()})})}function Z8(){if(window.innerWidth>=992)I_(),C_()}

crub:1,invalidateOnRefresh:!0,onEnter:q}});UP.set(Q,G),K.forEach((X)=>{let Y=X.closest(".horizontal-item-w");if(!Y)return;W0.timeline({scrollTrigger:{trigger:Y,containerAnimation:G,start:"left right",end:"right left",scrub:!0,onUpdate:(O)=>{let B=4*O.progress;W0.set(X,{x:`${B}rem`})}

===== scrub: =====
(){if(I){let H=m.utils.clamp(0,1,this.progress());I.value=H*1000}}});U.to({},{duration:1});let G=TA.create({trigger:B,start:K||"top bottom",end:J||"bottom top",scrub:0.5,markers:!1,onUpdate:(H)=>{if(U.progress(H.progress),!Q.isPlaying)Q.play()}

0}transition(){m.registerPlugin(TA),m.fromTo(this.cameraTransformGroup.position,{z:0},{z:-1,ease:"power1.inOut",scrollTrigger:{trigger:'[data-gl-track="head"]',scrub:!0,start:()=>"top top",end:()=>`top+=${this.gl.sizes.height}

),m.fromTo(this.renderPlane.mesh.material.uniforms.uFilter,{value:0},{value:1,duration:0.25,ease:"power1.inOut",scrollTrigger:{trigger:'[data-gl-track="head"]',scrub:!0,start:()=>"top top",end:()=>`top+=${this.gl.sizes.height}

===== ease: =====
H);U=U._next}return K},B.tweenTo=function E(I,C){C=C||{};var K=this,J=gE(K,I),U=C,G=U.startAt,H=U.onStart,Z=U.onStartParams,q=U.immediateRender,Y,W=eB.to(K,NE({ease:C.ease||"none",lazy:!1,immediateRender:!1,time:J,overwrite:"auto",duration:C.duration||Math.abs((J-(G&&"time"in G?G.time:K._time))/K.timeScale())||MB,onStart:function $(){if(K.pause(),!Y){var D=C.duration||Math.abs((J-(G&&"time"in G?G.time:K._time))/K.timeScale());W._dur!==D&&NK(W,D,0,1).render(W._time,!0,!0),Y=1}H&&H.apply(W,Z||[])}

===1&&L.delay)J._delay=H=L.delay,J._start+=H,L.delay=0;F.to(V,L,O?O(P,V,X):0),F._ease=aQ.none}F.duration()?G=H=0:J.timeline=0}else if(W){lJ(NE(F.vars.defaults,{ease:"none
…（原文更长，完整版在文件夹版的 data/ 里）
```


## 4.2 · terminal.txt

terminal-industries.com — 41 处缓动。重点看：`toggleActions: play none none reverse`（进出场可逆）、`stagger:{each:.04, from:'end'}`（从末字往回错开）、`expo.inOut` 主导。

```text
# terminal — https://terminal-industries.com
# bundle 821101 bytes

ease 分布: {'expo.inOut': 10, 'custom.fastInOut': 6, 'expo.out': 6, 'power2.out': 5, 'power1.in': 4, 'power1.out': 3, 'power1.inOut': 3, 'power2.inOut': 2, 'none': 1, 'expo': 1}
scrub 分布: {'!0': 2}
start 分布: {'top bottom': 3, 'top 85%': 1}
pin:true 出现 0 次

===== scrollTrigger: =====
eturn;const r=x(e.scrollTriggerContainer())??o;C(()=>{if(d()){if(s=N.create(o,{type:"chars, lines",charsClass:"--char",linesClass:"--line"}),t=f.gsap.timeline({scrollTrigger:{trigger:r,start:"top 85%",end:"bottom 20%",toggleActions:"play none none reverse"}

===== ScrollTrigger.create( =====
first","_last",a._sort?"_start":0),dt(c)||(a._recent=c),g||U(a,c),a._ts<0&&R(a,a._tTime),a},ie=function(a,c){return(vt.ScrollTrigger||Z("scrollTrigger",c))&&vt.ScrollTrigger.create(c,a)},de=function(a,c,d,g,b){if(fa(a,c,b),!a._initted)return 1;if(!d&&a._pt&&!l&&(a._dur&&a.vars.lazy!==!1||!a._dur&&a.vars.lazy)&&Pe!==Ln.frame)return me.push(a),a._lazy=[b,g],1}

===== scrub: =====
()=>{p.value&&f.value&&(f.value.style.height=p.value.offsetHeight*.8+"px",H.refresh())}),L1(a=>{var s;(s=a.conditions)!=null&&s.isLg&&H.create({trigger:f.value,scrub:!0,start:"top bottom",end:"bottom bottom",onUpdate:({progress:r}

&B.value&&(p.value.style.transform=`translate3d(0, ${b1.Lerp(100,1,r)}%, 0)`,B.value.style.opacity=`${b1.Lerp(0,.4,r)}`)}})}),A1(()=>{H.create({trigger:f.value,scrub:!0,start:"top bottom",end:"top top",onUpdate:({progress:a}

===== ease: =====
ody;for(;c&&c.parentElement;){const x=c.parentElement;for(const $ of x.children)$!==c&&$.nodeType===1&&!$.inert&&($.inert=!0,t.push($));if(x===f)break;c=x}},release:n}}},5996(p,g,o){o.d(g,{d:()=>y});const v=r=>!!r&&typeof r=="object"&&r.inputPrompt===""&&!("_webmcpCallId"in r),y=(r,i,s)=>{if(!v(i))return s();const b=JSON.stringify(i),h=r.get(b);if(h)return h;const w=s();return r.set(b,w),w.then(()=>r.delete(b)),w}}

Y),V=V._next;return C},c.tweenTo=function(g,b){b=b||{};var C=this,P=X(C,g),V=b,q=V.startAt,Y=V.onStart,xe=V.onStartParams,Fe=V.immediateRender,je,ot=qr.to(C,J({ease:b.ease||"none",lazy:!1,immediateRender:!1,time:P,overwrite:"auto",duration:b.duration||Math.abs((P-(q&&"time"in q?q.time:C._time))/C.timeScale())||p,onStart:function(){if(C.pause(),!je){var ut=b.duration||Math.abs((P-(q&&"time"in q?q.time:C._time))/C.timeScale());ot._dur!==ut&&A(ot,ut,0,1).render(ot._time,!0,!0),je=1}Y&&Y.apply(ot,xe||[])}

P._delay=Y=Yt.delay,P._start+=Y,Yt.delay=0),Nt.to(Bt,Yt,sr?sr(Ct,Bt,$t):0),Nt._ease=En.none;Nt.duration()?q=Y=0:P.timeline=0}else if(ot){Se(J(Nt.vars.defaults,{ease:"none"})),Nt._ease=Js(ot.ease||g.ease||"none");var Cr=0,Sr,$i,Ai;if(ge(ot))ot.forEach(function(hi){return Nt.to($t,hi,">")}

===== stagger: =====
artAt=qr.set(ut,J({data:"isStart",overwrite:!1,parent:Pt,immediateRender:!0,lazy:!ve&&L(V),startAt:null,delay:0,onUpdate:q&&function(){return hr(a,"onUpdate")},stagger:0},C))),a._startAt._dp=0,a._startAt._sat=a,c<0&&(l||!P&&!je)&&a._startAt.revert(tt),P&&ot&&c<=0&&d<=0){c&&(a._zTime=c);return}

alue,{scale:0,transformOrigin:"top right"},{scale:1,ease:"expo.inOut",duration:1.2},"<"),v.fromTo(u.value,{yPercent:100},{yPercent:0,ease:"expo.out",duration:1,stagger:{each:.04,from:"end"}

cent:100},{yPercent:0,ease:"expo.out",duration:1,stagger:{each:.04,from:"end"}},"<0.4"),v.fromTo(l.value,{yPercent:-100},{yPercent:0,ease:"expo.out",duration:1,stagger:{each:.04,from:"end"}

===== timeline({ =====
,ke=de.yoyo,fe=de.toggleClass,Ye=de.nested,we=de.zIndex,Ze=de.scale,it=de.fade,pt=de.stagger,_t=de.spin,qt=de.prune,jt=("props"in F?F:R).props,It=Pe(F,H),Wt=ne.timeline({delay:j,paused:X,repeat:he,repeatDelay:De,yoyo:ke,data:"isFlip"}

Ar([{direction:Hn.top,notchWidth:.95,offset:0,position:.5,radius:40,size:.75}]),D=ju();return zr(()=>{var S;(S=D.value)==null||S.stop(),hA(()=>{const E=er.gsap.timeline({delay:.2}

();if(!o)return;const r=x(e.scrollTriggerContainer())??o;C(()=>{if(d()){if(s=N.create(o,{type:"chars, lines",charsClass:"--char",linesClass:"--line"}),t=f.gsap.timeline({scrollTrigger:{trigger:r,start:"top 85%",end:"bottom 20%",toggleActions:"play none none reverse"}}

===== gsap.set( =====
yles=lt&&lt(x,"transform"),(this.rotate=De||De===0)&&(this.rOffset=parseFloat(De)||0,this.radians=!!A.useRadians,this.rProp=A.rotation||"rotation",this.rSet=x._gsap.set(x,this.rProp,this),this.ru=qe(x._gsap.get(x,this.rProp))||0),Array.isArray(he)&&!("closed"in he)&&typeof Ze!="number"){for(_t in Ze)!Ye&&~Oe.indexOf(_t)?Ye=_t:!we&&~Ie.indexOf(_t)&&(
…（原文更长，完整版在文件夹版的 data/ 里）
```


## 4.3 · basement.txt

basement.studio — 1 处缓动。重点看：几乎没有 GSAP，靠排版。

```text
# basement — https://basement.studio
# bundle 755182 bytes

ease 分布: {'string': 1}
scrub 分布: {}
start 分布: {'click': 1, 'drag': 1}
pin:true 出现 0 次

===== ease: =====
atus,errors:t.errors,did:"number"==typeof t.did||"string"==typeof t.did?`${t.did}`:void 0,duration:t.duration,abnormal_mechanism:t.abnormal_mechanism,attrs:{release:t.release,environment:t.environment,ip_address:t.ipAddress,user_agent:t.userAgent}}}};return t&&ta(n,t),n}function ta(t,e={}

],523378);let eP="_frozenDsc";function eD(t,e){D(t,eP,e)}function eM(t,e){let n=e.getOptions(),{publicKey:r}=e.getDsn()||{},s={environment:n.environment||eR,release:n.release,public_key:r,trace_id:t,org_id:en(e)};return e.emit("createDsc",s),s}function e$(t,e){let n=e.getPropagationContext();return n.dsc||eM(n.traceId,t)}

t,S={...e,event_id:e.event_id||n.event_id||Z(),timestamp:e.timestamp||tn()},y=n.integrations||t.integrations.map(t=>t.name);(function(t,e){let{environment:n,release:r,dist:s,maxValueLength:i}=e;t.environment=t.environment||n||eR,!t.release&&r&&(t.release=r),!t.dist&&s&&(t.dist=s);let a=t.request;a?.url&&i&&(a.url=X(a.url,i)),i&&t.exception?.values?.forEach(t=>{t.value&&(t.value=X(t.value,i))}

===== matchMedia( =====
ction uk(e,n,t){switch(e.tag){case 26:ub(e,n,t),e.flags&uy&&(null!==e.memoizedState?function(e,n,t,r){if("stylesheet"===t.type&&("string"!=typeof r.media||!1!==matchMedia(r.media).matches)&&0==(4&t.state.loading)){if(null===t.instance){var l=fr(r.href),a=n.querySelector(fl(l));if(a){null!==(n=a._p)&&"object"==typeof n&&"function"==typeof n.then&&(e.count++,e=fw.bind(e),n.then(e,e)),t.state.loading|=4,t.instance=a,e5(a);return}a=n.ownerDocument||n,r=fa(r),(l=c8.get(l))&&fc(r,l),e5(a=a.createElement("link"));var o=a;o._p=new Promise(function(e,n){o.onload=e,o.onerror=n}),cu(a,"link",r),t.instance=a}null===e.stylesheets&&(e.stylesheets=new Map),e.stylesheets.set(t,n),(n=t.state.preload)&&0==(3&t.state.loading)&&(e.count++,t=fw.bind(e),n.addEventListener("load",t),n.addEventListener("error",t))}
```


## 4.4 · cuberto.txt

cuberto.com — 24 处缓动。逐字错开 100ms、单族字体。

```text
# cuberto — https://cuberto.com
# bundle 53039 bytes

ease 分布: {}
scrub 分布: {'!0': 1}
start 分布: {}
pin:true 出现 0 次

===== scrub: =====
tion:1}),e}magicParallax(){this.main.classList.contains(`-static`)||n.create({trigger:this.main,animation:this.tlParallax(),start:`top bottom`,end:`bottom top`,scrub:!0})}tlParallax(){let e=r.timeline();return r.set(this.media,{scale:1.05}),e.fromTo(this.media,{y:`-10%`},{y:`10%`,ease:`none`},0),e}

===== ease: =====
To(this.backdrop,{opacity:0},{opacity:1},0),e.fromTo(this.fill,{scaleY:0,transformOrigin:`bottom bottom`},{scaleY:1,transformOrigin:`bottom bottom`,duration:.7,ease:`power4.inOut`,immediateRender:!1},0),e}tlHide(){let e=n.timeline({paused:!0});return e.set(this.el,{pointerEvents:`none`},0),e.set(this.backdrop,{opacity:0},0),e.to(this.fill,{opacity:0,duration:.4},0),e.set(this.el,{display:`none`}),e}

k.x-(e.stick.x-t.clientX)*e.options.stickDelta:t.clientX,y:e.stick?e.stick.y-(e.stick.y-t.clientY)*e.options.stickDelta:t.clientY,overwrite:e.options.overwrite,ease:e.options.ease,duration:e.visible?e.options.speed:0,onUpdate:function(){return e.vel={x:t.clientX-e.pos.x,y:t.clientY-e.pos.y}}

eturn e.set(this.main,{willChange:`transform`},0),e.fromTo(this.main,{clipPath:`inset(5% 10% round 2rem)`,scale:.9},{clipPath:`inset(0% 0% round 2rem)`,scale:1,ease:`expo.out`,duration:2.5},.1),e.from(this.main,{opacity:0,duration:1}

===== stagger: =====
his.enterTl=this.tlEnter()}tlEnter(){let e=n.timeline({paused:!0});return e.fromTo(this.logoPath,{scale:0,transformOrigin:`center center`},{scale:1,duration:.4,stagger:.06,transformOrigin:`center center`},0),window.innerWidth>=768&&(e.set([this.nav,this.action],{willChange:`transform`}

,0),window.innerWidth>=768&&(e.set([this.nav,this.action],{willChange:`transform`}),e.fromTo([this.nav,this.action],{y:20,opacity:0},{y:0,opacity:1,duration:.8,stagger:.1,clearProps:`all`},0)),e}bindToggle(){this.toggleBtn.addEventListener(`click`,()=>this.toggle())}

his.enterTl.play()}handleEnter(){this.enterTl=this.tlEnter()}tlEnter(){let e=n.timeline({paused:!0});return this.header&&e.add(r(this.header.firstElementChild,{stagger:.1}),0),this.title&&e.add(r(this.title.firstElementChild),0),this.text&&e.add(r(this.text.firstElementChild),.1),this.detail.length&&e.add(i(this.detail),.4),e}};t.define(`TopheadSection`,a,`.TopheadSection`);export{a as default}

===== timeline({ =====
t.classList.add(`loader`),await this.showTl.play(0)}async hide(){document.documentElement.classList.remove(`loader`),await this.hideTl.play(0)}tlShow(){let e=n.timeline({paused:!0}

,{scaleY:0,transformOrigin:`bottom bottom`},{scaleY:1,transformOrigin:`bottom bottom`,duration:.7,ease:`power4.inOut`,immediateRender:!1},0),e}tlHide(){let e=n.timeline({paused:!0}

sList.toggle(`-visible`,t>0&&e>t),e=t},window.addEventListener(`scroll`,this.scrollFn,{passive:!0})}handleEnter(){this.enterTl=this.tlEnter()}tlEnter(){let e=n.timeline({paused:!0}

===== matchMedia( =====
ng=!1;_isStopped=!1;_isLocked=!1;_preventNextNativeScrollEvent=!1;_resetVelocityTimeout=null;_rafId=null;_isDraggingSelection=!1;reducedMotionMediaQuery=window.matchMedia(`(prefers-reduced-motion: reduce)`);isTouching;isIos;time=0;userData={}

.follower.removeVideo(),this.follower.removeState(`-pointer`),this.follower.removeState(`-inverse`),this.follower.removeState(`-opaque`))}initFollower(){window.matchMedia(`(pointer:fine)`).matches&&(this.follower=new r({el:`.Cursor`,className:`Cursor`,innerClassName:`inner`,textClassName:`text`,mediaClassName:`media`,mediaBoxClassName:`box`,iconSvgClassName:`icon`,iconSvgSrc:`/assets/sprites/svgsprites.svg`,skewing:1.5,skewingMedia:.5,speed:.5}
```


## 4.5 · darkroom.txt

darkroom.engineering — 13 处缓动，`power3.inOut` 主导，极端字号比 17.9。

```text
# darkroom — https://darkroom.engineering
# bundle 611195 bytes

ease 分布: {'power3.inOut': 11, 'expo.out': 1, 'expo.inOut': 1}
scrub 分布: {}
start 分布: {}
pin:true 出现 0 次

===== ease: =====
rtain-line",{text:i}),t.fromTo(".curtain-text-line-left",{x:(e,t,r)=>e===r.length-1?"16%":`${y(e)}%`},{duration:1.1,x:(e,t,r)=>e===r.length-1?"4%":`${y(e)-4}%`,ease:"power3.inOut"}),t.fromTo(".curtain-text-line-right",{x:e=>`${-y(e)}%`}

n:1.1,x:(e,t,r)=>e===r.length-1?"4%":`${y(e)-4}%`,ease:"power3.inOut"}),t.fromTo(".curtain-text-line-right",{x:e=>`${-y(e)}%`},{duration:1.1,x:e=>`${-y(e)+4}%`,ease:"power3.inOut"},"<"),t.fromTo("#curtain-content",{translateY:"100%"}

right",{x:e=>`${-y(e)}%`},{duration:1.1,x:e=>`${-y(e)+4}%`,ease:"power3.inOut"},"<"),t.fromTo("#curtain-content",{translateY:"100%"},{duration:1.1,translateY:0,ease:"power3.inOut"},0),t.fromTo("#curtain",{clipPath:"inset(100% 0 0 0)"}

===== matchMedia( =====
ction uU(e,t,n){switch(e.tag){case 26:uj(e,t,n),e.flags&uA&&(null!==e.memoizedState?function(e,t,n,r){if("stylesheet"===n.type&&("string"!=typeof r.media||!1!==matchMedia(r.media).matches)&&0==(4&n.state.loading)){if(null===n.instance){var l=f1(r.href),a=t.querySelector(f2(l));if(a){null!==(t=a._p)&&"object"==typeof t&&"function"==typeof t.then&&(e.count++,e=dc.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,tn(a);return}a=t.ownerDocument||t,r=f3(r),(l=fq.get(l))&&f9(r,l),tn(a=a.createElement("link"));var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),cX(a,"link",r),n.instance=a}null===e.stylesheets&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&0==(3&n.state.loading)&&(e.count++,n=dc.bind(e),t.addEventListener("load",n),t.addEventListener("error",n))}

siq7welusq.js"].map(t=>e.l(t))).then(()=>t(13704)))},7402,e=>{"use strict";var t=e.i(15010);let s="(prefers-reduced-motion: reduce)";function r(e){let t=window.matchMedia(s);return t.addEventListener("change",e),()=>t.removeEventListener("change",e)}function V(){return window.matchMedia(s).matches}

otion: reduce)";function r(e){let t=window.matchMedia(s);return t.addEventListener("change",e),()=>t.removeEventListener("change",e)}function V(){return window.matchMedia(s).matches}function H(){return!1}
```


---
# 第 5 部分 · React 组件（项目是 React/Next 时用）

**为什么单列这一节**：纯 HTML 基线在 React 里照抄会漏两件事——
`useEffect` 的清理、以及 timeline 的 ref 持有。下面三个组件演示了正确写法。

其余组件的用途：
| 组件 | 用途 |
|---|---|
| `MaskReveal` | 遮罩掀字（首屏标题） |
| `Parallax` | 视差（`scrub: true`） |
| `HorizontalTrack` + `HorizontalItem` | sticky 横向轨道 + 轨道内视差 |
| `Marquee` | 滚动驱动跑马灯（不是自动播放） |
| `Magnetic` | 指针磁性（`quickTo`，±12px） |
| `VelocitySkew` | 滚动速度 → 倾斜（clamp ±7） |
| `StaggerGrid` | 同屏批量进入（`ScrollTrigger.batch`） |
| `PinScene` | 固定场景多幕切换（停留长、转场短） |
| `useGsap` / `useReducedMotion` | 上下文清理 / 降级判断 |


## 5.1 · SmoothScroll.tsx

```tsx
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/**
 * 唯一的一个平滑滚动实例。
 *
 * 逆自 lando（lando.itsoffbrand.io）的 bundle，实测值：
 *   lerp: 0.1 / smoothWheel: true / touchMultiplier: 1.25
 *   syncTouch: true / wrapper: documentElement / content: body
 *
 * 关键不是参数，是三件事：
 *   1) lenis.on('scroll', ScrollTrigger.update)  —— 让 ScrollTrigger 用 Lenis 的滚动值
 *   2) gsap.ticker.add(t => lenis.raf(t*1000), false, true)
 *      第三个参数 prioritize=true：Lenis 先更新 scrollY，ScrollTrigger 后读
 *      顺序反了就会"动画慢半拍"
 *   3) gsap.ticker.lagSmoothing(0) —— 关掉卡顿补偿，否则卡一下会跳一段
 *
 * 页面上不允许出现第二个 requestAnimationFrame。所有滚动相关效果
 * 都挂在 gsap.ticker / ScrollTrigger 上。
 */

type LenisApi = {
  lenis: Lenis | null;
  /** 打开浮层 / 弹窗时锁滚动（内部同时停 ScrollTrigger 的刷新） */
  lock: () => void;
  unlock: () => void;
  scrollTo: (target: string | number | HTMLElement, opts?: { offset?: number; immediate?: boolean }) => void;
};

const LenisContext = createContext<LenisApi>({
  lenis: null,
  lock: () => {},
  unlock: () => {},
  scrollTo: () => {},
});

export function useLenis(): LenisApi {
  return useContext(LenisContext);
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const reduced = useReducedMotion();
  const [api, setApi] = useState<LenisApi>({
    lenis: null,
    lock: () => {},
    unlock: () => {},
    scrollTo: () => {},
  });

  useEffect(() => {
    // 减少动效：不接管滚动，交给浏览器原生（省性能，也避免"惯性"冒犯用户）
    if (reduced) {
      document.documentElement.classList.add('no-smooth');
      return () => document.documentElement.classList.remove('no-smooth');
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.25,
      syncTouch: true,
      autoResize: true,
      wrapper: document.documentElement,
      content: document.body,
    });
    lenisRef.current = lenis;

    /* 1) ScrollTrigger 读 Lenis 的值 */
    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    /* 2) 单时钟：Lenis 挂在 gsap.ticker 上，且优先执行 */
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf, false, true);

    /* 3) 关掉 lag smoothing */
    gsap.ticker.lagSmoothing(0);

    /* 字体/图片加载完后必须 refresh，否则触发点算错（最常见的一类 bug） */
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) document.fonts.ready.then(refresh);
    const t = window.setTimeout(refresh, 600);

    setApi({
      lenis,
      lock: () => lenis.stop(),
      unlock: () => lenis.start(),
      scrollTo: (target, opts) =>
        lenis.scrollTo(target as never, { offset: opts?.offset ?? 0, immediate: opts?.immediate ?? false }),
    });

    return () => {
      window.clearTimeout(t);
      lenis.off('scroll', onScroll);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  return <LenisContext.Provider value={api}>{children}</LenisContext.Provider>;
}
```


## 5.2 · effects/MaskReveal.tsx

```tsx
import type { ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsapScope } from '../useGsap';
import { useReducedMotion } from '../useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  /** 一行一个节点；换行由外部控制，组件只负责"掀" */
  lines: ReactNode[];
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  /** 'load' 用于首屏（立即播），'scroll' 用于后面的段落 */
  trigger?: 'load' | 'scroll';
  delay?: number;
  stagger?: number;
  duration?: number;
};

/**
 * 遮罩掀字（mask reveal）
 *
 * 逆自 lando 的首屏标题：每行一个 overflow:hidden 的容器，
 * 内层 span 从 yPercent:115 掀到 0，ease 用 expo.out，行间错开 0.1s。
 *
 * 为什么必须 overflow:hidden + 内层位移，而不是直接 fade：
 * 直接 fade 是"出现"，遮罩上移是"被生产出来"——后者才有印刷感。
 * 这也是三家站点最共同的一个动作。
 */
export function MaskReveal({
  lines,
  as = 'h2',
  className = '',
  trigger = 'scroll',
  delay = 0,
  stagger = 0.1,
  duration = 1.15,
}: Props) {
  const reduced = useReducedMotion();

  const ref = useGsapScope<HTMLElement>(
    (el) => {
      const inners = el.querySelectorAll<HTMLElement>('.mr-inner');
      if (!inners.length) return;

      if (reduced) {
        gsap.set(inners, { yPercent: 0 });
        return;
      }

      gsap.set(inners, { yPercent: 115 });
      gsap.to(inners, {
        yPercent: 0,
        duration,
        stagger,
        delay,
        ease: 'expo.out',
        scrollTrigger:
          trigger === 'scroll'
            ? { trigger: el, start: 'top 88%', once: true }
            : undefined,
      });
    },
    [reduced, trigger, delay, stagger, duration]
  );

  const Tag = as as 'h2';

  return (
    <Tag ref={ref as never} className={`mr ${className}`}>
      {lines.map((line, i) => (
        <span className="mr-mask" key={i}>
          <span className="mr-inner">{line}</span>
        </span>
      ))}
    </Tag>
  );
}
```


## 5.3 · effects/HorizontalTrack.tsx

```tsx
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsapScope } from '../useGsap';
import { useReducedMotion } from '../useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const TrackContext = createContext<{ main: gsap.core.Tween | null }>({ main: null });

/**
 * 横向轨道（horizontal scroll section）
 *
 * 逆自 lando 的横向叙事段。整份 bundle 里 `pin:` 出现 **0 次** ——
 * 它用的是「原生 sticky + 外层撑高 + 函数值 + scrub」，不是 ScrollTrigger 的 pin。
 *
 * 为什么这样更好：
 *   - pin 会插入 spacer 撑开布局，resize 时经常错位；sticky 是浏览器原生布局
 *   - x 写成函数 `() => -dist()` 并配 invalidateOnRefresh，尺寸变了自动重算
 *   - scrub: 1（不是 true）：主位移带一点"重量"，装饰性视差才用 true
 *
 * 数学：外层高度 = 视口高 + 需要横移的距离，这样滚完正好走完轨道。
 */
export function HorizontalTrack({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const section = useRef<HTMLElement | null>(null);
  const track = useRef<HTMLDivElement | null>(null);
  const [main, setMain] = useState<gsap.core.Tween | null>(null);

  useEffect(() => {
    const sec = section.current;
    const tr = track.current;
    if (!sec || !tr) return;

    const distance = () => Math.max(0, tr.scrollWidth - window.innerWidth);
    const layout = () => {
      sec.style.height = `${window.innerHeight + distance()}px`;
    };

    layout();

    if (reduced) {
      tr.style.overflowX = 'auto';
      return () => {
        sec.style.height = '';
        tr.style.overflowX = '';
      };
    }

    const tween = gsap.to(tr, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: sec,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        invalidateOnRefresh: true,
        onRefreshInit: layout,
      },
    });
    setMain(tween);

    const ro = new ResizeObserver(() => {
      layout();
      ScrollTrigger.refresh();
    });
    ro.observe(tr);

    return () => {
      ro.disconnect();
      tween.scrollTrigger?.kill();
      tween.kill();
      sec.style.height = '';
      setMain(null);
    };
  }, [reduced]);

  return (
    <section ref={section as never} className={`ht ${className}`}>
      <div className="ht-sticky">
        <div ref={track} className="ht-track">
          <TrackContext.Provider value={{ main }}>{children}</TrackContext.Provider>
        </div>
      </div>
    </section>
  );
}

/**
 * 轨道内的单个面板：二级视差
 *
 * 关键就是 containerAnimation —— 让这个 ScrollTrigger 跟着"横向位移"走，
 * 于是 start/end 用 left/right 而不是 top/bottom。
 */
export function HorizontalItem({
  children,
  depth = 10,
  className = '',
}: {
  children: ReactNode;
  depth?: number;
  className?: string;
}) {
  const { main } = useContext(TrackContext);
  const reduced = useReducedMotion();

  const inner = useGsapScope<HTMLDivElement>(
    (el) => {
      if (!main || reduced) return;
      gsap.to(el, {
        xPercent: -depth,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          containerAnimation: main,
          start: 'left right',
          end: 'right left',
          scrub: true,
        },
      });
    },
    [main, reduced, depth]
  );

  return (
    <div className={`ht-item ${className}`}>
      <div ref={inner} className="ht-item-inner">
        {children}
      </div>
    </div>
  );
}
```


---
# 第 6 部分 · 基线（编辑叙事型）的关键结构

完整文件在文件夹版的 `baseline/editorial/index.html`（单文件、双击可开）。
这里只抽三段：设计令牌、首屏结构、单时钟接线——这三段决定 80% 的效果。


## 6.1 · 设计令牌（照抄）

```css
:root{
  --paper:#f2efe9;
  --ink:#14140f;
  --ink-60:rgba(20,20,15,.58);
  --ink-38:rgba(20,20,15,.38);
  --line:rgba(20,20,15,.16);
  --line-strong:rgba(20,20,15,.42);
  --accent:#ff3d00;
  --dark:#0f100c;

  --sans:"Helvetica Neue","Inter",-apple-system,"Segoe UI",Arial,sans-serif;
  --serif:"Instrument Serif","Iowan Old Style","Songti SC",Georgia,serif;
  --mono:ui-monospace,"SF Mono","IBM Plex Mono",Menlo,monospace;

  /* 字号阶梯：正文 16px 为 1 */
  --t-display:clamp(54px,9.9vw,152px);
  --t-h2:clamp(34px,4.4vw,64px);
  --t-h3:clamp(20px,2vw,30px);
  --t-lead:clamp(17px,1.45vw,21px);
  --t-body:16px;
  --t-small:13px;
  --t-label:10.5px;

  --lh-display:.86;
  --lh-title:.98;
  --lh-body:1.58;

  --ls-display:-.045em;
  --ls-h2:-.032em;
  --ls-label:.19em;

  --dur-fast:180ms;
  --dur-mid:450ms;
  --dur-slow:620ms;
  --ease-out:cubic-bezier(.16,1,.3,1);
  --ease-inout:cubic-bezier(.4,0,.2,1);

  --sp-1:24px;
  --sp-2:64px;
  --sp-3:clamp(72px,10vh,140px);
  --sp-4:clamp(140px,20vh,260px);

  --edge:clamp(20px,4vw,64px);   /* 贴边距：不居中 */
}
```


## 6.2 · 首屏结构（注意 `.mask` 的三层嵌套）

```html
<section class="hero">
    <div class="hero-top">
      <span class="eyebrow">Image &amp; Interface</span>
      <span class="eyebrow">Beijing / Remote</span>
    </div>

    <h1>
      <span class="mask"><span>We make</span></span>
      <span class="mask"><span>the part</span></span>
      <span class="mask"><span><em>people keep</em>.</span></span>
    </h1>

    <div class="hero-side" aria-hidden="true">
      <span class="rule"></span>
      <span class="vert">Independent design practice — est. 2016</span>
    </div>

    <div class="hero-foot">
      <p>我们把复杂的产品，做成<b>一句话就能记住</b>的样子。
         影像、版式、交互，三件事一起做。</p>
      <div class="hero-meta">
        <span>Scroll</span>
        <span>↓</span>
      </div>
    </div>
  </section>
```


## 6.3 · 单时钟接线（最容易做错的一处）

```js
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
gsap.registerPlugin(ScrollTrigger);

let lenis = null;
if (window.Lenis && !reduced){
  lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    touchMultiplier: 1.25,
    wrapper: document.documentElement,
    content: document.body,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t)=> lenis.raf(t * 1000), false, true);   // ← prioritize
  gsap.ticker.lagSmoothing(0);
}
```


## 6.4 · 图版揭示（scrub 0.6）

```js
gsap.utils.toArray('.split .fig, .ht-item .fig').forEach((fig)=>{
    const veil = fig.querySelector('.veil');
    if (!veil) return;
    gsap.fromTo(veil, { scaleY: 1 }, {
      scaleY: 0, ease: 'none',
      scrollTrigger: {
        trigger: fig, start: 'top 88%', end: 'bottom 62%', scrub: 0.6,
      }
    });
  });
}
```


## 6.5 · 横向轨道（sticky，不用 pin）

```js
(function horizontal(){
  const sec = document.querySelector('.ht');
  const track = document.querySelector('.ht-track');
  if (!sec || !track) return;

  const dist = () => Math.max(0, track.scrollWidth - window.innerWidth + 40);

  const layout = () => {
    sec.style.height = (dist() + window.innerHeight) + 'px';
  };
  layout();

  if (reduced) return;

  gsap.to(track, {
    x: () => -dist(),
    ease: 'none',
    scrollTrigger: {
      trigger: sec,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      invalidateOnRefresh: true,
      onRefresh: layout,
    }
  });
})();
```


---
# 第 7 部分 · 验收脚本

交付前必须跑。11 项数字 + 1 项人工。不过就改，改完再跑。


```js
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
```


---
# 附录 · 文件夹版结构

```
HANDOFF-LANDO/
├── START-HERE.md              作业说明（本文第 1 部分）
├── SKILL.md                   施工规范（第 2 部分）
├── docs/                      8 份参考（第 3 部分）
├── data/                      5 个站的真实配置（第 4 部分，完整版）
├── react/motion/              12 个 React 组件（第 5 部分，完整版）
├── baseline/editorial/        ★ 可运行成品（单文件，双击可开）
├── baseline/immersive/        3D 版可运行成品
├── scripts/verify.mjs         验收脚本
└── shots/                     4 张视觉参照
```

**如果你能读目录，优先用文件夹版。** 单文件版为了控制体积，
省略了完整的 baseline HTML、9 个 React 组件、以及大部分配置片段。
