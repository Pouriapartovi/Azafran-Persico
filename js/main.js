// Azafrán Pérsico: language, opening hours, the saffron dish picker, booking by WhatsApp, and motion.
(() => {
  const WHATSAPP = '34665421288';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  // ---------- Language: Spanish in the HTML, English in data-en ----------
  let lang = 'es';
  try { if (localStorage.getItem('lang') === 'en') lang = 'en'; } catch (e) {}

  const store = (el, key, value) => { if (!(key in el.dataset)) el.dataset[key] = value; };
  function applyLang() {
    document.documentElement.lang = lang;
    $$('[data-en]').forEach((el) => { store(el, 'es', el.textContent); el.textContent = lang === 'en' ? el.dataset.en : el.dataset.es; });
    $$('[data-en-html]').forEach((el) => { store(el, 'esHtml', el.innerHTML); el.innerHTML = lang === 'en' ? el.dataset.enHtml : el.dataset.esHtml; });
    $$('[data-en-alt]').forEach((el) => { store(el, 'esAlt', el.alt); el.alt = lang === 'en' ? el.dataset.enAlt : el.dataset.esAlt; });
    $$('[data-en-ph]').forEach((el) => { store(el, 'esPh', el.placeholder); el.placeholder = lang === 'en' ? el.dataset.enPh : el.dataset.esPh; });
    $$('[data-lang-toggle]').forEach((b) => {
      const short = !b.classList.contains('lang-hero');
      b.textContent = lang === 'en' ? (short ? 'ES' : 'Español') : (short ? 'EN' : 'English');
      b.setAttribute('aria-label', lang === 'en' ? 'Cambiar a español' : 'Switch to English');
    });
    fillBookingOptions();
    updateOpenNow();
  }
  $$('[data-lang-toggle]').forEach((b) => b.addEventListener('click', () => {
    lang = lang === 'en' ? 'es' : 'en';
    try { localStorage.setItem('lang', lang); } catch (e) {}
    applyLang();
  }));

  // ---------- Opening hours: Tuesday to Sunday, 11:30 to 00:00, Barcelona time ----------
  function madridNow() {
    const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Madrid', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t).value;
    return { day: get('weekday'), mins: +get('hour') * 60 + +get('minute') };
  }
  function updateOpenNow() {
    const el = $('[data-open-now]');
    if (!el) return;
    const { day, mins } = madridNow();
    const en = lang === 'en';
    let text, open = false;
    if (day === 'Mon') text = en ? 'Closed today, Monday. Open tomorrow from 11:30' : 'Hoy lunes cerramos. Mañana abrimos a las 11:30';
    else if (mins >= 690) { open = true; text = en ? 'Open now, until midnight' : 'Abierto ahora, hasta las 00:00'; }
    else text = en ? 'Opening today at 11:30' : 'Hoy abrimos a las 11:30';
    el.textContent = text;
    el.classList.toggle('is-closed', !open);
  }
  setInterval(updateOpenNow, 60000);

  // ---------- The bar appears once the first screen has gone ----------
  const bar = $('#bar');
  const hero = $('.hero');
  if (bar && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => bar.classList.toggle('is-on', !e.isIntersecting), { rootMargin: '-80px 0px 0px 0px' }).observe(hero);
  } else if (bar) bar.classList.add('is-on');

  // ---------- Saffron dish picker: tabs, and the plate shows the chosen dish ----------
  const picker = $('[data-picker]');
  const plate = $('.saffron-pic .slot');
  const plateDefault = plate ? plate.innerHTML : '';
  function showOnPlate(photo) {
    if (!plate) return;
    const probe = new Image();
    probe.onload = () => {
      plate.innerHTML = '';
      probe.alt = '';
      plate.appendChild(probe);
      if (!reduced) probe.animate([{ opacity: 0, transform: 'scale(1.04)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 420, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' });
    };
    probe.onerror = () => { plate.innerHTML = plateDefault; applyLang(); };
    probe.src = `img/${photo}.jpg`;
  }
  if (picker) {
    const tabs = $$('[role="tab"]', picker);
    const select = (tab, focus) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute('aria-selected', on);
        t.tabIndex = on ? 0 : -1;
        $('#' + t.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) tab.focus();
      showOnPlate($('#' + tab.getAttribute('aria-controls')).dataset.photoTarget);
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        e.preventDefault();
        select(tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length], true);
      });
    });
  }

  // ---------- Booking: build the WhatsApp message ----------
  const form = $('[data-booking]');
  const msg = $('[data-booking-msg]');
  function fillBookingOptions() {
    if (!form) return;
    const time = form.time, people = form.people;
    const keepT = time.value, keepP = people.value;
    const en = lang === 'en';
    time.innerHTML = `<option value="">${en ? 'Time' : 'Hora'}</option>`;
    for (let m = 12 * 60; m <= 23 * 60; m += 30) {
      const v = `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
      time.add(new Option(v, v));
    }
    people.innerHTML = `<option value="">${en ? 'How many people' : 'Cuántas personas'}</option>`;
    for (let n = 1; n <= 10; n++) people.add(new Option(en ? `${n} ${n === 1 ? 'person' : 'people'}` : `${n} ${n === 1 ? 'persona' : 'personas'}`, String(n)));
    people.add(new Option(en ? 'More than 10' : 'Más de 10', '+10'));
    time.value = keepT; people.value = keepP;
  }
  if (form) {
    const d = new Date();
    form.date.min = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const isMonday = (v) => v && new Date(v + 'T12:00:00').getDay() === 1;
    form.date.addEventListener('change', () => {
      msg.textContent = isMonday(form.date.value) ? (lang === 'en' ? 'We are closed on Mondays. Pick another day.' : 'Los lunes cerramos. Elige otro día.') : '';
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const en = lang === 'en';
      const { name, date, time, people } = form;
      if (!name.value.trim() || !date.value || !time.value || !people.value) {
        msg.textContent = en ? 'Please fill in your name, day, time and number of people.' : 'Rellena tu nombre, el día, la hora y cuántas personas.';
        return;
      }
      if (isMonday(date.value)) { msg.textContent = en ? 'We are closed on Mondays. Pick another day.' : 'Los lunes cerramos. Elige otro día.'; return; }
      const day = new Date(date.value + 'T12:00:00').toLocaleDateString(en ? 'en-GB' : 'es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
      const text = en
        ? `Hello! I'd like to book a table at Azafrán Pérsico.\nName: ${name.value.trim()}\nDay: ${day}\nTime: ${time.value}\nPeople: ${people.value}`
        : `¡Hola! Quiero reservar mesa en Azafrán Pérsico.\nNombre: ${name.value.trim()}\nDía: ${day}\nHora: ${time.value}\nPersonas: ${people.value}`;
      msg.textContent = en ? 'Opening WhatsApp…' : 'Abriendo WhatsApp…';
      window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    });
  }

  // ---------- Menu: highlight the course you are in ----------
  const courseLinks = $$('.carta-nav a');
  if (courseLinks.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        courseLinks.forEach((a) => a.classList.toggle('is-here', a.hash === '#' + e.target.id));
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    $$('.course').forEach((c) => io.observe(c));
  }

  // ---------- Menu preview: point at a dish and its photo comes up beside it ----------
  const preview = $('[data-preview]');
  if (preview && fine && !reduced) {
    const frame = $('.slot', preview);
    const blank = frame.innerHTML;
    let current = null;
    $$('.dish').forEach((dish) => {
      dish.addEventListener('pointerenter', () => {
        const img = $('.dish-pic img', dish);
        current = dish;
        frame.innerHTML = img ? `<img src="${img.currentSrc || img.src}" alt="">` : blank;
        const r = dish.getBoundingClientRect();
        const left = r.left > innerWidth / 2 ? r.left - 250 : r.right + 30;
        const top = Math.min(Math.max(r.top + r.height / 2 - 137, 80), innerHeight - 290);
        preview.style.transform = `translate3d(${left}px, ${top}px, 0)`;
        preview.classList.add('is-on');
      });
      dish.addEventListener('pointerleave', () => { if (current === dish) preview.classList.remove('is-on'); });
    });
    addEventListener('scroll', () => preview.classList.remove('is-on'), { passive: true });
  }

  // ---------- Entrances: heading, then text, then picture ----------
  const groups = [
    ['.statement'],
    ['.saffron-pic', '.saffron-text h2', '.saffron-lead', '.picker', '.cells'],
    ['.carta-head h2', '.carta-intro'],
    ['.panel h2', '.historia-text > div:nth-child(1)', '.historia-text > div:nth-child(2)', '.historia-text .btn', '.portrait'],
    ['.foot-mark .fm-1', '.foot-mark .fm-2', '.foot-mark .fm-3'],
  ];
  groups.forEach((g) => g.forEach((s, i) => $$(s).forEach((el) => { el.dataset.reveal = ''; el.style.setProperty('--i', i); })));
  $$('.course-head, .carta-more').forEach((el) => { el.dataset.reveal = ''; });
  $$('.dishes').forEach((ul) => { ul.dataset.reveal = ''; });

  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -4% 0px' });
    $$('[data-reveal]').forEach((el) => io.observe(el));
  } else {
    $$('[data-reveal]').forEach((el) => el.classList.add('is-in'));
  }

  $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
  applyLang();
})();
