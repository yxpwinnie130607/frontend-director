# Motion — after a system is chosen

Match feeling to the system. Do not sprinkle fade-up on every block.

| Feeling | Use | Avoid |
|---|---|---|
| Dramatic | One slow chapter change (1–1.4s), scale 0.96 → 1 | Per-card fade |
| Playful | Spring on the primary object only | Bobbing everything |
| Calm | 200–300ms opacity on the object you just used | Scroll hijack |
| Editorial | Stagger 2–3 lines of the headline, then stop | Infinite loops |

## Allowed CSS

```css
:root {
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --duration: 0.6s;
}

.reveal {
  opacity: 0;
  transform: translateY(20px);
  animation: rise var(--duration) var(--ease-out-expo) forwards;
}
@keyframes rise {
  to { opacity: 1; transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; animation: none; }
}
```

Animate only `transform` and `opacity`. Never `top`, `left`, `width`, `height`.

## Interaction physics (primary object only)

```js
// Press: scale 0.98. Release: spring back.
// Add-item: new node enters from y:16, opacity 0 → 1.
// Do not attach this to every card on the page.
```

## Background rooms (only if the system asks)

```css
.room-grid {
  background-image:
    linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px);
  background-size: 48px 48px;
}
```

No particle canvas unless the system is `one-world` and the world needs it.
