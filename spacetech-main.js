/* ── THÈME SOMBRE / CLAIR ── */
(function initTheme() {
  const btn    = document.getElementById('theme-toggle');
  const moon   = btn?.querySelector('.icon-moon');
  const sun    = btn?.querySelector('.icon-sun');
  const root   = document.documentElement;
  const KEY    = 'st-theme';

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(KEY, theme);

    if (theme === 'light') {
      moon.style.display = 'none';
      sun.style.display  = 'block';
      btn.title = 'Passer en thème sombre';
      btn.setAttribute('aria-label', 'Passer en thème sombre');
    } else {
      moon.style.display = 'block';
      sun.style.display  = 'none';
      btn.title = 'Passer en thème clair';
      btn.setAttribute('aria-label', 'Passer en thème clair');
    }

    /* Mettre à jour les inline styles sensibles au thème */
    const isLight = theme === 'light';

    /* Nav background */
    const nav = document.querySelector('nav');
    if (nav) nav.style.background = '';

    /* Contacts hardcodés */
    document.querySelectorAll('.contact-item-val').forEach(el => {
      el.style.color = isLight ? '#3B50D0' : '';
    });

    /* Stats items */
    document.querySelectorAll('.stat-item').forEach(el => {
      el.style.background = isLight ? '#fff' : '';
      el.style.border     = isLight ? '1px solid #D4D9F0' : '';
    });

    /* Eshop section */
    const eshop = document.getElementById('eshop');
    if (eshop) eshop.style.background = isLight ? '#EEF1FC' : '';
  }

  /* Charger le thème sauvegardé ou préférence système */
  const saved = localStorage.getItem(KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (prefersDark ? 'dark' : 'light');
  applyTheme(initial);

  /* Toggle au clic */
  btn?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');

    /* Animation rotation du bouton */
    btn.style.transform = 'rotate(360deg)';
    setTimeout(() => { btn.style.transform = ''; }, 400);
  });

  /* Suivre les changements système si pas de préférence sauvegardée */
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem(KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
})();

/* ═══════════════════════════════════════════════
   SpaceTech · main.js v2.0
   Auteur  : Diaby · diabyspace@gmail.com
   © 2025 SpaceTech · Abidjan, Côte d'Ivoire
   ═══════════════════════════════════════════════ */

'use strict';

/* ── 1. SIGNATURE NUMÉRIQUE CONSOLE ── */
console.log(
  '%c\n  ██████╗██████╗  █████╗  ██████╗███████╗████████╗███████╗ ██████╗██╗  ██╗\n  ██╔════╝██╔══██╗██╔══██╗██╔════╝██╔════╝╚══██╔══╝██╔════╝██╔════╝██║  ██║\n  ███████╗██████╔╝███████║██║     █████╗     ██║   █████╗  ██║     ███████║\n  ╚════██║██╔═══╝ ██╔══██║██║     ██╔══╝     ██║   ██╔══╝  ██║     ██╔══██║\n  ███████║██║     ██║  ██║╚██████╗███████╗   ██║   ███████╗╚██████╗██║  ██║\n  ╚══════╝╚═╝     ╚═╝  ╚═╝ ╚═════╝╚══════╝   ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝\n\n  🛰️  Solutions Numériques · Abidjan, Côte d\'Ivoire\n  👨‍💻 Développé par Diaby · diabyspace@gmail.com\n  🔒 v2.0 · © 2025 SpaceTech\n',
  'color:#4B5EE6; font-family:monospace; font-size:11px;'
);
console.log('%c🔐 ID : ST-ABJ-2025-001', 'color:#1D9E75; font-weight:bold;');
console.log('%c⚠️  Site protégé. Inspection malveillante interdite.', 'color:#E24B4A;');

