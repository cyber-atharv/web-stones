# Murali Granites & Marbles — Missing Renders Report & AI Generation Prompts

This document provides a comprehensive inventory of all architectural spaces, surfaces, and stone combinations that do not yet have a verified pre-rendered image. It also specifies the **Aspect Ratio Offender** that requires re-generation, and includes ready-to-paste prompts for every combination.

---

## 1. Inventory Summary

| Scene / Surface | Base Photo | Total Stones | Rendered | Missing | Status |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **Bathroom Accent Wall** | `rooms/bathroom.jpg` | 12 | 12 | 0 | Complete *(1 aspect ratio fix needed)* |
| **Bathroom Floor** | `rooms/bathroom.jpg` | 12 | 12 | 0 | Complete |
| **Bedroom Floor** | `rooms/bedroom.jpg` | 12 | 12 | 0 | Complete |
| **Living Room Accent Wall** | `rooms/living-room.jpg` | 12 | 12 | 0 | Complete |
| **Living Room Floor** | `rooms/living-room.jpg` | 12 | 12 | 0 | Complete |
| **Kitchen Countertop & Island** | `rooms/kitchen.jpg` | 12 | 12 | 0 | Complete |
| **Staircase Stairs** | `rooms/staircase.jpg` | 12 | 12 | 0 | Complete |
| **Dining Room Floor** | `rooms/dining-room.jpg` | 12 | 12 | 0 | Complete |
| **Outdoor Parking Driveway & Porch** | `rooms/parking.webp` | 12 | 3 | 9 | Active in UI (Prompts ready) |
| **Kitchen Flooring** | `rooms/kitchen.jpg` | 12 | 0 | 12 | Hidden in UI until renders exist |
| **Kitchen Design 2 (Waterfall Island)** | `gallery_showcase/02_statuario_kitchen.jpg` | 12 | 0 | 12 | Showcase photo; excluded from picker |
| **Foyer Flooring** | `rooms/foyer.jpg` | 12 | 0 | 12 | Future expansion |
| **Lounge Accent Wall** | `rooms/lounge-wall.jpg` | 12 | 0 | 12 | Future expansion |

---

## 2. Aspect Ratio Offender Requiring Re-Render

One existing render has an aspect ratio mismatch vs its base room photo, causing vertical distortion/cropping in a 16:9 box:
- **File**: `assets/images/room_renders/bathroom accent wall/render_Titanium Black.png`
- **Dimensions**: `1196x896` (Aspect Ratio: `1.3348` / 4:3)
- **Base Photo**: `assets/images/rooms/bathroom.jpg` (`1376x768`, Aspect Ratio: `1.7917` / 16:9)
- **Target File**: `assets/images/room_renders/bathroom accent wall/render_Titanium Black.png` (or `bathroom-wall/titanium-black.png`)
- **Base Reference**: `assets/images/rooms/bathroom.jpg`
- **Stone Slab Reference**: `assets/images/products/product-1783083560-6a47b228132ac.jpg`

