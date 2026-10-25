# product-stage-night

Pro tool. Night. The working product is the hero.

**Use:** issue trackers, agents, infra consoles, code-adjacent SaaS.  
**Never:** consumer rituals (use `ritual-object`), portfolios.

## Fonts

```html
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=clash-display@500,600&display=swap" rel="stylesheet">
```

- Display: `Clash Display`.
- UI: `Satoshi`.
- Mono for ids: `ui-monospace`.

## Tokens — copy intact

```css
:root {
  --bg: #0b0c0e;
  --panel: #14161a;
  --line: #2a2d33;
  --text: #f4f4f5;
  --muted: #9a9aa3;
  --accent: #e8ff6a;
  --accent-ink: #14161a;
  --font-display: "Clash Display", "Satoshi", sans-serif;
  --font-ui: "Satoshi", sans-serif;
}
body { background: var(--bg); color: var(--text); font-family: var(--font-ui); }
```

Accent is a sharp yellow, used on the primary control only. Not a gradient. Not purple.

## First viewport skeleton

```
thin nav
short headline (2 lines max)     [ working product panel ]
one sentence, specific
one accent button
```

Split. Headline left or top. **The panel is a real UI**: sidebar + list + detail, or an editor. It fills most of the viewport width on desktop.

## Required interaction

- Create an item (issue, prompt, request) from the panel.
- It appears in the list.
- Select it; the detail updates.
- Keyboard: `c` to create, `j`/`k` to move, if it does not fight the page.

A static screenshot, a fake task list of `<div>`s you cannot add to, or a product card below the fold: fail.

Also include the pointer lerp from [motion.md](../motion.md). New rows write on (writer), they do not pop in fully formed.

## Rest of page

Three capabilities as sentences, not cards. Changelog as a list. No logo wall in the hero.

## Do not

- Center the headline over a glow.
- Tint one word in the headline.
- Rebuild Linear's logo or sidebar icons. Steal the *stage*, not the brand.
