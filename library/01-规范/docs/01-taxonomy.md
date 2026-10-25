# 01 · 三套制度（先选型，再施工）

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
