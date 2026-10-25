# earth-timeline

> Technique for the **object + control** family. Steal the loop (a control changes a volume). Invent a new object. Do not ship Earth unless that metaphor fits.

**Ceiling:** one complete lit volume in a **white** field. Hairline tick slider. The **surface of the volume** changes. Huge empty studio.

## Composition (hard)

- Whole object visible. Occupies 25–40% of the short axis. Air on every side.
- FOV ≤ 28, camera pulled back (`z` ≈ 8–10).
- HUD: name top-left. Caption under the object. Tick slider **below**. Nothing on the mesh.

## 质感

The surface is **authored** (canvas continents, a written line, a shader). A default sphere that only `color.lerp`s is KEPT. Fail.

## Must

- Slider drives at least two of: texture, displacement, color. Pointer orbits slightly. Idle spin is quiet.
- Soft contact shadow. ACES. Key light with a specular.
- White or paper ground unless the brief is night.

## Fail

- Earth texture as a default for a writing tool.
- Color-only lerp on a bare SphereGeometry.
- A card under the sphere. Cropped globe. HUD on the volume.
