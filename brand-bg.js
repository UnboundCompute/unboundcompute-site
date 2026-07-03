/* UnboundCompute — shared signature background.
   The boundary field: dashed boundary columns being scanned, igniting on breach —
   the same "find the line, cross it" motif as the mark. Self-injecting so every
   page carries the identity. No-ops on the homepage (which draws its own), and
   honors prefers-reduced-motion. Include once per page: <script src="brand-bg.js" defer></script> */
(function () {
  if (document.querySelector('[data-uc-bg]')) return; // homepage handles its own field
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function hexA(hex, a) {
    hex = (hex || '#fb5b46').trim().replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(function (x) { return x + x; }).join('');
    var n = parseInt(hex, 16);
    return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
  }
  function accent() {
    return (getComputedStyle(document.documentElement).getPropertyValue('--accent') || '#fb5b46').trim();
  }

  function init() {
    var c = document.createElement('canvas');
    c.setAttribute('data-uc-bg', '');
    c.setAttribute('aria-hidden', 'true');
    c.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;z-index:0;pointer-events:none';
    document.body.insertBefore(c, document.body.firstChild);

    var g = document.createElement('div');
    g.setAttribute('aria-hidden', 'true');
    g.style.cssText = "position:fixed;inset:0;z-index:9000;pointer-events:none;mix-blend-mode:soft-light;opacity:.4;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";
    document.body.appendChild(g);

    // Lift static page content above the field (matches the homepage's z-index:1 content layer).
    Array.prototype.forEach.call(document.body.children, function (el) {
      if (el === c || el === g) return;
      if (getComputedStyle(el).position === 'static') { el.style.position = 'relative'; el.style.zIndex = '1'; }
    });

    var ctx = c.getContext('2d'), W = 0, H = 0, cols = [], bt = 0, scanY = 0, breaches = [], nextBreach = 2.5, raf = 0;
    function colX(bx, y, t) { return bx + Math.sin(y * 0.0055 + t * 0.45 + bx * 0.015) * 3.2; }

    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = c.clientWidth; H = c.clientHeight;
      c.width = W * dpr; c.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var gap = 168; cols = [];
      for (var x = gap * 0.5; x < W + gap; x += gap) cols.push(x);
      if (reduce) paintStatic();
    }
    function paint() {
      ctx.clearRect(0, 0, W, H);
      bt += 0.016; var t = bt, ac = accent();
      scanY += H * 0.016 / 8.5; if (scanY > H + 130) scanY = -130; var sy = scanY;
      var grad = ctx.createLinearGradient(0, sy - 130, 0, sy + 130);
      grad.addColorStop(0, 'rgba(0,0,0,0)'); grad.addColorStop(0.5, hexA(ac, 0.06)); grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad; ctx.fillRect(0, sy - 130, W, 260);
      ctx.setLineDash([3, 9]); ctx.lineWidth = 1;
      for (var i = 0; i < cols.length; i++) {
        var bx = cols[i];
        ctx.strokeStyle = 'rgba(244,242,236,0.085)';
        ctx.beginPath();
        for (var y = 0; y <= H; y += 10) { var x = colX(bx, y, t); if (y === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
        ctx.stroke();
        var nx = colX(bx, sy, t);
        ctx.fillStyle = hexA(ac, 0.13); ctx.beginPath(); ctx.arc(nx, sy, 6, 0, 6.283); ctx.fill();
        ctx.fillStyle = hexA(ac, 0.5); ctx.beginPath(); ctx.arc(nx, sy, 2.1, 0, 6.283); ctx.fill();
      }
      ctx.setLineDash([]);
      nextBreach -= 0.016;
      if (nextBreach <= 0 && cols.length) {
        breaches.push({ bx: cols[Math.floor(Math.random() * cols.length)], y: 60 + Math.random() * (H - 120), life: 1.7, max: 1.7 });
        nextBreach = 2.4 + Math.random() * 3.2;
      }
      for (var j = 0; j < breaches.length; j++) {
        var b = breaches[j];
        b.life -= 0.016; var a = Math.max(0, Math.min(1, Math.min(b.life, b.max - b.life) / 0.32));
        var xb = colX(b.bx, b.y, t);
        ctx.strokeStyle = hexA(ac, 0.6 * a); ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(xb, b.y - 15); ctx.lineTo(xb, b.y + 15); ctx.stroke();
        ctx.fillStyle = hexA(ac, 0.16 * a); ctx.beginPath(); ctx.arc(xb, b.y, 9, 0, 6.283); ctx.fill();
        ctx.fillStyle = hexA(ac, 0.88 * a); ctx.beginPath(); ctx.arc(xb, b.y, 2.4, 0, 6.283); ctx.fill();
      }
      breaches = breaches.filter(function (b) { return b.life > 0; });
    }
    function paintStatic() {
      ctx.clearRect(0, 0, W, H);
      ctx.setLineDash([3, 9]); ctx.lineWidth = 1; ctx.strokeStyle = 'rgba(244,242,236,0.085)';
      for (var i = 0; i < cols.length; i++) {
        var bx = cols[i]; ctx.beginPath();
        for (var y = 0; y <= H; y += 10) { var x = colX(bx, y, 0); if (y === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
        ctx.stroke();
      }
      ctx.setLineDash([]);
    }
    function loop() { paint(); raf = requestAnimationFrame(loop); }

    window.addEventListener('resize', resize);
    resize();
    if (!reduce) loop(); else paintStatic();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
