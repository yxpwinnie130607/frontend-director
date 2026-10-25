# GSAP + Lenis

> 两个库，一件事：**让滚动和动画在同一条时间线上**。
> 这篇是从 GSAP 官方 skills（`greensock/gsap-skills`）和 Lenis 官方 README/源码里提炼的，
> 加上了在本机实测踩到的坑。参数都是原值，不是"建议值"。

---

## 为什么必须一起用

浏览器原生滚动是**异步**的：`scroll` 事件比合成帧晚，而且各浏览器补帧策略不同。
结果是 scroll-linked 动画永远差一点 —— 你会看到"跟手但不齐"的抖动。

Lenis 把滚动位置变成自己可控的插值（`lerp`），GSAP 的 ticker 驱动这个插值，
ScrollTrigger 监听 Lenis 的位置。三者同帧，抖动消失。

**这不是"丝滑滚动效果"的装饰，是修一个真问题。**

---

## 唯一正确的接法

```js
const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, touchMultiplier: 1.25 });

lenis.on('scroll', ScrollTrigger.update);        // trigger 知道位置变了
gsap.ticker.add((time) => lenis.raf(time * 1000)); // Lenis 被主时钟驱动
gsap.ticker.lagSmoothing(0);
```

三行缺一不可：

| 漏掉 | 症状 |
|---|---|
| `lenis.on('scroll', ScrollTrigger.update)` | 动画跟得上，但触发器判定滞后一拍 |
| `gsap.ticker.add(...)` | Lenis 完全不动（没人在驱动它的 raf） |
| `lagSmoothing(0)` | 掉一帧后 GSAP 会"追帧"，滚动动画会突然跳一下 |

`time` 是**秒**，`lenis.raf` 要毫秒 —— 必须 `* 1000`。

---

## Lenis 参数（官方默认值，按需改）

| 参数 | 默认 | 说明 |
|---|---|---|
| `lerp` | `0.1` | 插值强度。**设了 lerp，duration/easing 全部失效** |
| `duration` | `1.2` | 秒。只在不设 lerp 时生效 |
| `wheelMultiplier` | `1` | 滚轮灵敏度 |
| `touchMultiplier` | `1` | 触摸灵敏度。桌面站常用 1.25 |
| `smoothWheel` | `true` | |
| `syncTouch` | `false` | 让触摸也走插值。iOS < 16 会不稳，慎用 |
| `autoRaf` | `false` | 官方新增：自动跑 raf。**用了它就别再挂 gsap.ticker**，二选一 |
| `anchors` | `false` | 锚点平滑跳转 |

官方推荐 CSS（不引会有布局问题）：

```css
html.lenis,html.lenis body{height:auto}
.lenis.lenis-smooth{scroll-behavior:auto!important}
.lenis.lenis-smooth [data-lenis-prevent]{overscroll-behavior:contain}
.lenis.lenis-stopped{overflow:hidden}
.lenis.lenis-scrolling iframe{pointer-events:none}
```

嵌套滚动区加 `data-lenis-prevent`，别开 `allowNestedScroll`（每次滚动都走一遍 DOM 树）。

---

## 三个实测的坑（都会让你以为是库坏了）

### 1. CSS `translateY(100%)` + GSAP `yPercent` 会打架

```css
.line > span{ transform: translateY(100%) }   /* 遮罩外 */
```
```js
gsap.to('.line > span', { yPercent: 0 })      // ❌ 什么都不动
```

GSAP 解析百分比时会换算成 **`y` = 元素高度（px）**，而 `yPercent` 是**另一个属性**。
只动 `yPercent`，那 68px 的 `y` 还在 —— 标题永远留在遮罩外。

```js
gsap.set('.line > span', { yPercent: 110, y: 0 });  // ✅ 先收干净
gsap.to('.line > span', { yPercent: 0, duration: 0.95 });
```

**判据**：元素该从上往下出现却完全不见了 → 查 `y`，不是查 `yPercent`。

### 2. `.to()` 读不到你写在 CSS 里的初值

