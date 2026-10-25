# GSAP × Lenis Lab

从 **lando / ojo / offer** 的打包产物里逆向出来的滚动动效，**React + GSAP + Lenis** 实现。
不是 demo 集合，是一套受约束的写法：单一滚动时钟、scrub 分三级、无自动播放、reduced-motion 完整降级。

## 先看效果（不用装任何东西）

双击 **`preview.html`** —— 用 CDN 加载 GSAP / Lenis，浏览器直接打开就能看，
包含：遮罩掀字、双速视差、横向轨道、钉住场景、批量入场、速度倾斜、磁性按钮、滚动驱动跑马灯。

## 当库用

```bash
npm i          # gsap + lenis + react + vite
npm run dev    # http://localhost:5173
```

把 `src/motion/` 整个拷进你的项目即可（它不依赖本项目其他文件）：

```tsx
import { SmoothScroll, MaskReveal, HorizontalTrack, HorizontalItem } from './motion';

<SmoothScroll>
  <MaskReveal as="h1" trigger="load" lines={['Style is not', 'a feeling.']} />

  <HorizontalTrack>
    <HorizontalItem depth={10}><Card /></HorizontalItem>
    <HorizontalItem depth={-6}><Card /></HorizontalItem>
  </HorizontalTrack>
</SmoothScroll>
```

## 验收（已实测 12/12）

```bash
PUPPETEER=puppeteer-core npm run verify     # 需要本机 Chrome
```

```
✓ 控制台零报错
✓ ScrollTrigger ≤ 25（当前 18）
✓ 没有使用 pin（0 次）
✓ Lenis 已接管滚动
✓ 无横向溢出（1440 / 390 都差 0px）
✓ 横向轨道在末尾走到位（x 2477 / 期望 2477）
✓ 遮罩掀字全部落位（7/7）
✓ 滚动中 60fps
✓ reduced-motion：无隐藏元素 / 文字未偏移 / 内容完整
```

## 逆向数据摘要

lando 的 bundle（`lando.itsoffbrand.io/dev-js/lando-by-OFF+BRAND.05.js`，2026-10-25 重抓，1.32MB）里统计出来的：

| 维度 | 值 |
|---|---|
| Lenis | `lerp 0.1` / `smoothWheel true` / `touchMultiplier 1.25` / `syncTouch true` |
| 时钟 | `lenis.raf` 挂 `gsap.ticker`，`prioritize=true`，`lagSmoothing(0)` |
| scrub | `true` ×26、`1` ×1、`0` ×2 |
| 触发点 | `top bottom` ×13、`top 90%` ×7、`top 95%` ×2、`top top` ×2 |
| ease | `power2.out` ×36、`none` ×17、`power2.inOut` ×15、`expo.inOut` ×12 |
| **pin** | **0 次**（横向靠 sticky） |
| 断点 | `992px`，跨断点直接 reload |

完整记录（含 ojo 的着色器公式、offer 的排版规则、10 条反模式）见 `docs/REVERSE-ENGINEERING.md`。

## 目录

```
src/motion/
  SmoothScroll.tsx          单时钟：Lenis → gsap.ticker，唯一实例
  useGsap.ts                gsap.context 作用域 hook（自动 revert）
  useReducedMotion.ts       系统偏好
  effects/
    MaskReveal.tsx          遮罩掀字（yPercent 115→0 + expo.out）
    Parallax.tsx            层视差（scrub true，yPercent）
    HorizontalTrack.tsx     横向轨道（sticky + 函数值 + scrub 1）
    Marquee.tsx             跑马灯（scrub 0，不自动播放）
    Magnetic.tsx            磁性（quickTo，±12px）
    VelocitySkew.tsx        速度倾斜（getVelocity/900，clamp ±7）
    StaggerGrid.tsx         批量入场（ScrollTrigger.batch）
    PinScene.tsx            钉住场景（sticky + scrub timeline）
src/App.tsx                 组合示例（首屏 / 视差 / 横向 / 分镜 / 卡片 / 速度 / 跑马灯）
preview.html                免安装视觉预览
docs/REVERSE-ENGINEERING.md 逆向记录：参数出处与判断
docs/SKILL-BRIEF.md         给接手的 AI：组件清单、接入五步、验收、十不准、skill 目录骨架
scripts/verify.mjs          自动化验收（12 项）
```

## 三条不可协商的规则

1. **只有一个时钟**：页面里不允许出现第二个 `requestAnimationFrame`。
2. **位移都是滚动/指针的函数**：不做自动播放（环境层如噪点除外）。
3. **关掉动效仍然完整**：`prefers-reduced-motion` 下必须是静态但可读，不是空白。

## 说明

- 类型是宽松的（`strict: true` 但组件里用了少量 `as never` 绕开 ref 泛型），
  `npm run typecheck` 可选；`vite build` 不依赖它。
- ojo 的数据来自 2026-10-18 抓取，2026-10-25 复核时该域返回的是另一个页面（站点已改版），
  因此那部分按历史数据看待，公式本身仍可用。