**Ready-to-Paste Generation Prompt:**
```text
Using the attached photo of Bathroom (assets/images/rooms/bathroom.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Feature Wall with Titanium Black natural stone, using the attached stone slab photo (assets/images/products/product-1783083560-6a47b228132ac.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

---

## 3. High-Priority Missing Renders (9 Remaining Scenes)

### D. Outdoor Parking Driveway & Porch Paving (9 Missing)

#### 1. Statuario / Banswara Marble (`statuario-marble`)
- **Target File**: `assets/images/room_renders/parking-paving/render_Statuario / Banswara Marble.png`
- **Normalized Target**: `assets/images/room_renders/parking-paving/statuario-marble.png`
- **Base Photo**: `assets/images/rooms/parking.webp` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783085208-6a47b8986af97.png`
**Prompt:**
```text
Using the attached photo of Outdoor Parking Area (assets/images/rooms/parking.webp) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Driveway and Porch Heavy-Duty Granite Paving with Statuario / Banswara Marble natural stone, using the attached stone slab photo (assets/images/products/product-1783085208-6a47b8986af97.png) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 2. Kashmir / Alaska White (`kashmir-white`)
- **Target File**: `assets/images/room_renders/parking-paving/render_Kashmir / Alaska White.png`
- **Normalized Target**: `assets/images/room_renders/parking-paving/kashmir-white.png`
- **Base Photo**: `assets/images/rooms/parking.webp` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783084356-6a47b5441b767.jpg`
**Prompt:**
```text
Using the attached photo of Outdoor Parking Area (assets/images/rooms/parking.webp) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Driveway and Porch Heavy-Duty Granite Paving with Kashmir / Alaska White natural stone, using the attached stone slab photo (assets/images/products/product-1783084356-6a47b5441b767.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 3. Emerald Onyx Marble (`emerald-onyx`)
- **Target File**: `assets/images/room_renders/parking-paving/render_Emerald Onyx Marble.png`
- **Normalized Target**: `assets/images/room_renders/parking-paving/emerald-onyx.png`
- **Base Photo**: `assets/images/rooms/parking.webp` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783085161-6a47b869e0448.jpg`
**Prompt:**
```text
Using the attached photo of Outdoor Parking Area (assets/images/rooms/parking.webp) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Driveway and Porch Heavy-Duty Granite Paving with Emerald Onyx Marble natural stone, using the attached stone slab photo (assets/images/products/product-1783085161-6a47b869e0448.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 4. Marie Gold (`marie-gold`)
- **Target File**: `assets/images/room_renders/parking-paving/render_Marie Gold.png`
- **Normalized Target**: `assets/images/room_renders/parking-paving/marie-gold.png`
- **Base Photo**: `assets/images/rooms/parking.webp` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783085317-6a47b9058f71e.jpg`
**Prompt:**
```text
Using the attached photo of Outdoor Parking Area (assets/images/rooms/parking.webp) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Driveway and Porch Heavy-Duty Granite Paving with Marie Gold natural stone, using the attached stone slab photo (assets/images/products/product-1783085317-6a47b9058f71e.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 5. Blue in the Night (`blue-night`)
- **Target File**: `assets/images/room_renders/parking-paving/render_Blue in the Night.png`
- **Normalized Target**: `assets/images/room_renders/parking-paving/blue-night.png`
- **Base Photo**: `assets/images/rooms/parking.webp` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783085244-6a47b8bcd330d.png`
**Prompt:**
```text
Using the attached photo of Outdoor Parking Area (assets/images/rooms/parking.webp) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Driveway and Porch Heavy-Duty Granite Paving with Blue in the Night natural stone, using the attached stone slab photo (assets/images/products/product-1783085244-6a47b8bcd330d.png) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 6. Moon White (`moon-white`)
- **Target File**: `assets/images/room_renders/parking-paving/render_Moon White.png`
- **Normalized Target**: `assets/images/room_renders/parking-paving/moon-white.png`
- **Base Photo**: `assets/images/rooms/parking.webp` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783079448-6a47a218632fd.jpg`
**Prompt:**
```text
Using the attached photo of Outdoor Parking Area (assets/images/rooms/parking.webp) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Driveway and Porch Heavy-Duty Granite Paving with Moon White natural stone, using the attached stone slab photo (assets/images/products/product-1783079448-6a47a218632fd.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 7. River White (`river-white`)
- **Target File**: `assets/images/room_renders/parking-paving/render_River White.png`
- **Normalized Target**: `assets/images/room_renders/parking-paving/river-white.png`
- **Base Photo**: `assets/images/rooms/parking.webp` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783078831-6a479faf4fcbd.jpg`
**Prompt:**
```text
Using the attached photo of Outdoor Parking Area (assets/images/rooms/parking.webp) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Driveway and Porch Heavy-Duty Granite Paving with River White natural stone, using the attached stone slab photo (assets/images/products/product-1783078831-6a479faf4fcbd.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 8. Black Forest (`black-forest`)
- **Target File**: `assets/images/room_renders/parking-paving/render_Black Forest.png`
- **Normalized Target**: `assets/images/room_renders/parking-paving/black-forest.png`
- **Base Photo**: `assets/images/rooms/parking.webp` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783083657-6a47b289a4a40.jpg`
**Prompt:**
```text
Using the attached photo of Outdoor Parking Area (assets/images/rooms/parking.webp) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Driveway and Porch Heavy-Duty Granite Paving with Black Forest natural stone, using the attached stone slab photo (assets/images/products/product-1783083657-6a47b289a4a40.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 9. Titanium Black (`titanium-black`)
- **Target File**: `assets/images/room_renders/parking-paving/render_Titanium Black.png`
- **Normalized Target**: `assets/images/room_renders/parking-paving/titanium-black.png`
- **Base Photo**: `assets/images/rooms/parking.webp` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783083560-6a47b228132ac.jpg`
**Prompt:**
```text
Using the attached photo of Outdoor Parking Area (assets/images/rooms/parking.webp) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Driveway and Porch Heavy-Duty Granite Paving with Titanium Black natural stone, using the attached stone slab photo (assets/images/products/product-1783083560-6a47b228132ac.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

### E. Kitchen Flooring (12 Missing Renders — floor visible at base of kitchen.jpg) (12 Missing)

#### 1. River Black (`river-black`)
- **Target File**: `assets/images/room_renders/kitchen-floor/render_River Black.png`
- **Normalized Target**: `assets/images/room_renders/kitchen-floor/river-black.png`
- **Base Photo**: `assets/images/rooms/kitchen.jpg` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783138465-6a4888a145274.jpg`
**Prompt:**
```text
Using the attached photo of Kitchen (assets/images/rooms/kitchen.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Kitchen Flooring with River Black natural stone, using the attached stone slab photo (assets/images/products/product-1783138465-6a4888a145274.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 2. Black Pearl (`black-pearl`)
- **Target File**: `assets/images/room_renders/kitchen-floor/render_Black Pearl.png`
- **Normalized Target**: `assets/images/room_renders/kitchen-floor/black-pearl.png`
- **Base Photo**: `assets/images/rooms/kitchen.jpg` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783138424-6a488878abc22.jpg`
**Prompt:**
```text
Using the attached photo of Kitchen (assets/images/rooms/kitchen.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Kitchen Flooring with Black Pearl natural stone, using the attached stone slab photo (assets/images/products/product-1783138424-6a488878abc22.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 3. Tan Brown (`tan-brown`)
- **Target File**: `assets/images/room_renders/kitchen-floor/render_Tan Brown.png`
- **Normalized Target**: `assets/images/room_renders/kitchen-floor/tan-brown.png`
- **Base Photo**: `assets/images/rooms/kitchen.jpg` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783084011-6a47b3eb20cf0.jpg`
**Prompt:**
```text
Using the attached photo of Kitchen (assets/images/rooms/kitchen.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Kitchen Flooring with Tan Brown natural stone, using the attached stone slab photo (assets/images/products/product-1783084011-6a47b3eb20cf0.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 4. Statuario / Banswara Marble (`statuario-marble`)
- **Target File**: `assets/images/room_renders/kitchen-floor/render_Statuario / Banswara Marble.png`
- **Normalized Target**: `assets/images/room_renders/kitchen-floor/statuario-marble.png`
- **Base Photo**: `assets/images/rooms/kitchen.jpg` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783085208-6a47b8986af97.png`
**Prompt:**
```text
Using the attached photo of Kitchen (assets/images/rooms/kitchen.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Kitchen Flooring with Statuario / Banswara Marble natural stone, using the attached stone slab photo (assets/images/products/product-1783085208-6a47b8986af97.png) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 5. Kashmir / Alaska White (`kashmir-white`)
- **Target File**: `assets/images/room_renders/kitchen-floor/render_Kashmir / Alaska White.png`
- **Normalized Target**: `assets/images/room_renders/kitchen-floor/kashmir-white.png`
- **Base Photo**: `assets/images/rooms/kitchen.jpg` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783084356-6a47b5441b767.jpg`
**Prompt:**
```text
Using the attached photo of Kitchen (assets/images/rooms/kitchen.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Kitchen Flooring with Kashmir / Alaska White natural stone, using the attached stone slab photo (assets/images/products/product-1783084356-6a47b5441b767.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 6. Emerald Onyx Marble (`emerald-onyx`)
- **Target File**: `assets/images/room_renders/kitchen-floor/render_Emerald Onyx Marble.png`
- **Normalized Target**: `assets/images/room_renders/kitchen-floor/emerald-onyx.png`
- **Base Photo**: `assets/images/rooms/kitchen.jpg` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783085161-6a47b869e0448.jpg`
**Prompt:**
```text
Using the attached photo of Kitchen (assets/images/rooms/kitchen.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Kitchen Flooring with Emerald Onyx Marble natural stone, using the attached stone slab photo (assets/images/products/product-1783085161-6a47b869e0448.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 7. Marie Gold (`marie-gold`)
- **Target File**: `assets/images/room_renders/kitchen-floor/render_Marie Gold.png`
- **Normalized Target**: `assets/images/room_renders/kitchen-floor/marie-gold.png`
- **Base Photo**: `assets/images/rooms/kitchen.jpg` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783085317-6a47b9058f71e.jpg`
**Prompt:**
```text
Using the attached photo of Kitchen (assets/images/rooms/kitchen.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Kitchen Flooring with Marie Gold natural stone, using the attached stone slab photo (assets/images/products/product-1783085317-6a47b9058f71e.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 8. Blue in the Night (`blue-night`)
- **Target File**: `assets/images/room_renders/kitchen-floor/render_Blue in the Night.png`
- **Normalized Target**: `assets/images/room_renders/kitchen-floor/blue-night.png`
- **Base Photo**: `assets/images/rooms/kitchen.jpg` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783085244-6a47b8bcd330d.png`
**Prompt:**
```text
Using the attached photo of Kitchen (assets/images/rooms/kitchen.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Kitchen Flooring with Blue in the Night natural stone, using the attached stone slab photo (assets/images/products/product-1783085244-6a47b8bcd330d.png) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 9. Moon White (`moon-white`)
- **Target File**: `assets/images/room_renders/kitchen-floor/render_Moon White.png`
- **Normalized Target**: `assets/images/room_renders/kitchen-floor/moon-white.png`
- **Base Photo**: `assets/images/rooms/kitchen.jpg` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783079448-6a47a218632fd.jpg`
**Prompt:**
```text
Using the attached photo of Kitchen (assets/images/rooms/kitchen.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Kitchen Flooring with Moon White natural stone, using the attached stone slab photo (assets/images/products/product-1783079448-6a47a218632fd.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 10. River White (`river-white`)
- **Target File**: `assets/images/room_renders/kitchen-floor/render_River White.png`
- **Normalized Target**: `assets/images/room_renders/kitchen-floor/river-white.png`
- **Base Photo**: `assets/images/rooms/kitchen.jpg` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783078831-6a479faf4fcbd.jpg`
**Prompt:**
```text
Using the attached photo of Kitchen (assets/images/rooms/kitchen.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Kitchen Flooring with River White natural stone, using the attached stone slab photo (assets/images/products/product-1783078831-6a479faf4fcbd.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 11. Black Forest (`black-forest`)
- **Target File**: `assets/images/room_renders/kitchen-floor/render_Black Forest.png`
- **Normalized Target**: `assets/images/room_renders/kitchen-floor/black-forest.png`
- **Base Photo**: `assets/images/rooms/kitchen.jpg` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783083657-6a47b289a4a40.jpg`
**Prompt:**
```text
Using the attached photo of Kitchen (assets/images/rooms/kitchen.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Kitchen Flooring with Black Forest natural stone, using the attached stone slab photo (assets/images/products/product-1783083657-6a47b289a4a40.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 12. Titanium Black (`titanium-black`)
- **Target File**: `assets/images/room_renders/kitchen-floor/render_Titanium Black.png`
- **Normalized Target**: `assets/images/room_renders/kitchen-floor/titanium-black.png`
- **Base Photo**: `assets/images/rooms/kitchen.jpg` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783083560-6a47b228132ac.jpg`
**Prompt:**
```text
Using the attached photo of Kitchen (assets/images/rooms/kitchen.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Kitchen Flooring with Titanium Black natural stone, using the attached stone slab photo (assets/images/products/product-1783083560-6a47b228132ac.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

---

## 4. Optional Future Expansion Scenes (24 Prompts)

If the client approves expanding into the remaining showroom reference rooms:

### F. Foyer Flooring (12 Prompts) (12 Missing)

#### 1. River Black (`river-black`)
- **Target File**: `assets/images/room_renders/foyer-floor/render_River Black.png`
- **Normalized Target**: `assets/images/room_renders/foyer-floor/river-black.png`
- **Base Photo**: `assets/images/rooms/foyer.jpg` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783138465-6a4888a145274.jpg`
**Prompt:**
```text
Using the attached photo of Foyer (assets/images/rooms/foyer.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Foyer Flooring with River Black natural stone, using the attached stone slab photo (assets/images/products/product-1783138465-6a4888a145274.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 2. Black Pearl (`black-pearl`)
- **Target File**: `assets/images/room_renders/foyer-floor/render_Black Pearl.png`
- **Normalized Target**: `assets/images/room_renders/foyer-floor/black-pearl.png`
- **Base Photo**: `assets/images/rooms/foyer.jpg` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783138424-6a488878abc22.jpg`
**Prompt:**
```text
Using the attached photo of Foyer (assets/images/rooms/foyer.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Foyer Flooring with Black Pearl natural stone, using the attached stone slab photo (assets/images/products/product-1783138424-6a488878abc22.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 3. Tan Brown (`tan-brown`)
- **Target File**: `assets/images/room_renders/foyer-floor/render_Tan Brown.png`
- **Normalized Target**: `assets/images/room_renders/foyer-floor/tan-brown.png`
- **Base Photo**: `assets/images/rooms/foyer.jpg` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783084011-6a47b3eb20cf0.jpg`
**Prompt:**
```text
Using the attached photo of Foyer (assets/images/rooms/foyer.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Foyer Flooring with Tan Brown natural stone, using the attached stone slab photo (assets/images/products/product-1783084011-6a47b3eb20cf0.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 4. Statuario / Banswara Marble (`statuario-marble`)
- **Target File**: `assets/images/room_renders/foyer-floor/render_Statuario / Banswara Marble.png`
- **Normalized Target**: `assets/images/room_renders/foyer-floor/statuario-marble.png`
- **Base Photo**: `assets/images/rooms/foyer.jpg` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783085208-6a47b8986af97.png`
**Prompt:**
```text
Using the attached photo of Foyer (assets/images/rooms/foyer.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Foyer Flooring with Statuario / Banswara Marble natural stone, using the attached stone slab photo (assets/images/products/product-1783085208-6a47b8986af97.png) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 5. Kashmir / Alaska White (`kashmir-white`)
- **Target File**: `assets/images/room_renders/foyer-floor/render_Kashmir / Alaska White.png`
- **Normalized Target**: `assets/images/room_renders/foyer-floor/kashmir-white.png`
- **Base Photo**: `assets/images/rooms/foyer.jpg` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783084356-6a47b5441b767.jpg`
**Prompt:**
```text
Using the attached photo of Foyer (assets/images/rooms/foyer.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Foyer Flooring with Kashmir / Alaska White natural stone, using the attached stone slab photo (assets/images/products/product-1783084356-6a47b5441b767.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 6. Emerald Onyx Marble (`emerald-onyx`)
- **Target File**: `assets/images/room_renders/foyer-floor/render_Emerald Onyx Marble.png`
- **Normalized Target**: `assets/images/room_renders/foyer-floor/emerald-onyx.png`
- **Base Photo**: `assets/images/rooms/foyer.jpg` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783085161-6a47b869e0448.jpg`
**Prompt:**
```text
Using the attached photo of Foyer (assets/images/rooms/foyer.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Foyer Flooring with Emerald Onyx Marble natural stone, using the attached stone slab photo (assets/images/products/product-1783085161-6a47b869e0448.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 7. Marie Gold (`marie-gold`)
- **Target File**: `assets/images/room_renders/foyer-floor/render_Marie Gold.png`
- **Normalized Target**: `assets/images/room_renders/foyer-floor/marie-gold.png`
- **Base Photo**: `assets/images/rooms/foyer.jpg` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783085317-6a47b9058f71e.jpg`
**Prompt:**
```text
Using the attached photo of Foyer (assets/images/rooms/foyer.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Foyer Flooring with Marie Gold natural stone, using the attached stone slab photo (assets/images/products/product-1783085317-6a47b9058f71e.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 8. Blue in the Night (`blue-night`)
- **Target File**: `assets/images/room_renders/foyer-floor/render_Blue in the Night.png`
- **Normalized Target**: `assets/images/room_renders/foyer-floor/blue-night.png`
- **Base Photo**: `assets/images/rooms/foyer.jpg` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783085244-6a47b8bcd330d.png`
**Prompt:**
```text
Using the attached photo of Foyer (assets/images/rooms/foyer.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Foyer Flooring with Blue in the Night natural stone, using the attached stone slab photo (assets/images/products/product-1783085244-6a47b8bcd330d.png) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 9. Moon White (`moon-white`)
- **Target File**: `assets/images/room_renders/foyer-floor/render_Moon White.png`
- **Normalized Target**: `assets/images/room_renders/foyer-floor/moon-white.png`
- **Base Photo**: `assets/images/rooms/foyer.jpg` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783079448-6a47a218632fd.jpg`
**Prompt:**
```text
Using the attached photo of Foyer (assets/images/rooms/foyer.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Foyer Flooring with Moon White natural stone, using the attached stone slab photo (assets/images/products/product-1783079448-6a47a218632fd.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 10. River White (`river-white`)
- **Target File**: `assets/images/room_renders/foyer-floor/render_River White.png`
- **Normalized Target**: `assets/images/room_renders/foyer-floor/river-white.png`
- **Base Photo**: `assets/images/rooms/foyer.jpg` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783078831-6a479faf4fcbd.jpg`
**Prompt:**
```text
Using the attached photo of Foyer (assets/images/rooms/foyer.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Foyer Flooring with River White natural stone, using the attached stone slab photo (assets/images/products/product-1783078831-6a479faf4fcbd.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 11. Black Forest (`black-forest`)
- **Target File**: `assets/images/room_renders/foyer-floor/render_Black Forest.png`
- **Normalized Target**: `assets/images/room_renders/foyer-floor/black-forest.png`
- **Base Photo**: `assets/images/rooms/foyer.jpg` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783083657-6a47b289a4a40.jpg`
**Prompt:**
```text
Using the attached photo of Foyer (assets/images/rooms/foyer.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Foyer Flooring with Black Forest natural stone, using the attached stone slab photo (assets/images/products/product-1783083657-6a47b289a4a40.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 12. Titanium Black (`titanium-black`)
- **Target File**: `assets/images/room_renders/foyer-floor/render_Titanium Black.png`
- **Normalized Target**: `assets/images/room_renders/foyer-floor/titanium-black.png`
- **Base Photo**: `assets/images/rooms/foyer.jpg` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783083560-6a47b228132ac.jpg`
**Prompt:**
```text
Using the attached photo of Foyer (assets/images/rooms/foyer.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Foyer Flooring with Titanium Black natural stone, using the attached stone slab photo (assets/images/products/product-1783083560-6a47b228132ac.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

### G. Architectural Lounge Accent Wall (12 Prompts) (12 Missing)

#### 1. River Black (`river-black`)
- **Target File**: `assets/images/room_renders/lounge-wall/render_River Black.png`
- **Normalized Target**: `assets/images/room_renders/lounge-wall/river-black.png`
- **Base Photo**: `assets/images/rooms/lounge-wall.jpg` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783138465-6a4888a145274.jpg`
**Prompt:**
```text
Using the attached photo of Architectural Lounge (assets/images/rooms/lounge-wall.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Lounge Feature Wall with River Black natural stone, using the attached stone slab photo (assets/images/products/product-1783138465-6a4888a145274.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 2. Black Pearl (`black-pearl`)
- **Target File**: `assets/images/room_renders/lounge-wall/render_Black Pearl.png`
- **Normalized Target**: `assets/images/room_renders/lounge-wall/black-pearl.png`
- **Base Photo**: `assets/images/rooms/lounge-wall.jpg` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783138424-6a488878abc22.jpg`
**Prompt:**
```text
Using the attached photo of Architectural Lounge (assets/images/rooms/lounge-wall.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Lounge Feature Wall with Black Pearl natural stone, using the attached stone slab photo (assets/images/products/product-1783138424-6a488878abc22.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 3. Tan Brown (`tan-brown`)
- **Target File**: `assets/images/room_renders/lounge-wall/render_Tan Brown.png`
- **Normalized Target**: `assets/images/room_renders/lounge-wall/tan-brown.png`
- **Base Photo**: `assets/images/rooms/lounge-wall.jpg` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783084011-6a47b3eb20cf0.jpg`
**Prompt:**
```text
Using the attached photo of Architectural Lounge (assets/images/rooms/lounge-wall.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Lounge Feature Wall with Tan Brown natural stone, using the attached stone slab photo (assets/images/products/product-1783084011-6a47b3eb20cf0.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 4. Statuario / Banswara Marble (`statuario-marble`)
- **Target File**: `assets/images/room_renders/lounge-wall/render_Statuario / Banswara Marble.png`
- **Normalized Target**: `assets/images/room_renders/lounge-wall/statuario-marble.png`
- **Base Photo**: `assets/images/rooms/lounge-wall.jpg` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783085208-6a47b8986af97.png`
**Prompt:**
```text
Using the attached photo of Architectural Lounge (assets/images/rooms/lounge-wall.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Lounge Feature Wall with Statuario / Banswara Marble natural stone, using the attached stone slab photo (assets/images/products/product-1783085208-6a47b8986af97.png) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 5. Kashmir / Alaska White (`kashmir-white`)
- **Target File**: `assets/images/room_renders/lounge-wall/render_Kashmir / Alaska White.png`
- **Normalized Target**: `assets/images/room_renders/lounge-wall/kashmir-white.png`
- **Base Photo**: `assets/images/rooms/lounge-wall.jpg` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783084356-6a47b5441b767.jpg`
**Prompt:**
```text
Using the attached photo of Architectural Lounge (assets/images/rooms/lounge-wall.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Lounge Feature Wall with Kashmir / Alaska White natural stone, using the attached stone slab photo (assets/images/products/product-1783084356-6a47b5441b767.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 6. Emerald Onyx Marble (`emerald-onyx`)
- **Target File**: `assets/images/room_renders/lounge-wall/render_Emerald Onyx Marble.png`
- **Normalized Target**: `assets/images/room_renders/lounge-wall/emerald-onyx.png`
- **Base Photo**: `assets/images/rooms/lounge-wall.jpg` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783085161-6a47b869e0448.jpg`
**Prompt:**
```text
Using the attached photo of Architectural Lounge (assets/images/rooms/lounge-wall.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Lounge Feature Wall with Emerald Onyx Marble natural stone, using the attached stone slab photo (assets/images/products/product-1783085161-6a47b869e0448.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 7. Marie Gold (`marie-gold`)
- **Target File**: `assets/images/room_renders/lounge-wall/render_Marie Gold.png`
- **Normalized Target**: `assets/images/room_renders/lounge-wall/marie-gold.png`
- **Base Photo**: `assets/images/rooms/lounge-wall.jpg` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783085317-6a47b9058f71e.jpg`
**Prompt:**
```text
Using the attached photo of Architectural Lounge (assets/images/rooms/lounge-wall.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Lounge Feature Wall with Marie Gold natural stone, using the attached stone slab photo (assets/images/products/product-1783085317-6a47b9058f71e.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 8. Blue in the Night (`blue-night`)
- **Target File**: `assets/images/room_renders/lounge-wall/render_Blue in the Night.png`
- **Normalized Target**: `assets/images/room_renders/lounge-wall/blue-night.png`
- **Base Photo**: `assets/images/rooms/lounge-wall.jpg` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783085244-6a47b8bcd330d.png`
**Prompt:**
```text
Using the attached photo of Architectural Lounge (assets/images/rooms/lounge-wall.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Lounge Feature Wall with Blue in the Night natural stone, using the attached stone slab photo (assets/images/products/product-1783085244-6a47b8bcd330d.png) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 9. Moon White (`moon-white`)
- **Target File**: `assets/images/room_renders/lounge-wall/render_Moon White.png`
- **Normalized Target**: `assets/images/room_renders/lounge-wall/moon-white.png`
- **Base Photo**: `assets/images/rooms/lounge-wall.jpg` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783079448-6a47a218632fd.jpg`
**Prompt:**
```text
Using the attached photo of Architectural Lounge (assets/images/rooms/lounge-wall.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Lounge Feature Wall with Moon White natural stone, using the attached stone slab photo (assets/images/products/product-1783079448-6a47a218632fd.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 10. River White (`river-white`)
- **Target File**: `assets/images/room_renders/lounge-wall/render_River White.png`
- **Normalized Target**: `assets/images/room_renders/lounge-wall/river-white.png`
- **Base Photo**: `assets/images/rooms/lounge-wall.jpg` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783078831-6a479faf4fcbd.jpg`
**Prompt:**
```text
Using the attached photo of Architectural Lounge (assets/images/rooms/lounge-wall.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Lounge Feature Wall with River White natural stone, using the attached stone slab photo (assets/images/products/product-1783078831-6a479faf4fcbd.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 11. Black Forest (`black-forest`)
- **Target File**: `assets/images/room_renders/lounge-wall/render_Black Forest.png`
- **Normalized Target**: `assets/images/room_renders/lounge-wall/black-forest.png`
- **Base Photo**: `assets/images/rooms/lounge-wall.jpg` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783083657-6a47b289a4a40.jpg`
**Prompt:**
```text
Using the attached photo of Architectural Lounge (assets/images/rooms/lounge-wall.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Lounge Feature Wall with Black Forest natural stone, using the attached stone slab photo (assets/images/products/product-1783083657-6a47b289a4a40.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```

#### 12. Titanium Black (`titanium-black`)
- **Target File**: `assets/images/room_renders/lounge-wall/render_Titanium Black.png`
- **Normalized Target**: `assets/images/room_renders/lounge-wall/titanium-black.png`
- **Base Photo**: `assets/images/rooms/lounge-wall.jpg` (1376x768, 16:9)
- **Stone Slab Reference**: `assets/images/products/product-1783083560-6a47b228132ac.jpg`
**Prompt:**
```text
Using the attached photo of Architectural Lounge (assets/images/rooms/lounge-wall.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Lounge Feature Wall with Titanium Black natural stone, using the attached stone slab photo (assets/images/products/product-1783083560-6a47b228132ac.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.
```
