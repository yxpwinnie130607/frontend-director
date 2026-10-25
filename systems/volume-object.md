# volume-object

Recent template: **Earth Timeline** (one sphere, a slider, the surface of the volume changes) and **Crumple** (a poster becomes a wad). A lit object sits in a studio. You use *the object*.

**Use:** default studio-object loop.  
**Never:** a rounded card with a textarea (回声瓶). Never a default capsule + color lerp (KEPT). Never a cropped hero (FOLD).

## Composition (hard)

The object is **smaller than the viewport**. Lots of empty studio. Chrome is tiny and never covers it.

```
fullscreen WebGL
tiny name, top left                    whisper, top right

              [ whole object ]
              [  25–40% tall ]
              [  air around  ]

                    caption
        |||||||||||| tick slider ||||||||||||
              reprint field (optional)
```

- FOV 30–34. Camera `z` ≈ 5.2–6.2 on a ~1.7-wide mesh. `z` 8–10 paints empty cream. Fail. If the mesh is cropped, pull back a little, do not jump to 9+.
- Canvas: `#stage { inset:0; width:100%; height:100%; display:block }`. `setSize(innerWidth, innerHeight)` must update CSS. A 2× drawing buffer with unlocked CSS parks the object on the right edge (cropped FOLD). Fail.
- HUD: top corners + slider **below**. Input never sits on the mesh.
- No visible stage disk. Soft contact shadow only.
- Object height in NDC: roughly 0.25–0.4 of the short axis.

## 质感

Authored surface: a canvas the product wrote, a shader field, or vertices that crumple.  
A `PlaneGeometry` card with a map and no edge is a slab (VEIL). Night glass needs **thickness**: a thin box, authored face, dark edges, rim light that catches. Face `envMapIntensity` ≤ 0.12 at night or RoomEnvironment washes the dye to pastel. The idle pose must show an edge (rest yaw ≈ 0.35), not a dead-on card. Face roughness ≥ 0.28 with no specular is a **brick**. Oil the face: roughness ≈ 0.1, clearcoat, or a painted streak. Glass also wants `ior` ≈ 1.5 and a little `transmission` (0.1–0.2), not a plastic tile. Printed type is drawn glyph-by-glyph with a 50–70px word gap. Collapsed "Leavethe lighton" is a fail. You should want to pick it up.  
`CapsuleGeometry` / smooth `SphereGeometry` / `BoxGeometry` + `material.color.lerp` is a vitamin. Fail.

## Renderer contract

```js
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
scene.background = new THREE.Color(0xf6f3ec); // or 0x08090d at night
camera = new THREE.PerspectiveCamera(32, aspect, 0.1, 40);
camera.position.set(0, 0.12, 5.5);
// key + cool fill + a rim from behind. A flat unlit slab is VEIL-fail.
```

## Required interaction

1. Pointer orbits (lerp). Idle: barely-there spin.
2. A slider, wheel, or type **changes the volume** (surface, crumple, dissolve). Orbit-only is not the bar.
3. The product job hits the mesh (print, crumple, drop). HUD only feeds the object.

## Do not

- ≥ 70% viewport coverage. That rule produced cropped FOLD. Dead.
- Glass vessel / clay orb / torus as a default silhouette.
- Overlay a headline on the object.
- Dark 工作台 card, yellow fill button.
