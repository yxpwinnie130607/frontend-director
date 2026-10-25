# product-stage-day

Pro tool, daylight. Same law as night: the UI works in the first viewport.

**Use:** friendly productivity, calendars, notes for work.  
**Never:** 摘录 / weekly-return / clip trays (`ritual-object`).

## Fonts

```html
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700;800&display=swap" rel="stylesheet">
```

- Everything: `Outfit`. One family.

## Tokens — copy intact

```css
:root {
  --bg: #f6f3ee;
  --panel: #ffffff;
  --ink: #171513;
  --muted: #6b6560;
  --accent: #2f6fed;
  --line: #e6e0d8;
  --font-display: "Outfit", sans-serif;
  --font-ui: "Outfit", sans-serif;
}
body { background: var(--bg); color: var(--ink); font-family: var(--font-ui); }
```

Warm paper around a white panel. Accent is a working blue, on buttons only.

## First viewport skeleton

Split or stacked: headline (job-named, specific) + **working panel**.  
Example panel: a note list you can add to, or a week grid you can click.

## Required interaction

Add or complete one thing in the panel. The UI updates. Seed realistic rows (not "Task 1").

## Do not

- Use this for 拾贝-class products.
- Centered badge "AI-powered…" + two CTAs + a dead preview.
- A second accent color.
