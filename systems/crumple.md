# crumple

> Technique recipe for the **material transform** loop family, not a site to clone. Steal the loop (a sheet crumples; material is the event). Invent a new sheet or body for **this** brief. Do not ship the changelog poster.

**Loop:** Recent「Crumple 更新日志」. A poster (the product page / a sentence / a cover) sits on white. Play or scroll: it **crumples into a 3D paper ball**. Material is the event.

**Use:** changelog, 文案, letter, 素笺, any product that is a sheet of words.  
**Never:** a still poster. If it does not crumple, it is not this template.

## Bind this brief

The poster texture is the user's real copy (draw on a canvas: title + 4 lines). 回声瓶: the sentence is the poster; crumple = drop into the bottle (ball). Generate tool: unfold = write, crumple = discard.

## Markup

```html
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet">
<style>
  :root { --bg: #f7f4ee; --ink: #171513; --font: "Satoshi", sans-serif; }
  html, body { margin: 0; height: 100%; background: var(--bg); color: var(--ink); font-family: var(--font); overflow: hidden; }
  #stage { position: fixed; inset: 0; }
  .name { position: fixed; top: 22px; left: 24px; font-size: 13px; }
  .go { position: fixed; left: 24px; bottom: 28px; background: none; border: 0; border-bottom: 1px solid #171513; font: 500 14px var(--font); cursor: pointer; }
</style>
<canvas id="stage"></canvas>
<div class="name">产品名</div>
<button class="go" id="go">揉皱 / 展开</button>
<script type="importmap">{ "imports": { "three": "https://unpkg.com/three@0.170.0/build/three.module.js" }}</script>
<script type="module">
import * as THREE from "three";

const paper = document.createElement("canvas");
paper.width = 1024; paper.height = 1280;
const g = paper.getContext("2d");
g.fillStyle = "#2f5fff"; g.fillRect(0, 0, 1024, 1280);
g.fillStyle = "#f4f1ea";
g.font = "700 96px Satoshi, sans-serif";
g.fillText("产品标题", 80, 280);
g.font = "500 42px Satoshi, sans-serif";
g.fillText("把用户的句子写在这张海報上", 80, 400);
const tex = new THREE.CanvasTexture(paper);

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("stage"), antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf7f4ee);
const camera = new THREE.PerspectiveCamera(32, innerWidth / innerHeight, 0.1, 40);
camera.position.set(0, 0.1, 6.2);
scene.add(new THREE.HemisphereLight(0xffffff, 0xc9bba8, 1));
const key = new THREE.DirectionalLight(0xfff6ea, 2);
key.position.set(2.5, 4, 3);
scene.add(key);

const geo = new THREE.PlaneGeometry(2.2, 2.75, 40, 50);
const pos = geo.attributes.position;
const base = pos.array.slice();
const crumpled = new Float32Array(base.length);
for (let i = 0; i < pos.count; i++) {
  const i3 = i * 3;
  const n = new THREE.Vector3(base[i3], base[i3 + 1], base[i3 + 2]).normalize();
  const r = 0.85 + Math.random() * 0.18;
  crumpled[i3] = n.x * r + (Math.random() - 0.5) * 0.15;
  crumpled[i3 + 1] = n.y * r + (Math.random() - 0.5) * 0.15;
  crumpled[i3 + 2] = n.z * r + (Math.random() - 0.5) * 0.15;
}
const mesh = new THREE.Mesh(
  geo,
  new THREE.MeshPhysicalMaterial({ map: tex, side: THREE.DoubleSide, roughness: 0.7, metalness: 0 })
);
scene.add(mesh);

let target = 0, mix = 0;
document.getElementById("go").onclick = () => { target = target > 0.5 ? 0 : 1; };
addEventListener("wheel", (e) => { target = Math.min(1, Math.max(0, target + e.deltaY * 0.0015)); }, { passive: true });

function resize() {
  renderer.setSize(innerWidth, innerHeight, false);
  camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
}
addEventListener("resize", resize); resize();

(function tick() {
  mix += (target - mix) * 0.06;
  const arr = pos.array;
  for (let i = 0; i < arr.length; i++) arr[i] = base[i] * (1 - mix) + crumpled[i] * mix;
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  mesh.rotation.y = mix * 0.8 + performance.now() * 0.00008;
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
})();
</script>
```

## Must

- The sheet becomes a ball (vertex mix). Wheel or a text control drives `mix`.
- Poster art is the product, drawn on canvas. Not a stock photo of Earth.
- Studio light, paper ground.

## Fail

- CSS `transform: scale` on a 2D image.
- A still album cover.
- A form next to the paper.
