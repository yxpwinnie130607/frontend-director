# volume-object

Recent template from the reel: **Earth Timeline** (one sphere, a slider, the surface changes) and **Crumple changelog** (a poster becomes a paper ball). Also Liquid Glass / crumpled paper on the homepage. A lit object sits in a studio. You use *the object*, not a form.

**Use:** default for every product / virtual product / 文案 / generate / 回声瓶-class brief.  
**Never:** a rounded card with a textarea. That is Specimen D.

The first viewport is a **WebGL studio**. Headline is a whisper. The 3D object is ≥ 70% of the viewport.

## Fonts

```html
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet">
```

UI only: `Satoshi`. The object carries the design.

## Tokens — copy intact

```css
:root {
  --bg: #0a0b0e;
  --ink: #f4f1ea;
  --dim: #8b8794;
  --font-ui: "Satoshi", sans-serif;
}
html, body { margin: 0; height: 100%; background: var(--bg); color: var(--ink); font-family: var(--font-ui); overflow: hidden; }
#stage { position: fixed; inset: 0; }
.hud {
  position: fixed; left: 24px; right: 24px; bottom: 28px;
  display: flex; gap: 12px; align-items: center;
  pointer-events: none;
}
.hud input, .hud button { pointer-events: auto; }
.hud input {
  flex: 1; background: transparent; border: 0; border-bottom: 1px solid #3a3a40;
  color: var(--ink); font: 500 16px/1.4 var(--font-ui); outline: none;
}
.hud button {
  background: none; border: 0; color: var(--ink); font: 500 14px var(--font-ui);
  text-decoration: underline; text-underline-offset: 4px; cursor: pointer;
}
.name { position: fixed; top: 22px; left: 24px; font-size: 13px; letter-spacing: 0.08em; }
```

No yellow fill button. No `#14161c` card. No "工作台" chrome.

## First viewport skeleton

```
fullscreen WebGL canvas#stage
tiny name, top left
HUD strip at the bottom: one line input + text action
the product IS the mesh (vessel / orb / sheet), centered, lit
```

Pick **one** metaphor from the brief. Do not invent a second object.

| Brief | Mesh |
|---|---|
| bottle / jar / 瓶 / 回声 / drop a sentence | Glass vessel (`MeshPhysicalMaterial` transmission) |
| generate / 文案 / write | Soft clay orb or stacked paper sheets |
| clip / save | A tray / plate with thickness and shadow |

## Required scene (copy, then change only the mesh)

```html
<script type="importmap">
{ "imports": {
  "three": "https://unpkg.com/three@0.170.0/build/three.module.js",
  "three/addons/": "https://unpkg.com/three@0.170.0/examples/jsm/"
}}
</script>
<script type="module">
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.getElementById("stage").appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0b0e);
scene.fog = new THREE.Fog(0x0a0b0e, 8, 18);

const camera = new THREE.PerspectiveCamera(32, innerWidth / innerHeight, 0.1, 40);
camera.position.set(0, 0.35, 6.2);

const env = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04);
scene.environment = env.texture;

const key = new THREE.DirectionalLight(0xfff4e5, 2.2);
key.position.set(3.2, 5.4, 2.4);
key.castShadow = true;
scene.add(key, new THREE.HemisphereLight(0xb9d4ff, 0x1a120c, 0.55));
const rim = new THREE.DirectionalLight(0x8eb8ff, 1.1);
rim.position.set(-4, 1.2, -2);
scene.add(rim);

const floor = new THREE.Mesh(
  new THREE.CircleGeometry(7, 64),
  new THREE.MeshStandardMaterial({ color: 0x111218, roughness: 0.9, metalness: 0.1 })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1.35;
floor.receiveShadow = true;
scene.add(floor);

const root = new THREE.Group();
scene.add(root);

// Vessel example (swap for orb / sheets). NEVER a MeshBasicMaterial cube.
const glass = new THREE.MeshPhysicalMaterial({
  color: 0xdde7ff,
  metalness: 0,
  roughness: 0.08,
  transmission: 0.92,
  thickness: 1.2,
  ior: 1.48,
  clearcoat: 1,
  clearcoatRoughness: 0.04,
  envMapIntensity: 1.4,
});
const body = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.95, 2.1, 64, 1, true), glass);
const lip = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.06, 16, 64), glass);
lip.position.y = 1.05;
const water = new THREE.Mesh(
  new THREE.CylinderGeometry(0.78, 0.88, 0.9, 64),
  new THREE.MeshPhysicalMaterial({ color: 0x7aa0c8, roughness: 0.15, transmission: 0.6, thickness: 0.8, transparent: true, opacity: 0.85 })
);
water.position.y = -0.35;
body.castShadow = lip.castShadow = water.castShadow = true;
root.add(body, lip, water);

let tx = 0, ty = 0, cx = 0, cy = 0;
addEventListener("pointermove", (e) => {
  tx = (e.clientX / innerWidth - 0.5) * 0.7;
  ty = (e.clientY / innerHeight - 0.5) * 0.4;
});

function dropIn(text) {
  const spr = makeLabel(text);
  spr.position.set((Math.random() - 0.5) * 0.3, 2.2, 0);
  root.add(spr);
  const start = performance.now();
  (function fall() {
    const t = Math.min(1, (performance.now() - start) / 900);
    spr.position.y = 2.2 - t * 2.1;
    spr.rotation.z = t * 0.6;
    if (t < 1) requestAnimationFrame(fall);
  })();
  root.rotation.z = 0.12;
}

function makeLabel(text) {
  const c = document.createElement("canvas");
  c.width = 512; c.height = 128;
  const g = c.getContext("2d");
  g.fillStyle = "#f4f1ea";
  g.font = "600 36px Satoshi, sans-serif";
  g.fillText(text.slice(0, 18), 16, 80);
  const tex = new THREE.CanvasTexture(c);
  const m = new THREE.Mesh(
    new THREE.PlaneGeometry(1.4, 0.35),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true })
  );
  return m;
}

document.querySelector("[data-drop]").addEventListener("click", () => {
  dropIn(document.querySelector("[data-line]").value || "…");
});

addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

(function tick() {
  cx += (tx - cx) * 0.06;
  cy += (ty - cy) * 0.06;
  root.rotation.y = cx * 1.2 + performance.now() * 0.00012;
  root.rotation.x = cy * 0.5;
  root.rotation.z += (0 - root.rotation.z) * 0.04;
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
})();
</script>
```

## Required interaction

1. Pointer orbits the object (lerp). Idle: a slow spin. The object has weight.
2. The product job happens **to the mesh**: drop a line into the vessel, press the orb to write, peel a sheet. The HUD input is only a way to feed the object.
3. Light and material are studio-grade: `MeshPhysicalMaterial` or `MeshStandardMaterial`, ACES, shadows, RoomEnvironment. Unlit / `MeshBasicMaterial` hero = fail.
4. Seed one object already in the scene so the first frame is not an empty studio.

## Rest of page

After the studio, one more 3D beat or a quiet list of dropped things. No feature cards.

## Do not

- A dark rounded panel, textarea, yellow "投入瓶中" button. That is 回声瓶 / Specimen D.
- An unlit cube or three.js default geometry dumped on black.
- Clone Recent's flower / torus mesh literally. Steal the *studio* (light, material, scale, orbit).
- Overlay a marketing headline so large it hides the object.
