# 04 · 3D 与 WebGL（怎么做出"贵"，而不是"炫"）

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
