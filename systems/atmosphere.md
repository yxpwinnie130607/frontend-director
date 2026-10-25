# atmosphere

> Technique for the **studio background**. Recent sites do not leave cream CSS behind a mesh. The ground is a designed world: white void, night void, fogged room, or a shader field that *is* the sky. Steal the family. Invent the color and haze for **this** brief.

**Use:** every preview and every build. Read this with [transition.md](transition.md).  
**Never:** `body { background: #f6f3ec }` with a matching Three color and call it done. That is accidental cream. Fail if the first frame could be a default renderer clear.

## Decide one family (required)

| Family | What you see | How to build | Ceiling |
|---|---|---|---|
| White studio void | Huge empty paper. Soft contact shadow. No floor disk. | `scene.background` = paper. No fog, or `Fog` so light it is air. Body CSS **equals** the Three color. | Earth Timeline, Crumple, Podium |
| Night void | Black or near-black. Object or field is the only light. | `scene.background` = ink (`#050508`–`#0b0d12`). Optional `FogExp2` at 0.02–0.06. | Vercel shader, Astro Dither, Nothing to Watch |
| Fogged room | You are inside. Distance eats color. Light falloff. | `Fog` or `FogExp2` + a ground that receives light + a key. Camera at eye height. | Gaussian portal |
| White haze still-life | Rim-lit object. Falloff *is* the studio. Not a night void. | Pale ground + `FogExp2` in the **same** hue, density 0.04–0.08, so the limb dissolves into light. Tight key + rim. A hard paper void with a peach tile is INK, not Augen. | **Augen** (https://augen.pro) |
| Shader field as sky | The volume *is* the room. | Fullscreen points / TSL / dither. No second CSS wash. | Astro Dither, Sphere Clusters, Recursive Surface Erosion |

Pick **one**. Write it in a comment at the top of the module: `/* atmosphere: night void + FogExp2 0.045 */`.

## Contract

```js
const GROUND = 0x0b0d12; // authored. Not leftover cream.
scene.background = new THREE.Color(GROUND);
document.body.style.background = "#" + new THREE.Color(GROUND).getHexString();
scene.fog = new THREE.FogExp2(GROUND, 0.045); // omit fog only for a hard white void
```

- CSS body and `scene.background` are the **same authored hex**. A mismatch flashes cream then ink. Fail.
- No visible gray stage disk. Contact shadow = a soft ellipse (`MeshBasicMaterial`, opacity 0.12–0.22) or a projected shadow. A `CircleGeometry` with `MeshStandardMaterial` gray is FOLD.
- Hemisphere + one key (cast or fake contact) + a cool fill. ACES. Exposure 0.95–1.15.
- Grain is a 3–6% overlay, not a filter on the mesh. Bloom only on emissives (`threshold` ≥ 0.8). Bloom-everything is slop.

## 质感 of air

Air has density. In a white void the density is emptiness (Augen: the head dissolves into light). In night, density is fog and falloff. In a room, density is distance fog so the far wall is a hue, not a texture.

Do not add a skybox PNG. Do not add a gradient CSS behind a transparent canvas. The renderer owns the ground.

## Fail

- Accidental cream: camera too far **or** `scene.background` unset **or** CSS `#fff` behind a WebGL clear **or** a tiny toy stick in a huge pale field (STRIKE). Empty cream around a crayon is not Augen haze. Augen haze has falloff that eats the object's edges **and** an object with presence.
- Hard-cutout sticker: FogExp2 at 0.07 does nothing if the mesh is an opaque blot whose limb is a binary edge (SIGIL). The first frame must show the limb mixing into the ground. A maroon logo on flat gray-beige is INK's hard paper, not Augen.
- A second background (CSS gradient + Three color).
- Visible stage floor that reads as a disk.
- Bloom on the whole frame. SSAO as decoration.
- White-void crumple with no designed air (FOLD cousins).
- Treating Augen as a night void. It is white haze still-life.
- Treating Interfere as atmosphere. It is 2D SaaS.
