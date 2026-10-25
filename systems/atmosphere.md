# atmosphere

> Required for every preview and every build, with [motion.md](../motion.md). The background is a designed world, not leftover CSS.

**Ceiling:** Earth / Crumple / Podium white studio; Augen white haze (falloff is the studio); Vercel / Nothing-to-Watch black; Gaussian room with depth haze; Astro Dither a living field. Steal the *kind* of air. Do not clone those sites.

A cream `body` behind a far camera is how FOLD painted an empty frame. A gray `Mesh` floor is how FOLD grew a stage disk. Both fail.

## Decide before markup

Pick **one** atmosphere and keep it for the page:

| Kind | When | How |
|---|---|---|
| White / paper studio | One object + control, material transform, Podium-class | `scene.background` = paper (`#f3f0e8` / `#f6f3ec`). Soft contact ellipse only. **No floor mesh.** Fog off or hairline. |
| White haze | Still-life / rim-lit object (Augen) | Same pale ground, **FogExp2 in the ground hue**, key + rim. Falloff makes the studio. No gray disk. |
| Night void | Field / dissolve, spatial deck, glass still-life | `scene.background` = near-black (`#07080c`–`#0b0d12`). `FogExp2` or linear fog in the same hue. Dust points. No gray disk. |
| Haze room | You are inside | Fog + light falloff + a receiving floor that is *architecture*, not a studio puck. |
| Living field | The world *is* the shader | Background is the field (points, dither, erosion). CSS color only matches the clear color. |

The first screenshot must read as that choice. Accidental browser white or leftover cream is a fail.

## Studio void (copy)

```js
scene.background = new THREE.Color(0x08090d); // or 0xf3f0e8 for paper
scene.fog = new THREE.FogExp2(0x08090d, 0.045);

// dust — night only. 800–2500 points. Slow drift. Never a CSS star gif.
const dust = new THREE.Points(
  dustGeo,
  new THREE.PointsMaterial({ color: 0xc9b48a, size: 0.012, transparent: true, opacity: 0.35, depthWrite: false })
);
```

Contact shadow for a studio object: a faint `CircleGeometry` ellipse under the mesh, opacity 0.04–0.08. If it reads as a **gray stage disk** sitting on the HUD, it is too big, too low, or too opaque. Fail.

## Fail

- Body cream + camera `z` 8–10 on a small mesh (empty first frame).
- A visible gray floor / disk that is not a room.
- Bloom / CSS `filter: blur` as the whole look.
- A photo or video wallpaper behind a 2D card.
- Mixing night Linear black with a paper crumple on the same page.
