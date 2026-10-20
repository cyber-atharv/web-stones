# Murali Granites & Marbles — Visualizer Changelog

This document records the architectural audit, all removed hacks, and the newly implemented manifest-driven engine in `visualizer.html`.

---

## 1. Removed Hacks & Legacy Workarounds

1. **Overlay Compositor Removed (`#surfaceOverlayContainer`)**
   - **Diagnosis**: The base room reference photos in `assets/images/rooms/` (`kitchen.jpg`, `bathroom.jpg`, `living-room.jpg`, `staircase.jpg`, `bedroom.jpg`, `dining-room.jpg`) are finished architectural interior photographs containing stone installations, not raw wireframes or empty grey boxes.
   - **Removed**: Deleted `#surfaceOverlayContainer`, `stoneTextureTile`, `stoneLightingShade`, `stoneGlossSheen`, and all `clipPath`, `blendMode`, `shadingGradient`, `textureScale`, and `opacity` properties across all room surfaces in `roomConfigs`. No flat color, polygon clipping, or texture overlays are painted over existing stone.

2. **Proxy Resolver & Room Fallback Removed (`findGeneratedPreview`)**
   - **Diagnosis**: Previously, when an exact pre-rendered image did not exist for a requested stone, `findGeneratedPreview()` performed a color and mineral proxy substitution (e.g. mapping unknown stones to `river-black` or `kashmir-white`) and falsely labeled the result `verified_architectural_render`.
   - **Removed**: Completely deleted the mineral proxy resolver, family color mapper, and room fallback. The engine now requires an **exact match** on `room_id + surface_id + product_id`. If an exact render does not exist, no proxy is shown.

3. **Room Showcase Fallback Map Removed (`roomShowcaseMap`)**
   - **Diagnosis**: When a base room photo had loading difficulties, `roomShowcaseMap` swapped in stone-finished marketing gallery photos (`gallery_showcase/`), distorting the before/after comparison.
   - **Removed**: Removed `roomShowcaseMap` entirely. Base room loading now degrades gracefully to a neutral state with retry handling, preventing infinite `onerror` loops.

4. **Side-by-Side Stone Comparison Tool Removed (`#stoneComparisonTool`)**
   - **Diagnosis**: Explicit user directive ("remove that comparison part") to eliminate the separate side-by-side stone comparison tool section (`#stoneComparisonTool`) and focus purely on the authentic room visualizer experience.
   - **Removed**: Removed the `#stoneComparisonTool` HTML section and the `initStoneComparison()` JavaScript controller.

5. **Eliminated Mobile Aspect Ratio Shift**
   - **Diagnosis**: In `@media (max-width: 768px)`, `.room-stage` was forced to `aspect-ratio: 4 / 3`, whereas base photos and pre-renders are `16:9` (`1376x768`). This caused image cropping and severe visual drift when dragging the comparison slider.
   - **Removed**: Removed `aspect-ratio: 4 / 3` from mobile media query. The stage container now maintains a strict `16:9` (`aspect-ratio: 16 / 9; width: 100%`) framing across all screen widths.

6. **Misleading "Raw (0%)" Labeling Removed**
   - **Diagnosis**: The base rooms are finished spaces, not raw unfinished masonry.
   - **Removed**: Replaced `"Raw (0%)"` with `"Original (0%)"` and `"Selected stone (100%)"`, while retaining the `"Compare with Original"` action button.

7. **Hard-Coded 2,000-Line Manifest Removed from HTML**
   - **Diagnosis**: An unmaintainable, hard-coded 770+ line array was embedded inside `visualizer.html`.
   - **Removed**: Replaced with an automated, script-generated `assets/data/visualizer-manifest.json` loaded asynchronously at runtime.

---

## 2. New Architectural Features & Data Models

1. **Manifest Generator Script (`scripts/build-manifest.py`)**
   - Scans all 8 render directories in `assets/images/room_renders/`.
   - Tolerant filename regex matching handles casing, spacing typos (`Kashmirm`, `Moon Whitepng`, `rivewr_black_floor`, `tan _rown_floore`, `black_pearl_floor`, `acent`).
   - Programmatically measures width, height, and aspect ratio of every render file using PIL, identifying aspect ratio mismatches vs base room photos.
   - Emits structured JSON to `assets/data/visualizer-manifest.json`.

2. **Runtime Manifest Integration (`assets/data/visualizer-manifest.json`)**
   - `visualizer.html` dynamically loads `visualizer-manifest.json` on initialization.
   - Includes embedded fallback to ensure 100% functionality if opened directly via `file:///` without an HTTP server.
   - Preserves custom visualizer uploads from Admin Dashboard (`murali_custom_visualizers` in `localStorage`), giving them precedence over default manifest entries.

3. **Dynamic Surface Button Filtering**
   - In `renderSurfaceButtons()`, the visualizer dynamically checks the manifest and renders buttons **only** for surfaces that possess at least one verified render.
   - For Kitchen, only `"Countertop & Island"` is rendered (kitchen flooring is omitted without fake promises).
   - Removed the kitchen floor limitation banner.

4. **Honest "Preview Coming Soon" Material Experience**
   - In the materials grid, stones without a pre-rendered image in the active room/surface show a subtle `"Coming soon"` badge.
   - When selected, stone specifications, info card, quotation form, and WhatsApp inquiry links update immediately.
   - The stage **retains the previously valid render image** and displays a subtle notification banner:
     *"Preview for **[Stone Name]** in this space is being prepared."*
   - Includes an instant `"View in [Other Room] →"` button that navigates the user to a verified room/surface where that stone has been rendered.

5. **Strict 16:9 Aspect Ratio Containment**
   - `#stageViewport` enforces `aspect-ratio: 16 / 9; width: 100%`.
   - `#baseRoomImg`, `#afterBaseRoomImg`, and `#generatedRoomImg` all share identical `w-full h-full object-cover object-center` styling.
   - Dragging the comparison slider produces zero layout shift or position jump.

6. **Pre-loading & Transition Optimization**
   - `preloadNextRenders()` preloads adjacent stone renders in the background for instant transitions.
   - Added subtle opacity fade transition when switching between renders.

7. **Staircase & Dining Room Support**
   - Added verified `Dining Room` scene with 2 verified renders (`Statuario / Banswara Marble` and `Tan Brown`).
   - `Staircase` displays verified renders for `Marie Gold` and `River Black`, with honest pending states for the remaining 10 stones.

8. **File Hygiene & Normalization Plan (`RENAME_PLAN.md` & `scripts/normalize-renders.py`)**
   - Supports dry-run inspection (`--dry-run`) and safe execution (`--apply`).
   - Normalizes all 72 renders to `<stone-id>.png` and converts to WebP (~85 quality) in clean folders without deleting any original source files.

9. **Missing Renders Deliverable (`MISSING_RENDERS.md`)**
   - Documents all unrendered combinations (36 primary + 36 future expansion) with ready-to-paste AI image generation prompts specifying exact camera framing, stone slab reference image paths, and photorealistic resolution.
   - Identifies the single aspect ratio offender: `bathroom accent wall/render_Titanium Black.png` (`1196x896` / 4:3 vs `1376x768` / 16:9).
