# Murali Granites & Marbles — Render Normalization & WebP Plan

This document provides the dry-run plan for normalizing all 72 architectural render filenames and converting them to WebP format (~85 quality) with PNG kept as source. **All original files and directories are 100% preserved.**

---

## 1. Executive Summary

- **Total Verified Renders**: 72 files across 8 architectural scenes
- **Target Filename Convention**: `<stone-id>.png` and `<stone-id>.webp`
- **Source Retention**: Originals in `assets/images/room_renders/<original-folder>/` remain untouched.
- **Normalized Destination**: `assets/images/room_renders/<normalized-folder>/`
- **Script Available**: Run `python scripts/normalize-renders.py --apply` to execute on confirmation.

---

## 2. Directory Mapping

| Source Directory | Normalized Directory | Renders | Base Photo Reference |
| :--- | :--- | :---: | :--- |
| `kitchen countertop/` | `kitchen-countertop/` | 8 | `rooms/kitchen.jpg` |
| `living room acent wall/` | `living-room-wall/` | 12 | `rooms/living-room.jpg` |
| `living room floor/` | `living-room-floor/` | 12 | `rooms/living-room.jpg` |
| `bathroom accent wall/` | `bathroom-wall/` | 12 | `rooms/bathroom.jpg` |
| `bathroom floor/` | `bathroom-floor/` | 12 | `rooms/bathroom.jpg` |
| `bedroom floor/` | `bedroom-floor/` | 12 | `rooms/bedroom.jpg` |
| `staircase stairs/` | `staircase-stairs/` | 2 | `rooms/staircase.jpg` |
| `dining room floor/` | `dining-room-floor/` | 2 | `rooms/dining-room.jpg` |

---

## 3. Detailed File Normalization Table (Dry-Run)

