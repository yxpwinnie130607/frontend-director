# crumple

> Technique for the **material transform** family. Steal the loop (a sheet becomes a wad). Invent a new poster for **this** brief. Do not ship the TypingMind changelog.

**Ceiling:** Recent Crumple. One complete poster in a **white** field. Paper grain. Slider / scroll crumples it into a **3D paper wad**. Whole object visible the entire time. HUD below.

**Use:** a sheet that must physically change. The slider is the *material event*, not the site. You still name atmosphere + a transition (dissolve, reprint+morph, camera chapter).  
**Never:** a still poster, a cropped sheet (FOLD), a 2D card, or a cream crumple slider sold as the whole page.

## Composition (hard)

- White (or paper) studio. No stage floor you can see. Soft contact shadow only.
- Sheet occupies **25–40%** of the short viewport axis. ≥ 18% empty studio on every side.
- Camera: FOV 30–34. `z` ≈ 5.2–6.2 on a ~1.7 sheet. `z` 8–10 paints empty cream. Fail.
- Canvas CSS must be `width:100%; height:100%; display:block`. Call `renderer.setSize(innerWidth, innerHeight)` so Three sets the style. If `setPixelRatio(2)` runs and CSS stays at the drawing-buffer size, the object sits on the **right edge** and looks cropped. Fail.
- HUD: product name top-left, one whisper top-right, **tick slider below the object**. Type-to-reprint lives under the slider. If type overlaps the mesh, fail.

## 质感

- Authored canvas: dye, fiber grain, uneven color, printed type, one small mark.
- Paper is matte (`roughness` ~ 0.8, sheen). Not a flat Plane + solid fill.
- Crumpled state is crushed **paper**, not a ball. Fold-reflect the sheet across 7–10 planes (`if (dot(p,n) > d) p -= n * side * amt`), then crush toward the centroid. A lon/lat sphere with sine lumps is a dumpling. A clay blob, faceted crystal, or sea-urchin is a fail. If a vertex collapses to the origin, spikes. Fail.
- Printed type keeps word gaps. Offscreen canvas `measureText` often returns 0 before the face binds. Load the face (`document.fonts.load`), then draw **glyph by glyph** with a fallback advance (`w > 2 ? w : 40`) and a 28–36px word gap. `fillText(wholeLine)` collapsing to "Comebackbeforethe" is a fail.

## Markup (scale is the point)

```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@500;700&family=Geist:wght@400;500&display=swap" rel="stylesheet">
<style>
  :root { --bg: #f6f3ec; --ink: #14120f; --dim: #7a746a; --font: "Geist", sans-serif; }
  html, body { margin: 0; height: 100%; background: var(--bg); color: var(--ink); font-family: var(--font); overflow: hidden; }
  #stage { position: fixed; inset: 0; }
  .name { position: fixed; top: 22px; left: 28px; z-index: 2; font-size: 12px; letter-spacing: 0.2em; }
  .meta { position: fixed; top: 22px; right: 28px; z-index: 2; font-size: 12px; color: var(--dim); }
  .rail { position: fixed; left: 18vw; right: 18vw; bottom: 36px; z-index: 2; }
  .ticks { display: flex; justify-content: space-between; height: 10px; }
  .ticks i { width: 1px; height: 7px; background: #14120f; opacity: 0.2; display: block; }
  .ticks i:nth-child(5n+1) { height: 11px; opacity: 0.5; }
  .rail input[type="range"] { -webkit-appearance: none; width: 100%; height: 1px; background: #14120f; outline: none; }
  .rail input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 8px; height: 8px; border-radius: 50%; background: #14120f; }
  .cap { display: flex; justify-content: space-between; margin-top: 8px; font-size: 11px; color: var(--dim); }
  .reprint { position: fixed; left: 18vw; right: 18vw; bottom: 8px; z-index: 2; display: flex; gap: 12px; }
  .reprint input { flex: 1; background: transparent; border: 0; border-bottom: 1px solid rgba(20,18,15,0.2); font: 500 13px "Fraunces", serif; outline: none; }
  .reprint button { background: none; border: 0; font: 500 11px var(--font); letter-spacing: 0.12em; cursor: pointer; }
</style>
```

Camera and mesh (copy the numbers; this is the air):

```js
const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
camera.position.set(0, 0.15, 5.6); // close enough that the dye is readable. z > 8 on a 1.4 sheet = empty cream frame. Fail.

const geo = new THREE.PlaneGeometry(1.72, 2.26, 96, 128);
// crumpled[] = fold-reflect across 7–10 planes, then crush toward the centroid.
// Do not wrap lon/lat onto a ball (dumpling). Do not only add z to a plane (bent card). Do not only modulate radius with sine (clay blob).
// radius ~ 0.5–0.85; clamp. First frame: colored mesh is 25–40% of the short axis.
```

## Must

- Slider / wheel drives `mix`. Pointer orbits. Type reprints the canvas, then it can crumple again.
- Whole sheet and whole wad visible. Soft contact shadow shrinks with the wad.
- Studio light + ACES + shadows.

## Fail

- Slider-only page with leftover cream and no world change. That is FOLD cousin, even when the wad is good.
- Cropped sheet filling the frame. HUD on the paper (FOLD).
- CSS `transform: scale` on a 2D image.
- Smooth sphere / capsule (KEPT).
- A form next to the paper.
