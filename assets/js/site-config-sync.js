/**
 * Murali Granites & Marbles - Live Site Synchronizer
 * Automatically synchronizes public-facing web pages with data managed in the Admin Dashboard:
 * - Top Announcement Banner & Seasonal Festive Offers
 * - Official Phone, WhatsApp Hotline, Email, and Showroom Hours
 * - Homepage Hero Customizer & Completed Projects Portfolio
 * - Dynamic Client Testimonials & FAQ Knowledge Base
 * - Real-time Price Book Rates & Stock Availability Badges
 */
(function() {
  'use strict';

  // Security: HTML entity encoding to prevent XSS
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function sanitizeUrl(url) {
    if (!url) return '';
    const clean = String(url).trim();
    if (/^(https?:|\/|assets\/|data:image\/)/i.test(clean)) {
      return clean;
    }
    return 'assets/images/favicon.png';
  }

  function getStorage(key, fallback) {
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : fallback;
    } catch(e) {
      return fallback;
    }
  }

  // 1. TOP ANNOUNCEMENT BANNER & CONTACT SETTINGS
  function applyGlobalSettings() {
    const settings = getStorage('murali_site_settings', null);
    const heroCfg = getStorage('murali_hero_config', null);

    const bannerEnabled = heroCfg ? heroCfg.bannerEnabled : (settings ? settings.bannerEnabled : false);
    const bannerText = (heroCfg && heroCfg.bannerText) || (settings && settings.bannerText) || 'Quarry Direct Supply: New Lot of Italian Statuario & River Black Slabs Arrived at Bargur Hub!';
    const bannerLink = (heroCfg && heroCfg.bannerLink) || 'contact.html';

    // Banner Injection
    let existingBanner = document.getElementById('murali-live-top-banner');
    if (bannerEnabled && bannerText) {
      if (!existingBanner) {
        existingBanner = document.createElement('aside');
        existingBanner.id = 'murali-live-top-banner';
        existingBanner.setAttribute('aria-label', 'Showroom Announcement');
        existingBanner.style.cssText = `
          background: linear-gradient(90deg, #110E0A 0%, #241D12 50%, #110E0A 100%);
          border-bottom: 1px solid rgba(197, 160, 89, 0.35);
          color: #E8C98A;
          font-family: 'Inter', sans-serif;
          font-size: 0.74rem;
          font-weight: 500;
          padding: 0.5rem 1.2rem;
          position: relative;
          z-index: 10001;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.5);
          text-align: center;
        `;
        document.body.prepend(existingBanner);
      }
      existingBanner.innerHTML = `
        <span style="display:inline-flex; align-items:center; gap:0.4rem;">
          <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#10B981; box-shadow:0 0 6px #10B981;"></span>
          ${escapeHtml(bannerText)}
        </span>
        <a href="${sanitizeUrl(bannerLink)}" style="color:#08080A; background:#C5A059; border:none; padding:2px 10px; border-radius:3px; text-decoration:none; font-weight:700; font-size:0.68rem; text-transform:uppercase; letter-spacing:0.05em; transition:background 0.2s;">
          Inquire &rarr;
        </a>
        <button id="closeMuraliBannerBtn" aria-label="Dismiss banner" style="background:none; border:none; color:#8E8E98; font-size:1.1rem; line-height:1; cursor:pointer; margin-left:0.5rem; padding:0 4px;">&times;</button>
      `;

      const closeBtn = document.getElementById('closeMuraliBannerBtn');
      if (closeBtn) {
        closeBtn.onclick = () => existingBanner.style.display = 'none';
      }
    } else if (existingBanner) {
      existingBanner.remove();
    }

    // Contact details updates
    if (settings) {
      if (settings.phone) {
        const cleanPhone = settings.phone.replace(/[^0-9+]/g, '');
        document.querySelectorAll('a[href^="tel:"]').forEach(a => {
          a.href = 'tel:' + cleanPhone;
          if (a.textContent.includes('6366380051') || a.textContent.includes('+91')) {
            a.textContent = settings.phone;
          }
        });
      }

      if (settings.whatsapp) {
        const cleanWA = settings.whatsapp.replace(/[^0-9]/g, '');
        const waNum = cleanWA.length === 10 ? '91' + cleanWA : cleanWA;
        document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
          const currentHref = a.getAttribute('href');
          const textParam = currentHref.includes('?text=') ? currentHref.substring(currentHref.indexOf('?text=')) : '';
          a.href = `https://wa.me/${waNum}${textParam}`;
        });
      }

      if (settings.email) {
        document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
          if (!a.href.includes('atharvhogade')) { // preserve developer credit
            a.href = 'mailto:' + settings.email;
            if (a.textContent.includes('@muraligranites.com')) {
              a.textContent = settings.email;
            }
          }
        });
      }
    }
  }

  // 2. HOMEPAGE SPECIFIC DYNAMIC SECTIONS
  function applyHomepageSync() {
    // Only run on homepage
    if (!document.getElementById('c0') && !document.getElementById('hero')) return;

    // A. Hero Headline & Subtitle
    const heroCfg = getStorage('murali_hero_config', null);
    if (heroCfg) {
      const heroTitleEl = document.querySelector('.hero-h1') || document.querySelector('#c0 h1') || document.querySelector('.chap-txt h1');
      if (heroTitleEl && heroCfg.headline) {
        heroTitleEl.innerHTML = heroCfg.headline.replace(/\./g, ' <em>.</em>');
      }
      const heroSubEl = document.querySelector('.hero-sub') || document.querySelector('#c0 p.lead') || document.querySelector('.chap-txt p');
      if (heroSubEl && heroCfg.subtitle) {
        heroSubEl.textContent = heroCfg.subtitle;
      }

      // Promotional Box
      if (heroCfg.promoEnabled && heroCfg.promoTitle) {
        let promoBox = document.getElementById('liveHomepagePromo');
        if (!promoBox) {
          promoBox = document.createElement('div');
          promoBox.id = 'liveHomepagePromo';
          promoBox.style.cssText = `
            max-width: 1200px;
            margin: 2rem auto;
            padding: 1.8rem 2.2rem;
            background: radial-gradient(circle at 10% 50%, rgba(197, 160, 89, 0.12) 0%, rgba(18, 18, 24, 0.85) 100%);
            border: 1px solid rgba(197, 160, 89, 0.35);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1.5rem;
            flex-wrap: wrap;
            box-shadow: 0 10px 30px rgba(0,0,0,0.4);
          `;
          const targetSection = document.getElementById('proof') || document.getElementById('collections');
          if (targetSection) {
            targetSection.parentNode.insertBefore(promoBox, targetSection);
          }
        }
        const waMsg = encodeURIComponent(heroCfg.promoWaMsg || 'Inquiring about current promotional advantage.');
        const phone = (getStorage('murali_site_settings', {}).whatsapp || '916366380051').replace(/[^0-9]/g, '');
        promoBox.innerHTML = `
          <div>
            <span style="font-size:0.68rem; font-weight:700; text-transform:uppercase; letter-spacing:0.2em; color:#C5A059; display:block; margin-bottom:0.4rem;">
              Direct Quarry Special
            </span>
            <h3 style="font-family:'Cormorant Garamond', serif; font-size:1.6rem; color:#FFF; margin-bottom:0.4rem;">
              ${escapeHtml(heroCfg.promoTitle)}
            </h3>
            <p style="font-size:0.85rem; color:#A1A1AA; max-width:700px; line-height:1.6;">
              ${escapeHtml(heroCfg.promoText)}
            </p>
          </div>
          <a href="https://wa.me/${phone}?text=${waMsg}" target="_blank" class="btn btn-gold" style="white-space:nowrap; padding:0.75rem 1.6rem; font-size:0.8rem;">
            Claim Offer on WhatsApp &rarr;
          </a>
        `;
      }
    }

    // B. Synchronize FAQs
    const customFaqs = getStorage('murali_faqs', null);
    const faqGrid = document.querySelector('.faq-grid');
    if (customFaqs && customFaqs.length > 0 && faqGrid) {
      faqGrid.innerHTML = '';
      customFaqs.forEach((faq, idx) => {
        const item = document.createElement('div');
        item.className = `faq-item ${idx === 0 ? 'open' : ''}`;
        item.innerHTML = `
          <div class="faq-q">
            ${escapeHtml(faq.question)}
            <span class="plus">+</span>
          </div>
          <div class="faq-a" style="${idx === 0 ? 'max-height:300px; opacity:1;' : ''}">
            ${escapeHtml(faq.answer)}
          </div>
        `;
        faqGrid.appendChild(item);
      });

      // Bind accordion click events
      faqGrid.querySelectorAll('.faq-item').forEach(it => {
        const q = it.querySelector('.faq-q');
        if (q) {
          q.onclick = () => {
            const isOpen = it.classList.contains('open');
            faqGrid.querySelectorAll('.faq-item').forEach(other => {
              other.classList.remove('open');
              const a = other.querySelector('.faq-a');
              if (a) { a.style.maxHeight = '0'; a.style.opacity = '0'; }
            });
            if (!isOpen) {
              it.classList.add('open');
              const a = it.querySelector('.faq-a');
              if (a) { a.style.maxHeight = '300px'; a.style.opacity = '1'; }
            }
          };
        }
      });
    }

    // C. Dynamic Testimonials Section
    const customReviews = getStorage('murali_testimonials', null);
    if (customReviews && customReviews.length > 0) {
      let testSection = document.getElementById('live-testimonials');
      if (!testSection) {
        testSection = document.createElement('section');
        testSection.id = 'live-testimonials';
        testSection.className = 'sec';
        testSection.style.cssText = 'border-top: 1px solid rgba(255,255,255,0.06); padding: 5rem 6vw; background: #08080A;';
        const faqSection = document.getElementById('faq');
        if (faqSection) {
          faqSection.parentNode.insertBefore(testSection, faqSection);
        }
      }

      let cardsHtml = '';
      customReviews.forEach(r => {
        cardsHtml += `
          <div style="background:rgba(18,18,24,0.7); border:1px solid rgba(197,160,89,0.22); border-radius:12px; padding:1.8rem; display:flex; flex-direction:column; justify-content:space-between; transition:transform 0.3s ease;">
            <div>
              <div style="color:#C5A059; font-size:1rem; margin-bottom:0.8rem; letter-spacing:2px;">
                ${'★'.repeat(r.rating || 5)}${'☆'.repeat(5 - (r.rating || 5))}
              </div>
              <p style="font-family:'Cormorant Garamond', serif; font-size:1.15rem; font-style:italic; line-height:1.5; color:#F4F4F5; margin-bottom:1.2rem;">
                "${escapeHtml(r.text)}"
              </p>
            </div>
            <div style="border-top:1px solid rgba(255,255,255,0.08); padding-top:0.8rem;">
              <strong style="font-size:0.88rem; color:#FFFFFF; display:block;">${escapeHtml(r.name)}</strong>
              <span style="font-size:0.75rem; color:#8E8E98;">${escapeHtml(r.studio)} &bull; <span style="color:#C5A059;">${escapeHtml(r.stone)}</span></span>
            </div>
          </div>
        `;
      });

      testSection.innerHTML = `
        <div style="max-width:1200px; margin:0 auto;">
          <div style="text-align:center; max-width:700px; margin:0 auto 3rem;">
            <span style="font-size:0.68rem; font-weight:700; text-transform:uppercase; letter-spacing:0.25em; color:#C5A059; display:block; margin-bottom:0.5rem;">Verified Architectural Provenance</span>
            <h2 style="font-family:'Cormorant Garamond', serif; font-size:clamp(2rem, 4vw, 3rem); font-weight:300; color:#FFFFFF;">
              Architect &amp; Villa Owner <em style="font-style:italic; color:#E8C98A;">Endorsements</em>
            </h2>
            <p style="font-size:0.9rem; color:#8E8E98; margin-top:0.8rem;">Direct quotes from luxury residences and commercial projects supplied across South India.</p>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:1.8rem;">
            ${cardsHtml}
          </div>
        </div>
      `;
    }

    // D. Dynamic Completed Projects Portfolio
    const customProjects = getStorage('murali_projects', null);
    if (customProjects && customProjects.length > 0) {
      let projSection = document.getElementById('live-projects-portfolio');
      if (!projSection) {
        projSection = document.createElement('section');
        projSection.id = 'live-projects-portfolio';
        projSection.className = 'sec sec-alt';
        projSection.style.cssText = 'border-top: 1px solid rgba(255,255,255,0.06); padding: 5rem 6vw; background: #0B0B0E;';
        const testSection = document.getElementById('live-testimonials') || document.getElementById('faq');
        if (testSection) {
          testSection.parentNode.insertBefore(projSection, testSection);
        }
      }

      let projCardsHtml = '';
      customProjects.slice(0, 3).forEach(p => {
        projCardsHtml += `
          <div style="background:#111116; border:1px solid rgba(255,255,255,0.08); border-radius:12px; overflow:hidden; display:flex; flex-direction:column; transition:transform 0.3s ease;">
            <div style="position:relative; aspect-ratio:16/10; overflow:hidden; background:#070709;">
              <img src="${sanitizeUrl(p.image)}" alt="${escapeHtml(p.title)}" style="width:100%; height:100%; object-fit:cover; transition:transform 0.5s ease;" onerror="this.src='assets/images/favicon.png'"/>
              <span style="position:absolute; top:12px; right:12px; background:rgba(8,8,10,0.85); backdrop-filter:blur(8px); border:1px solid rgba(197,160,89,0.3); padding:3px 8px; border-radius:4px; font-size:0.65rem; font-weight:700; color:#C5A059; text-transform:uppercase;">
                ${escapeHtml(p.year || '2025')}
              </span>
            </div>
            <div style="padding:1.4rem; display:flex; flex-direction:column; justify-content:space-between; flex-grow:1;">
              <div>
                <span style="font-size:0.68rem; text-transform:uppercase; letter-spacing:0.12em; color:#C5A059; font-weight:600;">${escapeHtml(p.city)} &bull; ${escapeHtml(p.area)}</span>
                <h3 style="font-family:'Cormorant Garamond', serif; font-size:1.4rem; color:#FFF; margin:0.3rem 0 0.6rem;">${escapeHtml(p.title)}</h3>
                <p style="font-size:0.8rem; color:#8E8E98; line-height:1.5; margin-bottom:1rem;">${escapeHtml(p.notes || '')}</p>
              </div>
              <div style="border-top:1px solid rgba(255,255,255,0.06); padding-top:0.8rem; display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:0.75rem; color:#D4D4D8;">Stone: <strong>${escapeHtml(p.material)}</strong></span>
                <a href="contact.html?project=${encodeURIComponent(p.title)}" style="color:#C5A059; font-size:0.75rem; font-weight:600; text-decoration:none;">Consult &rarr;</a>
              </div>
            </div>
          </div>
        `;
      });

      projSection.innerHTML = `
        <div style="max-width:1200px; margin:0 auto;">
          <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:2.5rem; flex-wrap:wrap; gap:1rem;">
            <div>
              <span style="font-size:0.68rem; font-weight:700; text-transform:uppercase; letter-spacing:0.25em; color:#C5A059; display:block; margin-bottom:0.5rem;">Architectural Installations</span>
              <h2 style="font-family:'Cormorant Garamond', serif; font-size:clamp(2rem, 4vw, 3rem); font-weight:300; color:#FFFFFF;">
                Completed Landmark <em style="font-style:italic; color:#E8C98A;">Installations</em>
              </h2>
            </div>
            <a href="contact.html" class="btn btn-ghost" style="font-size:0.78rem;">Submit Architectural RFP &rarr;</a>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:2rem;">
            ${projCardsHtml}
          </div>
        </div>
      `;
    }
  }

  // 3. PRODUCTS PAGE SPECIFIC ENHANCEMENTS (LIVE PRICING & STOCK)
  function applyProductsSync() {
    const pricingCatalog = getStorage('murali_pricing_catalog', null);
    if (!pricingCatalog || !pricingCatalog.length) return;

    // Helper to find match
    const findPrice = (name) => {
      const clean = (name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      return pricingCatalog.find(p => {
        const pClean = p.name.toLowerCase().replace(/[^a-z0-9]/g, '');
        return clean.includes(pClean) || pClean.includes(clean);
      });
    };

    // Watch for product tiles in the DOM
    const enhanceTiles = () => {
      document.querySelectorAll('.product-tile').forEach(tile => {
        if (tile.dataset.pricingEnhanced) return;
        const titleEl = tile.querySelector('.tile-title');
        if (!titleEl) return;
        const stoneName = titleEl.textContent.trim();
        const priceInfo = findPrice(stoneName);
        if (priceInfo) {
          tile.dataset.pricingEnhanced = 'true';
          const metaEl = tile.querySelector('.tile-meta');
          if (metaEl) {
            const badgeClass = priceInfo.status === 'In Stock' ? 'color:#10B981;' : (priceInfo.status === 'Low Stock' ? 'color:#F59E0B;' : 'color:#EF4444;');
            metaEl.innerHTML = `
              <span style="font-weight:700; color:#E8C98A;">${priceInfo.rate}/sq.ft</span>
              <span style="${badgeClass} font-size:0.7rem; font-weight:600;">${priceInfo.status}</span>
            `;
          }
        }
      });
    };

    enhanceTiles();
    // In case products render asynchronously
    const observer = new MutationObserver(enhanceTiles);
    const track = document.getElementById('catalogue-carousel-track');
    if (track) observer.observe(track, { childList: true, subtree: true });
  }

  // Execute on DOMContentLoaded or immediately if already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      applyGlobalSettings();
      applyHomepageSync();
      applyProductsSync();
    });
  } else {
    applyGlobalSettings();
    applyHomepageSync();
    applyProductsSync();
  }
})();
