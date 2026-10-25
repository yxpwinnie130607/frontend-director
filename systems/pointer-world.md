# pointer-world

Recent template: Interactive / Transitions website posts on https://recent.design. The cursor is the light and the hand.

**Use:** brand, campaign, product marketing that should feel physical.  
**Never:** dense docs.

## Fonts

```html
<link href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700&display=swap" rel="stylesheet">
```

Display and UI: `Switzer`.

## Tokens — copy intact

```css
:root {
  --bg: #08090c;
  --ink: #f6f3ec;
  --dim: #9aa0a8;
  --hot: #7cffb2;
  --font-display: "Switzer", sans-serif;
  --px: 0.5;
  --py: 0.5;
}
body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-display);
  cursor: none;
}
@media (pointer: coarse) {
  body { cursor: auto; }
}
```

## First viewport skeleton

Full-bleed room. One sentence, large, left or slightly off-center (not a centered SaaS stack).

```
custom dot (follows --px --py, mix-blend-mode: difference)
spotlight: radial-gradient at calc(var(--px)*100%) calc(var(--py)*100%)
headline letters are separate spans; each tilts toward the pointer
a usable object sits in the room (input, generate, open, drag)
that object is magnetic
```

## Required interaction

1. Pointer lerp from [motion.md](../motion.md). At least **three** things follow `--px` `--py` continuously: the room light, the custom dot, and the headline tilt *or* the object.
2. The usable object does the product's job (type + write, open a layer, spawn a card). Click is not "go to #features".
3. Magnetic primary control from motion.md.
4. On coarse pointers, hide the custom cursor; keep the object usable.

## Rest of page

One more pointer-reactive strip (work names that reveal a still, or a tone row that rewrites). Then stop.

## Do not

- Custom cursor plus a still manifesto and nothing to do.
- Particle snow.
- Tilt every card on the page.
- Clone a Recent 3D render as a background video.