同理：CSS 里写 `transform: translateY(18px)`，GSAP 能读到（换算成 y），所以 `to({y:0})` 有效。
但写 `opacity: 0` 而目标写 `to({opacity: 1})` 也有效。
**只有百分比位移和 CSS 变量这类"非 px 属性"会失配**。拿不准就用 `fromTo`。

### 3. pin 只在桌面生效，小屏必须单独补场景

`pin` 住一屏在手机上会把内容切掉。用 `gsap.matchMedia()` 分支：

```js
const mm = gsap.matchMedia();
mm.add('(min-width: 901px)', () => { /* pin + scrub 完整场景 */ });
mm.add('(max-width: 900px)', () => { /* 轻量版：元素进入即触发 */ });
```

**别只写桌面分支就收工** —— 签名动作会在移动端整个消失（转写永远是灰的），
而且因为 `matchMedia` 的回调是懒执行的，你不会看到报错。

`matchMedia` 的好处是断点切换时 GSAP 自动回收上一条场景，不留野 trigger。

---

## ScrollTrigger 的实测数值

签名段（pin 一屏 + 三步推进）：

```js
gsap.timeline({
  scrollTrigger: {
    trigger: '.trace',
    start: 'top top',
    end: '+=1500',        // 1500px 滚动对应三步，别用百分比
    pin: '.trace-pin',    // pin 内层容器，不是 section 本身
    scrub: 1,             // 1 秒惯性，不是硬跟手
    anticipatePin: 1,
    invalidateOnRefresh: true,
  },
});
```

| 项 | 取值 | 理由 |
|---|---|---|
| `end` | `+=1500` | 按"要推进几步"给固定距离，比 `100%` 好预测 |
| `pin` | 内层 `.trace-pin` | pin 外层会让 scroll 高度算错 |
| `scrub` | `1` | 0 太硬（像拖拽），2 以上明显滞后 |
| `anticipatePin` | `1` | 防止 pin 瞬间的 1px 抖动 |

时间线用 **label** 定位，别累加 `"+=0.1"` —— 改一处不会把后面全推倒。

列表进入用 `ScrollTrigger.batch()`，不是逐个 `create()`：

```js
ScrollTrigger.batch('[data-rise]', {
  start: 'top 88%', once: true,
  onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, stagger: 0.06 }),
});
```

---

## 性能（1440×900 实测）

Tempo 落地页：27 个 ScrollTrigger + pin + 3 个 scrub 场景，`p95 = 16.9ms`（60Hz 满帧）。

做到的：

- 只动 `transform` / `opacity`；`letterSpacing` 是用在一次性 scrub 上（尾段大字），不是每帧
- 高频属性用 `quickTo`（鼠标跟随），不要每次 `new Tween`
- `will-change` 只给真正在动的元素
- `ScrollTrigger.refresh()` 绑在 `document.fonts.ready` 上，不绑 resize
- 移动端关掉 pin 和 scrub 场景

没做到的不要做：不要给每个元素加 `force3D: true`；不要在一个 timeline 里塞 200 个 tween。

---

## 什么时候**不要**上这套

- 后台、表单、表格密集页：Lenis 会和原生滚动行为打架，用户会骂
- 高密度转化页（价格表 + 功能矩阵）：滚动动画会干扰扫读
- 完全静态的品牌单页：收益 < 成本

**判据**：页面有没有"要讲的一段时间"。没有，就别装。

---

## Lenis 官方 showcase 里值得看的

`lenis.dev/showcase`。和产品站最相关的几个：

| 站 | 值得看什么 |
|---|---|
| Granola (`go.granola.ai`) | 同类产品（AI 会议笔记）。滚动节奏克制，靠留白不靠特效 |
| darkroom.engineering | Lenis 作者自己的站，最"标准"的用法 |
| Supercolor (`supercolor.cool`) | 高饱和 + 大滚动段落，测性能的好样本 |
| The Cartier Roadster | 大品牌怎么做横向叙事（pin + 横移） |
| 45R Indigo Story | 长叙事 + 图文交替，编辑型的参考 |

读它们的时候看三件事：**一屏几个决定**、**滚动距离与内容量的比例**、**有没有一处是"只属于这个站"的动作**。
