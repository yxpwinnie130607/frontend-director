# transition

> Technique for the **scene change**. Recent sites do not only orbit a mesh. They jump, dissolve, wipe, dolly, or morph. The transition *is* the product event. Steal the family. Invent the event for **this** brief.

**Use:** every preview and every build. A slider that only wrinkles a plane is not enough. Read with [atmosphere.md](atmosphere.md).  
**Never:** fade the whole page opacity. Never a CSS `transition: all`. Never ship idle-orbit as the only motion.

## Decide one family (required)

| Family | What happens | How to build | Ceiling |
|---|---|---|---|
| Click-to-enter | A gate frame. Click. You are in the world. | Two states. 0.6–1.0s. Camera or field resolves. | Nothing to Watch, Astro Dither |
| Portal jump | Look at a light. Click. Fog / floor / emissive swap. | 3+ worlds. Lerp fog + key + ground over 0.5–0.9s. Pointer still looks. | Gaussian portal |
| Dissolve | Object becomes a living field. | Vertex or point mix. Points keep moving after. | Vercel shader, Recursive Surface Erosion |
| Chapter wipe | A living blob or plane reveals the next chapter. | SDF / metaball mask on a fullscreen pass, or a Three mesh as stencil. | Podium |
| Camera chapter | The camera *is* the scroll. Dolly, crane, push-through. | Lenis or scroll pin drives `camera.position` + lookAt. 3 properties min. | Shopify Editions, Augen |
| Material morph | The body changes (crumple, melt, wash). | Vertex mix. Whole object visible the entire time. | Crumple |
| World lerp | Color of air + lights + fog travel with the event. | Always pair with one of the above. The air must change, not only the mesh. | Portal + Augen falloff |

Write it in a comment: `/* transition: dissolve + world lerp, 1.1s */`.

## Contract

```js
let event = 0, target = 0;
function go() { target = target > 0.5 ? 0 : 1; }
function tick(dt) {
  event += (target - event) * Math.min(1, dt * 3.2);
  // drive at least THREE of: camera z, fog density/color, mesh mix, light intensity
  camera.position.z = THREE.MathUtils.lerp(5.4, 3.4, smooth(event));
  scene.fog.density = THREE.MathUtils.lerp(0.04, 0.11, pulse(event));
  scene.background.lerpColors(night, paper, event);
}
```

- Duration **0.7–1.4s**. Instant swap is a fail. A 4s ease is a fail.
- The first frame of the event must change **air and object**. Mesh-only (wrinkle) on a frozen cream ground is FOLD. Air-only (`scene.background.lerp` while the mesh stays a crayon) is STRIKE. A hex swap is not a world lerp.
- You can return (toggle). A one-way trap is fine if the new world is still the product.
- `prefers-reduced-motion`: jump to the end state; keep the job.

## Pairing (so the model does not only crumple)

| If the object is… | Prefer this transition |
|---|---|
| One studio object | Dissolve, material morph, **or** world lerp + camera push. Not slider-only. |
| A room you are in | Portal jump or camera chapter. |
| A field | Dissolve / erosion, or click-to-enter. |
| A deck | Camera approach + world lerp. |

A white-void sheet + tick slider, even with correct composition, is **not** a complete Recent page. Add a scene change or pick a different family.

## Fail

- Orbit-only.
- Slider wrinkles a plane and stops (FOLD, even when the wad is good).
- Background hex swap while the mesh stays the same (STRIKE).
- `renderer.domElement.style.opacity` as the transition.
- Clone Podium's blob, Astro Dither's hand, or Shopify's edition camera path.
- Two climaxes stacked (dissolve **and** portal **and** wipe).
