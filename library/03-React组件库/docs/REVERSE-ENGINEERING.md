# 逆向记录 · lando / ojo / offer

> 这份文件只回答一件事：**那些站到底是怎么写的。**
> 所有数字都来自打包产物的静态读取（不是看视频猜的），并标了抓取日期。

---

## 0. 方法与局限

| 项 | 说明 |
|---|---|
| 方法 | `curl` 取 HTML → 提取 `<script src>` → 下载 bundle → 正则统计参数与调用形态 |
| 能拿到 | Lenis 配置、ScrollTrigger 的 start/scrub 分布、ease 分布、容器动画、断点策略、是否用 pin |
| 拿不到 | 运行时状态机、CMS 驱动的布局、WebGL 里的贴图与模型 |
| 复核日期 | **2026-10-25**（lando 重新抓取，1,322,392 字节） |

lando 的 bundle 路径（可复现）：

```
https://lando.itsoffbrand.io/dev-js/lando-by-OFF+BRAND.05.js
```

---

## 1. lando —— 结构比参数更重要

### 1.1 实测数据（2026-10-25 重抓）

| 维度 | 实测值 | 出现次数 |
|---|---|---|
| Lenis 插值 | `lerp: 0.1` | 1 |
| 滚轮平滑 | `smoothWheel: true` | 1 |
| 触摸倍率 | `touchMultiplier: 1.25` | 1（另一处 1） |
| 触摸同步 | `syncTouch: true` | 1 |
| 帧补偿 | `gsap.ticker.lagSmoothing(0)` | 1 |
| 滚动联动 | `lenis.on("scroll", ScrollTrigger.update)` + `lenis.raf(t*1000)` 在 ticker 内 | — |
| `scrub` 分布 | `true` ×26、`1` ×1、`0` ×2 | 29 |
| 触发点分布 | `top bottom` ×13、`top 90%` ×7、`top 95%` ×2、`top top` ×2、`top 80%` ×1、`left right` ×1 | 26 |
| ease 分布 | `power2.out` ×36、`none` ×17、`power2.inOut` ×15、`expo.inOut` ×12、`power1.inOut` ×11、`power3.out` ×10 | 135 |
| 容器动画 | `containerAnimation` ×6 | 6 |
| **pin** | **0 次** | 0 |
| 断点 | `innerWidth >= 992`；**跨断点直接 `location.reload()`** | — |

### 1.2 五条结构性结论

**① 横向滚动不用 `pin`，用原生 sticky。**
`pin` 出现 0 次。做法是：外层高度 = 视口高 + 需要横移的距离；内层 `position: sticky; top: 0; height: 100vh`；轨道 `x: () => -distance()`。
`pin` 会插 spacer 撑布局，resize 时经常错位，而 sticky 是浏览器原生布局。

**② 只有一个时钟。**
`lenis.raf(t * 1000)` 挂在 `gsap.ticker` 里，且 `prioritize = true`（第三个参数）。
顺序反了（ScrollTrigger 先读）就会"动画慢半拍"——这是最常见的一类手感 bug。
`lagSmoothing(0)` 关掉卡顿补偿，否则卡一下会跳一段。

**③ scrub 分三级，不是统一一个值。**

| 用途 | 值 | 观感 |
|---|---|---|
| 主位移（横向轨道） | `1` | 有重量，追 1 秒 |
| 装饰性视差 | `true` | 立刻跟随 |
| 纯函数映射（跑马灯） | `0` | 位置 = 进度，不做插值 |

**④ 几乎没有自动播放。**
`ease: "none"` 出现 17 次——所有 scrub 驱动的位移都用线性。整套动效里，除 Rive 转场与光标，其余都是 **scroll / pointer 的函数**。
跑马灯也是 scroll 驱动（`fromTo(x: 9vw → -9vw)` + `scrub: 0`），页面停它就停。

**⑤ 换设备直接 reload。**
当前版本的做法很粗暴：跨 992px 断点时 `window.location.reload()`。
更优雅的是 `lenis.destroy()` → 重建 → `scrollTo(旧值, { immediate: true })` → `ScrollTrigger.refresh()`（本项目用的是后者）。两条路都成立，前者省事，后者不闪白。

### 1.3 触发点为什么是 `top bottom` 而不是 `top 80%`

13 次 `top bottom`：元素**一进视口**就开始，出去时正好结束——适合"跟着走"的视差。
7 次 `top 90%`、2 次 `top 95%`：用于"入场"类，留一点提前量，让用户看不到元素从 0 开始。
2 次 `top top`：钉住场景的起点。

---

## 2. ojo —— WebGL 的"流体感"来自三个正弦

