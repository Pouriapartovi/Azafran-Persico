// Azafrán Pérsico: language, opening hours, header, motion, dish slider, menu tabs and WhatsApp booking.
(() => {
  const WHATSAPP = '34665421288';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  // ---------- Language: Spanish in the HTML, English in data-en ----------
  let lang = 'es';
  try { if (localStorage.getItem('lang') === 'en') lang = 'en'; } catch (e) {}
  const keep = (el, key, value) => { if (!(key in el.dataset)) el.dataset[key] = value; };
  function applyLang() {
    const en = lang === 'en';
    document.documentElement.lang = lang;
    $$('[data-en]').forEach((el) => { keep(el, 'es', el.textContent); el.textContent = en ? el.dataset.en : el.dataset.es; });
    $$('[data-en-html]').forEach((el) => { keep(el, 'esHtml', el.innerHTML); el.innerHTML = en ? el.dataset.enHtml : el.dataset.esHtml; });
    $$('[data-en-alt]').forEach((el) => { keep(el, 'esAlt', el.alt); el.alt = en ? el.dataset.enAlt : el.dataset.esAlt; });
    $$('[data-en-ph]').forEach((el) => { keep(el, 'esPh', el.placeholder); el.placeholder = en ? el.dataset.enPh : el.dataset.esPh; });
    $$('[data-lang-toggle]').forEach((b) => { b.textContent = en ? 'ES' : 'EN'; b.setAttribute('aria-label', en ? 'Cambiar a español' : 'Switch to English'); });
    splitTitle();
    fillBooking();
    updateBooking();
    updateOpenNow();
    moveTabInk();
  }
  $$('[data-lang-toggle]').forEach((b) => b.addEventListener('click', () => {
    lang = lang === 'en' ? 'es' : 'en';
    try { localStorage.setItem('lang', lang); } catch (e) {}
    applyLang();
  }));

  // ---------- Headline: each word rises into place ----------
  function splitTitle() {
    const h = $('.hero-title');
    if (!h || reduced) return;
    let i = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.append(part); return; }
            const w = document.createElement('span'); w.className = 'w';
            const s = document.createElement('span'); s.textContent = part; s.style.setProperty('--i', i++);
            w.append(s); frag.append(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && !n.classList.contains('w')) walk(n);
      });
    };
    walk(h);
  }

  // ---------- Opening hours: Tuesday to Sunday, 11:30 to 00:00, Barcelona time ----------
  function updateOpenNow() {
    const el = $('[data-open-now]');
    if (!el) return;
    const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Madrid', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t).value;
    const day = get('weekday'), mins = +get('hour') * 60 + +get('minute');
    const en = lang === 'en';
    let open = false, text;
    if (day === 'Mon') text = en ? 'Closed today · open tomorrow from 11:30' : 'Hoy cerrado · mañana abrimos a las 11:30';
    else if (mins >= 690) { open = true; text = en ? 'Open now · until midnight' : 'Abierto ahora · hasta las 00:00'; }
    else text = en ? 'Opening today at 11:30' : 'Hoy abrimos a las 11:30';
    el.textContent = text;
    el.classList.toggle('is-closed', !open);
  }
  setInterval(updateOpenNow, 60000);

  // ---------- The dish behind the page: each open section picks its photo ----------
  const bds = $$('.bd');
  const setBg = (name) => bds.forEach((img) => img.classList.toggle('is-on', img.dataset.bd === name));
  if ('IntersectionObserver' in window) {
    const bgio = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) setBg(e.target.dataset.bg); }), { rootMargin: '-45% 0px -45% 0px' });
    $$('[data-bg]').forEach((el) => bgio.observe(el));
  }

  // ---------- Header turns solid after the first bit of scroll ----------
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('is-solid', scrollY > 40);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Phone menu ----------
  const burger = $('[data-burger]'), sheet = $('#sheet');
  const setSheet = (open) => {
    burger.setAttribute('aria-expanded', open);
    sheet.hidden = !open;
    document.body.style.overflow = open ? 'hidden' : '';
    nav.classList.toggle('is-solid', open ? false : scrollY > 40);
  };
  burger.addEventListener('click', () => setSheet(burger.getAttribute('aria-expanded') !== 'true'));
  $$('a', sheet).forEach((a) => a.addEventListener('click', () => setSheet(false)));
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !sheet.hidden) setSheet(false); });

  // ---------- Reveal on scroll, only for what starts below the first screen ----------
  const groups = new Map();
  $$('[data-r]').forEach((el) => {
    const parent = el.parentElement;
    const n = groups.get(parent) || 0; groups.set(parent, n + 1);
    el.style.setProperty('--d', n);
  });
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in'); e.target.classList.remove('pre');
      if (e.target.matches('[data-draw]')) e.target.classList.add('is-drawn');
      io.unobserve(e.target);
    }), { rootMargin: '0px 0px -10% 0px' });
    $$('[data-r], [data-draw]').forEach((el) => {
      if (el.getBoundingClientRect().top > innerHeight * 0.95) el.classList.add('pre');
      io.observe(el);
    });
  } else {
    $$('[data-draw]').forEach((el) => el.classList.add('is-drawn'));
  }

  // ---------- Parallax: photos drift against the scroll ----------
  const floaters = $$('[data-parallax]');
  if (floaters.length && !reduced) {
    let ticking = false;
    const paint = () => {
      const mid = innerHeight / 2;
      floaters.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > innerHeight + 200) return;
        const off = (r.top + r.height / 2 - mid) * parseFloat(el.dataset.parallax);
        el.style.transform = `translate3d(0, ${off.toFixed(1)}px, 0)`;
      });
      ticking = false;
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(paint); } }, { passive: true });
    paint();
  }

  // ---------- Dish slider: arrows and drag ----------
  const slider = $('[data-slider]');
  if (slider) {
    const step = () => ($('.star', slider)?.offsetWidth || 300) + 22;
    $$('[data-slide]').forEach((b) => b.addEventListener('click', () => slider.scrollBy({ left: step() * +b.dataset.slide, behavior: reduced ? 'auto' : 'smooth' })));
    let down = false, startX = 0, startLeft = 0, moved = false;
    slider.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') return; down = true; moved = false; startX = e.clientX; startLeft = slider.scrollLeft; });
    addEventListener('pointermove', (e) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) { moved = true; slider.classList.add('is-drag'); }
      slider.scrollLeft = startLeft - dx;
    });
    addEventListener('pointerup', () => {
      if (!down) return;
      down = false; slider.classList.remove('is-drag');
      if (moved) { const s = step(); slider.scrollTo({ left: Math.round(slider.scrollLeft / s) * s, behavior: 'smooth' }); }
    });
    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); slider.scrollBy({ left: step() * (e.key === 'ArrowRight' ? 1 : -1), behavior: 'smooth' }); }
    });
  }

  // ---------- Menu tabs: one course at a time, cards rise in ----------
  const tabsBox = $('[data-tabs]');
  const tabs = tabsBox ? $$('.tab', tabsBox) : [];
  const ink = tabsBox && $('.tab-ink', tabsBox);
  function moveTabInk() {
    const on = tabs.find((t) => t.getAttribute('aria-selected') === 'true');
    if (!on || !ink) return;
    ink.style.width = on.offsetWidth + 'px';
    ink.style.transform = `translateX(${on.offsetLeft - 6}px)`;
  }
  function showCourse(id, animate) {
    tabs.forEach((t) => { const on = t.dataset.tab === id; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; });
    $$('[data-course]').forEach((c) => {
      c.hidden = c.id !== id;
      if (c.id === id && animate && !reduced) $$('.card', c).forEach((card, i) => {
        card.classList.remove('is-in'); void card.offsetWidth;
        card.style.setProperty('--i', Math.min(i, 10)); card.classList.add('is-in');
      });
    });
    moveTabInk();
  }
  if (tabs.length) {
    tabsBox.hidden = false;
    $('.carta').classList.add('has-tabs');
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => showCourse(t.dataset.tab, true));
      t.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
        showCourse(next.dataset.tab, true); next.focus();
      });
    });
    showCourse(tabs[0].dataset.tab, false);
    addEventListener('resize', moveTabInk);
    document.fonts?.ready.then(moveTabInk);
  }

  // ---------- Booking: the button is a real WhatsApp link, kept up to date ----------
  const form = $('[data-booking]');
  const send = $('[data-booking-send]');
  const msg = $('[data-booking-msg]');
  function fillBooking() {
    if (!form) return;
    const en = lang === 'en', { time, people } = form, t = time.value, p = people.value;
    time.innerHTML = `<option value="">${en ? 'Choose a time' : 'Elige la hora'}</option>`;
    for (let m = 12 * 60; m <= 23 * 60; m += 30) {
      const v = `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
      time.add(new Option(v, v));
    }
    people.innerHTML = `<option value="">${en ? 'How many?' : '¿Cuántos sois?'}</option>`;
    for (let n = 1; n <= 10; n++) people.add(new Option(en ? `${n} ${n === 1 ? 'person' : 'people'}` : `${n} ${n === 1 ? 'persona' : 'personas'}`, String(n)));
    people.add(new Option(en ? 'More than 10' : 'Más de 10', '+10'));
    time.value = t; people.value = p;
  }
  const isMonday = (v) => v && new Date(v + 'T12:00:00').getDay() === 1;
  function problem() {
    const en = lang === 'en', { name, date, time, people } = form;
    if (isMonday(date.value)) return en ? 'We are closed on Mondays. Pick another day.' : 'Los lunes cerramos. Elige otro día.';
    if (!name.value.trim() || !date.value || !time.value || !people.value) return en ? 'Fill in your name, day, time and number of people.' : 'Rellena tu nombre, el día, la hora y cuántos sois.';
    return '';
  }
  function updateBooking() {
    if (!form) return;
    const en = lang === 'en', { name, date, time, people } = form;
    let text = en ? "Hello! I'd like to book a table at Azafrán Pérsico." : '¡Hola! Quiero reservar mesa en Azafrán Pérsico.';
    if (!problem()) {
      const day = new Date(date.value + 'T12:00:00').toLocaleDateString(en ? 'en-GB' : 'es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
      text += en ? `\nName: ${name.value.trim()}\nDay: ${day}\nTime: ${time.value}\nPeople: ${people.value}`
                 : `\nNombre: ${name.value.trim()}\nDía: ${day}\nHora: ${time.value}\nPersonas: ${people.value}`;
    }
    send.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
  }
  if (form) {
    const d = new Date();
    form.date.min = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    form.addEventListener('input', () => { updateBooking(); if (msg.textContent) msg.textContent = isMonday(form.date.value) ? problem() : ''; });
    form.date.addEventListener('change', () => { msg.textContent = isMonday(form.date.value) ? problem() : ''; });
    form.addEventListener('submit', (e) => e.preventDefault());
    send.addEventListener('click', (e) => {
      const p = problem();
      if (p) { e.preventDefault(); msg.textContent = p; }
      else msg.textContent = lang === 'en' ? 'Opening WhatsApp with your message…' : 'Abriendo WhatsApp con tu mensaje…';
    });
  }

  $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
  applyLang();
})();
