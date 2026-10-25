# volume-world

Recent template from the reel: **Gaussian Splat Portal Jumping** and **WebGL 作品集** (Three.js, dark space, cassette / project cards you fly through).

**Use:** brand, campaign, portfolio, or a product that is a *place* (a room, not a form).  
**Never:** a 2D card on black.

The first viewport is a **space you are inside**. Camera in the room. Objects have scale. A HUD may whisper at the edge. The room is the product.

## Fonts

```html
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet">
```

## Tokens

```css
:root {
  --bg: #050508;
  --ink: #f4f1ea;
  --font-ui: "Satoshi", sans-serif;
}
html, body { margin: 0; height: 100%; background: var(--bg); color: var(--ink); overflow: hidden; font-family: var(--font-ui); }
#stage { position: fixed; inset: 0; }
.hud { position: fixed; left: 24px; bottom: 24px; font-size: 13px; letter-spacing: 0.06em; pointer-events: none; }
```

## First viewport

Fullscreen Three.js (same renderer contract as `volume-object`: ACES, shadows, RoomEnvironment or a dark HDR).

Pick one:

**A — Room (portal reel)**  
A ground, two walls or a courtyard, a hero object (vessel, door, lamp). Pointer looks around (yaw/pitch lerp, clamp). Click the object to do the job (drop a line, open a door, jump a "world" = swap the room's mesh/color/fog). A faint ribbon or light can mark the portal. Do not load a real Gaussian splat unless you can; a lit room is enough.

**B — Dark space (WebGL 作品集)**  
Camera in black. 3–7 meshes float (cards, a tape, a bottle). Pointer orbits the rig. Click a mesh to bring it forward and reveal copy. HUD labels only.

## Required interaction

1. You are *in* the volume. Pointer looks or orbits. A still render of a room is a fail.
2. One object does the product job (drop, open, swap world, bring a card forward).
3. Depth cues: fog, shadow, scale change as things come forward. Flat planes with no recede: fail.

## Do not

- A form titled 工作台 over a black canvas.
- Unlit cubes in a void with no camera move.
- Clone the baroque sofa or the snow temple. Steal "I am in a room and I can jump."
