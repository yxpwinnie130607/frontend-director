# earth-timeline

> Technique recipe for the **object + control** loop family, not a site to clone. Steal the loop (a control changes a volume). Invent a new object for **this** brief. Do not ship Earth unless that metaphor fits.

**Loop:** Recent「地球时间线」. One lit volume on a white (or ink) studio. A hairline slider. Drag it: the surface and color change. Nothing else on the first screen.

**Use:** any product that has a state you can scrub (generate, tone, time, density, 回声瓶 "how many echoes").  
**Never:** a form. The sphere *is* the UI.

## Bind this brief

Map the product to the sphere. 文案 / generate: slider = tone or length, surface writes the line. 回声瓶: slider = how deep the sentence sank; glass + water color shift. Do not keep a planet texture if the product is not Earth. Keep the *loop*.

## Markup

```html
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet">
<style>
  :root { --bg: #f4f1ea; --ink: #11110f; --font: "Satoshi", sans-serif; }
  html, body { margin: 0; height: 100%; background: var(--bg); color: var(--ink); font-family: var(--font); overflow: hidden; }
  #stage { position: fixed; inset: 0; }
  .name { position: fixed; top: 22px; left: 24px; font-size: 13px; letter-spacing: 0.08em; }
  .rail { position: fixed; left: 12vw; right: 12vw; bottom: 40px; }
  .rail input { width: 100%; accent-color: #111; }
  .cap { display: flex; justify-content: space-between; font-size: 12px; opacity: 0.5; margin-top: 8px; }
</style>
<canvas id="stage"></canvas>
<div class="name">产品名</div>
<div class="rail">
  <input id="t" type="range" min="0" max="1" step="0.001" value="1">
  <div class="cap"><span>左端状态</span><span>右端状态</span></div>
</div>
<script type="importmap">{ "imports": { "three": "https://unpkg.com/three@0.170.0/build/three.module.js" }}</script>
<script type="module">
import * as THREE from "three";
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("stage"), antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf4f1ea);
const camera = new THREE.PerspectiveCamera(32, innerWidth / innerHeight, 0.1, 40);
camera.position.set(0, 0.15, 5.4);
scene.add(new THREE.HemisphereLight(0xffffff, 0xb9a98a, 0.9));
const key = new THREE.DirectionalLight(0xfff4e5, 2.4);
key.position.set(3, 4, 2);
scene.add(key);
const mat = new THREE.MeshPhysicalMaterial({
  color: 0x3d7d4f, roughness: 0.45, metalness: 0.05, clearcoat: 0.4,
});
const ball = new THREE.Mesh(new THREE.SphereGeometry(1.15, 96, 96), mat);
scene.add(ball);
const a = new THREE.Color(0xc9a227);
const b = new THREE.Color(0x2f6d4a);
const c = new THREE.Color(0x1a3a6b);
document.getElementById("t").addEventListener("input", (e) => {
  const t = +e.target.value;
  mat.color.copy(a).lerp(b, Math.min(1, t * 2)).lerp(c, Math.max(0, t * 2 - 1));
  ball.scale.setScalar(0.92 + t * 0.16);
});
let mx = 0, my = 0;
addEventListener("pointermove", (e) => { mx = (e.clientX / innerWidth - 0.5); my = (e.clientY / innerHeight - 0.5); });
function resize() {
  renderer.setSize(innerWidth, innerHeight, false);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
}
addEventListener("resize", resize); resize();
(function tick() {
  ball.rotation.y += 0.003 + mx * 0.01;
  ball.rotation.x += (my * 0.4 - ball.rotation.x) * 0.04;
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
})();
</script>
```

## Must

- One sphere, studio light, ACES. Slider drives **color + scale + at least one more** (roughness, or a canvas texture you draw the product line onto).
- Pointer orbits slightly. Idle spin.
- White or paper ground like the Recent post, unless the brief is night.

## Fail

- Earth texture copied as a default for a writing tool.
- A card under the sphere.
- No slider / no surface change.
