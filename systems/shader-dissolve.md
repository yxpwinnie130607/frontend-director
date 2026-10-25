# shader-dissolve

> Technique recipe for the **field / shader** loop family, not a site to clone. Steal the loop (an object dissolves into a living field). Invent a new object for **this** brief. Do not ship the Vercel jacket.

**Loop:** Recent「Vercel 商店着色器」. A product object on black. WebGL eats half of it into a **living white-dot field**. Micro-interaction. High contrast.

**Use:** product marketing, commerce, a tool you can "turn on."  
**Never:** a PNG of a jacket with a CSS gradient.

## Bind this brief

The object is the product (draw it on canvas: name + one sentence, or use their image). 文案: the paragraph dissolves into points as you generate the next line. 回声瓶: the sentence becomes a swarm, then a new sentence.

## Markup

```html
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet">
<style>
  :root { --bg: #050506; --ink: #f4f1ea; --font: "Satoshi", sans-serif; }
  html, body { margin: 0; height: 100%; background: var(--bg); color: var(--ink); font-family: var(--font); overflow: hidden; }
  #stage { position: fixed; inset: 0; }
  h1 { position: fixed; left: 8vw; top: 18vh; max-width: 10ch; font-size: clamp(36px, 6vw, 72px); line-height: 0.95; margin: 0; pointer-events: none; }
</style>
<canvas id="stage"></canvas>
<h1>产品一句</h1>
<script type="importmap">{ "imports": { "three": "https://unpkg.com/three@0.170.0/build/three.module.js" }}</script>
<script type="module">
import * as THREE from "three";
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("stage"), antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050506);
const camera = new THREE.PerspectiveCamera(32, innerWidth / innerHeight, 0.1, 40);
camera.position.z = 6;
const count = 14000;
const geo = new THREE.BufferGeometry();
const pos = new Float32Array(count * 3);
const home = new Float32Array(count * 3);
for (let i = 0; i < count; i++) {
  const x = (Math.random() - 0.2) * 3.2;
  const y = (Math.random() - 0.5) * 4.2;
  const z = (Math.random() - 0.5) * 0.3;
  pos[i*3] = x; pos[i*3+1] = y; pos[i*3+2] = z;
  home[i*3] = x * 2.4; home[i*3+1] = y * 1.2; home[i*3+2] = (Math.random() - 0.5) * 2.5;
}
geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
const points = new THREE.Points(
  geo,
  new THREE.PointsMaterial({ color: 0xffffff, size: 0.018, sizeAttenuation: true })
);
scene.add(points);
let mx = 0.35;
addEventListener("pointermove", (e) => { mx = e.clientX / innerWidth; });
function resize() {
  renderer.setSize(innerWidth, innerHeight, false);
  camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
}
addEventListener("resize", resize); resize();
const attr = geo.attributes.position;
(function tick() {
  const a = attr.array;
  const t = mx;
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const k = (pos[i3] + 1.6) / 3.2;
    const dissolve = Math.max(0, Math.min(1, (t - k + 0.15) * 3));
    a[i3] = pos[i3] + (home[i3] - pos[i3]) * dissolve;
    a[i3+1] = pos[i3+1] + (home[i3+1] - pos[i3+1]) * dissolve + Math.sin(performance.now()*0.001 + i) * 0.01 * dissolve;
    a[i3+2] = pos[i3+2] + (home[i3+2] - pos[i3+2]) * dissolve;
  }
  attr.needsUpdate = true;
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
})();
</script>
```

## Must

- Pointer X (or hover) dissolves the object into living points. Points keep moving.
- Black studio. Type is huge and quiet, not a card.
- The silhouette should read as *this* product (draw it, or cluster the points into a bottle / sheet / mark).
- After the dissolve, the field is still *this* object: a sheet-shaped cloud, a word as a constellation. Sample points from **bright authored marks** (type, dye edge), not 4% random plane pixels. Scatter ≤ 3% of the glyph width or the line becomes a smear. A generic starfield, a soft bar of dots, **or two beige blobs on a leftover stick** with no readable word is a fail (VEIL / STRIKE). The after-event screenshot must still let you read the line.

## Fail

- CSS blur on a photo.
- A jacket you copied from Vercel.
- A yellow button.
