# editorial

> Technique for the **Editorial regime** — the one with no mesh.
> `systems/` has eleven files for 3D loops and this one for type. That asymmetry is why an Editorial
> page made with this skill still looks like the baseline with new nouns: there is nothing telling
> you how to **re-compose** the skeleton for different content.
>
> Read this, then copy **two different baselines** from `library/02-可运行基线/` — each one is a
> single family, built to be spliced as a whole `<section>`, not read as a whole page:
>
> | Baseline | Family it is |
> |---|---|
> | `editorial/index.html` | 1 poster + 3 split + 2 index + 4 band (mixed, the default page) |
> | `editorial-index/index.html` | 2 index — no hero at all, first viewport is the list |
> | `editorial-split/index.html` | 3 split — left bleed, right bleed, full bleed, two narrow columns |
> | `editorial-band/index.html` | 4 band + 5 kinetic — integers, explainer, table, one 190px line |
>
> A site is three to five of these alternated. Copying one and swapping nouns is the failure this
> file exists to prevent.

---

## The one law

**Every section uses a different layout family. If two sections share a skeleton, delete one or recompose it.**

This is where Editorial pages fail. Not in the type — the numbers are already right. In the
**rhythm**: hero → heading + paragraph → heading + paragraph → heading + paragraph, five times.
That reads as a document, not a site, no matter how good the headline is.

A page that holds has this shape:

```
[poster flush]  →  [index]  →  [asymmetric split]  →  [data band]  →  [kinetic type]
    one idea        a list        one argument            proof          one sentence
```

---

## Family 1 — Poster flush

One headline owns 55–70% of the viewport height. Everything else is a caption at 10–11px.

```
┌─────────────────────────────────────────┐
│ logo                          place·year │  10.5px mono, top edge
│                                          │
│                                          │
│   水往下走，                              │  display, 90–150px
│   香往上走，                              │  clamp(54px, 9.6vw, 150px)
│   中间隔一座山。                          │  CJK: ls −0.005em, lh 1.12
│                                          │
│ ─────────────────────────────────────    │  1px rule, full width
│ 一句说明，两行，不超过 34 字。   Scroll ↓  │  body 17px + mono 10.5px
└─────────────────────────────────────────┘
```

**Parameters**

| | |
|---|---|
| Display size | `clamp(54px, 9.6vw, 150px)`; ratio to body **≥ 7** |
| Lines | 2–3. Never 4 |
| Max width | `11em` for CJK (≈11 characters), `15ch` for Latin |
| Elements | ≤ 6 (logo, place, headline, rule, one paragraph, scroll hint) |
| Empty space | ≥ 30% of the viewport, in **one** block — not spread evenly |

**Use when:** the product is one object, one sentence carries the brand, or the page opens a story.
**Runnable:** `library/02-可运行基线/editorial/index.html` → `.hero`.
**Fail if:** the headline touches both edges with < 4vw of margin (no air); there is a second
paragraph competing with the headline; or the only "design" is the type being large.

---

## Family 2 — Editorial index

A list of items on a 1px grid. No cards. Hover shows a preview.

```
01    Helio — 产品影像              DIRECTION    2026
──────────────────────────────────────────────────────
02    Kite — 编辑型官网            WEB          2025
──────────────────────────────────────────────────────
03    Noon — 品牌重制               IDENTITY     2025
```

**Parameters**

| | |
|---|---|
| Row height | 88–120px (padding 22–30px top/bottom) |
| Columns | `64px 1fr auto auto` — number, name, category, year |
| Rules | `1px solid` on **every** row, full-bleed. Border-top on the container, border-bottom on each row |
| Name size | 19–27px, weight 500. **The name is not the biggest type on the page** |
| Hover | `padding-left: +14px` over 450ms + name turns accent. Nothing else |
| Count | 4–8 rows. More than 8 belongs on a separate work page |

**Use when:** there are ≥ 4 discrete items (projects, articles, objects, features).
**Runnable:** `library/02-可运行基线/editorial-index/index.html` → the whole page; `.idx` for the
single-column list, `.appendix` + `.cols` for the two-column variant. Both are splicable.
**Fail if:** the rows become cards; the rules are 1px but not full-bleed; or every row has an image
thumbnail always visible (that is a card grid with extra steps).

---

## Family 3 — Asymmetric split

Image bleeds off one edge; text sits in a narrow column on the other. Ratios are never 1:1.

```
┌──────────────────────┬───────────┐
│                      │  Eyebrow  │
│   image bleeds       │  H2       │   1.45 : 0.8
│   past the margin    │  p        │   image margin-left: −1 × edge
│                      │  p        │   text column max 38ch
│                      │  kv list  │
└──────────────────────┴───────────┘
```

**Parameters**

| | |
|---|---|
| Column ratio | **1.45 : 0.8** (or 1.6 : 0.7). Never 1:1 |
| Image | `margin-left: calc(var(--edge) * -1)`, `aspect-ratio: 4/3` or `5/4` |
| Text column | `max-width: 34–38ch`; H2 at `clamp(34px, 4.4vw, 64px)` |
| Vertical | Image top aligns with the **eyebrow**, not the H2 — text starts 8–40px lower |
| Caption | Below the image, mono 9.5px, `Fig. 01 — name`. Never inside the image |

