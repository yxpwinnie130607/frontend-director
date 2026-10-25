# 施工说明 · 给接手的 AI

> 这份文件是给「另一个 AI」看的：它要拿这套代码做一个**网站动效 skill**。
> 你不需要重写效果，只需要：读懂接口 → 按清单接入 → 按验收标准检查。

---

## 1. 这是什么

一套 **React + GSAP + Lenis** 的滚动动效库，全部参数来自三个参考站（lando / ojo / offer）打包产物的静态逆向，记录见 `docs/REVERSE-ENGINEERING.md`。

它不是 demo 集合，而是一套**受约束的写法**：单一滚动时钟、scrub 分三级、无自动播放、reduced-motion 完整降级。任何新效果都必须服从这四条。

## 2. 技术基线（不可协商）

| 项 | 取值 / 规则 |
|---|---|
| 依赖 | `gsap@3.12`、`lenis@1.1`、`react@18` |
| 滚动接管 | **只有一个** `<SmoothScroll>`，放在最外层 |
| 时钟 | `lenis.raf` 挂在 `gsap.ticker`，`prioritize=true`，`lagSmoothing(0)` |
| 动画库 | 只用 GSAP；不许引入 framer-motion / anime / 自写 rAF |
| 位移书写 | 一律 `yPercent` / `xPercent`，不写死像素 |
| 尺寸依赖 | 函数值 `() => -distance()` + `invalidateOnRefresh` |
| 入场 | `once: true`，回滚不重播 |
| 可访问性 | `prefers-reduced-motion: reduce` 时全部静态、内容完整 |
| 性能红线 | 滚动中 ≥ 55fps；ScrollTrigger 总数 ≤ 25 |

## 3. 组件清单

| 组件 | 触发 | 核心参数 | 何时用 | 坑 |
|---|---|---|---|---|
| `<SmoothScroll>` | 挂载 | `lerp .1`、`smoothWheel`、`touchMultiplier 1.25` | 全站最外层，只一次 | 不要在它内部再建 Lenis |
| `<MaskReveal>` | load / scroll | `yPercent 115→0`、`expo.out`、`stagger .1` | 大标题、段落标题 | 容器必须 `overflow:hidden`；`padding-bottom` 留出下伸部 |
| `<Parallax>` | scroll | `scrub true`、`±speed*50` | 图片、装饰层 | 元素必须有可裁切的容器，否则溢出 |
| `<HorizontalTrack>` | scroll | sticky + `x:()=>-d` + `scrub 1` | 产品走廊、叙事分段 | 外层高度必须 = 视口 + 位移距离 |
| `<HorizontalItem>` | 轨道内 | `containerAnimation` + `left right` | 面板内二级视差 | 必须在 Track 内部才拿得到 main tween |
| `<Marquee>` | scroll | `scrub 0`、`x 9vw→-9vw` | 关键词带、口号 | 不要用 CSS animation |
| `<Magnetic>` | pointer | `quickTo`、±12px | 主要按钮 | 触屏禁用；幅度 > 16px 会像抖动 |
| `<VelocitySkew>` | scroll | `getVelocity()/900`、clamp ±7 | 大段文字、图片墙 | 必须 clamp；用 quickTo 不用 to |
| `<StaggerGrid>` | scroll | `batch` + `once` + `stagger .08` | 卡片列表 | 不要给每张卡单独建 trigger |
| `<PinScene>` | scroll | sticky + scrub timeline，`TR=0.34` | 一屏一件事的分镜 | 停留必须长于转场，否则字压字 |

## 4. 接进一个新项目的五步

1. **装依赖**：`npm i gsap lenis`（React 项目再加 `react react-dom`）。
2. **拷目录**：把 `src/motion/` 整个复制进去（它不依赖本项目任何其他文件）。
3. **包最外层**：
   ```tsx
   <SmoothScroll>
     <App />
   </SmoothScroll>
   ```
4. **只给关键位置加效果**：一个页面 ≤ 3 种效果。首屏一种、内容段一种、结尾一种。
5. **跑验收**（第 6 节），不过就调参数，别加新效果。

## 5. 参数速查

