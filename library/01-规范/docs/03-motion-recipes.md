# 03 · 动效配方（含真实代码片段）

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
