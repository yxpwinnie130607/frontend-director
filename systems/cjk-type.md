# cjk-type

> Technique for **Chinese / Japanese / Korean type**. Not a translation of the Latin rules.
> Every number in `docs/02-aesthetic-fingerprint.md` was measured on Latin sites.
> Pasted onto a CJK headline, half of them are wrong — and the wrong half is the one that ruins the page.

Read this whenever the headline is Chinese. It overrides Step 3 for the affected metrics.

---

## Why the Latin numbers break

| Metric | Latin value | What happens on CJK | Use instead |
|---|---|---|---|
| Tracking | **−0.02 to −0.06em** | Hanzi have a full em box. Negative tracking makes strokes **collide** at 100px+ | **−0.01 to +0.02em**. `0` is correct, not lazy |
| Display line-height | **0.85–1.05** | Latin has ascender/descender whitespace inside the line box. Hanzi fill it | **1.05–1.30** for display, 1.7–1.9 body |
| Size steps | 6–9 | Same | Same. Ratio still ≥ 4 (aim 6–8) |
| Weight | 400–600 | Chinese webfonts often ship only 400/700. A fake 500 is synthesized and looks bold-smeared | Pick 400 or 700; **do not** trust a synthetic 500 |
| Family count | 2 (sans + mono) | You need a CJK face *and* a Latin face — they are two different fonts in one stack | 3 slots: CJK display + Latin display + mono |

**The single most common failure:** pasting `letter-spacing: -0.045em` onto a 120px Chinese headline. At that size it is −5.4px per gap; the strokes touch and the headline reads as one black bar.

---

## Font stacks that actually work

A CJK font has no Latin glyphs worth using, and a Latin font has no Hanzi. So the stack is a **pair**, and the order decides who renders what.

```css
/* Serif (editorial, ceramic, tea, literature, slow products) */
--cjk-display: "Songti SC", "Source Han Serif SC", "Noto Serif SC", serif;
--latin-display: "Instrument Serif", "Iowan Old Style", Georgia, serif;

/* Sans (product, tool, tech) */
--cjk-sans: "PingFang SC", "Source Han Sans SC", "Noto Sans SC", sans-serif;
--latin-sans: "Inter", "Helvetica Neue", Arial, sans-serif;

/* Numbers, eyebrows, units. Latin-only by design — never CJK */
--mono: ui-monospace, "SF Mono", "JetBrains Mono", monospace;
```

```css
h1 { font-family: var(--latin-display), var(--cjk-display); }
```

**Latin first, CJK second.** Then a Latin letter uses the Latin face and a Hanzi falls through to the CJK face — one headline, two faces, correct on both.

If you write CJK first, every Latin word in the headline renders in the system CJK font's Latin glyphs, which look like 1998.

### Choosing serif or sans

| Content | Face | Why |
|---|---|---|
| Ceramic, tea, incense, paper, heritage, essay | **Songti / Source Han Serif** | Strokes carry the object's material. A serif headline on a clay product reads as craft |
| Tool, SaaS, developer, fintech | **PingFang / Source Han Sans** | Neutral, matches the UI the screenshot shows |
| Poster, manifesto, one sentence | Songti at 120px+, weight 500–600 | The contrast of thin/thick strokes is the whole design |
| Never | `font-family: system-ui` alone | On macOS it silently picks PingFang for Hanzi and SF for Latin, and the two do not share a baseline |

---

## Punctuation: the part everyone misses

Chinese punctuation is **full-width** and carries its own spacing. If you also apply tracking, the gaps double.

1. **Never let `，。、；：？！` start a line.** `line-break: strict` plus `word-break: normal` handles most of it:
   ```css
   h1, h2, p { line-break: strict; word-break: normal; overflow-wrap: anywhere; }
   ```
2. **Kill the trailing gap of full-width punctuation.** A `。` occupies a full em but its ink is in the left third — this is why naive Chinese headlines look like they have a hole on the right:
   ```css
   .tight-punct { text-spacing-trim: trim-start; }  /* Chrome 123+ */
   ```
   Fallback if unsupported: pull it back manually with `margin-right: -0.5em` on the last span, or end the line with a Latin period.