/* ── 2. CURSOR PERSONNALISÉ ── */
(function customCursor() {
  if (window.matchMedia('(hover: none)').matches) return;
  const style = document.createElement('style');
  style.textContent = `
    #st-cursor { position:fixed; top:0; left:0; pointer-events:none; z-index:9999; transform:translate(-50%,-50%); }
    .cur-dot { width:6px; height:6px; background:#4B5EE6; border-radius:50%; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); }
    .cur-ring { width:32px; height:32px; border:1.5px solid rgba(75,94,230,0.45); border-radius:50%; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); transition: width 0.3s, height 0.3s, border-color 0.3s; }
    body.cursor-hover .cur-ring { width:48px; height:48px; border-color:rgba(75,94,230,0.8); }
    * { cursor: none !important; }
  `;
  document.head.appendChild(style);

  const el = document.createElement('div');
  el.id = 'st-cursor';
  el.innerHTML = '<div class="cur-dot"></div><div class="cur-ring"></div>';
  document.body.appendChild(el);

  let mx = 0, my = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  document.querySelectorAll('a, button').forEach(i => {
    i.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    i.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  (function loop() {
    cx += (mx - cx) * 0.13;
    cy += (my - cy) * 0.13;
    el.style.left = cx + 'px';
    el.style.top  = cy + 'px';
    requestAnimationFrame(loop);
  })();
})();

/* ── 3. ÉTOILES PARALLAX + ÉTOILES FILANTES ── */
(function initStars() {
  const container = document.getElementById('stars');
  if (!container) return;
  const stars = [];

  for (let i = 0; i < 200; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size  = Math.random() * 2.4 + 0.3;
    const speed = Math.random() * 0.4 + 0.08;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    s.style.cssText = `left:${x}%;top:${y}%;width:${size}px;height:${size}px;--d:${(Math.random()*4+2).toFixed(1)}s;--del:${(Math.random()*5).toFixed(1)}s;will-change:transform;`;
    container.appendChild(s);
    stars.push({ el: s, speed });
  }

  let mx = 0, my = 0, sy = 0;
  document.addEventListener('mousemove', e => {
    mx = (e.clientX / window.innerWidth  - 0.5) * 2;
    my = (e.clientY / window.innerHeight - 0.5) * 2;
  });
  window.addEventListener('scroll', () => { sy = window.scrollY; }, { passive: true });

  (function loop() {
    stars.forEach(st => {
      const tx = mx * st.speed * 20;
      const ty = my * st.speed * 20 + sy * st.speed * 0.09;
      st.el.style.transform = `translate(${tx}px,${ty}px)`;
    });
    requestAnimationFrame(loop);
  })();

  /* Étoiles filantes */
  const ss = document.createElement('style');
  ss.textContent = `
    .sstar { position:absolute; width:110px; height:1.5px; border-radius:2px;
      background:linear-gradient(90deg,rgba(75,94,230,0.9),transparent);
      pointer-events:none; animation: sshoot var(--sd,1s) ease-out forwards; }
    @keyframes sshoot { 0%{opacity:1;transform:translateX(0) translateY(0) rotate(var(--a,-30deg));} 100%{opacity:0;transform:translateX(280px) translateY(90px) rotate(var(--a,-30deg));} }
  `;
  document.head.appendChild(ss);

  function spawn() {
    const s = document.createElement('div');
    s.className = 'sstar';
    s.style.cssText = `left:${Math.random()*70}%;top:${Math.random()*50}%;--sd:${(Math.random()*0.7+0.9).toFixed(1)}s;--a:${-(Math.random()*20+20)}deg`;
    container.appendChild(s);
    setTimeout(() => s.remove(), 2200);
  }
  spawn();
  setInterval(spawn, 3800);
})();

/* ── 4. TEXTE ROTATIF HERO ── */
(function rotatingHero() {
  const h1 = document.querySelector('.hero h1');
  if (!h1) return;
  const phrases = [
    'Solutions <span class="hl">numériques</span><br>complètes pour votre<br><span class="hl2">entreprise.</span>',
    'Développement <span class="hl">web</span> & mobile<br>pour votre<br><span class="hl2">croissance.</span>',
    'Réseaux & <span class="hl">cybersécurité</span><br>pour votre<br><span class="hl2">infrastructure.</span>',
    'Design & <span class="hl">identité visuelle</span><br>pour votre<br><span class="hl2">marque.</span>',
  ];
  let i = 0;
  h1.style.transition = 'opacity 0.45s ease, transform 0.45s ease';

  setInterval(() => {
    h1.style.opacity = '0';
    h1.style.transform = 'translateY(12px)';
    setTimeout(() => {
      i = (i + 1) % phrases.length;
      h1.innerHTML = phrases[i];
      h1.style.opacity = '1';
      h1.style.transform = 'translateY(0)';
    }, 450);
  }, 4500);
})();

/* ── 5. SCROLL REVEAL ── */
(function scrollReveal() {
  const s = document.createElement('style');
  s.textContent = `
    .rv { opacity:0; transform:translateY(28px); transition:opacity 0.65s cubic-bezier(.22,1,.36,1), transform 0.65s cubic-bezier(.22,1,.36,1); }
    .rv.in { opacity:1; transform:translateY(0); }
  `;
  document.head.appendChild(s);

  const targets = document.querySelectorAll('.svc-card,.av-card,.step,.tarif-card,.contact-item,.stat-item');
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('in'), i * 70);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(t => { t.classList.add('rv'); obs.observe(t); });
})();

/* ── 6. NAV SCROLL + LIEN ACTIF ── */
(function navBehavior() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  const links = document.querySelectorAll('.nav-links a:not(.nav-cta)');
  const sections = [...document.querySelectorAll('section[id]')];

  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 60 ? 'rgba(7,9,16,0.97)' : 'rgba(7,9,16,0.85)';
    const cur = sections.filter(s => window.scrollY >= s.offsetTop - 130).pop();
    if (cur) links.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + cur.id ? '#E8EAFF' : '';
    });
  }, { passive: true });
})();

