# transition

> Required for every preview and every build, with [motion.md](../motion.md). Recent sites change *worlds*, not opacity on a card.

**Ceiling:** Gaussian portal (jump the room); Vercel shader (object → field); Crumple (sheet → wad); Earth (surface rewrite); Shopify Editions / Podium (camera + material as you move). Steal the *kind* of change. Do not clone those HTML files.

A slider that only wrinkles a plane, with no scene change, is not enough even if composition is correct.

## Decide before markup

Pick **one** transition bound to the product job:

| Kind | The event | Bind |
|---|---|---|
| Material morph | Sheet → wad, peel, melt | Vertex mix. Whole object stays visible. |
| Dissolve to field | Object eaten by living points | Pointer, send, or generate drives mix. Points keep moving. |
| Camera jump | You enter / leave / approach | Dolly, look-at, or cut. Fog density can pulse. Not `opacity` on `#app`. |
| Gate | Click / type to enter (Nothing to Watch, Astro Dither) | First frame is a designed void + one control. The click **builds the world** (sphere, field, room). Not a 2D splash. |
| Chapter wipe | Scroll is the scene change (Podium, Shopify, Becane) | Camera + mesh + lights move together. Lenis-style pin. A CSS wipe over photos is a fail unless a volume is the mask (metaball). |
| World swap | Room A → room B | Portal, door, send. Swap lights + fog + meshes together. |
| Surface rewrite | Same volume, new skin | Slider / type swaps the authored map. |

Idle can breathe. The *send / generate / enter* action must run the transition.

## Camera jump (copy)

```js
let send = 0, sendT = 0;
function trigger() { sendT = 1; }
(function tick() {
  send += (sendT - send) * 0.06;
  const k = send * send * (3 - 2 * send);
  camera.position.z = 5.4 - k * 1.8;       // push through, not a CSS zoom
  scene.fog.density = 0.04 + k * 0.08;     // air thickens, then you are through
  // also mix the mesh → field here
  if (send > 0.98 && sendT === 1) { /* arrived: new state or reset */ }
  requestAnimationFrame(tick);
})();
```

`z` must stay in the readable band (about 3.5–6.5 on a 1.6-wide mesh). Pushing to 9+ paints empty cream / empty black. Fail.

## Fail

- `transition: opacity` on a wrapper as the only change.
- Route change with no mesh / camera / fog event.
- A yellow button that prints text under the canvas.
- Orbit-only. Idle spin is not a transition.
- A crumple slider and nothing else, sold as the whole site.
