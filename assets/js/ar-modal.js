/**
 * Murali Granites & Marbles - WebXR 1:1 Real Scale AR Integration
 * Launches native mobile camera AR or surfaces interactive desktop 3D + phone QR scanner.
 */
(function() {
  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (window.innerWidth < 768);
  }

  function getMobileArUrl(stoneName, imageUrl, modelType, forceCloud) {
    modelType = modelType || 'slab';
    let base = '';
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    if (forceCloud || !isLocal) {
      // Cloud GitHub Pages or custom domain
      if (window.location.hostname.includes('github.io')) {
        base = 'https://cyber-atharv.github.io/web-stones/pages/ar-viewer.html';
      } else {
        const pathname = window.location.pathname;
        const rootPath = pathname.includes('/pages/') 
          ? pathname.substring(0, pathname.indexOf('/pages/')) 
          : pathname.substring(0, pathname.lastIndexOf('/'));
        base = `${window.location.origin}${rootPath}/pages/ar-viewer.html`;
      }
    } else {
      // Local Network Wi-Fi IP for direct phone connection
      const port = window.location.port || '8092';
      base = `http://10.86.59.159:${port}/pages/ar-viewer.html`;
    }

    return `${base}?stone=${encodeURIComponent(stoneName || 'River Black')}&model=${modelType}${imageUrl ? '&img=' + encodeURIComponent(imageUrl) : ''}`;
  }

  function openAR(stoneName, imageUrl, modelType) {
    modelType = modelType || 'slab';
    const isMobile = isMobileDevice();
    const localUrl = getMobileArUrl(stoneName, imageUrl, modelType, false);
    const cloudUrl = getMobileArUrl(stoneName, imageUrl, modelType, true);

    if (isMobile) {
      // On mobile: Navigate directly to the AR viewer page
      const directTarget = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? localUrl 
        : cloudUrl;
      window.location.href = directTarget;
      return;
    }

    // On Desktop: Show modal with Wi-Fi & Cloud QR code options
    let modal = document.getElementById('muraliArModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'muraliArModal';
      modal.className = 'fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md opacity-0 pointer-events-none transition-opacity duration-300';
      modal.innerHTML = `
        <div class="relative w-full max-w-md bg-[#121215] border border-[#C5A059]/40 rounded-3xl p-6 shadow-2xl text-center flex flex-col items-center">
          <button id="closeArModalBtn" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center transition">✕</button>
          
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#C5A059] text-[11px] font-bold uppercase tracking-wider mb-3">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            1:1 Real Scale Augmented Reality
          </div>

          <h3 id="arModalStoneName" class="text-xl font-bold text-white mb-1" style="font-family:'Cinzel',serif;">River Black Granite</h3>
          <p class="text-xs text-zinc-400 mb-4">Point your mobile camera at your floor or wall to preview this slab in real physical dimensions (10×6 ft).</p>

          <div class="bg-white p-3 rounded-2xl shadow-xl border border-white/20 mb-3">
            <img id="arModalQrImg" src="" alt="Scan for AR" class="w-44 h-44 object-contain">
          </div>

          <div class="flex gap-2 w-full mb-4">
            <button id="btnArTabWifi" class="flex-1 py-1.5 px-3 rounded-lg bg-[#C5A059] text-black font-bold text-xs transition">
              Same Wi-Fi (Local)
            </button>
            <button id="btnArTabCloud" class="flex-1 py-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-zinc-300 font-semibold text-xs border border-white/10 transition">
              Online (GitHub Pages)
            </button>
          </div>

          <div class="flex items-center gap-2 text-xs text-zinc-300 mb-4">
            <span>📱 Works on <b>iPhone</b> (Safari) &amp; <b>Android</b> (Chrome)</span>
          </div>

          <div class="flex gap-2 w-full">
            <button id="btnArLaunchDirect" class="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#8F7034] text-black font-bold text-xs hover:brightness-110 transition shadow-lg">
              Open 3D Studio
            </button>
            <button id="btnArCopyLink" class="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/10 transition">
              Copy Link
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelector('#closeArModalBtn').onclick = () => {
        modal.classList.add('opacity-0', 'pointer-events-none');
      };
      modal.onclick = (e) => {
        if (e.target === modal) modal.classList.add('opacity-0', 'pointer-events-none');
      };
    }

    let activeArUrl = localUrl;

    function renderModalQR(targetUrl) {
      activeArUrl = targetUrl;
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(targetUrl)}`;
      modal.querySelector('#arModalQrImg').src = qrUrl;
    }

    modal.querySelector('#btnArTabWifi').onclick = () => {
      modal.querySelector('#btnArTabWifi').className = 'flex-1 py-1.5 px-3 rounded-lg bg-[#C5A059] text-black font-bold text-xs transition';
      modal.querySelector('#btnArTabCloud').className = 'flex-1 py-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-zinc-300 font-semibold text-xs border border-white/10 transition';
      renderModalQR(localUrl);
    };

    modal.querySelector('#btnArTabCloud').onclick = () => {
      modal.querySelector('#btnArTabWifi').className = 'flex-1 py-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-zinc-300 font-semibold text-xs border border-white/10 transition';
      modal.querySelector('#btnArTabCloud').className = 'flex-1 py-1.5 px-3 rounded-lg bg-[#C5A059] text-black font-bold text-xs transition';
      renderModalQR(cloudUrl);
    };

    // Update details
    modal.querySelector('#arModalStoneName').textContent = stoneName || 'Selected Stone';
    renderModalQR(localUrl);

    modal.querySelector('#btnArLaunchDirect').onclick = () => {
      window.open(activeArUrl, '_blank');
    };

    modal.querySelector('#btnArCopyLink').onclick = () => {
      navigator.clipboard.writeText(activeArUrl).then(() => {
        const btn = modal.querySelector('#btnArCopyLink');
        btn.textContent = '✓ Copied!';
        setTimeout(() => btn.textContent = 'Copy Link', 2000);
      });
    };

    // Show modal
    modal.classList.remove('opacity-0', 'pointer-events-none');
  }

  window.MuraliAR = {
    openAR: openAR,
    isMobile: isMobileDevice
  };
})();
