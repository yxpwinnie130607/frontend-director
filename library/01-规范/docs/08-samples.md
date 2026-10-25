# 08 · 样本总表（26 个站）

> 抓取时间 2026-10-25。技术栈来自 bundle 内的真实出现次数；
> 字号比来自浏览器 `getComputedStyle` 实测；滚动驱动数来自 5 个滚动位置的差分。

| 站点 | 制度 | 技术栈 | 字号比 | 缓动 | scrub | 滚动驱动 | WebGL | 值得学的一点 |
|---|---|---|---:|---:|---:|---:|:--:|---|
| **lando** | A 编辑叙事 | GSAP · Lenis · three · OGL · pixi · Rive · shader | 110/17 | 479 | 117 | 25 | yes | 贴边大字 + 非对称图片 + 479 处缓动编排；`containerAnimation` 做横向二级视差 |
| **darkroom** | A 编辑叙事 | GSAP · Lenis | 251/14 | 13 | 0 | 3 | — | 极端字号比 17.9（200px 对 14px）+ 纯黑单色红，靠对比不靠装饰 |
| **basement** | A 编辑叙事 | rapier | 87/20 | 1 | 0 | 1 | yes | 1px 全宽分隔线代替卡片；强调色全站只出现 1 次 |
| **terminal** | A 编辑叙事 | GSAP · Lenis | 70/14 | 41 | 2 | — | — | `toggleActions: play none none reverse` 让进出场可逆；`stagger{from:"end"}` 从末字往回 |
| **abhishek** | A 编辑叙事 | — | 76/14 | 0 | 0 | 2 | — | 衬线 display（Bluu Next）+ 6 族字体混排 |
| **ustwo** | A 编辑叙事 | — | 216/14 | 0 | 0 | 4 | yes | 216px 巨字 + 极简导航 |
| **locomotive** | A 编辑叙事 | GSAP · Lenis · three · OGL · shader | — | 28 | 0 | 0 | yes | OGL + 自定义 shader 做图像扭曲，GSAP 只负责时序 |
| **cuberto** | A 编辑叙事 | GSAP · Lenis | 81/22 | 0 | 1 | — | — | 单族字体（Suisse Intl）+ 9 档字号 + 逐字错开 |
| **ojo** | A+B 混合 | framer | 137/13 | 0 | 0 | 5 | yes | shader 流体（`sin(len*42 - t*0.72)`）+ framer motion |
| **waaark** | A+B 混合 | three | 50/14 | 0 | 0 | — | — | three.js + bloom，深色沉浸 |
| **islands** | A+B 混合 | Lenis · three · OGL · shader | — | 2 | 0 | — | — | Lenis + OGL + shader，DPR 封顶 2 |
| **rauno** | A 编辑叙事 | — | 720/14 | 2 | 0 | 3 | — | 720px 单场景巨字，靠尺度而非动效 |
| **family** | C 产品精细 | framer · Lottie | 68/17 | 44 | 0 | 6 | — | 37 处柔阴影、0 边框；自定义字族 Family + Inter |
| **linear** | C 产品精细 | rapier | 72/14 | 1 | 0 | 3 | — | 83 处边框 + 35 处阴影并存但层次分明；变量字重 510 |
| **vercel** | C 产品精细 | — | 64/14 | 0 | 0 | 0 | — | **GSAP 缓动 0 次**；字距 −0.06em 最激进；纯黑白灰 |
| **superlist** | C 产品精细 | — | 64/16 | 0 | 0 | — | — | 35 处柔阴影 + 6 族字体；无边框 |
| **mercury** | C 产品精细 | rapier | 65/16 | 1 | 0 | 1 | yes | 金融级克制：4px 圆角 + 硬投影 + 单色 |
| **apple** | C 产品精细 | three · OGL | 56/14 | 0 | 0 | 0 | — | 36 处边框 + 0 阴影；980px 圆形按钮 |
| **monks** | C 产品精细 | Lottie | 67/15 | 0 | 0 | — | — | Lottie 做插画动效，不用 GSAP |
| **bruno** | B 3D 沉浸 | GSAP · three · OGL · shader · rapier | — | 70 | 0 | 0 | — | 全屏 WebGL + rapier 物理；70 处缓动（相机/物理），页面不滚动 |
| **lusion** | B 3D 沉浸 | three · OGL · shader | 144/14 | 0 | 0 | 1 | yes | **容器内 3D 窗口**（78vw × 520px）而非全屏；DPR 封顶 1.5 |
| **igloo** | B 3D 沉浸 | — | — | 0 | 0 | 0 | — | 纯 canvas，DOM 几乎为空 |
| **resn** | B 3D 沉浸 | — | — | 0 | 0 | 0 | yes | 纯 canvas 体验 |
| **active** | B 3D 沉浸 | — | 15/15 | 0 | 0 | 0 | — | WebGL 单场景 |
| **daybreak** | B 3D 沉浸 | Lenis | 14/14 | 4 | 0 | 0 | — | bloom radius 0.375；Lenis 平滑 |
| **unseen** | A 编辑叙事 | — | 48/16 | 0 | 0 | 0 | — | 极简，低对比灰阶 |

## 读取方式

- **字号比** `最大字号/正文字号`：编辑型 5–18，产品型 4–5.1。低于 3 就是"温吞"。
- **缓动 / scrub**：bundle 里 `ease:` / `scrub:` 的出现次数。lando 479/117 是极端叙事页；vercel 0/0 说明纯 CSS。
- **滚动驱动**：5 个滚动位置之间 transform/opacity 发生变化的元素数。≥8 才算"滚动叙事"。
- **WebGL**：页面里存在 webgl/webgl2 canvas。

## 三个"反常识"结论

1. **vercel / linear / superlist 的 GSAP 缓动是 0 次**，但它们的审美不低于 lando。
   → "高级感"不等于"上 GSAP"。

2. **26 个站的 `pin: true` 合计出现 0 次**。横向滚动全部用 `sticky`。
   → 用 pin 做横向是过时做法。

3. **大标题字重普遍是 400–600**（实测 279 处声明：500 占 34%，400 占 31%，700 只占 9%）。
   → "标题要粗"是错的。
