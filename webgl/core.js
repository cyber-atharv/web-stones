/**
 * Murali Granites & Marbles — 3D WebGL Core Utilities
 * Shared geometric builders, PBR procedural textures, and material helpers.
 */
(function (window) {
  'use strict';

  window.WebGlRooms = window.WebGlRooms || {};

  const WebGlCore = {
    M: (color, roughness = 0.7, metalness = 0.05) => {
      return new window.THREE.MeshStandardMaterial({
        color: new window.THREE.Color(color),
        roughness: roughness,
        metalness: metalness
      });
    },

    box: (w, h, d, x, y, z, material, grp) => {
      const o = new window.THREE.Mesh(new window.THREE.BoxGeometry(w, h, d), material);
      o.position.set(x, y, z);
      o.castShadow = true;
      o.receiveShadow = true;
      if (grp) grp.add(o);
      return o;
    },

    cyl: (rt, rb, h, x, y, z, material, grp, segments = 24) => {
      const o = new window.THREE.Mesh(new window.THREE.CylinderGeometry(rt, rb, h, segments), material);
      o.position.set(x, y, z);
      o.castShadow = true;
      o.receiveShadow = true;
      if (grp) grp.add(o);
      return o;
    },

    sbox: (w, h, d, x, y, z, m, grp) => {
      const o = new window.THREE.Mesh(new window.THREE.BoxGeometry(w, h, d), [m, m, m, m, m, m]);
      o.position.set(x, y, z);
      o.castShadow = true;
      o.receiveShadow = true;
      if (grp) grp.add(o);
      return o;
    },

    plant: (x, z, s, potMat, greenMat, grp) => {
      WebGlCore.cyl(0.28 * s, 0.36 * s, 0.45 * s, x, 0.24 * s, z, potMat, grp);
      for (let i = 0; i < 7; i++) {
        const l = new window.THREE.Mesh(new window.THREE.ConeGeometry(0.16 * s, 0.85 * s, 7), greenMat);
        l.position.set(
          x + Math.sin(i * 2.4) * 0.24 * s,
          0.65 * s + Math.cos(i * 1.7) * 0.28 * s,
          z + Math.cos(i * 2.4) * 0.22 * s
        );
        l.castShadow = true;
        if (grp) grp.add(l);
      }
    },

    // Procedural PBR Textures
    createWoodTexture: (maxAni = 4, baseColor = '#583c27') => {
      const c = document.createElement('canvas');
      c.width = 1024; c.height = 1024;
      const ctx = c.getContext('2d');
      ctx.fillStyle = baseColor;
      ctx.fillRect(0, 0, 1024, 1024);
      const grad = ctx.createLinearGradient(0, 0, 1024, 0);
      grad.addColorStop(0, 'rgba(0,0,0,0.12)');
      grad.addColorStop(0.35, 'rgba(255,255,255,0.06)');
      grad.addColorStop(0.7, 'rgba(0,0,0,0.15)');
      grad.addColorStop(1, 'rgba(255,255,255,0.04)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 1024);
      ctx.fillStyle = 'rgba(25, 14, 8, 0.28)';
      for (let x = 0; x < 1024; x += 3) {
        const waviness = Math.sin(x * 0.02) * 6;
        ctx.fillRect(x + waviness, 0, 1.2, 1024);
      }
      for (let i = 0; i < 22; i++) {
        const bx = 30 + i * 46 + Math.sin(i * 1.4) * 16;
        ctx.fillStyle = 'rgba(15, 8, 4, 0.18)';
        ctx.fillRect(bx, 0, 5, 1024);
        ctx.fillStyle = 'rgba(240, 180, 120, 0.10)';
        ctx.fillRect(bx + 5, 0, 3, 1024);
      }
      const tex = new window.THREE.CanvasTexture(c);
      tex.wrapS = tex.wrapT = window.THREE.RepeatWrapping;
      tex.repeat.set(2, 4);
      tex.anisotropy = maxAni;
      return tex;
    },

    createFabricTexture: (maxAni = 4, tone = '#cfc0a9') => {
      const c = document.createElement('canvas');
      c.width = 512; c.height = 512;
      const ctx = c.getContext('2d');
      ctx.fillStyle = tone;
      ctx.fillRect(0, 0, 512, 512);
      for (let y = 0; y < 512; y += 4) {
        for (let x = 0; x < 512; x += 4) {
          const isWarp = ((x / 4) + (y / 4)) % 2 === 0;
          ctx.fillStyle = isWarp ? 'rgba(245, 238, 228, 0.45)' : 'rgba(120, 105, 85, 0.35)';
          ctx.fillRect(x, y, 4, 4);
        }
      }
      const tex = new window.THREE.CanvasTexture(c);
      tex.wrapS = tex.wrapT = window.THREE.RepeatWrapping;
      tex.repeat.set(6, 6);
      tex.anisotropy = maxAni;
      return tex;
    },

    createPlasterTexture: (maxAni = 4, base = '#ded6cb') => {
      const c = document.createElement('canvas');
      c.width = 512; c.height = 512;
      const ctx = c.getContext('2d');
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, 512, 512);
      for (let i = 0; i < 14000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const alpha = Math.random() * 0.08;
        ctx.fillStyle = Math.random() > 0.5 ? `rgba(255,255,255,${alpha})` : `rgba(25,20,15,${alpha})`;
        ctx.fillRect(x, y, 1.5, 1.5);
      }
      const tex = new window.THREE.CanvasTexture(c);
      tex.wrapS = tex.wrapT = window.THREE.RepeatWrapping;
      tex.repeat.set(4, 4);
      tex.anisotropy = maxAni;
      return tex;
    },

    createRugTexture: (maxAni = 4) => {
      const c = document.createElement('canvas');
      c.width = 1024; c.height = 1024;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#dfd6c8';
      ctx.fillRect(0, 0, 1024, 1024);
      ctx.fillStyle = 'rgba(50, 48, 44, 0.08)';
      ctx.fillRect(40, 40, 944, 944);
      ctx.strokeStyle = 'rgba(197, 160, 89, 0.38)';
      ctx.lineWidth = 6;
      ctx.strokeRect(60, 60, 904, 904);
      ctx.fillStyle = 'rgba(70, 65, 58, 0.06)';
      for (let i = 0; i < 1024; i += 8) {
        ctx.fillRect(i, 0, 4, 1024);
      }
      const tex = new window.THREE.CanvasTexture(c);
      tex.wrapS = tex.wrapT = window.THREE.ClampToEdgeWrapping;
      tex.anisotropy = maxAni;
      return tex;
    },

    createWaterTexture: (maxAni = 4) => {
      const c = document.createElement('canvas');
      c.width = 512; c.height = 512;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#0a90b4';
      ctx.fillRect(0, 0, 512, 512);
      ctx.strokeStyle = 'rgba(180, 245, 255, 0.45)';
      ctx.lineWidth = 3;
      for (let i = 0; i < 70; i++) {
        ctx.beginPath();
        const cx = Math.random() * 512, cy = Math.random() * 512, r = 10 + Math.random() * 34;
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      const tex = new window.THREE.CanvasTexture(c);
      tex.wrapS = tex.wrapT = window.THREE.RepeatWrapping;
      tex.repeat.set(3, 5);
      tex.anisotropy = maxAni;
      return tex;
    }
  };

  window.WebGlCore = WebGlCore;
})(window);