**Use when:** one image carries one argument (a product, a material, a process step).
**Runnable:** `library/02-可运行基线/editorial-split/index.html` → `.sp-a` (left bleed),
`.sp-b` (right bleed, mirrored), `.sp-c` (full bleed 21:9), `.sp-d` (two narrow columns with the
middle 3 columns empty). Four sections, one page: that is how this family is meant to alternate.
**Fail if:** the image and text are equal width; the image is inset (does not bleed); or the text
column runs wider than 40ch — a 700px text column on a 1.45fr track is the giveaway.

---

## Family 4 — Data band

A full-bleed dark band. Three or four numbers, no chart.

```
████████████████████████████████████████████
█  不是给你模板。              3      42     8s  █
█  是给你一个人的手艺。      层拆解  篇样本  出档案 █
████████████████████████████████████████████
```

**Parameters**

| | |
|---|---|
| Height | 60–80vh, or `padding: 13vh 0` |
| Ratio to page | **1 in 4 sections max.** Two bands and it becomes a template |
| Numbers | 34–54px, mono or the display face, **weight ≤ 500** |
| Labels | mono 10px, `letter-spacing: .12em`, opacity .45 |
| Colors | Background = ink; numbers = the single accent; everything else white |
| Layout | Numbers right, statement left, aligned to **baseline of the last line** |

**Use when:** you have three real numbers. Not adjectives ("fast", "reliable") — integers.
**Runnable:** `library/02-可运行基线/editorial-band/index.html` → `.band` (the band),
`.why` (the three-column explainer that must follow it), `.log` (the parameter table).
**Fail if:** the numbers are `99.9%` / `10x` / `100+`; there are more than 4; or the band uses a
gradient instead of a solid.

---

## Family 5 — Kinetic type

Type is the only object. One word machined, or a paragraph that reveals per line.

```
        ████  ███
        ████  ███     ← one word at 220–280px
        ████  ███       edge-to-edge, cropped is fine
```

**Parameters**

| | |
|---|---|
| Size | 180–320px. Below 120px this family does not exist |
| Cropping | Allowed. A word that overflows the viewport reads as a texture, not an error |
| Motion | Mask lift `yPercent 115→0`, `expo.out`, 0.62s, per-line stagger 0.08 |
| Limit | **Once per page.** It is the loudest family; two uses cancel |
| Pairing | Follow it with the quietest family (index or split) |

**Use when:** there is one word worth 280px (a product name, a single verb, a refusal).
**Runnable:** `library/02-可运行基线/editorial-band/index.html` → `.kinetic` (190px, dark-on-paper)
and `editorial-index/index.html` → `.kinetic` (223px, nowrap, edge-cropped). Two treatments, same
family — the difference is whether you crop or not.
**Fail if:** it sits in the middle of the page with nothing before it; or it animates on every
scroll (once, on enter, with `toggleActions: play none none reverse`).

---

## Composition rules

1. **Alternate loud and quiet.** Poster → index → split → band → kinetic. Two loud sections
   adjacent and neither registers.
2. **One band, one kinetic section, per page.** These are the two that go stale first.
3. **The scroll-driven count decides the rhythm.** `docs/02` asks for ≥ 8 driven elements on
   Editorial. Distribute them: poster 3 (mask + parallax + fade), split 2 (image clip + text
   rise), index 1 (rule draw), band 2 (number count + fade). A page where all 8 sit in the hero
   is a poster with a dead tail.
4. **Section gap is not uniform.** Use 140px between siblings and 280px when the family changes.
   Equal gaps flatten the families into one list.

---

## Signature action, Editorial version

The 3D regimes have a mesh to animate. Editorial has only type, rules, and images — so the
signature must be one of:

| Action | What it is | Cost |
|---|---|---|
| **Rule draw** | A 1px line draws left→right as the section enters (`scaleX 0→1`, `scrub`) | 5 lines |
| **Line lift** | Headline lifts per line from a mask, last line arrives 0.08s late | 10 lines |
| **Image wipe** | A coloured veil scales down off the image (`scaleY 1→0`, `scrub 0.6`) | 8 lines |
| **Index shift** | On hover the row indents 14px and the name turns accent — and only that | 4 lines |
| **Number count** | The band's integers run 0→N once, 600ms | 15 lines |

Pick **one**. A page with all five is a page with none.

---

## Fail if any one hits

1. Two adjacent sections share a skeleton (both "heading + paragraph").
2. Every section has a heading. Some sections are a list, a band, or one word.
3. Section gaps are uniform.
4. The only composition is poster flush, repeated with new nouns — **this is the most common
   failure of this skill on Editorial briefs.**
5. All 8 scroll-driven elements live in the first viewport.
6. A card grid appears anywhere. Rules are lines, not borders around boxes.
7. The accent colour is used more than ~6 times outside the band.

---

*Companion: `systems/cjk-type.md` for Chinese headlines (tracking and line-height differ from the
Latin numbers in `docs/02`).*

*The four baselines, read as **sequences**, never as single layouts:*

| File | Sequence |
|---|---|
| `editorial/index.html` | 1 → 3 → 2 → (dark sticky track) → 5-ish quote |
| `editorial-index/index.html` | head strip → 2 → 2-two-column → 5 → foot |
| `editorial-split/index.html` | open → 3a → 3b → 3c → 3d |
| `editorial-band/index.html` | 4 → explainer → table → 5 → tail |

*All four pass the 12-item verify. Verify them yourself with
`node library/06-工具脚本/verify.mjs library/02-可运行基线/<name>/index.html` before you splice —
if a number moved, the splice is what moved it.*