3. **Do not put a space before Chinese punctuation.** `山 。` is wrong; `山。` is right.
4. **Mixed CJK + Latin needs a hair space.** `Inter字体` is cramped; `Inter 字体` is correct. Do it with CSS, not by typing spaces:
   ```css
   .cjk-latin-gap { word-spacing: 0.06em; }
   ```

---

## Line breaking: Chinese has no spaces

`word-break` decides everything. The default (`normal`) is right for prose but wrong for a 120px poster headline — it will break mid-phrase and leave a two-character orphan line.

**For display headlines, break by meaning, not by width.** Write the `<br>` yourself:

```html
<h1>
  水往下走，<br>
  香往上走，<br>
  中间隔一座山。
</h1>
```

Then constrain the box so the browser never adds its own break:

```css
h1 { max-width: 11em; }   /* one em ≈ one hanzi; 11em ≈ 11 characters per line */
```

`em` is the only unit that maps to character count in CJK. `ch` measures `0`, which is meaningless here.

**Orphan rule:** a line should not end with fewer than 2 characters, and the last line of a 3-line headline should be the **longest**, not the shortest. If the last line is 1–2 characters, rewrite the copy or move the `<br>`.

---

## Vertical metrics: padding, not line-height

Hanzi sit flush to the em box, so a `overflow: hidden` mask will clip the bottom stroke of 一 / 二 / 三 and the descender of 足 / 走.

```css
.mask       { overflow: hidden; padding-bottom: .1em; margin-bottom: -.1em; }
.mask > span{ display: block; }
```

For Latin, `.06em` is enough. For CJK use **`.10em`**. Without it, 走 loses its tail at exactly the size where you notice.

---

## Numbers: never in the CJK face

`2026` typed inside a Songti run renders as four full-width digits with wide gaps, and it will not align in a table.

```css
.num { font-family: var(--mono); font-variant-numeric: tabular-nums; letter-spacing: 0; }
```

Rule: **every digit on the page uses the mono/Latin stack**, including `2026`, `300 只`, `12 道`, prices, and section numbers. Eyebrows are already mono — digits inside a Chinese sentence are the ones people forget.

---

## The pasteable CJK block

```css
:root{
  /* 中文大标题：字距接近 0，行高 ≥ 1.05 */
  --ls-cjk-display: -0.005em;   /* 可以用 0 或 +0.01em，禁止低于 −0.02em */
  --lh-cjk-display: 1.12;       /* 单行 1.0；两行以上 1.12–1.25 */
  --lh-cjk-title:   1.25;
  --lh-cjk-body:    1.75;       /* 中文正文比西文松，1.6 会闷 */
}
h1, h2 {
  font-family: var(--latin-display), var(--cjk-display);
  letter-spacing: var(--ls-cjk-display);
  line-height: var(--lh-cjk-display);
  line-break: strict;
  word-break: normal;
  text-spacing-trim: trim-start;
}
```

---

## Fail if any one hits

1. `letter-spacing` below **−0.02em** on a Chinese headline at ≥ 48px → strokes collide.
2. Display `line-height` below **1.05** on Chinese → characters stack and the page reads as a black wall.
3. `font-family: system-ui` as the only CJK declaration → Hanzi and Latin get different baselines on Windows.
4. A Chinese headline that breaks after 1–2 characters on the last line → rewrite the `<br>`.
5. `2026` or any price set in the CJK face → full-width digits, misaligned columns.
6. A mask without `padding-bottom: .1em` → clipped 走/足/一 at display size.
7. Full-width `。` at the end of a line with no `text-spacing-trim` → a visible hole on the right edge.

---

*Latin numbers come from `docs/02-aesthetic-fingerprint.md` (28 sites, measured). The CJK overrides come from rendering the same sites' Chinese localizations plus the three Chinese baselines in this repo at 48–150px.*
