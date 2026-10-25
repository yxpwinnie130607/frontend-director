# Motion — the live engine

Include this engine in every preview and every build. A page that only fades in on load has failed. A 2D card that writes text has also failed.

The first viewport is a Three.js studio. Copy the renderer (ACES, shadows, pointer orbit) from the 1–2 technique files you loaded. HUD is a whisper: top corners + a control **below** the object. Never put type on top of the mesh.

`prefers-reduced-motion: reduce` keeps the *job* (type, generate, crumple, jump) and slows the orbit.

## 1. Pointer orbit (required unless you are inside a room that looks)

```js
let mx = 0, my = 0, cx = 0, cy = 0;
addEventListener("pointermove", (e) => {
  mx = e.clientX / innerWidth - 0.5;
  my = e.clientY / innerHeight - 0.5;
});
(function tick() {
  cx += (mx - cx) * 0.06;
  cy += (my - cy) * 0.06;
  root.rotation.y = cx * 0.7;
  root.rotation.x = cy * 0.28;
  requestAnimationFrame(tick);
})();
```

Orbit the **volume**. Do not translate a 2D `.stage` card. Do not put a custom cursor on a still manifesto.

## 2. Type feeds the mesh (required for generate / 文案 / write tools)

Type reprints, stamps, or dissolves the **surface**. Never dump output into a textarea under a yellow button.

```js
function reprint(text) {
  mat.map.dispose();
  mat.map = paintSheet(text); // canvas the product wrote
  mat.needsUpdate = true;
}
```

Never show gray bars instead of text. Never overlap the reprint field with the object.

## 3. Scroll progress (only if kinetic-scroll is the loop)

```js
const pin = document.querySelector("[data-pin]");
function onScroll() {
  const r = pin.getBoundingClientRect();
  const max = pin.offsetHeight - innerHeight;
  const p = Math.min(1, Math.max(0, -r.top / max));
  document.documentElement.style.setProperty("--progress", p.toFixed(4));
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();
```

Bind the progress to the **mesh** (rotate, unfold, dissolve). A 2D clip-path poster is not enough.

## 4. Allowed vs fail

| Use | Fail |
|---|---|
| Pointer orbits a whole object with air around it | Fade-up on every block |
| Slider / wheel changes the volume | HUD colliding with the mesh (FOLD) |
| Type reprints the authored surface | Textarea + yellow fill (回声瓶) |
| Idle breath or slow spin | Infinite loops on informational cards |
| Chapter pin that drives 3 mesh properties | "Scroll to explore" on a still hero |

Animate mesh transforms and vertex mix. Never `top`, `left`, `width`, `height` on the hero.

```css
@media (prefers-reduced-motion: reduce) {
  /* keep the job; slow the orbit in JS */
}
```
