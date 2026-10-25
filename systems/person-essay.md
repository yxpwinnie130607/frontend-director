# person-essay

Personal site. The bio is the IA.

## Fonts

```html
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=sentient@400,500&display=swap" rel="stylesheet">
```

- Body: `Satoshi`.
- Opened names: `Sentient` italic.

## Tokens

```css
:root {
  --bg: #0c0c0c;
  --ink: #ececec;
  --dim: #1a1a1a;
  --font-ui: "Satoshi", sans-serif;
  --font-open: "Sentient", serif;
}
```

## First viewport skeleton

A paragraph. Some words are buttons. Unread text can sit dimmer. No project grid.

## Required interaction

Click a name (`Pedro`-class): a short panel opens **in place**. Click again to close. At least three openers work.

## Do not

- Copy "Yo! I'm [Name]". Write their voice.
- Blur the whole page as decoration.
- A 12-project grid above the bio.
