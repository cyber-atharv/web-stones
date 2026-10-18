# Murali Granites & Marbles

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-2ea44f?style=for-the-badge&logo=github)](https://cyber-atharv.github.io/web-stones/)
[![Status](https://img.shields.io/badge/Status-Production_Ready-gold?style=for-the-badge)](https://cyber-atharv.github.io/web-stones/)
[![License](https://img.shields.io/badge/Design-Bespoke_Custom-blue?style=for-the-badge)](#)
[![Stack](https://img.shields.io/badge/Built_With-HTML5_•_CSS3_•_ES6+-orange?style=for-the-badge)](#tech-stack)

> **Official web application, digital showroom, and interactive stone visualizer custom-built for Murali Granites & Marbles.**  
> Delivering an ultra-luxury digital experience for architects, interior designers, and homeowners across India and worldwide.

---

## 🌐 Live Deployments

- **Production / GitHub Pages**: [https://cyber-atharv.github.io/web-stones/](https://cyber-atharv.github.io/web-stones/)
- **Showroom Staging Server**: [https://murali-granites-and-marbles.unaux.com/](https://murali-granites-and-marbles.unaux.com/)

---

## 🏛️ About the Project

This web application was designed and custom-engineered from the ground up for **Murali Granites & Marbles**, premier natural stone quarry operators and stone processors based in Tamil Nadu, India. 

The application transforms the traditional stone procurement process into an immersive, interactive digital experience, allowing clients to explore quarry-direct natural stone slabs, inspect technical petrographic laboratory data, and visualize stones in photorealistic room environments before making a purchase.

---

## ✨ Key Features

### 1. 🎨 Dual-Layer Interactive Room Visualizer
- **Real-time Surface Simulation**: Preview over 45+ authentic granites, imported marbles, and quartz surfaces mapped to distinct architectural elements.
- **Multiple Room Presets**: 
  - *Luxury Kitchen Countertops & Island Backsplashes*
  - *Spacious Living Room Flooring & Accent Bookmatch Walls*
  - *Master Bathroom Feature Walls & Vanity Slabs*
  - *Executive Staircases & Grand Entrances*
- **Instant Texture Swapping**: Dual-layer composite blending that preserves authentic ambient shadows, natural lighting reflections, and dimensional highlights.

### 2. 🔬 Petrographic Stone Analysis Laboratory
- Comprehensive material test reports embedded into the stone catalog.
- Technical metrics displayed per stone:
  - **Mohs Hardness Rating** (scratch resistance)
  - **Water Absorption Percentage** (porosity & stain resistance)
  - **Bulk Density & Compressive Strength** (heavy-duty structural suitability)
  - **Acid & Heat Tolerance** (kitchen & exterior durability)
  - **Finishing Capabilities**: Mirror Polish, Flamed, Lapatro (antique semi-gloss), Hydro-Finish (slip-resistant), and Leather.

### 3. 💎 Curated Natural Stone Catalog
- Filter and search across 45+ proprietary stone varieties:
  - *South Indian Granites*: Hassan Green, Marie Gold, Colombo Jubrana, Shiffon Pink, Shiva Gold, Cats Eye.
  - *Rajasthan Marbles & Granites*: Alaska White, Alaska Pink, Banswara White, Onyx, Lakha Red.
  - *Eastern Exotic Granites*: Flash Green, Romantic Blue, Lavender Blue, River White, Galaxy White.
  - *Imported Specialties*: Blue in the Night (Norway), Titanium Black, Impala Black.

### 4. ⚡ Zero-Dependency Performance & Reliability
- 100% self-contained static architecture.
- Optimized WebP images and SVG vector iconography with zero reliance on fragile external CDN stylesheets.
- Sub-second First Contentful Paint (FCP) and smooth 60fps animations.

### 5. 🛠️ Administrative Showroom Dashboard
- Dedicated inventory management console (`admin.html`) featuring:
  - Real-time catalog editing, stone additions, and finish updates.
  - LocalStorage / SessionStorage state machine with live preview synchronization.
  - Responsive dark-mode dashboard with security lockout controls.

### 6. 📱 Direct WhatsApp Concierge & Inquiry Pipeline
- Direct lead capture automatically generates formatted quarry inquiry messages with specific stone names, thicknesses, and finishes directly to the sales desk.

---

## 🗂️ Project Directory Structure

```
ch01/
├── index.html                   # Flagship showroom & visualizer portal
├── admin.html                   # Showroom inventory & catalog management suite
├── login.html                   # Administrative authentication gateway
├── 404.html                     # Custom branded 404 error page
├── vercel.json                  # Edge routing & security header config
├── .htaccess                    # Apache server configuration & gzip compression
├── pages/                       # Legal & policy documentation
│   ├── privacy.html             # Privacy policy & data protection
│   └── terms.html               # Terms of service & commercial warranty
├── assets/                      # Optimized local media & stylesheets
│   ├── css/                     # Luxury dark-mode design system & animations
│   ├── js/                      # Interactive visualizer, filter & UI scripts
│   ├── images/                  # High-res stone slabs, textures & room scenes
│   ├── logos/                   # Vector and raster brand identity assets
│   └── icons/                   # Local SVG icon set
├── data/                        # Structured petrographic & catalog data
│   ├── stone_catalog_analysis.json  # Comprehensive stone engineering specs
│   └── stone_photos_list.json       # Visualizer texture mappings
```

---

## 🚀 Getting Started Locally

No complex build tools or `npm install` required. The project runs natively in modern web browsers:

### Option A: Using Python
```bash
# Clone the repository
git clone https://github.com/cyber-atharv/web-stones.git
cd web-stones

# Start a local web server
python -m http.server 8000
```
Open `http://localhost:8000` in your web browser.

### Option B: Using VS Code Live Server
1. Open the repository folder in Visual Studio Code.
2. Install the **Live Server** extension.
3. Right-click `index.html` and choose **"Open with Live Server"**.

---

## 🎨 Design System & Aesthetics

- **Color Palette**:
  - `Background`: Deep Obsidian Black (`#0a0b0e`, `#12141a`)
  - `Accents`: Warm Champagne Gold (`#D4AF37`, `#F3E5AB`)
  - `Typography`: Clean Luxury Whites & Muted Greys (`#F5F0E8`, `#A0A5B5`)
- **Typography**: Responsive fluid typography paired with modern geometric sans-serif typefaces.
- **Micro-Interactions**: Smooth cubic-bezier transitions, card hover glows, glassmorphism overlays, and elegant loading states.

---

## 🔒 Security & Best Practices

- Pre-deployment security audited.
- Content Security Policy (CSP) compliant.
- Strict input sanitization and zero plain-text client credentials.
- Canonical URL declarations and rich Schema.org JSON-LD structured data for Google Search indexing.

---

## 👤 Credits & Authorship

- **Client**: [Murali Granites & Marbles](https://cyber-atharv.github.io/web-stones/) (Tamil Nadu, India)
- **Design & Engineering**: Built with precision by Atharv ([@cyber-atharv](https://github.com/cyber-atharv))
- **Copyright**: © 2026 Murali Granites & Marbles. All rights reserved.