| 场景 | 值 |
|---|---|
| 滚动插值 | `lerp 0.1`（0.08 更重，0.14 更跟手） |
| 主位移 scrub | `1` |
| 装饰视差 scrub | `true` |
| 纯函数 scrub | `0` |
| 入场 ease | `expo.out` / `power3.out` |
| 位移 ease | `none`（scrub 必须） |
| 状态切换 ease | `power2.inOut` |
| 错开 | 文字行 `0.09–0.1`；卡片 `0.06–0.08` |
| 入场时长 | `0.9–1.2s`；位移 `1.2–1.6s` |
| 字号对比 | 至少 6 倍（如 14px vs 96px） |
| 小标字距 | `.22em–.3em` |

## 6. 验收标准（必须全过）

```
□ 控制台零报错
□ ScrollTrigger 总数 ≤ 25，且没有任何一个用 pin
□ 滚动中帧率 ≥ 55fps（用 rAF 采样 120 帧求均值）
□ 横向轨道在末尾正好停在最后一屏，resize 后仍正确
□ 遮罩掀字结束后 yPercent === 0，文字无裁切
□ 关掉动效（prefers-reduced-motion）后：所有文字可见、无空白屏、无 overflow 元素
□ 390px 宽无横向溢出（scrollWidth === clientWidth）
□ 键盘 Tab 能走完全部可交互元素（magnetic 不能挡住点击）
```

自动化脚本见 `scripts/verify.mjs`（需要本机 Chrome + `puppeteer-core`）。

## 7. 十不准

1. 不准在已有 `SmoothScroll` 的页面里再建 Lenis。
2. 不准用 `pin: true` 做横向。
3. 不准在 `onUpdate` 里 `gsap.to()`。
4. 不准写死像素位移。
5. 不准让动效自动循环播放（除非是环境层，如噪点、粒子）。
6. 不准一个页面出现超过 3 种入场节奏。
7. 不准用 `back.out` 超过一处。
8. 不准省略 reduced-motion。
9. 不准引入第二套动画库。
10. 不准把内容放进被 `filter` / `transform` 的层里（会一起被位移/模糊）。

## 8. 把它做成 skill 的最小结构

```
skills/scroll-motion/
├── SKILL.md                 # 触发词 + 工作流 + 决策树
├── references/
│   ├── parameters.md        # 第 5 节那张表，展开写
│   ├── anti-patterns.md     # 第 7 节，每条给"错误示范 / 正确写法"
│   └── reverse-notes.md     # 逆向记录（可裁剪）
├── assets/
│   └── motion/              # 本目录 src/motion 的副本（可直接拷）
└── scripts/
    └── verify.mjs           # 第 6 节的自动化版
```

`SKILL.md` 的最小 frontmatter：

```markdown
---
name: scroll-motion
description: 给网站加"高级感"滚动动效（GSAP + Lenis）。当用户要求视差、横向滚动叙事、文字遮罩入场、滚动驱动跑马灯、磁性按钮，或说"做出 lando / awwwards 那种质感"时使用。参数全部来自对真实站点的逆向，禁止自创时长与缓动。
---
```

工作流（写进 SKILL.md 的正文）：

1. 先问三件事：技术栈？页面有几个 section？有没有 3D？
2. 选 **≤3 个**效果，从组件清单里挑，不要全上。
3. 接入第 4 节的五步。
4. 跑 `scripts/verify.mjs`，不过就调参数。
5. 交付时附一张"用了哪些参数"的表（方便下一次复用）。

## 9. 还能往哪扩

- **3D**：`@react-three/fiber` + `useFrame`，但滚动值仍从 Lenis 拿（`lenis.on('scroll')` 存到 ref），不要在 `useFrame` 里读 `window.scrollY`。
- **图片序列**：`canvas` + `drawImage`，帧 = 滚动进度的函数，`scrub 0`。
- **着色器形变**：见 `REVERSE-ENGINEERING.md` 第 2 节，幅度必须 < 0.007。
- **文字逐字**：`yPercent` + `stagger 0.03–0.05`，逐字不要用 0.1（整句会变慢）。

## 10. 代码阅读顺序

1. `src/motion/SmoothScroll.tsx` —— 先理解时钟，否则后面全是误解
2. `src/motion/effects/HorizontalTrack.tsx` —— 最复杂的一个，理解 sticky 数学
3. `src/motion/effects/MaskReveal.tsx` —— 最简单的，用来对照
4. `src/App.tsx` —— 看它们怎么组合成一个页面
5. `docs/REVERSE-ENGINEERING.md` —— 想知道"为什么是这个值"再看
