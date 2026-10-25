# live-machine

Recent template: **Displace** (https://displace.agency, on recent.design). The homepage is a machine you use, not a poster you read.

**Use:** any tool, virtual product, 文案 / generate / write / edit / clip site. Default for "做一个产品网站".  
**Never:** a long essay with no product.

The first viewport *is* the product running. Headline is secondary. A letter about the product, a fake Mac window of gray bars, or a dead list: fail.

## Fonts

```html
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=clash-display@500,600,700&display=swap" rel="stylesheet">
```

- Display: `Clash Display` (one short line, not a manifesto).
- Machine UI: `Satoshi`.

## Tokens — copy intact

```css
:root {
  --bg: #0c0d10;
  --stage: #14161c;
  --ink: #f4f1ea;
  --muted: #8b8794;
  --line: #2a2d36;
  --accent: #d8ff3e;
  --accent-ink: #12130f;
  --font-display: "Clash Display", "Satoshi", sans-serif;
  --font-ui: "Satoshi", sans-serif;
  --px: 0.5;
  --py: 0.5;
}
body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-ui);
}
```

Accent only on the generate / stamp / run control.

## First viewport skeleton

```
name (small)                              one text status
one short job-named line (Clash, left)

STAGE (the product, at least 70% of the viewport)
  input: textarea or contenteditable. Real caret. You type here.
  run control (accent). Keyboard: Cmd/Ctrl+Enter
  output: text writes on, character by character
  the stage shifts a few px with --px / --py
```

No split "marketing left / fake UI right." The stage *is* the page.  
No traffic-light fake window. No gray bars pretending to be paragraphs.

## Required interaction (must work on first paint)

1. User types a brief in the stage.
2. Run (button or ⌘/Ctrl+Enter) writes an output into the stage. Animate with the writer in [motion.md](../motion.md). Seed one realistic output so the stage is never empty.
3. Pointer moves the stage (`translate` using `--px` `--py`) and a light follows. Include the pointer lerp from [motion.md](../motion.md).
4. The run control is magnetic (see motion.md).
5. A second run replaces the output; it does not append forever.

If the user cannot generate (or write, clip, add) in the first viewport, the page has failed.

For a 文案 product: input = job / audience / tone; output = 2–4 lines of copy that appear as if typed. Fake generate is fine. Still generate must *move*.

## Rest of page

Do not add a feature table. Add one more live surface: a history strip you can click back onto the stage, or a tone switch that immediately rewrites the last output.

## Do not

- "你好，这是一封关于…的信" as the hero.
- Fake browser chrome, gray placeholder lines, "上一张 / 下一张" on a still card.
- Feature rows (`无账号 / 无云端`) with hairlines.
- A yellow CTA that does not write.
- Centered SaaS stack above a dead preview.
