# portal-room

> Technique recipe for the **room you enter** loop family, not a site to clone. Steal the loop (you are inside; a portal jumps the world). Invent a new room for **this** brief. Do not ship the baroque sofa or snow temple.

**Loop:** Recent「高斯喷射传送门跳跃」. You are **inside a room**. A glowing portal. Click / walk: the world swaps (bedroom → courtyard → next). Real-time 3D. You do not need a real Gaussian splat; you need the *jump*.

**Use:** brand, campaign, 回声瓶-as-a-place, any product that is a room you enter.  
**Never:** a picture of a room in a rounded card.

## Bind this brief

Each world is a product state. 回声瓶: room A = empty night, room B = water, room C = the echo written on the walls. 文案: each portal is a tone. Do not copy the baroque sofa or the snow temple.

## Markup

```html
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet">
<style>
  :root { --bg: #0b0c10; --ink: #f4f1ea; --font: "Satoshi", sans-serif; }
  html, body { margin: 0; height: 100%; background: var(--bg); color: var(--ink); font-family: var(--font); overflow: hidden; }
  #stage { position: fixed; inset: 0; }
  .hint { position: fixed; left: 24px; bottom: 28px; font-size: 13px; letter-spacing: 0.06em; }
</style>
<canvas id="stage"></canvas>
<div class="hint">看向光圈，点击跳跃</div>
<script type="importmap">{ "imports": { "three": "https://unpkg.com/three@0.170.0/build/three.module.js" }}</script>
<script type="module">
import * as THREE from "three";
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("stage"), antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.shadowMap.enabled = true;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 80);
camera.position.set(0, 1.5, 6);
const worlds = [
  { fog: 0x1a1020, floor: 0x2a2030, accent: 0xff8ad4, name: "夜" },
  { fog: 0x102018, floor: 0x1c2a22, accent: 0x8dffe3, name: "庭" },
  { fog: 0x201810, floor: 0x2a2418, accent: 0xffd27a, name: "厅" },
];
let w = 0;
function applyWorld() {
  const s = worlds[w];
  scene.background = new THREE.Color(s.fog);
  scene.fog = new THREE.Fog(s.fog, 6, 22);
  floor.material.color.set(s.floor);
  ring.material.color.set(s.accent);
  ring.material.emissive.set(s.accent);
}
scene.add(new THREE.HemisphereLight(0xc8d8ff, 0x1a120c, 0.7));
const key = new THREE.DirectionalLight(0xfff2d8, 1.8);
key.position.set(4, 7, 3); key.castShadow = true; scene.add(key);

const floor = new THREE.Mesh(
  new THREE.CircleGeometry(10, 64),
  new THREE.MeshStandardMaterial({ color: 0x2a2030, roughness: 0.9 })
);
floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
const wall = new THREE.Mesh(
  new THREE.BoxGeometry(16, 5, 0.3),
  new THREE.MeshStandardMaterial({ color: 0x3a3240, roughness: 0.85 })
);
wall.position.set(0, 2.4, -7); scene.add(wall);

const ring = new THREE.Mesh(
  new THREE.TorusGeometry(1.1, 0.045, 16, 80),
  new THREE.MeshStandardMaterial({ color: 0xff8ad4, emissive: 0xff8ad4, emissiveIntensity: 2.2 })
);
ring.position.set(0, 1.6, -5.2);
scene.add(ring);
const hero = new THREE.Mesh(
  new THREE.SphereGeometry(0.35, 48, 48),
  new THREE.MeshPhysicalMaterial({ color: 0xdde8ff, transmission: 0.7, roughness: 0.1, thickness: 0.6 })
);
hero.position.set(1.6, 0.55, 1.2); hero.castShadow = true; scene.add(hero);

applyWorld();
let yaw = 0, pitch = 0, ty = 0, tp = 0;
addEventListener("pointermove", (e) => {
  ty = (e.clientX / innerWidth - 0.5) * 0.8;
  tp = (0.5 - e.clientY / innerHeight) * 0.35;
});
addEventListener("click", () => {
  w = (w + 1) % worlds.length;
  applyWorld();
  document.querySelector(".hint").textContent = worlds[w].name;
});
function resize() {
  renderer.setSize(innerWidth, innerHeight, false);
  camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
}
addEventListener("resize", resize); resize();
(function tick() {
  yaw += (ty - yaw) * 0.06; pitch += (tp - pitch) * 0.06;
  camera.lookAt(Math.sin(yaw) * 4, 1.4 + pitch, -4);
  ring.rotation.z += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
})();
</script>
```

## Must

- Camera is *in* the room. Pointer looks. Click jumps the world (fog, floor, emissive).
- A glowing ring. A hero object you could use (glass, vessel).
- Three worlds minimum.

## Fail

- A screenshot of an interior.
- Gaussian-splat assets you do not have. Build the room.
- A 工作台 form over the canvas.
