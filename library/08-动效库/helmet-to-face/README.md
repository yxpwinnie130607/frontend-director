# helmet-to-face — 人脸与金属面罩之间的波浪擦除

> Lando Norris 官网首屏。指针移入，人脸被一层金属面罩从顶部波浪状盖下来；
> 指针划过的地方会立刻被"擦"开，露出下面的金属。
>
> 来源：`https://lando.itsoffbrand.io`（OFF+BRAND 制作）
> 主 bundle：`https://assets.itsoffbrand.io/lando/dev-js/lando-by-OFF+BRAND.js`（1.45MB，未压缩）
> 逆向日期：2026-10-25 · 代码位置 `lando.js @1035745`（层 A）、`@1062925–1072990`（层 B）

---

## 一句话结论

**不是两个模型做 morph，也不是两张图做淡入。** 是一个全屏 2D 合成：人脸照片在底下，
头盔渲染结果在上面，用一条**随时钟上升的波浪边界**加一张**光标遮罩图**决定每个像素显示谁。

所以它有两层，几乎所有人都只看到一层：

```
层 A  sceneHead  头盔模型 + 带位移的平面 + 灯光  →  renderTarget
层 B  renderPlane  纯 2D ShaderMaterial：mix(人脸, RT, 遮罩)
```

**层 B 是整件事的关键**，也是"抄不走"的部分：人脸是照片，不能被灯打亮；
只有把它当成一张平图合成上去，脸才是脸。把两层合成一层做，人脸会被当成布料打光，一眼假。

---

## 层 A：为什么要先渲一张 RT

`lando.js @1056xxx` 的 helmet 场景：

```js
this.geometry = new PlaneGeometry(1, 1, 128, 128);       // 128×128 分段，位移要细分
this.material = new MeshStandardMaterial({
  displacementMap: textures.head.depth,                   // 深度
  displacementScale: 0.25,
  alphaMap:        textures.head.alpha,
  normalMap:       textures.head.normal,
  roughnessMap:    textures.head.roughness,
  metalnessMap:    textures.head.roughness,
  transparent: true,
});
```

位移量 0.25 是**模型空间绝对值**，会被 `mesh.scale` 再乘一次。
平面放大到铺满视口后，0.25 的位移会把曲面顶到相机前面，整屏全黑 —— 这是复现时第一个必踩的坑。
正确写法是 `displacementScale = 0.25 / scale`，让"位移 = 平面边长的 25%"。

头盔不是贴图，是 `models/helmet-21.glb` + 玻璃材质 + HDRI 实时渲染。
渲到 RT 再当贴图用，好处是：可以一次性拿到带光照、带位移、带反射的头盔，然后在 2D 层里随便混合。

---

## 层 B：合成链（逐行）

`lando.js @1072487` 起，原样：

```glsl
// 底：人脸
vec3 base = mix(background, textureDefaultDiffuse.rgb, textureDefaultDiffuse.a);

// 波浪边界
float hoverTransition = vUv.y + sin(vUv.x * PI) * sin(uHelmetHover * PI) * 0.2;

// 光标遮罩 + 进度遮罩，两个来源相加
cursorEffect += step(1.0 - hoverTransition, uHelmetHover);
cursorEffect = clamp(cursorEffect * uCursorIntensity, 0.0, 1.0);

// 头盔盖上去
vec3 final = mix(base, textureHelmet.rgb, cursorEffect * textureHelmet.a);
```

### 波浪那一行是什么

```glsl
vUv.y + sin(vUv.x * PI) * sin(uHelmetHover * PI) * 0.2
```

- 主项 `vUv.y`：边界本来是一条水平线，随进度从 y=1 降到 y=0
- `sin(vUv.x*PI)`：让这条线沿 x 方向弯成一个拱（中间高、两端齐）
- `sin(uHelmetHover*PI)`：**进度门**。进度 0 和 1 时它等于 0，边界是平的；
  正好走到一半（0.5）时它等于 1，边界最弯

结果就是：起手是平的、中段拱起来扫过去、收尾又拉平。**这一项决定了它像"液体掠过"而不是"wipe"。**
去掉它，同一套代码立刻变成一个廉价的条状转场。

### 光标擦除

`tCursorEffect` 是一张流体模拟的纹理（GPGPU，`world.fluidCursor.sourceTarget.texture`）。
指针移动 → 流体被推动 → 纹理里留下痕迹 → `step(0.1, 1.0 - r)` 把它变成硬边遮罩。

它和波浪遮罩是**相加**关系（`cursorEffect += ...`），所以：
整片区域在波浪推进的同时，指针划到哪里，哪里就先露出来。两种速度感叠在一起。

`vec2(vUv.x, 0.025 + vUv.y * 0.95)` 这个采样修正是原站注释里的 "Gap fix on bottom and top"，
防止 UV 贴边拉伸。

### 第二层：uFilter

```glsl
vec3 end = mix(textureDefaultDiffuse.rgb, vec3(0.05), 1.0 - textureDefaultDiffuse.a);
end = toGrayscale(end);
end = adjustContrast(end, 0.8);
end *= 0.75;
end = blendHardLight(end, COLOR_FILTER);     // COLOR_FILTER 是品牌色
vec3 transition = mix(final, end, uFilter);
```

`uFilter` 由 `[data-gl-track="head"]` 的 ScrollTrigger `scrub` 驱动（`0 → 1`，同时相机 z 从 0 到 −1）。
即**滚动**时整幅画面压成灰度 + 硬光品牌色。这是和 hover 完全独立的第二个效果，
别把两者混成一个。