/* ── 7. COMPTEUR ANIMÉ ── */
(function counters() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const raw = el.textContent.trim();
      const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
      const sfx = raw.replace(/[0-9.]/g, '');
      if (isNaN(num)) return;
      let v = 0; const step = num / 45;
      const iv = setInterval(() => {
        v += step;
        if (v >= num) { el.textContent = raw; clearInterval(iv); }
        else el.textContent = Math.round(v) + sfx;
      }, 28);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-n').forEach(s => obs.observe(s));
})();

/* ── 8. TILT 3D CARDS ── */
(function tilt() {
  document.querySelectorAll('.svc-card').forEach(c => {
    c.style.transformStyle = 'preserve-3d';
    c.addEventListener('mousemove', e => {
      const r = c.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      c.style.transition = 'transform 0.05s';
      c.style.transform = `translateY(-6px) rotateX(${-y*7}deg) rotateY(${x*7}deg)`;
    });
    c.addEventListener('mouseleave', () => {
      c.style.transition = 'transform 0.5s cubic-bezier(.22,1,.36,1), border-color 0.3s';
      c.style.transform = '';
    });
  });
})();

/* ── 9. PARTICULES AU CLIC ── */
(function particles() {
  document.addEventListener('click', e => {
    for (let i = 0; i < 7; i++) {
      const p = document.createElement('div');
      const a = (i / 7) * Math.PI * 2;
      const d = Math.random() * 55 + 28;
      p.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:4px;height:4px;border-radius:50%;background:#4B5EE6;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:transform 0.55s ease-out,opacity 0.55s ease-out;`;
      document.body.appendChild(p);
      requestAnimationFrame(() => {
        p.style.transform = `translate(${Math.cos(a)*d-2}px,${Math.sin(a)*d-2}px)`;
        p.style.opacity = '0';
      });
      setTimeout(() => p.remove(), 650);
    }
  });
})();

/* ── 10. BARRE DE PROGRESSION SCROLL ── */
(function progressBar() {
  const bar = document.createElement('div');
  bar.style.cssText = 'position:fixed;top:0;left:0;height:2px;width:0%;background:linear-gradient(90deg,#3B50D0,#6B80F8);z-index:10000;pointer-events:none;transition:width 0.1s linear;';
  document.body.appendChild(bar);
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });
})();

/* ── 11. HAMBURGER MOBILE ── */
(function hamburger() {
  const btn = document.getElementById('hamburger');
  if (!btn) return;
  let menu = null, open = false;

  const s = document.createElement('style');
  s.textContent = `
    #hamburger.active span:nth-child(1){transform:translateY(7px) rotate(45deg);}
    #hamburger.active span:nth-child(2){opacity:0;}
    #hamburger.active span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}
    #hamburger span{transition:transform 0.3s,opacity 0.3s;}
  `;
  document.head.appendChild(s);

  btn.addEventListener('click', () => {
    if (open) { menu?.remove(); open = false; btn.classList.remove('active'); }
    else {
      menu = document.createElement('div');
      menu.className = 'nav-mobile-open';
      menu.innerHTML = `<a href="#services">Services</a><a href="#tarifs">Tarifs</a><a href="#process">Comment ça marche</a><a href="#contact" class="nav-cta">Devis gratuit</a>`;
      document.body.appendChild(menu);
      open = true; btn.classList.add('active');
      menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { menu.remove(); open = false; btn.classList.remove('active'); }));
    }
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 640 && menu) { menu.remove(); open = false; btn.classList.remove('active'); } });
})();

/* ── 12. IDENTITÉ NUMÉRIQUE & WATERMARK ── */
(function identity() {
  [
    { name: 'author',    content: 'Diaby · SpaceTech Abidjan' },
    { name: 'copyright', content: '© 2025 SpaceTech · diabyspace@gmail.com' },
    { name: 'generator', content: 'SpaceTech Build v2.0' },
  ].forEach(m => {
    const el = document.createElement('meta');
    Object.entries(m).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
  });
  const wm = document.createElement('div');
  wm.setAttribute('data-owner', 'SpaceTech · Diaby');
  wm.setAttribute('data-contact', 'diabyspace@gmail.com');
  wm.setAttribute('data-build', 'ST-ABJ-2025-001');
  wm.style.display = 'none';
  document.body.appendChild(wm);
})();

/* ── 13. PROTECTION IMAGE ── */
document.addEventListener('contextmenu', e => {
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
    console.log('%c🔒 SpaceTech · Contenu protégé', 'color:#E24B4A;');
  }
});
