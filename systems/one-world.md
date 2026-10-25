# one-world

Brand / studio. One sentence, one room, then a door.

**Use:** studios, campaigns, manifesto brands.  
**Never:** tools that must take input in the first glance.

## Fonts

```html
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet">
```

Display and UI: `Satoshi`. Weight does the scale.

## Tokens — copy intact

```css
:root {
  --bg: #07101c;
  --star: #d7e8ff;
  --ink: #f5f8ff;
  --door: #f4efe6;
  --door-ink: #171513;
  --font-display: "Satoshi", sans-serif;
}
```

## First viewport skeleton

Full-bleed room. Centered or slightly low: one sentence, two lines. Almost no chrome. A hint to enter (scroll or a text link), not a fat CTA stack.

Build the room with CSS (radial burst, grid, or a single canvas). It is the only object.

## Required interaction

- Scroll or click enters the **door**: theme flips to `--door` and the work stage appears.
- This is one chapter change. Implement it (scroll-linked or click). A static pretty hero with no door: fail.
- Include pointer lerp from [motion.md](../motion.md) so the room follows the hand before the door.

## Rest of page

Quiet work stage. Thin pill or text nav. Work as designed objects, not six thumbnails.

## Do not

- Copy Offer Studio's burst literally if the brand is not them. Keep "one room → one door".
- Stack a second climax (coverflow + marquee + grain) on the first screen.
- Put a subhead, an eyebrow, and two buttons in the first world.