---

## 参数表（原站实测值）

| 项 | 值 | 位置 |
|---|---|---|
| hover 进入 | `uHelmetHover 0→1`，`1.5s`，`expo.inOut` | `hoverAnimation()` |
| hover 离开 | `1→0`，`1.0s`，`expo.inOut` | 同上 |
| 波浪幅度 | `0.2` | shader |
| 光标阈值 | `step(0.1, 1.0 - r)` | shader |
| 位移 | `0.25`（需 ÷ mesh.scale） | material |
| 平面分段 | `128 × 128` | geometry |
| 相机 fov | `15` | `new PerspectiveCamera(15,…)` |
| 视差强度 | `0.075`，`createEasedNormalized(0.025)` | params.movement |
| 相机跟随 | `0.02` × normalized × helmetRevealValue | update() |
| 触发元素 | `[data-gl-helmet="hover"]` 的 `mouseenter/mouseleave` | `helmetHover()` |
| 滚动滤镜 | `uFilter 0→1` + 相机 `z 0→−1`，`scrub` | `transition()` |
| DPR 上限 | 1.25–2.0 | renderer |

---

## 质感是从哪来的

四个来源，缺一个就掉档：

1. **位移**（depth 图 0.25）—— 平面不是平的，它真的鼓起来了；指针移动时边缘有视差
2. **法线 + 粗糙度** —— 高光会随曲面动，而不是一张固定高光贴图
3. **HDRI 环境反射** —— 金属靠环境活着。没有 envMap 的金属是一块死黑，调 roughness 救不回来
4. **两层分离** —— 人脸不受光，头盔受光。这是"真"和"假"的分界

---

## 复现里简化了什么

| 原站 | 这里 | 影响 |
|---|---|---|
| GPGPU 流体光标 | 2D canvas 拖尾 + 每帧回白 | 笔刷边缘没有真实的流体质感，但时序和遮罩逻辑一致 |
| 头盔 3D 模型（glb + 玻璃材质） | 程序化生成的头盔图 | 换成真模型时改动在层 A，层 B 不用动 |
| studio HDR（`.hdr`） | 程序化等距柱状图 + 灯条 | 反射带位置可控，但没有真实 HDRI 的细节 |
| 人脸 `head.diffuse`（webp） | 程序化肖像 / `?assets` 加载真图 | `?assets` 下就是原图 |

**换成真资源只改一处**：把 5 张开到 `./assets/` 里，`index.html?assets` 打开。
shader 一行都不用改 —— 这是这次逆向能成立的自检标准。

真实资源清单（base `https://assets.itsoffbrand.io/lando/gl`）：

```
textures/head/webp/diffuse.webp              人脸，285KB
textures/head/webp/depth.webp                位移，3.6KB（很糊，但够）
textures/head/webp/normal.webp               147KB
textures/head/webp/roughness.webp            122KB
textures/head/webp/alpha.webp                38KB
textures/head/webp/shadow-softer-edit.webp   279KB（另一版人脸，阴影版）
hdri/studio_small_08_1k--light.hdr           378KB
models/helmet-21.glb                         头盔模型
```

它们没有 `Access-Control-Allow-Origin`，浏览器跨域直接取会被拦；下载到本地再引用即可。

---

## 移植到自己的项目

| 想要的效果 | 改什么 |
|---|---|
| 两个产品图互相过渡 | `tFace` 换图 A，`tHelmet` 换图 B，层 A 的材质换成普通 `map` + 少量位移 |
| 只在卡片上做 | 层 B 的 quad 从全屏改成卡片 bounds，`uHelmetHover` 由卡片 hover 驱动 |
| 不要光标擦除 | `uCursorIntensity = 0`（保留波浪） |
| 不要波浪，只要横扫 | 把 `sin(vUv.x*PI)*sin(uHelmetHover*PI)*0.2` 删掉 |
| 方向反过来（金属 → 人脸） | 交换 `tFace` / `tHelmet` 两张图 |
| 移动端 | 关掉光标（`pointer:coarse`），波浪保留；DPR 降到 1.25 |

---

## 失败判据

1. 合成只有一层 —— 人脸被打光（脸发灰、有高光斑、布料纹理被照亮）
2. 边界是直线（漏了 `sin(vUv.x*PI)` 或 `sin(uHelmetHover*PI)`）
3. 过渡全程都在拱（漏了 `sin(uHelmetHover*PI)` 的进度门，起止不平）
4. 用 `opacity` 淡入淡出代替遮罩 —— 两张图会同时半透明，出现鬼影
5. 金属发黑 —— 没有 envMap
6. 平面放大后位移失控 —— `displacementScale` 没有除以 `mesh.scale`
7. 时长用 `0.4s` 一类的默认值 —— 原站故意 1.5s，慢是这个效果的一半

---

## 验收

这类条目**不走 `verify.mjs` 的 12 项**（那套判据是给 DOM 排版用的）。用这四条：

- 控制台零报错，且 `THREE.WebGLProgram` 没有 shader 编译失败
- `?noauto` 下初始是底图（人脸），`?assets` 下与真图观感一致
- 帧耗时：1440×900、DPR 1.75 下 `requestAnimationFrame` 中位数 ≤ 20ms（本机实测 16.7ms）
- `prefers-reduced-motion: reduce` 时直接切终态，不做过渡

---

*下一个条目按 `library/08-动效库/README.md` 的目录规范和模板加。*
