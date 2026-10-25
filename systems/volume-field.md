# volume-field

Recent template from the reel: **Vercel Store Shader** (a jacket dissolves into a living white-dot field). Also Bloom, Sphere Clusters, Black Hole. You move through a **volume**, or a product *becomes* a volume.

**Use:** brand, campaign, or a product that is a world (generate, explore, feed).  
**Never:** a 2D particle canvas on a form.

## Fonts

```html
<link href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700&display=swap" rel="stylesheet">
```

## Tokens

```css
:root {
  --bg: #07080b;
  --ink: #f6f3ec;
  --font-display: "Switzer", sans-serif;
}
html, body { margin: 0; height: 100%; background: var(--bg); color: var(--ink); font-family: var(--font-display); overflow: hidden; }
#stage { position: fixed; inset: 0; }
.copy { position: fixed; left: 8vw; top: 18vh; max-width: 16ch; font-size: clamp(40px, 7vw, 88px); line-height: 0.95; pointer-events: none; }
```

## First viewport

Fullscreen WebGL. A field of 200–800 meshes or points with real lighting (or a shader volume). Camera dollies with pointer. One short line of type sits *in front of* the field, not in a card.

Same Three.js studio contract as `volume-object`: ACES, shadows or bloom, `RoomEnvironment` or a custom shader. Copy the renderer / camera / light setup from that file.

## Required interaction

1. Pointer moves the camera on a small orbit (lerp). The field has parallax depth. Flat billboards that do not recede: fail.
2. Click or type **changes the field** (spawn, recolor, explode, write a ribbon through it).
3. Idle motion: the field breathes. Not a GIF.

## Do not

- CSS dots on a 2D plane.
- Three.js with `MeshBasicMaterial` and no lights.
- A form floating over the field that is the real UI.
