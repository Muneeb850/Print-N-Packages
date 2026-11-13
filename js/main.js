/* Print N Packages — shared chrome + GSAP/ScrollTrigger/Lenis motion */
(() => {
  const BIZ = {
    name: 'Print N Packages',
    email: 'printnpackages@gmail.com',
    phoneShow: '0092 345 8468800',
    phoneTel: '+923458468800',
    wa: '923458468800',
    addr: 'Plot No. A46-A, AG Compound, Near Pakistan Cable, Site Area, Karachi',
  };
  const page = document.body.dataset.page || 'home';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const safe = (fn) => { try { return fn(); } catch (e) { return null; } };
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const G = window.gsap, ST = window.ScrollTrigger;
  const anim = !!(G && ST) && !reduce;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const PAGES = [['index.html', 'Home', 'home'], ['about.html', 'About', 'about'], ['services.html', 'Services', 'services'], ['work.html', 'Work', 'work'], ['contact.html', 'Contact', 'contact']];
  const LOGO = 'assets/logo-mark.svg';

  /* ---------- chrome ---------- */
  const brand = () => `<a class="brand" href="index.html" aria-label="Print N Packages home"><img src="${LOGO}" alt="" width="40" height="40"><span><b>print <em>n</em> packages</b><small>Complete printing solutions</small></span></a>`;
  document.body.insertAdjacentHTML('afterbegin', `
  <div class="progress" id="progress"></div>
  <div class="pt" id="pt"></div>
  <header class="hdr" id="hdr">${brand()}
    <nav class="nav" aria-label="Main">${PAGES.map(p => `<a href="${p[0]}" class="${p[2] === page ? 'act' : ''}">${p[1]}</a>`).join('')}</nav>
    <a class="btn peach" href="contact.html#quote">Get a quote <span class="arr">→</span></a>
    <button class="burger" id="burger" aria-label="Menu" aria-expanded="false"><i></i><i></i></button>
  </header>
  <div class="mmenu" id="mmenu"><nav>${PAGES.map((p, i) => `<a href="${p[0]}">${p[1]}<small>0${i + 1}</small></a>`).join('')}</nav>
    <p>${BIZ.phoneShow}<br>${BIZ.email}<br>${BIZ.addr}</p></div>
  <a class="wa" href="https://wa.me/${BIZ.wa}?text=${encodeURIComponent('Hello Print N Packages, I would like a quote.')}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><svg viewBox="0 0 32 32"><path d="M16 3a13 13 0 0 0-11 19.8L3 29l6.4-2A13 13 0 1 0 16 3Zm0 2.4a10.6 10.6 0 1 1-5.6 19.6l-.4-.3-3.8 1.2 1.2-3.7-.3-.4A10.6 10.6 0 0 1 16 5.4Zm-4 5.2c-.3 0-.7.1-1 .5-.4.4-1.3 1.3-1.3 3.1s1.3 3.6 1.5 3.9c.2.2 2.6 4.1 6.400 5.600 3.100 1.200 3.800 1 4.400.9.700-.1 2.200-.9 2.500-1.800.3-.9.3-1.600.2-1.800-.1-.2-.3-.3-.7-.5l-2.300-1.100c-.3-.1-.5-.2-.8.200l-1 1.200c-.2.200-.4.300-.8.100-.4-.2-1.500-.6-2.900-1.800-1.100-1-1.800-2.200-2-2.500-.2-.4 0-.6.200-.8l.6-.7c.2-.2.200-.4.400-.6.100-.3.100-.5 0-.7l-1-2.400c-.3-.6-.5-.5-.8-.5Z"/></svg></a>
  <div class="toast" id="toast" role="status"></div>`);

  document.body.insertAdjacentHTML('beforeend', `
  <footer class="ftr"><div class="wrap">
    <div class="ftr-grid">
      <div>${brand()}<p class="about">Offset printing, packaging and brand collateral — made to order in Karachi.</p></div>
      <div><h4>Pages</h4>${PAGES.map(p => `<a href="${p[0]}">${p[1]}</a>`).join('')}</div>
      <div><h4>Services</h4><a href="services.html#packaging">Packaging &amp; boxes</a><a href="services.html#labels">Labels &amp; stickers</a><a href="services.html#commercial">Commercial printing</a><a href="services.html#stationery">Stationery</a></div>
      <div><h4>Reach us</h4><a href="tel:${BIZ.phoneTel}">${BIZ.phoneShow}</a><a href="mailto:${BIZ.email}">${BIZ.email}</a><a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BIZ.addr)}" target="_blank" rel="noopener">${BIZ.addr}</a></div>
    </div>
    <div class="ftr-big" aria-hidden="true">Print N Packages</div>
  </div>
  <div class="ftr-base"><span>© ${new Date().getFullYear()} ${BIZ.name}</span><span>Partner in your business progress</span><span>Photos: Unsplash</span><a href="#top" id="toTop">Back to top ↑</a></div></footer>`);

  const hdr = $('#hdr'), pt = $('#pt'), burger = $('#burger');
  let lenis = null;
  const unlock = () => { document.body.classList.remove('is-loading'); lenis && lenis.start(); };

  /* ---------- no-motion fallback: show everything ---------- */
  if (!anim) {
    unlock();
    $$('[data-count]').forEach(el => { el.textContent = el.dataset.count + (el.dataset.suf || ''); });
  }

  /* ---------- menu ---------- */
  burger.addEventListener('click', () => {
    const o = document.body.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', o);
    lenis && (o ? lenis.stop() : lenis.start());
  });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && document.body.classList.contains('menu-open')) burger.click(); });
  $('#toTop').addEventListener('click', (e) => { e.preventDefault(); lenis ? lenis.scrollTo(0, { duration: 1.6 }) : scrollTo({ top: 0, behavior: 'smooth' }); });

  /* ---------- forms (work with or without motion) ---------- */
  const toast = $('#toast');
  const say = (m) => { toast.textContent = m; toast.classList.add('on'); setTimeout(() => toast.classList.remove('on'), 4200); };
  const form = $('#quoteForm');
  if (form) {
    const qty = $('#qty'), qout = $('#qtyOut'), fmt = (n) => (+n).toLocaleString('en-US');
    if (qty) { const up = () => (qout.textContent = fmt(qty.value) + ' pcs'); qty.addEventListener('input', up); up(); }
    const pre = new URLSearchParams(location.search).get('service');
    if (pre) { const r = $(`input[name=service][value="${pre}"]`); if (r) r.checked = true; }
    safe(() => { const d = JSON.parse(localStorage.getItem('pnp-draft') || '{}'); ['name', 'phone', 'email', 'message'].forEach(k => { if (d[k] && form[k]) form[k].value = d[k]; }); });
    form.addEventListener('input', () => safe(() => localStorage.setItem('pnp-draft', JSON.stringify({ name: form.name.value, phone: form.phone.value, email: form.email.value, message: form.message.value }))));
    const validate = () => {
      let ok = true;
      const rules = { name: v => v.trim().length > 1, phone: v => /^[+\d][\d\s\-]{6,}$/.test(v.trim()), email: v => !v.trim() || /^\S+@\S+\.\S+$/.test(v), message: v => v.trim().length > 5 };
      Object.entries(rules).forEach(([k, fn]) => { const f = form[k].closest('.f'), good = fn(form[k].value); f.classList.toggle('err', !good); if (!good) ok = false; });
      return ok;
    };
    const summary = () => `Hello ${BIZ.name},\n\nName: ${form.name.value.trim()}\nPhone: ${form.phone.value.trim()}\nEmail: ${form.email.value.trim() || '-'}\nService: ${form.service.value || 'General enquiry'}\nQuantity: ${fmt(form.qty.value)} pcs\n\n${form.message.value.trim()}`;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate()) return say('Please fix the highlighted fields.');
      location.href = `mailto:${BIZ.email}?subject=${encodeURIComponent('Quote request — ' + (form.service.value || 'General enquiry'))}&body=${encodeURIComponent(summary())}`;
      say('Opening your email app with the request ready to send…');
      safe(() => localStorage.removeItem('pnp-draft'));
    });
    $('#waSend').addEventListener('click', () => {
      if (!validate()) return say('Please fix the highlighted fields.');
      window.open(`https://wa.me/${BIZ.wa}?text=${encodeURIComponent(summary())}`, '_blank', 'noopener');
    });
  }

  /* ---------- work filters ---------- */
  const chips = $$('.chip[data-f]');
  chips.forEach((ch) => ch.addEventListener('click', () => {
    chips.forEach((c) => c.classList.toggle('on', c === ch));
    const items = $$('.tilt[data-cat]');
    const show = items.filter(t => ch.dataset.f === 'all' || t.dataset.cat.split(' ').includes(ch.dataset.f));
    if (anim) {
      G.to(items, { opacity: 0, y: 20, scale: .96, duration: .25, onComplete() {
        items.forEach(t => t.classList.toggle('gone', !show.includes(t)));
        G.fromTo(show, { opacity: 0, y: 40, scale: .96 }, { opacity: 1, y: 0, scale: 1, duration: .7, stagger: .06, ease: 'expo.out', onComplete: () => ST.refresh() });
      } });
    } else items.forEach(t => t.classList.toggle('gone', !show.includes(t)));
  }));

  if (!anim) return;

  /* =====================================================
     MOTION
     ===================================================== */
  G.registerPlugin(ST);
  ST.config({ ignoreMobileResize: true });
  document.documentElement.classList.add('js-anim');

  /* smooth scroll */
  if (window.Lenis) {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: .95 });
    lenis.on('scroll', ST.update);
    G.ticker.add((t) => lenis.raf(t * 1000));
    G.ticker.lagSmoothing(0);
    lenis.stop();
  }
  const scrollToEl = (target) => lenis ? lenis.scrollTo(target, { offset: -20, duration: 1.4 }) : target.scrollIntoView({ behavior: 'smooth' });

  /* split text into masked words */
  function split(el) {
    const walk = (node) => [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((t) => {
          if (!t) return;
          if (/^\s+$/.test(t)) return frag.appendChild(document.createTextNode(' '));
          const w = document.createElement('span'); w.className = 'w';
          const i = document.createElement('span'); i.className = 'wi'; i.textContent = t;
          w.appendChild(i); frag.appendChild(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
    });
    walk(el);
    return $$('.wi', el);
  }

  /* ---------- hero intro timeline (paused until loader ends) ---------- */
  const heroWords = $$('[data-hero]').flatMap(split);
  G.set(heroWords, { yPercent: 118, rotate: 5 });
  G.set('.hero-fade', { opacity: 0, y: 30 });
  G.set('.hstack figure', { opacity: 0, yPercent: 14, scale: .92 });
  G.set('.hstack .chipf', { opacity: 0, scale: .6 });
  G.set(hdr, { yPercent: -120 });
  const intro = G.timeline({ paused: true })
    .to(hdr, { yPercent: 0, duration: 1, ease: 'expo.out' })
    .to(heroWords, { yPercent: 0, rotate: 0, duration: 1.3, ease: 'expo.out', stagger: .07 }, 0.05)
    .to('.hero-fade', { opacity: 1, y: 0, duration: 1.1, stagger: .1, ease: 'power3.out' }, '-=.9')
    .to('.hstack figure', { opacity: 1, yPercent: 0, scale: 1, duration: 1.5, stagger: .14, ease: 'expo.out' }, '-=1.2')
    .to('.hstack .chipf', { opacity: 1, scale: 1, duration: .9, ease: 'back.out(2)' }, '-=.6');

  /* ---------- loader / entry ---------- */
  const seen = safe(() => sessionStorage.getItem('pnp-seen'));
  const finishEntry = () => { safe(() => sessionStorage.setItem('pnp-seen', '1')); unlock(); intro.play(); onReady(); };
  let safety = setTimeout(() => { unlock(); intro.progress(1); }, 9000);
  const done = () => { clearTimeout(safety); finishEntry(); };

  if (!seen) {
    const L = document.createElement('div');
    L.className = 'loader';
    L.innerHTML = `<div class="loader-in">
      <svg class="lg" viewBox="0 0 120 120" aria-hidden="true"><path id="lt" d="M20 0H82L120 38V100a20 20 0 0 1-20 20H20A20 20 0 0 1 0 100V20A20 20 0 0 1 20 0Z" fill="#1e2240"/><path id="lf" d="M82 0V38H120Z" fill="#ffb996"/><path id="lp" d="M42 94V41H66a17 17 0 0 1 0 34H42" fill="none" stroke="#f7f5fc" stroke-width="15"/></svg>
      <div class="loader-n" id="ln">0</div><div class="loader-bar"><i id="lb"></i></div><div class="loader-t" id="lt2">Warming up the press</div></div>`;
    document.body.prepend(L);
    document.body.classList.remove('is-loading'); document.body.classList.add('is-loading');
    const lp = $('#lp'), len = 200;
    G.set(lp, { strokeDasharray: len, strokeDashoffset: len });
    G.set('#lt', { scale: .6, transformOrigin: '50% 50%', opacity: 0 }); G.set('#lf', { scale: 0, transformOrigin: '100% 0%' });
    const msg = ['Warming up the press', 'Mixing the inks', 'Aligning registration', 'Cutting the dielines', 'Ready to print'];
    const o = { v: 0 };
    G.timeline({ onComplete: done })
      .to('#lt', { scale: 1, opacity: 1, duration: .6, ease: 'back.out(2)' })
      .to('#lf', { scale: 1, duration: .5, ease: 'back.out(3)' }, '-=.2')
      .to(lp, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut' }, '-=.3')
      .to(o, { v: 100, duration: 2.1, ease: 'power2.inOut', onUpdate() {
        const n = Math.round(o.v); $('#ln').textContent = n; $('#lb').style.transform = `scaleX(${o.v / 100})`;
        $('#lt2').textContent = msg[Math.min(4, Math.floor(o.v / 20.01))];
      } }, 0)
      .to('.loader-in', { y: -30, opacity: 0, duration: .5, ease: 'power2.in' }, '+=.15')
      .to(L, { yPercent: -101, duration: 1.1, ease: 'expo.inOut', borderBottomLeftRadius: '50%', borderBottomRightRadius: '50%' }, '-=.1')
      .add(() => L.remove());
  } else {
    // returning visit / page-to-page: peach panel slides away
    G.set(pt, { y: 0, yPercent: 0 });
    G.to(pt, { yPercent: -101, duration: .9, ease: 'expo.inOut', delay: .08, onComplete: () => G.set(pt, { yPercent: 101 }) });
    G.delayedCall(.45, done);
  }
  if (!seen) G.set(pt, { y: 0, yPercent: 101 });

  /* ---------- page transitions ---------- */
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.hash) { e.preventDefault(); const t = $(url.hash); t && scrollToEl(t); document.body.classList.remove('menu-open'); return; }
    if (url.pathname === location.pathname || !/\.html?$|\/$/.test(url.pathname)) return;
    e.preventDefault();
    pt.classList.add('on');
    G.set(pt, { y: 0, yPercent: 101 });
    G.to(pt, { yPercent: 0, duration: .75, ease: 'expo.inOut', onComplete: () => (location.href = url.href) });
  });
  addEventListener('pageshow', (e) => { if (e.persisted) { G.set(pt, { y: 0, yPercent: 101 }); pt.classList.remove('on'); } });


  /* ---------- everything that needs a ready page ---------- */
  function onReady() {
    /* header hide/show on direction */
    ST.create({ start: 0, end: 'max', onUpdate: (s) => {
      if (document.body.classList.contains('menu-open')) return;
      const hide = s.direction === 1 && s.scroll() > 500;
      G.to(hdr, { yPercent: hide ? -120 : 0, duration: .5, ease: 'power3.out', overwrite: 'auto' });
    } });
    /* progress */
    G.to('#progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: .2 } });
    if (location.hash && $(location.hash)) setTimeout(() => scrollToEl($(location.hash)), 900);
  }

  /* split headings: word masks rise when scrolled in */
  $$('[data-split]').forEach((el) => {
    const w = split(el);
    G.set(w, { yPercent: 118, rotate: 4 });
    ST.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => G.to(w, { yPercent: 0, rotate: 0, duration: 1.1, ease: 'expo.out', stagger: .05 }) });
  });

  /* paragraph that "reads" itself as you scroll */
  $$('.scrub-p').forEach((el) => {
    const w = split(el);
    G.set(w, { opacity: .14 });
    G.to(w, { opacity: 1, ease: 'none', stagger: .12, scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 48%', scrub: true } });
  });

  /* generic reveals in batches */
  G.set('[data-reveal]', { opacity: 0, y: 48 });
  ST.batch('[data-reveal]', { start: 'top 90%', once: true, onEnter: (b) => G.to(b, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: .09 }) });
  G.set('.tilt', { opacity: 0, y: 70 });
  ST.batch('.tilt', { start: 'top 92%', once: true, onEnter: (b) => G.to(b, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', stagger: .12 }) });
  $$('.dtl').forEach((d) => { G.from(d, { opacity: 0, y: 60, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: d, start: 'top 88%', once: true } }); });

  /* real parallax on photos */
  $$('.pimg').forEach((box) => { const img = $('img', box); if (img) G.fromTo(img, { yPercent: -7 }, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: box, start: 'top bottom', end: 'bottom top', scrub: true } }); });
  $$('.band').forEach((b) => {
    G.fromTo($('img', b), { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: b, start: 'top bottom', end: 'bottom top', scrub: true } });
    G.fromTo(b, { clipPath: 'inset(10% 6% 10% 6% round 40px)' }, { clipPath: 'inset(0% 0% 0% 0% round 34px)', ease: 'none', scrollTrigger: { trigger: b, start: 'top 95%', end: 'top 25%', scrub: true } });
  });

  /* hero: photo stack depth parallax on scroll + mouse */
  if ($('.hstack')) {
    $$('.hstack figure').forEach((f, i) => G.to(f, { y: (i + 1) * -50, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } }));
    G.to('.hero .wrap', { y: -60, opacity: .2, ease: 'none', scrollTrigger: { trigger: '.hero', start: '60% top', end: 'bottom top', scrub: true } });
    {
      const hs = $('.hstack'), figs = $$('.hstack figure'), depth = [28, 18, 40];
      const rx = G.quickTo(hs, 'rotationX', { duration: .8, ease: 'power3' }), ry = G.quickTo(hs, 'rotationY', { duration: .8, ease: 'power3' });
      const mv = figs.map((f) => [G.quickTo(f, 'x', { duration: .9, ease: 'power3' })]);
      const aim = (cx, cy) => {
        const nx = cx / innerWidth - .5, ny = cy / innerHeight - .5;
        ry(nx * 12); rx(-ny * 10);
        mv.forEach((m, i) => m[0](nx * depth[i]));
      };
      if (fine) $('.hero').addEventListener('mousemove', (e) => aim(e.clientX, e.clientY));
      $('.hero').addEventListener('touchmove', (e) => { const t = e.touches[0]; t && aim(t.clientX, t.clientY); }, { passive: true });
      $('.hero').addEventListener('touchend', () => aim(innerWidth / 2, innerHeight / 2), { passive: true });
    }
  } else {
    G.to('.hero .wrap', { y: -50, opacity: .2, ease: 'none', scrollTrigger: { trigger: '.hero', start: '55% top', end: 'bottom top', scrub: true } });
  }

  /* scroll-velocity marquee */
  const mqs = $$('.mq-track').map((mqt) => {
    const words = (mqt.dataset.words || '').split(',');
    mqt.innerHTML = [...words, ...words].map(w => `<span>${w}</span>`).join('');
    const rev = mqt.dataset.dir === '-1';
    const tw = rev ? G.fromTo(mqt, { xPercent: -50 }, { xPercent: 0, duration: 36, ease: 'none', repeat: -1 }) : G.to(mqt, { xPercent: -50, duration: 32, ease: 'none', repeat: -1 });
    return { tw, rev };
  });
  if (mqs.length) {
    let rt;
    ST.create({ onUpdate(s) {
      const d = s.direction || 1, v = Math.min(Math.abs(s.getVelocity()) / 220, 9);
      mqs.forEach(({ tw, rev }) => G.to(tw, { timeScale: d * (1 + v), duration: .25, overwrite: true }));
      clearTimeout(rt); rt = setTimeout(() => mqs.forEach(({ tw }) => G.to(tw, { timeScale: 1, duration: 1.4 })), 140);
    } });
  }

  /* ---------- v4: crooked photos, trail, expand, badge, shapes ---------- */

  /* polaroid walls: dropped onto the table, straighten on hover, skew with scroll speed */
  $$('.wall').forEach((wall) => {
    const pols = $$('.pol', wall);
    pols.forEach((p) => G.set(p, { rotate: +p.dataset.r || 0 }));
    G.from(pols, { y: 220, opacity: 0, rotate: (i) => (+pols[i].dataset.r || 0) + G.utils.random(-22, 22), duration: 1.5, ease: 'elastic.out(1,.72)', stagger: .13,
      scrollTrigger: { trigger: wall, start: 'top 82%', once: true } });
    pols.forEach((p, i) => {
      const r = +p.dataset.r || 0, d = +p.dataset.d || (i % 2 ? -6 : 6);
      G.fromTo(p, { yPercent: -d }, { yPercent: d, ease: 'none', scrollTrigger: { trigger: wall, start: 'top bottom', end: 'bottom top', scrub: true } });
      p.addEventListener('mouseenter', () => G.to(p, { rotate: 0, scale: 1.08, zIndex: 6, duration: .6, ease: 'expo.out' }));
      p.addEventListener('mouseleave', () => G.to(p, { rotate: r, scale: 1, zIndex: 1, duration: .8, ease: 'elastic.out(1,.6)' }));
      p.addEventListener('touchstart', () => G.to(p, { rotate: 0, scale: 1.08, zIndex: 6, duration: .6, ease: 'expo.out' }), { passive: true });
      ['touchend', 'touchcancel'].forEach((ev) => p.addEventListener(ev, () => G.to(p, { rotate: r, scale: 1, zIndex: 1, duration: .8, ease: 'elastic.out(1,.6)' }), { passive: true }));
    });
  });
  const skewTargets = $$('.pol,.tilt,.trail-img');
  if (skewTargets.length) {
    const proxy = { s: 0 }, clampS = G.utils.clamp(-7, 7), setSkew = G.quickSetter(skewTargets, 'skewY', 'deg');
    ST.create({ onUpdate(self) {
      const v = clampS(self.getVelocity() / -330);
      if (Math.abs(v) > Math.abs(proxy.s)) { proxy.s = v; G.to(proxy, { s: 0, duration: .9, ease: 'power3', overwrite: true, onUpdate: () => setSkew(proxy.s) }); }
    } });
  }

  /* photo trail that follows the mouse */
  const trail = $('.trail');
  if (trail) {
    const list = (trail.dataset.imgs || '').split(',').filter(Boolean);
    list.forEach((src) => { const im = new Image(); im.src = src; });
    let n = 0, lx = -999, ly = -999;
    const spawn = (x, y) => {
      const im = document.createElement('img');
      im.src = list[n++ % list.length]; im.alt = ''; im.className = 'trail-img';
      trail.appendChild(im);
      G.fromTo(im, { x: x - 80, y: y - 105, scale: .2, rotate: G.utils.random(-28, 28), opacity: 0 }, { scale: 1, opacity: 1, duration: .55, ease: 'expo.out' });
      G.to(im, { opacity: 0, scale: .6, y: '+=70', rotate: '+=12', duration: .7, delay: 1, ease: 'power2.in', onComplete: () => im.remove() });
    };
    const at = (e) => { const r = trail.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
    trail.addEventListener('mousemove', (e) => { const [x, y] = at(e); if (Math.hypot(x - lx, y - ly) > 120) { lx = x; ly = y; spawn(x, y); } });
    trail.addEventListener('pointerdown', (e) => { const [x, y] = at(e); spawn(x, y); });
    trail.addEventListener('touchmove', (e) => { const t = e.touches[0]; if (!t) return; const [x, y] = at(t); if (Math.hypot(x - lx, y - ly) > 90) { lx = x; ly = y; spawn(x, y); } }, { passive: true });
    if (!fine) { const h = $('h2', trail); if (h) h.innerHTML = 'Touch the <span class="it acc">screen.</span>'; }
    G.from(trail, { clipPath: 'inset(8% 8% 8% 8% round 60px)', ease: 'none', scrollTrigger: { trigger: trail, start: 'top 95%', end: 'top 35%', scrub: true } });
  }

  /* photo that grows from a crooked card to full screen */
  $$('.expand').forEach((ex) => {
    const frame = $('.expand-frame', ex), txt = $('.expand-txt', ex);
    G.set(txt, { opacity: 0, y: 40 });
    G.set(frame, { clipPath: 'inset(26% 30% 26% 30% round 44px)', rotate: -7, scale: .92 });
    const tl = G.timeline({ scrollTrigger: { trigger: $('.expand-stick', ex), start: 'top top', end: '+=140%', pin: true, scrub: .7, anticipatePin: 1 } });
    tl.to(frame, { clipPath: 'inset(0% 0% 0% 0% round 0px)', rotate: 0, scale: 1, ease: 'power2.inOut', duration: 1 })
      .to(txt, { opacity: 1, y: 0, ease: 'power2.out', duration: .5 }, '-=.25');
  });

  /* spinning badge — faster when you scroll */
  $$('.badge svg').forEach((svg) => {
    const spin = G.to(svg, { rotation: 360, duration: 16, ease: 'none', repeat: -1, transformOrigin: '50% 50%' });
    ST.create({ onUpdate(s) { G.to(spin, { timeScale: 1 + Math.min(Math.abs(s.getVelocity()) / 150, 12), duration: .2, overwrite: true }); G.to(spin, { timeScale: 1, duration: 1.2, delay: .2 }); } });
  });

  /* hand-drawn underline that draws itself */
  $$('.sq').forEach((el) => {
    el.insertAdjacentHTML('beforeend', '<svg viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true"><path d="M3 12C28 3 55 18 86 9s60-6 82 3 22-2 29-3"/></svg>');
    const path = $('path', el), len = path.getTotalLength();
    G.set(path, { strokeDasharray: len, strokeDashoffset: len });
    ST.create({ trigger: el, start: 'top 92%', once: true, onEnter: () => G.to(path, { strokeDashoffset: 0, duration: 1.3, ease: 'power2.inOut', delay: .5 }) });
  });

  /* floating shapes: gentle idle motion + depth parallax */
  $$('.shape').forEach((s, i) => {
    G.to(s, { y: '+=' + G.utils.random(18, 38), x: '+=' + G.utils.random(-14, 14), rotation: G.utils.random(-14, 14), duration: G.utils.random(3, 5), ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * .3 });
    G.to(s, { yPercent: (+s.dataset.depth || 30) * -1, ease: 'none', scrollTrigger: { trigger: s.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  /* counters */
  $$('[data-count]').forEach((el) => {
    const o = { v: 0 }, end = +el.dataset.count, suf = el.dataset.suf || '';
    el.textContent = '0' + suf;
    ST.create({ trigger: el, start: 'top 90%', once: true, onEnter: () => G.to(o, { v: end, duration: 2, ease: 'power3.out', onUpdate: () => (el.textContent = Math.round(o.v) + suf) }) });
  });

  /* pinned horizontal process */
  const hs = $('.hs'), track = $('.hs-track'), bar = $('.hs-bar i');
  if (hs && track) {
    const mm = G.matchMedia();
    mm.add('(min-width: 0px)', () => {
      G.to(track, { x: () => -(track.scrollWidth - document.documentElement.clientWidth), ease: 'none',
        scrollTrigger: { trigger: hs, start: 'top top', end: () => '+=' + (track.scrollWidth - innerWidth), pin: true, scrub: .8, invalidateOnRefresh: true, anticipatePin: 1,
          onUpdate: (s) => { if (bar) bar.style.transform = `scaleX(${s.progress})`; } } });
    });
  }

  /* services: floating photo preview that chases the cursor */
  const rows = $$('.svc[data-img]');
  if (rows.length) {
    const prev = document.createElement('div'); prev.className = 'prev';
    prev.innerHTML = rows.map(r => `<img src="${r.dataset.img}" alt="">`).join('');
    document.body.appendChild(prev);
    const imgs = $$('img', prev);
    G.set(prev, { xPercent: -50, yPercent: -50, scale: .6, rotate: -6 });
    const px = G.quickTo(prev, 'x', { duration: .6, ease: 'power3' }), py = G.quickTo(prev, 'y', { duration: .6, ease: 'power3' }), pr = G.quickTo(prev, 'rotate', { duration: .8, ease: 'power3' });
    let lastX = 0;
    rows.forEach((r, i) => {
      r.addEventListener('mouseenter', () => { imgs.forEach((im, k) => im.classList.toggle('on', k === i)); G.to(prev, { opacity: 1, scale: 1, duration: .6, ease: 'expo.out', overwrite: 'auto' }); });
      r.addEventListener('mouseleave', () => G.to(prev, { opacity: 0, scale: .6, duration: .4, ease: 'power3.in', overwrite: 'auto' }));
      if (fine && innerWidth > 900) r.addEventListener('mousemove', (e) => { px(e.clientX + 120); py(e.clientY); pr((e.clientX - lastX) * .4); lastX = e.clientX; });
      /* touch: preview pops up beside the finger while pressed */
      const tpos = (e) => { const t = e.touches[0]; if (!t) return; const w = prev.offsetWidth; px(innerWidth - w / 2 - 16); py(Math.max(w * .625 + 8, t.clientY - w * .625 - 24)); pr(0); };
      r.addEventListener('touchstart', (e) => { if (fine && innerWidth > 900) return; imgs.forEach((im, k) => im.classList.toggle('on', k === i)); tpos(e); G.to(prev, { opacity: 1, scale: 1, duration: .6, ease: 'expo.out', overwrite: 'auto' }); }, { passive: true });
      r.addEventListener('touchmove', tpos, { passive: true });
      ['touchend', 'touchcancel'].forEach((ev) => r.addEventListener(ev, () => G.to(prev, { opacity: 0, scale: .6, duration: .4, ease: 'power3.in', overwrite: 'auto' }), { passive: true }));
    });
  }

  /* 3D tilt cards (mouse + touch) */
  {
    $$('.card').forEach((c) => {
      const rx = G.quickTo(c, 'rotationX', { duration: .6, ease: 'power3' }), ry = G.quickTo(c, 'rotationY', { duration: .6, ease: 'power3' });
      const tiltTo = (cx, cy) => {
        const r = c.getBoundingClientRect(), x = (cx - r.left) / r.width, y = (cy - r.top) / r.height;
        ry((x - .5) * 12); rx((.5 - y) * 12);
      };
      if (fine) c.addEventListener('mousemove', (e) => tiltTo(e.clientX, e.clientY));
      c.addEventListener('mouseleave', () => { rx(0); ry(0); });
      ['touchstart', 'touchmove'].forEach((ev) => c.addEventListener(ev, (e) => { const t = e.touches[0]; t && tiltTo(t.clientX, t.clientY); }, { passive: true }));
      ['touchend', 'touchcancel'].forEach((ev) => c.addEventListener(ev, () => { rx(0); ry(0); }, { passive: true }));
    });
  }

  /* magnetic buttons */
  if (fine) {
    $$('.btn,.burger,.wa').forEach((b) => {
      const qx = G.quickTo(b, 'x', { duration: .5, ease: 'power3' }), qy = G.quickTo(b, 'y', { duration: .5, ease: 'power3' });
      b.addEventListener('mousemove', (e) => { const r = b.getBoundingClientRect(); qx((e.clientX - r.left - r.width / 2) * .3); qy((e.clientY - r.top - r.height / 2) * .4); });
      b.addEventListener('mouseleave', () => { qx(0); qy(0); });
    });
  }

  /* footer wordmark rises into place */
  G.fromTo('.ftr-big', { yPercent: 40 }, { yPercent: 10, ease: 'none', scrollTrigger: { trigger: '.ftr', start: 'top bottom', end: 'bottom bottom', scrub: true } });

  /* layout settles after fonts + images */
  const refresh = () => ST.refresh();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
  addEventListener('load', () => setTimeout(refresh, 100));
})();