| Stone ID | Stone Name | Dimensions | Size | Original Path | Normalized PNG Target | WebP Target (~85 Q) |
| :--- | :--- | :---: | :---: | :--- | :--- | :--- |
| `black-forest` | Black Forest | 1376x768 | 773.0 KB | `kitchen countertop/render_Black Forest.jpg` | `kitchen-countertop/black-forest.png` | `kitchen-countertop/black-forest.webp` |
| `black-pearl` | Black Pearl | 1376x768 | 743.2 KB | `kitchen countertop/render_Black Pearl.png` | `kitchen-countertop/black-pearl.png` | `kitchen-countertop/black-pearl.webp` |
| `blue-night` | Blue in the Night | 1376x768 | 1601.6 KB | `kitchen countertop/render_Blue in the Night.png` | `kitchen-countertop/blue-night.png` | `kitchen-countertop/blue-night.webp` |
| `emerald-onyx` | Emerald Onyx Marble | 1376x768 | 1543.5 KB | `kitchen countertop/render_Emerald Onyx Marble.png` | `kitchen-countertop/emerald-onyx.png` | `kitchen-countertop/emerald-onyx.webp` |
| `kashmir-white` | Kashmir / Alaska White | 1376x768 | 789.3 KB | `kitchen countertop/render_Kashmir Alaska White.png` | `kitchen-countertop/kashmir-white.png` | `kitchen-countertop/kashmir-white.webp` |
| `marie-gold` | Marie Gold | 1376x768 | 1539.6 KB | `kitchen countertop/render_Marie Gold.png` | `kitchen-countertop/marie-gold.png` | `kitchen-countertop/marie-gold.webp` |
| `moon-white` | Moon White | 1376x768 | 787.6 KB | `kitchen countertop/render_Moon White.jpg` | `kitchen-countertop/moon-white.png` | `kitchen-countertop/moon-white.webp` |
| `river-black` | River Black | 1376x768 | 1496.8 KB | `kitchen countertop/render_River Black.png` | `kitchen-countertop/river-black.png` | `kitchen-countertop/river-black.webp` |
| `river-white` | River White | 1376x768 | 760.1 KB | `kitchen countertop/render_River White.jpg` | `kitchen-countertop/river-white.png` | `kitchen-countertop/river-white.webp` |
| `statuario-marble` | Statuario / Banswara Marble | 1376x768 | 764.4 KB | `kitchen countertop/render_Statuario Banswara Marble.png` | `kitchen-countertop/statuario-marble.png` | `kitchen-countertop/statuario-marble.webp` |
| `tan-brown` | Tan Brown | 1376x768 | 774.7 KB | `kitchen countertop/render_Tan Brown.png` | `kitchen-countertop/tan-brown.png` | `kitchen-countertop/tan-brown.webp` |
| `titanium-black` | Titanium Black | 1376x768 | 806.9 KB | `kitchen countertop/render_Titanium Black.jpg` | `kitchen-countertop/titanium-black.png` | `kitchen-countertop/titanium-black.webp` |
| `black-forest` | Black Forest | 1376x768 | 854.9 KB | `living room acent wall/render_Black Forest.png` | `living-room-wall/black-forest.png` | `living-room-wall/black-forest.webp` |
| `black-pearl` | Black Pearl | 2752x1536 | 8906.5 KB | `living room acent wall/render_Black Pearl.png` | `living-room-wall/black-pearl.png` | `living-room-wall/black-pearl.webp` |
| `blue-night` | Blue in the Night | 2752x1536 | 9075.9 KB | `living room acent wall/render_Blue in the Night.png` | `living-room-wall/blue-night.png` | `living-room-wall/blue-night.webp` |
| `emerald-onyx` | Emerald Onyx Marble | 1376x768 | 1709.2 KB | `living room acent wall/render_Emerald Onyx Marble.png` | `living-room-wall/emerald-onyx.png` | `living-room-wall/emerald-onyx.webp` |
| `kashmir-white` | Kashmir / Alaska White | 2752x1536 | 9004.8 KB | `living room acent wall/render_Kashmir Alaska White.png` | `living-room-wall/kashmir-white.png` | `living-room-wall/kashmir-white.webp` |
| `marie-gold` | Marie Gold | 2752x1536 | 9155.0 KB | `living room acent wall/render_Marie Gold.png` | `living-room-wall/marie-gold.png` | `living-room-wall/marie-gold.webp` |
| `moon-white` | Moon White | 2752x1536 | 8978.5 KB | `living room acent wall/render_Moon White.png` | `living-room-wall/moon-white.png` | `living-room-wall/moon-white.webp` |
| `river-black` | River Black | 2752x1536 | 8654.3 KB | `living room acent wall/render_River Black.png` | `living-room-wall/river-black.png` | `living-room-wall/river-black.webp` |
| `river-white` | River White | 2752x1536 | 9044.9 KB | `living room acent wall/render_River White.png` | `living-room-wall/river-white.png` | `living-room-wall/river-white.webp` |
| `statuario-marble` | Statuario / Banswara Marble | 2752x1536 | 8317.1 KB | `living room acent wall/render_Statuario  Banswara Marble.png` | `living-room-wall/statuario-marble.png` | `living-room-wall/statuario-marble.webp` |
| `tan-brown` | Tan Brown | 2752x1536 | 8996.5 KB | `living room acent wall/render_Tan Brown.png` | `living-room-wall/tan-brown.png` | `living-room-wall/tan-brown.webp` |
| `titanium-black` | Titanium Black | 2752x1536 | 8984.3 KB | `living room acent wall/render_Titanium Black.png` | `living-room-wall/titanium-black.png` | `living-room-wall/titanium-black.webp` |
| `black-forest` | Black Forest | 1376x768 | 2309.6 KB | `living room floor/render_Black Forest.png` | `living-room-floor/black-forest.png` | `living-room-floor/black-forest.webp` |
| `black-pearl` | Black Pearl | 1376x768 | 2283.7 KB | `living room floor/render_Black Pearl.png` | `living-room-floor/black-pearl.png` | `living-room-floor/black-pearl.webp` |
| `blue-night` | Blue in the Night | 1376x768 | 2307.0 KB | `living room floor/render_Blue in the Night.png` | `living-room-floor/blue-night.png` | `living-room-floor/blue-night.webp` |
| `emerald-onyx` | Emerald Onyx Marble | 1376x768 | 2303.6 KB | `living room floor/render_Emerald Onyx Marble.png` | `living-room-floor/emerald-onyx.png` | `living-room-floor/emerald-onyx.webp` |
| `kashmir-white` | Kashmir / Alaska White | 1376x768 | 2341.8 KB | `living room floor/render_Kashmir  Alaska White.png` | `living-room-floor/kashmir-white.png` | `living-room-floor/kashmir-white.webp` |
| `marie-gold` | Marie Gold | 1376x768 | 2322.4 KB | `living room floor/render_Marie Gold.png` | `living-room-floor/marie-gold.png` | `living-room-floor/marie-gold.webp` |
| `moon-white` | Moon White | 1376x768 | 2336.1 KB | `living room floor/render_Moon White.png` | `living-room-floor/moon-white.png` | `living-room-floor/moon-white.webp` |
| `river-black` | River Black | 1376x768 | 2287.7 KB | `living room floor/render_River Black.png` | `living-room-floor/river-black.png` | `living-room-floor/river-black.webp` |
| `river-white` | River White | 1376x768 | 2328.8 KB | `living room floor/render_River White.png` | `living-room-floor/river-white.png` | `living-room-floor/river-white.webp` |
| `statuario-marble` | Statuario / Banswara Marble | 1376x768 | 2237.0 KB | `living room floor/render_Statuario Banswara Marble.png` | `living-room-floor/statuario-marble.png` | `living-room-floor/statuario-marble.webp` |
| `tan-brown` | Tan Brown | 1376x768 | 2323.1 KB | `living room floor/render_Tan Brown.png` | `living-room-floor/tan-brown.png` | `living-room-floor/tan-brown.webp` |
| `titanium-black` | Titanium Black | 1376x768 | 2323.8 KB | `living room floor/render_Titanium Black.png` | `living-room-floor/titanium-black.png` | `living-room-floor/titanium-black.webp` |
| `black-forest` | Black Forest | 1376x768 | 2379.0 KB | `bathroom accent wall/render_Black Forest.png` | `bathroom-wall/black-forest.png` | `bathroom-wall/black-forest.webp` |
| `black-pearl` | Black Pearl | 1376x768 | 2368.5 KB | `bathroom accent wall/render_Black Pearl.png` | `bathroom-wall/black-pearl.png` | `bathroom-wall/black-pearl.webp` |
| `blue-night` | Blue in the Night | 1376x768 | 2441.6 KB | `bathroom accent wall/render_Blue in the Night.png` | `bathroom-wall/blue-night.png` | `bathroom-wall/blue-night.webp` |
| `emerald-onyx` | Emerald Onyx Marble | 1376x768 | 758.1 KB | `bathroom accent wall/render_Emerald Onyx Marble.png` | `bathroom-wall/emerald-onyx.png` | `bathroom-wall/emerald-onyx.webp` |
| `kashmir-white` | Kashmir / Alaska White | 1376x768 | 2492.5 KB | `bathroom accent wall/render_Kashmir Alaska White.png` | `bathroom-wall/kashmir-white.png` | `bathroom-wall/kashmir-white.webp` |
| `marie-gold` | Marie Gold | 1376x768 | 2461.3 KB | `bathroom accent wall/render_Marie Gold.png` | `bathroom-wall/marie-gold.png` | `bathroom-wall/marie-gold.webp` |
| `moon-white` | Moon White | 1376x768 | 2385.7 KB | `bathroom accent wall/render_Moon White.png` | `bathroom-wall/moon-white.png` | `bathroom-wall/moon-white.webp` |
| `river-black` | River Black | 1376x768 | 2368.8 KB | `bathroom accent wall/render_River Black.png` | `bathroom-wall/river-black.png` | `bathroom-wall/river-black.webp` |
| `river-white` | River White | 1376x768 | 2400.2 KB | `bathroom accent wall/render_River White.png` | `bathroom-wall/river-white.png` | `bathroom-wall/river-white.webp` |
| `statuario-marble` | Statuario / Banswara Marble | 1376x768 | 716.3 KB | `bathroom accent wall/render_Statuario Banswara Marble.png` | `bathroom-wall/statuario-marble.png` | `bathroom-wall/statuario-marble.webp` |
| `tan-brown` | Tan Brown | 1376x768 | 2440.1 KB | `bathroom accent wall/render_Tan Brown.png` | `bathroom-wall/tan-brown.png` | `bathroom-wall/tan-brown.webp` |
| `titanium-black` | Titanium Black | 1196x896 | 2460.9 KB | `bathroom accent wall/render_Titanium Black.png` | `bathroom-wall/titanium-black.png` | `bathroom-wall/titanium-black.webp` |
| `black-forest` | Black Forest | 1376x768 | 2435.8 KB | `bathroom floor/render_Black Forest.png` | `bathroom-floor/black-forest.png` | `bathroom-floor/black-forest.webp` |
| `blue-night` | Blue in the Night | 1376x768 | 2423.0 KB | `bathroom floor/render_Blue in the Night.png` | `bathroom-floor/blue-night.png` | `bathroom-floor/blue-night.webp` |
| `emerald-onyx` | Emerald Onyx Marble | 1376x768 | 750.1 KB | `bathroom floor/render_Emerald Onyx Marble.png` | `bathroom-floor/emerald-onyx.png` | `bathroom-floor/emerald-onyx.webp` |
| `kashmir-white` | Kashmir / Alaska White | 1376x768 | 2446.0 KB | `bathroom floor/render_Kashmir_Alaska White.png` | `bathroom-floor/kashmir-white.png` | `bathroom-floor/kashmir-white.webp` |
| `marie-gold` | Marie Gold | 1376x768 | 2433.8 KB | `bathroom floor/render_Marie Gold.png` | `bathroom-floor/marie-gold.png` | `bathroom-floor/marie-gold.webp` |
| `moon-white` | Moon White | 1376x768 | 2455.4 KB | `bathroom floor/render_Moon Whitepng.png` | `bathroom-floor/moon-white.png` | `bathroom-floor/moon-white.webp` |
| `river-white` | River White | 1376x768 | 2378.5 KB | `bathroom floor/render_River White.png` | `bathroom-floor/river-white.png` | `bathroom-floor/river-white.webp` |
| `statuario-marble` | Statuario / Banswara Marble | 1376x768 | 739.4 KB | `bathroom floor/render_Statuario Banswara Marble.png` | `bathroom-floor/statuario-marble.png` | `bathroom-floor/statuario-marble.webp` |
| `titanium-black` | Titanium Black | 1376x768 | 2424.3 KB | `bathroom floor/render_Titanium Black.png` | `bathroom-floor/titanium-black.png` | `bathroom-floor/titanium-black.webp` |
| `black-pearl` | Black Pearl | 1376x768 | 2432.3 KB | `bathroom floor/render_black_pearl_floor.png` | `bathroom-floor/black-pearl.png` | `bathroom-floor/black-pearl.webp` |
| `river-black` | River Black | 1376x768 | 2358.3 KB | `bathroom floor/render_rivewr_black_floor.png` | `bathroom-floor/river-black.png` | `bathroom-floor/river-black.webp` |
| `tan-brown` | Tan Brown | 1376x768 | 2433.4 KB | `bathroom floor/render_tan _rown_floore.png` | `bathroom-floor/tan-brown.png` | `bathroom-floor/tan-brown.webp` |
| `black-forest` | Black Forest | 2752x1536 | 9398.0 KB | `bedroom floor/render_Black Forest.png` | `bedroom-floor/black-forest.png` | `bedroom-floor/black-forest.webp` |
| `black-pearl` | Black Pearl | 1377x768 | 1985.7 KB | `bedroom floor/render_Black Pearl.png` | `bedroom-floor/black-pearl.png` | `bedroom-floor/black-pearl.webp` |
| `blue-night` | Blue in the Night | 2752x1536 | 8757.7 KB | `bedroom floor/render_Blue in the Night.png` | `bedroom-floor/blue-night.png` | `bedroom-floor/blue-night.webp` |
| `emerald-onyx` | Emerald Onyx Marble | 1377x768 | 2045.9 KB | `bedroom floor/render_Emerald Onyx Marble.png` | `bedroom-floor/emerald-onyx.png` | `bedroom-floor/emerald-onyx.webp` |
| `kashmir-white` | Kashmir / Alaska White | 1377x768 | 2105.9 KB | `bedroom floor/render_Kashmirm Alaska White.png` | `bedroom-floor/kashmir-white.png` | `bedroom-floor/kashmir-white.webp` |
| `marie-gold` | Marie Gold | 1377x768 | 2146.4 KB | `bedroom floor/render_Marie Gold.png` | `bedroom-floor/marie-gold.png` | `bedroom-floor/marie-gold.webp` |
| `moon-white` | Moon White | 2752x1536 | 9227.8 KB | `bedroom floor/render_Moon White.png` | `bedroom-floor/moon-white.png` | `bedroom-floor/moon-white.webp` |
| `river-black` | River Black | 1377x768 | 1964.7 KB | `bedroom floor/render_River Black.png` | `bedroom-floor/river-black.png` | `bedroom-floor/river-black.webp` |
| `river-white` | River White | 2752x1536 | 8427.4 KB | `bedroom floor/render_River White.png` | `bedroom-floor/river-white.png` | `bedroom-floor/river-white.webp` |
| `statuario-marble` | Statuario / Banswara Marble | 1377x768 | 1943.0 KB | `bedroom floor/render_Statuario Banswara Marble.png` | `bedroom-floor/statuario-marble.png` | `bedroom-floor/statuario-marble.webp` |
| `tan-brown` | Tan Brown | 1377x768 | 2044.5 KB | `bedroom floor/render_Tan Brown.png` | `bedroom-floor/tan-brown.png` | `bedroom-floor/tan-brown.webp` |
| `titanium-black` | Titanium Black | 2752x1536 | 9364.2 KB | `bedroom floor/render_Titanium Black.png` | `bedroom-floor/titanium-black.png` | `bedroom-floor/titanium-black.webp` |
| `black-forest` | Black Forest | 1376x768 | 694.9 KB | `staircase stairs/render_Black Forest.png` | `staircase-stairs/black-forest.png` | `staircase-stairs/black-forest.webp` |
| `black-pearl` | Black Pearl | 1376x768 | 677.5 KB | `staircase stairs/render_Black Pearl.png` | `staircase-stairs/black-pearl.png` | `staircase-stairs/black-pearl.webp` |
| `blue-night` | Blue in the Night | 1376x768 | 733.2 KB | `staircase stairs/render_Blue in the Night.png` | `staircase-stairs/blue-night.png` | `staircase-stairs/blue-night.webp` |
| `emerald-onyx` | Emerald Onyx Marble | 1376x768 | 677.7 KB | `staircase stairs/render_Emerald Onyx.png` | `staircase-stairs/emerald-onyx.png` | `staircase-stairs/emerald-onyx.webp` |
| `kashmir-white` | Kashmir / Alaska White | 1376x768 | 707.7 KB | `staircase stairs/render_Kashmir White.png` | `staircase-stairs/kashmir-white.png` | `staircase-stairs/kashmir-white.webp` |
| `marie-gold` | Marie Gold | 1376x768 | 710.1 KB | `staircase stairs/render_Marie Gold.png` | `staircase-stairs/marie-gold.png` | `staircase-stairs/marie-gold.webp` |
| `moon-white` | Moon White | 1376x768 | 709.2 KB | `staircase stairs/render_Moon White.png` | `staircase-stairs/moon-white.png` | `staircase-stairs/moon-white.webp` |
| `river-black` | River Black | 1376x768 | 671.9 KB | `staircase stairs/render_River Black.png` | `staircase-stairs/river-black.png` | `staircase-stairs/river-black.webp` |
| `river-white` | River White | 1376x768 | 689.5 KB | `staircase stairs/render_River White.png` | `staircase-stairs/river-white.png` | `staircase-stairs/river-white.webp` |
| `statuario-marble` | Statuario / Banswara Marble | 1376x768 | 651.9 KB | `staircase stairs/render_Statuario Marble.png` | `staircase-stairs/statuario-marble.png` | `staircase-stairs/statuario-marble.webp` |
| `tan-brown` | Tan Brown | 1376x768 | 691.6 KB | `staircase stairs/render_Tan Brown.png` | `staircase-stairs/tan-brown.png` | `staircase-stairs/tan-brown.webp` |
| `titanium-black` | Titanium Black | 1376x768 | 1526.5 KB | `staircase stairs/render_Titanium Black.png` | `staircase-stairs/titanium-black.png` | `staircase-stairs/titanium-black.webp` |
| `black-forest` | Black Forest | 1376x768 | 791.8 KB | `dining room floor/render_Black Forest.png` | `dining-room-floor/black-forest.png` | `dining-room-floor/black-forest.webp` |
| `black-pearl` | Black Pearl | 1376x768 | 760.6 KB | `dining room floor/render_Black Pearl.png` | `dining-room-floor/black-pearl.png` | `dining-room-floor/black-pearl.webp` |
| `blue-night` | Blue in the Night | 1376x768 | 814.9 KB | `dining room floor/render_Blue in the Night.png` | `dining-room-floor/blue-night.png` | `dining-room-floor/blue-night.webp` |
| `emerald-onyx` | Emerald Onyx Marble | 1376x768 | 773.8 KB | `dining room floor/render_Emerald Onyx.png` | `dining-room-floor/emerald-onyx.png` | `dining-room-floor/emerald-onyx.webp` |
| `kashmir-white` | Kashmir / Alaska White | 1376x768 | 792.5 KB | `dining room floor/render_Kashmir White.png` | `dining-room-floor/kashmir-white.png` | `dining-room-floor/kashmir-white.webp` |
| `marie-gold` | Marie Gold | 1376x768 | 823.1 KB | `dining room floor/render_Marie Gold.png` | `dining-room-floor/marie-gold.png` | `dining-room-floor/marie-gold.webp` |
| `moon-white` | Moon White | 1376x768 | 781.4 KB | `dining room floor/render_Moon White.png` | `dining-room-floor/moon-white.png` | `dining-room-floor/moon-white.webp` |
| `river-black` | River Black | 1376x768 | 748.4 KB | `dining room floor/render_River Black.png` | `dining-room-floor/river-black.png` | `dining-room-floor/river-black.webp` |
| `river-white` | River White | 1376x768 | 777.1 KB | `dining room floor/render_River White.png` | `dining-room-floor/river-white.png` | `dining-room-floor/river-white.webp` |
| `statuario-marble` | Statuario / Banswara Marble | 1376x768 | 730.9 KB | `dining room floor/render_Statuario Banswara Marble.png` | `dining-room-floor/statuario-marble.png` | `dining-room-floor/statuario-marble.webp` |
| `tan-brown` | Tan Brown | 1376x768 | 767.7 KB | `dining room floor/render_Tan Brown.png` | `dining-room-floor/tan-brown.png` | `dining-room-floor/tan-brown.webp` |
| `titanium-black` | Titanium Black | 1376x768 | 788.1 KB | `dining room floor/render_Titanium Black.png` | `dining-room-floor/titanium-black.png` | `dining-room-floor/titanium-black.webp` |
| `black-pearl` | Black Pearl | 1376x768 | 789.1 KB | `parking paving/render_Black Pearl.png` | `parking-paving/black-pearl.png` | `parking-paving/black-pearl.webp` |
| `river-black` | River Black | 1376x768 | 764.6 KB | `parking paving/render_River Black.png` | `parking-paving/river-black.png` | `parking-paving/river-black.webp` |
| `tan-brown` | Tan Brown | 1376x768 | 790.7 KB | `parking paving/render_Tan Brown.png` | `parking-paving/tan-brown.png` | `parking-paving/tan-brown.webp` |

---

## 4. Execution Command

To execute this plan on confirmation without modifying any existing original images:
```bash
python scripts/normalize-renders.py --apply
```