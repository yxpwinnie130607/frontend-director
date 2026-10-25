# kinetic-scroll

Recent template: scroll-driven website posts (Web filter on https://recent.design). The scroll *is* the interaction. Type and image are puppets of progress.

**Use:** product marketing that should feel like a Recent site; brand stories; long landings.  
**Never:** dashboards, settings, docs.

## Fonts

```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
```

- Display: `Instrument Serif`.
- UI: `Instrument Sans`.

## Tokens — copy intact

```css
:root {
  --bg: #f3eee6;
  --ink: #11110f;
  --accent: #ff3b1f;
  --panel: #11110f;
  --panel-ink: #f3eee6;
  --font-display: "Instrument Serif", serif;
  --font-ui: "Instrument Sans", sans-serif;
  --progress: 0;
}
body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-ui);
}
```

`--progress` is 0–1 for the first pinned chapter. Drive it from scroll (motion.md).

## First viewport skeleton

One pinned chapter, 180–220vh tall, inner stage `100vh` sticky.

```
sticky 100vh
  WebGL mesh (copy studio camera from volume-object: FOV 32, z 5.2–6.2)
  scroll drives at least three MESH properties (rotate, unfold, dissolve, camera z)
  at progress 0.35–1 the product job hits the mesh
```

The pinned layer is a **WebGL object** (copy the studio renderer from `volume-object`). Scroll drives the mesh (rotate, explode, fill, unfold). A 2D type poster with clip-path only is not enough.

The first screen on load already moves if you nudge the wheel. If the user must scroll two pages before anything happens: fail.

## Required interaction

1. Include scroll progress from [motion.md](../motion.md). Bind at least **three mesh / camera** properties to `--progress` (rotate, unfold, dissolve, `camera.z`). A 2D clip-path poster is a fail.
2. At progress > 0.4 the product job hits the **mesh** (type reprints, unfold, dissolve). A 2D textarea is a fail.
3. A thin progress hairline tracks `--progress`.
4. `prefers-reduced-motion`: keep the product layer visible and usable; skip the pin.

## Rest of page

Two more chapters max, each with its own pin or wipe. No feature cards between chapters.

## Do not

- Fade-up each block 100ms and call it kinetic.
- A static type poster with "scroll to explore".
- Horizontal feature rules.
- Copy a Recent site's 3D flower or torus. Steal the scroll puppet, not the asset.
