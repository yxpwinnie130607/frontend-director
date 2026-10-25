# ritual-object

Consumer habit. A tray you drop things onto. Sunday they come back.

**Use:** 摘录, 稍后再看, clip, journal, weekly digest, 拾贝-class products.  
**Never:** developer infra, agency, portfolios.

This is the system 拾贝 should have been. The first viewport is a working tray, not a marketing stack.

## Fonts

```html
<link href="https://api.fontshare.com/v2/css?f[]=newsreader@400,500,600,700&f[]=satoshi@400,500,700&display=swap" rel="stylesheet">
```

- Display: `Newsreader` (the sentence).
- UI / labels: `Satoshi`.
- No second color on a headline word. If you need stress, italic Newsreader.

## Tokens — copy intact

```css
:root {
  --bg: #f3efe4;
  --ink: #1c1914;
  --ink-soft: #5c564c;
  --tray: #fffdf7;
  --rule: #d8d0c2;
  --stamp: #8c2f1b;
  --stamp-ink: #fffdf7;
  --font-display: "Newsreader", "Source Serif 4", serif;
  --font-ui: "Satoshi", "DM Sans", sans-serif;
  --pad: clamp(20px, 4vw, 56px);
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
}
body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-ui);
}
```

The room is paper. Not white `#fff`. Not a teal marketing site.

## First viewport skeleton

```
┌─────────────────────────────────────────────────────────┐
│  name (small, Satoshi)                    one text btn  │
│                                                         │
│  headline, left, Newsreader, max 3 lines                │
│  (no tinted word)                                       │
│                                                         │
│  ┌──────── tray (the product) ────────────────────────┐ │
│  │  paste / drop field                                 │ │
│  │  stacked slips (real items, addable)                │ │
│  │  "Sunday · 3 come back" as status, not a badge hero │ │
│  └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

- Headline **left**, tray **under or beside**, never a centered column of badge / h1 / sub / two CTAs.
- The tray occupies at least 40% of the first viewport.
- No "先看看它的三条规矩" as a second hero.

## Required interaction (must work)

1. A field. User pastes a URL or a sentence, presses Enter or the stamp button.
2. A slip appears on the tray (title + domain or first words). Slips stack.
3. Each slip can be opened or discarded.
4. A quiet status: how many wait, how many return this Sunday.
5. Seed 2–3 real-looking slips so the tray is never empty on first paint.

If this loop does not work, the page has failed, even if the type is beautiful.

Also include the pointer lerp and writer from [motion.md](../motion.md). New slips enter (y + opacity). The tray is not a still still-life.

## Rest of page

One short rule list as running text, not three icon cards.  
One Sunday scene (the same tray, slips stepping forward).  
A single stamp-colored button, reused, never a second accent.

## Do not

- Tint 「沉底」or any headline word `stamp`.
- Em-dash in body copy.
- Pill nav + pill CTA on a white void.
- Fake product card that you cannot type into.
- Beige-brass craft kit (`#f5f1ea` + gold). This paper is cooler, the stamp is rust, not gold.
