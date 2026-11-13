/**
 * Murali Granites & Marbles - WebXR 1:1 Real Scale AR Integration
 * Launches native mobile camera AR (Apple QuickLook & Google Scene Viewer)
 * or surfaces interactive desktop 3D + phone QR scanner.
 */
(function() {
  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (window.innerWidth < 768);
  }

  function openAR(stoneName, imageUrl, modelType) {
    modelType = modelType || 'slab';
    const baseUrl = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
    const arUrl = `${baseUrl}/ar-viewer.html?stone=${encodeURIComponent(stoneName || 'River Black')}&model=${modelType}${imageUrl ? '&img=' + encodeURIComponent(imageUrl) : ''}`;

    if (isMobileDevice()) {
      window.location.href = arUrl;
      return;
    }

    // On Desktop: Show sleek modal with QR Code
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

          <div class="bg-white p-3 rounded-2xl shadow-xl border border-white/20 mb-4">
            <img id="arModalQrImg" src="" alt="Scan for AR" class="w-44 h-44 object-contain">
          </div>

          <div class="flex items-center gap-2 text-xs text-zinc-300 mb-5">
            <span>📱 Works on <b>iPhone</b> (Safari) &amp; <b>Android</b> (Chrome)</span>
          </div>

          <div class="flex gap-2 w-full">
            <button id="btnArLaunchDirect" class="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#8F7034] text-black font-bold text-xs hover:brightness-110 transition shadow-lg">
              Open 3D/AR Studio
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

    // Update details
    modal.querySelector('#arModalStoneName').textContent = stoneName || 'Selected Stone';
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(arUrl)}`;
    modal.querySelector('#arModalQrImg').src = qrUrl;

    modal.querySelector('#btnArLaunchDirect').onclick = () => {
      window.open(arUrl, '_blank');
    };

    modal.querySelector('#btnArCopyLink').onclick = () => {
      navigator.clipboard.writeText(arUrl).then(() => {
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
