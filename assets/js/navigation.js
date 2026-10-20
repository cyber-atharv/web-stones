// Shared Premium Navigation & High-Performance Custom Cursor Logic
(function() {
  localStorage.removeItem('theme');
  if (document.body) {
    document.body.classList.remove('light-theme');
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  
  // Persistent Luxury Navbar on Scroll:
  // - Top of page (<= 20px) -> Header displays spacious top styling
  // - Scrolled (> 20px) -> Header displays compact frosted luxury backdrop
  // Header remains reliably accessible and clickable at all times across all viewports.
  if (header) {
    function handleNavScroll() {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 20) {
        header.classList.add('at-top');
        header.classList.remove('scrolled');
      } else {
        header.classList.remove('at-top');
        header.classList.add('scrolled');
      }
      header.classList.remove('nav-hidden');
    }

    // Initialize state on load
    handleNavScroll();
    window.addEventListener('scroll', handleNavScroll, { passive: true });
  }

  // Mobile Hamburger Toggle
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      
      // Prevent body scrolling when mobile menu is open
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close mobile nav when clicking a link
    mobileNav.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Magnetic Button Effect for Navbar Get Quote Button
  const isMobileOrCoarse = window.matchMedia('(max-width: 768px)').matches || window.matchMedia('(pointer: coarse)').matches;
  const quoteBtns = document.querySelectorAll('.nav-quote-btn, .mobile-quote-btn');
  quoteBtns.forEach(btn => {
    btn.addEventListener('mousemove', e => {
      if (isMobileOrCoarse) return;
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      if (window.gsap) {
        gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power2.out' });
      }
    });
    btn.addEventListener('mouseleave', () => {
      if (isMobileOrCoarse) return;
      if (window.gsap) {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
      }
    });
  });

  // ── HIGH-PERFORMANCE CUSTOM CURSOR ──
  const cursor = isMobileOrCoarse ? null : document.getElementById('cursor');
  const ring = isMobileOrCoarse ? null : document.getElementById('cursor-ring');

  if (isMobileOrCoarse) {
    const cEl = document.getElementById('cursor');
    const rEl = document.getElementById('cursor-ring');
    if (cEl) cEl.style.display = 'none';
    if (rEl) rEl.style.display = 'none';
  }

  if (cursor && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    let cursorRafId = null;
    let cursorDirty = false;
    let isTouch = false;

    // Apply baseline GPU styles
    cursor.style.position = 'fixed';
    cursor.style.top = '0';
    cursor.style.left = '0';
    cursor.style.transform = 'translate3d(0, 0, 0) translate(-50%, -50%)';
    cursor.style.willChange = 'transform';
    cursor.style.display = 'block';

    ring.style.position = 'fixed';
    ring.style.top = '0';
    ring.style.left = '0';
    ring.style.transform = 'translate3d(0, 0, 0) translate(-50%, -50%)';
    ring.style.willChange = 'transform';
    ring.style.display = 'block';

    // Hide default cursor by adding active class to body by default (unless it's detected touch-only on start)
    const isTouchDeviceStart = window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(pointer: fine)').matches;
    if (isTouchDeviceStart) {
      isTouch = true;
      cursor.style.display = 'none';
      ring.style.display = 'none';
    } else {
      document.body.classList.add('custom-cursor-active');
    }

    // Dynamically toggle custom cursor active class on actual touch/mouse interactions
    document.addEventListener('touchstart', () => {
      isTouch = true;
      cursor.style.display = 'none';
      ring.style.display = 'none';
      document.body.classList.remove('custom-cursor-active');
    }, { passive: true });

    document.addEventListener('mousemove', e => {
      if (isTouch) {
        isTouch = false;
        cursor.style.display = 'block';
        ring.style.display = 'block';
      }
      document.body.classList.add('custom-cursor-active');
      
      mx = e.clientX;
      my = e.clientY;
      cursorDirty = true;
    }, { passive: true });

    const updateCursor = () => {
      if (cursorDirty && !isTouch) {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        cursor.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
        ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
        cursorDirty = Math.abs(mx - rx) > 0.1 || Math.abs(my - ry) > 0.1;
      }
      cursorRafId = requestAnimationFrame(updateCursor);
    };
    cursorRafId = requestAnimationFrame(updateCursor);
  }

  function attachCursorHover(elements) {
    elements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        const isTouchActive = !document.body.classList.contains('custom-cursor-active');
        if (!isTouchActive && cursor && ring) {
          cursor.style.width = '20px';
          cursor.style.height = '20px';
          ring.style.width = '64px';
          ring.style.height = '64px';
          ring.style.borderColor = 'rgba(201, 169, 110, 0.8)';
        }
      }, { passive: true });
      el.addEventListener('mouseleave', () => {
        const isTouchActive = !document.body.classList.contains('custom-cursor-active');
        if (!isTouchActive && cursor && ring) {
          cursor.style.width = '12px';
          cursor.style.height = '12px';
          ring.style.width = '44px';
          ring.style.height = '44px';
          ring.style.borderColor = 'rgba(201, 169, 110, 0.5)';
        }
      }, { passive: true });
    });
  }

  // Hook menu items to the cursor animations
  attachCursorHover(document.querySelectorAll('.logo-link, .nav-link, .nav-quote-btn, .nav-login-btn, .mobile-login-btn, .hamburger, .mobile-nav-link, .mobile-quote-btn, .theme-toggle-btn'));

  // Expose globally for dynamic page templates
  window.attachCursorHover = attachCursorHover;

  // ── IN-PAGE DUMMY LINK SAFETY ──
  // Prevents empty '#' or 'javascript:void(0)' from resetting scroll position to page top
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');

    // Case: Empty or void anchor
    if (!href || href === '#' || href === 'javascript:void(0);' || href === 'javascript:void(0)') {
      // If it has a real external URL in data-external-href, open it
      const ext = link.getAttribute('data-external-href');
      if (ext && ext !== '#' && ext.startsWith('http')) {
        e.preventDefault();
        window.open(ext, '_blank', 'noopener,noreferrer');
        return;
      }
      
      // If WhatsApp button without full link
      if (link.classList.contains('whatsapp-btn') || link.id === 'whatsappShareBtn') {
        e.preventDefault();
        window.open('https://wa.me/916366380051', '_blank');
        return;
      }

      // If it's a hash or void placeholder, prevent page jump without redirecting
      e.preventDefault();
    }
  });

  // If Admin is authenticated, update Login button & links to Admin Suite
  if (localStorage.getItem('murali_admin_auth') === 'true') {
    document.querySelectorAll('.nav-login-btn').forEach(btn => {
      btn.setAttribute('href', 'admin.html');
      btn.classList.add('logged-in');
      btn.setAttribute('title', 'Admin Dashboard Active');
      btn.innerHTML = `
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color:#10B981;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <span style="color:#6EE7B7;">Admin Suite</span>
      `;
    });
    document.querySelectorAll('a[href="login.html"]').forEach(a => {
      a.setAttribute('href', 'admin.html');
      if (a.textContent.includes('Login') || a.textContent.includes('Admin')) {
        a.innerHTML = '<span style="color:#C5A059; font-size:9px; vertical-align:middle; margin-right:3px;">●</span> Admin Suite';
      }
    });
  }
});
