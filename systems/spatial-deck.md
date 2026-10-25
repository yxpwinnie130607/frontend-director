# spatial-deck

> Technique recipe for the **spatial deck** loop family, not a site to clone. Steal the loop (you navigate floating objects). Invent new pieces for **this** brief. Do not ship the cassette.

**Loop:** Recent「WebGL 作品集」. Dark 3D space. Objects float (cards, a cassette, a bottle). You navigate. Click brings one forward. HUD is overlay, not a form.

**Use:** portfolio, multi-piece product, history of echoes / generations.  
**Never:** a CSS grid of project tiles.

## Bind this brief

Each mesh is a thing the product made. 回声瓶: 4 floating bottles, click to hear that echo (write the line on a plane). 文案: 4 generations. Portfolio: 4 works. Use the user's names.

## Markup

```html
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet">
<style>
  :root { --bg: #050506; --ink: #f4f1ea; --font: "Satoshi", sans-serif; }
  html, body { margin: 0; height: 100%; background: var(--bg); color: var(--ink); font-family: var(--font); overflow: hidden; }
  #stage { position: fixed; inset: 0; }
  .hud { position: fixed; left: 24px; bottom: 28px; font-size: 13px; letter-spacing: 0.08em; pointer-events: none; }
</style>
<canvas id="stage"></canvas>
<div class="hud" id="hud">产品名</div>
<script type="importmap">{ "imports": { "three": "https://unpkg.com/three@0.170.0/build/three.module.js" }}</script>
<script type="module">
import * as THREE from "three";
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("stage"), antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050506);
scene.fog = new THREE.Fog(0x050506, 6, 16);
const camera = new THREE.PerspectiveCamera(40, innerWidth / innerHeight, 0.1, 40);
camera.position.set(0, 0.4, 7.2);
scene.add(new THREE.HemisphereLight(0xffffff, 0x111111, 0.8));
const key = new THREE.DirectionalLight(0xffffff, 1.6);
key.position.set(3, 4, 6); scene.add(key);

const items = ["一", "二", "三", "四"].map((label, i) => {
  const g = new THREE.Group();
  const card = new THREE.Mesh(
    new THREE.BoxGeometry(1.8, 1.15, 0.04),
    new THREE.MeshPhysicalMaterial({ color: 0xf2efe6, roughness: 0.35, metalness: 0.05, clearcoat: 0.6 })
  );
  g.add(card);
  const ang = (i / 4) * Math.PI * 2;
  g.position.set(Math.sin(ang) * 2.4, (i % 2) * 0.5 - 0.2, Math.cos(ang) * 2.4);
  g.userData = { label, home: g.position.clone() };
  scene.add(g);
  return g;
});

const ray = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let focus = null;
addEventListener("pointermove", (e) => {
  mouse.x = (e.clientX / innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / innerHeight) * 2 + 1;
});
addEventListener("click", () => {
  ray.setFromCamera(mouse, camera);
  const hit = ray.intersectObjects(items, true)[0];
  focus = hit ? hit.object.parent : null;
  document.getElementById("hud").textContent = focus ? focus.userData.label : "产品名";
});
function resize() {
  renderer.setSize(innerWidth, innerHeight, false);
  camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
}
addEventListener("resize", resize); resize();
(function tick() {
  const t = performance.now() * 0.00015;
  camera.position.x += ((mouse.x * 1.4) - camera.position.x) * 0.04;
  camera.position.y += ((0.4 + mouse.y * 0.5) - camera.position.y) * 0.04;
  camera.lookAt(0, 0, 0);
  items.forEach((g, i) => {
    const want = focus === g ? new THREE.Vector3(0, 0.2, 3.2) : g.userData.home;
    g.position.lerp(want, 0.08);
    g.rotation.y = t + i;
  });
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
})();
</script>
```

## Must

- Four or more objects in dark space. Pointer moves the camera. Click brings one forward.
- Each piece needs an authored map or silhouette. Bare `BoxGeometry` + cream physical is a vitamin deck (KEPT cousin).
- Fog, physical materials, ACES.
- HUD only names the focused piece.

## Fail

- CSS cards in a row.
- A cassette cloned from the Recent post.
- A 工作台 form.
