# Motion — the live engine

Include this engine in every preview and every build. A page that only fades in on load has failed.

`prefers-reduced-motion: reduce` keeps the *job* (type, generate, add, open) and drops lerp / pin / custom cursor.

## 1. Pointer lerp (required unless kinetic-scroll is the only loop)

```js
let mx = 0.5, my = 0.5, cx = 0.5, cy = 0.5;
window.addEventListener("pointermove", (e) => {
  mx = e.clientX / innerWidth;
  my = e.clientY / innerHeight;
});
(function tick() {
  cx += (mx - cx) * 0.08;
  cy += (my - cy) * 0.08;
  document.documentElement.style.setProperty("--px", cx.toFixed(4));
  document.documentElement.style.setProperty("--py", cy.toFixed(4));
  requestAnimationFrame(tick);
})();
```

```css
.stage {
  transform: translate3d(calc((var(--px) - 0.5) * 24px), calc((var(--py) - 0.5) * 16px), 0);
}
.spot {
  background: radial-gradient(
    420px circle at calc(var(--px) * 100%) calc(var(--py) * 100%),
    rgba(255,255,255,0.16),
    transparent 55%
  );
}
```

## 2. Writer (required for generate / 文案 / write tools)

```js
function writeOut(el, text, ms = 12) {
  el.textContent = "";
  let i = 0;
  const id = setInterval(() => {
    el.textContent = text.slice(0, ++i);
    if (i >= text.length) clearInterval(id);
  }, ms);
}
```

Never dump the full output in one frame. Never show gray bars instead of text.

## 3. Scroll progress (required for kinetic-scroll)

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

Bind 3 properties to `--progress`. Example:

```css
.word {
  transform: scale(calc(1.15 - var(--progress) * 0.35));
  clip-path: inset(0 0 calc(var(--progress) * 40%) 0);
}
.panel { transform: translateY(calc((1 - var(--progress)) * 40vh)); }
```

## 4. Magnetic control

```js
const btn = document.querySelector("[data-magnet]");
btn.addEventListener("pointermove", (e) => {
  const r = btn.getBoundingClientRect();
  const x = e.clientX - (r.left + r.width / 2);
  const y = e.clientY - (r.top + r.height / 2);
  btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
});
btn.addEventListener("pointerleave", () => { btn.style.transform = ""; });
```

## 5. Allowed vs fail

| Use | Fail |
|---|---|
| One continuous loop (pointer or scroll) plus one job (type/generate/add) | Fade-up on every block |
| Spring on the object you just used | Infinite loops on informational cards |
| Chapter pin that changes 3 properties | "Scroll to explore" on a still hero |
| Writer for output | Gray bars, fake window, dead list |

Animate only `transform` and `opacity` (plus `clip-path` for kinetic-scroll). Never `top`, `left`, `width`, `height`.

```css
@media (prefers-reduced-motion: reduce) {
  .stage, .word, .panel, [data-magnet] { transform: none !important; }
  .spot { display: none; }
}
```