> 数据来自 2026-10-18 的抓取。2026-10-25 复核时该域返回的是另一个产品页（`irise-official`），
> 说明站点已改版或做了分流，因此这一节按**历史数据**看待，公式本身仍可复用。

形变着色器（GLSL）的结构：

```glsl
float len = length(uv - .5);
float wave = sin(len * 42.0 - uTime * 0.72);
float n =
  sin(uv.x * 15.0 + uTime * 0.3) * 0.0060 +
  sin(uv.y * 10.0 + uTime * 0.21) * 0.0048 +
  sin((uv.x + uv.y) * 6.0 + uTime * 0.5) * 0.0032;
gl_FragColor = texture2D(uTex, uv + normalize(uv - .5) * wave * 0.004 + n);
```

三个要点：

1. **径向波**（`sin(len*42 - t*0.72)`）+ **两条低频正弦**叠加，得到"颜料流动"而不是"水面倒影"。把径向项去掉就变成普通的水波。
2. **幅度必须小于 0.007**。超过 0.01 画面开始"化掉"，字会糊。
3. 采样偏移用 `normalize(uv - .5)` 沿半径方向——这样形变是"向外推"，不是"平移"。

---

## 3. offer —— 高级感是排版给的，不是动效

从它的样式表里读到的排版规则：

```
font-family: Inter, -apple-system, ...      ← 只有无衬线，没有衬线
letter-spacing: -0.025em                    ← 标题极紧
letter-spacing: 0.2em / 0.3em / 0.4em       ← 等宽小标极松
```

**紧标题 + 松小标**这个反差，就是"贵"的来源。它没有用任何弹跳缓动，也没有满屏粒子。

对照：本项目的 `--sans` 首项是 Inter（自托管），`--mono` 承担小标，字距 `.22em–.28em`。

---

## 4. 三家共同点（这才是可复用的部分）

| 共同点 | 说明 |
|---|---|
| 单一滚动时钟 | Lenis + GSAP 共用 ticker，没有第二个 rAF |
| 位移都是滚动/指针的函数 | 极少自动播放 |
| 大留白 + 强对比字号 | 字号差至少 6 倍（96px vs 14px） |
| 入场只做一次 | `once: true` 或一次性 timeline，回滚不重播 |
| 边缘细节 | 1px 描边、噪点、硬阴影——不是靠动效撑质感 |
| 关掉动效仍完整 | 静态版依旧能读，不会塌 |

## 5. 反模式（照抄会翻车的地方）

1. `pin: true` 做横向 —— resize 错位，改成 sticky。
2. 每个元素一个 `delay` —— 改节奏要改七处，改不动；用一条 timeline + 绝对时间。
3. `scrub` 全用 `true` —— 主位移会"太轻"，像拖拽而不是滚轮。
4. 在 `onUpdate` 里 `gsap.to()` —— 每帧新建补间，GC 一抖就掉帧；用 `quickTo` 或 `set`。
5. 尺寸写死 —— `x: -3200` 在 1280 屏上直接露底；用函数值 + `invalidateOnRefresh`。
6. 忘了 `ScrollTrigger.refresh()` —— 字体加载后触发点全偏。
7. 跑马灯用 CSS animation —— 自动播放会和滚动打架，且停不下来。
8. 只做 `opacity` 不做位移 —— 看起来"淡入"，没有"被生产出来"的感觉。
9. 动效时长随手写 —— 一个页面里出现 5 种节奏，整体就散了。
10. 不做 reduced-motion —— 眩晕用户直接关掉你的站。

---

## 6. 本项目的实现映射

| 原站现象 | 本项目文件 | 关键参数 |
|---|---|---|
| Lenis 平滑 + 单时钟 | `src/motion/SmoothScroll.tsx` | `lerp .1` / `prioritize` / `lagSmoothing(0)` |
| 遮罩掀字 | `effects/MaskReveal.tsx` | `yPercent 115→0`，`expo.out`，`stagger .1` |
| 层视差 | `effects/Parallax.tsx` | `scrub true`，`yPercent ±speed*50` |
| 横向轨道 | `effects/HorizontalTrack.tsx` | sticky + `x:()=>-d` + `scrub 1` |
| 轨道内二级视差 | `HorizontalItem` | `containerAnimation` + `left right` |
| 跑马灯 | `effects/Marquee.tsx` | `scrub 0`，`x 9vw→-9vw` |
| 磁性 | `effects/Magnetic.tsx` | `quickTo`，±12px，`pointer:fine` |
| 速度倾斜 | `effects/VelocitySkew.tsx` | `getVelocity()/900`，clamp ±7 |
| 批量入场 | `effects/StaggerGrid.tsx` | `ScrollTrigger.batch`，`once` |
| 钉住场景 | `effects/PinScene.tsx` | sticky + scrub timeline，停留长/转场短 |
