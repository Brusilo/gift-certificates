// Общее для версий A и B: суммы, открытки, билеты, шаблоны поздравлений, карточки «Кому подарить».
const CONFIG = {
  minAmount: 100,
  maxAmount: 200000,
  defaultAmount: 1000,
  defaultDesign: 'meadow',
  defaultTicket: 'meadow',
  validityMonths: 12,
  // Сколько одинаковых сертификатов можно оформить в форме. Больше — через блок «Компаниям»
  maxQty: 20,
  // Открытки для письма: у каждого билета для печати своя открытка, в том же порядке и с тем же названием.
  // Открытка — основная часть билета без корешка: тот же фон, фото, ступенька и чемодан. Первой и по умолчанию «Чемодан в поле»
  designs: [
    { id: 'meadow',   name: 'Чемодан в поле',      main: '#A181FF', blob: 'blob-meadow.jpg' },
    { id: 'car',      name: 'Чемоданы на машине',  main: '#A181FF', blob: 'blob-car.jpg' },
    { id: 'airport',  name: 'Аэропорт',            main: '#A181FF', blob: 'blob-airport.jpg' },
    { id: 'pool',     name: 'Бассейн',             main: '#A181FF', blob: 'blob-pool.jpg' },
    { id: 'pagoda',   name: 'Пагода',              main: '#A181FF', blob: 'blob-pagoda.jpg' },
    { id: 'stack',    name: 'Башня из чемоданов',  main: '#A181FF', stepPhoto: 'ph-stack.jpg', ix: [72, 0, 132, 74] },
    { id: 'suitcase', name: 'Оранжевый чемодан',   main: '#A181FF', suit: true },
    { id: 'steps',    name: 'Светлая ступенька',   main: '#A181FF', suit: true, step: '#D6C8FF', low: '#D6C8FF' },
    { id: 'night',    name: 'Синий',               main: '#011F90', suit: true, step: '#D6C8FF' }
  ],
  // Билеты для печати («Вручу лично») из макета «Сертификат Туту – варианты оформления»:
  // main — фон основной части, stub — цвет корешка, blob — фото в большой форме, stepPhoto — фото в ступеньке,
  // step / low — светлая или синяя ступенька сверху и снизу, suit — 3D-чемодан.
  tickets: [
    { id: 'meadow',   name: 'Чемодан в поле',      main: '#A181FF', stub: '#011F90', blob: 'blob-meadow.jpg' },
    { id: 'car',      name: 'Чемоданы на машине',  main: '#A181FF', stub: '#011F90', blob: 'blob-car.jpg' },
    { id: 'airport',  name: 'Аэропорт',            main: '#A181FF', stub: '#011F90', blob: 'blob-airport.jpg' },
    { id: 'pool',     name: 'Бассейн',             main: '#A181FF', stub: '#011F90', blob: 'blob-pool.jpg' },
    { id: 'pagoda',   name: 'Пагода',              main: '#A181FF', stub: '#011F90', blob: 'blob-pagoda.jpg' },
    { id: 'stack',    name: 'Башня из чемоданов',  main: '#A181FF', stub: '#011F90', stepPhoto: 'ph-stack.jpg', ix: [72, 0, 132, 74] },
    { id: 'suitcase', name: 'Оранжевый чемодан',   main: '#A181FF', stub: '#011F90', suit: true },
    { id: 'steps',    name: 'Светлая ступенька',   main: '#A181FF', stub: '#011F90', suit: true, step: '#D6C8FF', low: '#D6C8FF' },
    { id: 'night',    name: 'Синий',               main: '#011F90', stub: '#5F17C5', suit: true, step: '#D6C8FF' }
  ],
  templates: [
    { id: 'birthday', label: 'День рождения', text: 'С днём рождения! Выбирай, куда поехать.' },
    { id: 'parents',  label: 'Родителям',     text: 'Съездите отдохнуть. Куда и когда, решайте сами.' },
    { id: 'friend',   label: 'Просто так',    text: 'Это тебе на поездку, выбирай куда.' },
    { id: 'together', label: 'От всех нас',   text: 'Это от всех нас. Выбирай, куда поехать.' },
    { id: 'thanks',   label: 'Спасибо',       text: 'Спасибо за помощь! Пусть следующая поездка будет за мой счёт.' },
    { id: 'newyear',  label: 'Новый год',     text: 'С Новым годом! Пусть в нём будет больше поездок.' }
  ],
  // Карточки «Кому подарить»: кому подойдёт подарок. Не кликаются. pos — какая часть фото видна над волной
  giftCards: [
    { title: 'Родителям', text: 'Отдых там, где они давно мечтали побывать', photo: 'assets/who/parents-tea.webp', pos: '55% 45%' },
    { title: 'Любителям путешествий', text: 'Они знают, куда отправиться в следующий раз', photo: 'assets/who/airport.webp', pos: '58% 30%' },
    { title: 'Тем, кто живет далеко', text: 'Чтобы встретиться как можно скорее', photo: 'assets/who/far-couple-train.jpg', pos: '72% 40%' },
    { title: 'К празднику', text: 'Подарок, который запомнится надолго', photo: 'assets/who/holiday-pizza.webp', pos: '50% 68%' }
  ],
  // Блок «Сколько подарить»: только суммы, каждая на своей открытке для письма. Клик выбирает сумму и открытку
  // Синие и фиолетовые открытки по очереди: на розовой панели синие заметнее
  // design — какая открытка выберется в форме, look — как карточка выглядит на розовой панели (синие и фиолетовые по очереди)
  amountCards: [
    { amount: null,  design: 'pagoda',   look: { id: 'pagoda', main: '#011F90', blob: 'blob-pagoda.jpg' } },
    { amount: 1000,  design: 'suitcase', look: { id: 'plum', main: '#5F17C5', suit: true } },
    { amount: 3000,  design: 'pool',     look: { id: 'sea', main: '#011F90', blob: 'blob-pool.jpg' } },
    { amount: 5000,  design: 'meadow',   look: { id: 'meadow', main: '#A181FF', blob: 'blob-meadow.jpg' } },
    { amount: 10000, design: 'car',      look: { id: 'family', main: '#011F90', blob: 'blob-car.jpg' } },
    { amount: 25000, design: 'airport',  look: { id: 'spb', main: '#A181FF', blob: 'blob-airport.jpg' } }
  ]
};

const $ = (id) => document.getElementById(id);
const fmt = (n) => n.toLocaleString('ru-RU').replace(/ | /g, ' ') + ' ₽';
// «3 сертификата», «5 сертификатов», «21 сертификат»
const certs = (n) => n + ' ' + (n % 10 === 1 && n % 100 !== 11 ? 'сертификат'
  : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? 'сертификата' : 'сертификатов');
const findIn = (list, id, fallback) => list.find((d) => d.id === id) || list.find((d) => d.id === fallback);
const findDesign = (id) => findIn(CONFIG.designs, id, CONFIG.defaultDesign);
const findTicket = (id) => findIn(CONFIG.tickets, id, CONFIG.defaultTicket);
const untilText = (d) => d.toLocaleDateString('ru-RU');

// Первый экран: лицевая сторона билета поверх оборота
function mountHero() {
  const d = findTicket(CONFIG.defaultTicket);
  const until = new Date();
  until.setMonth(until.getMonth() + CONFIG.validityMonths);
  // В заголовке уже «путешествие», поэтому на билете первого экрана поздравление без этого слова
  const f = { amount: fmt(10000), to: 'Маша', from: 'Петя', msg: 'Пусть впереди будет много ярких впечатлений!', till: untilText(until) };
  tkMount($('heroBack'), 'back', d); tkFill($('heroBack'), f);
  // Лицевая сторона синяя: фиолетовая сливалась с фоном первого экрана. Логотип на синем белый, корешок тоже синий, как у оборота
  tkMount($('heroFront'), 'front', { ...d, id: 'hero-' + d.id, main: '#011F90', stub: '#011F90' }); tkFill($('heroFront'), f);
}

// Карточка «Кому подарить»: фото, фиолетовая волна, заголовок и подпись
function fillGiftCard(el, c) {
  el.className = 'gift';
  el.innerHTML = '<span class="gift-photo"></span>'
    + '<svg class="gift-wave" viewBox="0 0 720 513" preserveAspectRatio="none" aria-hidden="true"><path d="M0 513V310C0 150 40 75 205 52L530 6C650-10 720 60 720 215V513Z"/></svg>'
    + '<span class="gift-body"><span class="gift-title"></span><span class="gift-example"></span></span>';
  el.querySelector('.gift-photo').style.backgroundImage = `url('${c.photo}')`;
  el.querySelector('.gift-photo').style.backgroundPosition = c.pos || 'center';
  el.querySelector('.gift-title').textContent = c.title;
  el.querySelector('.gift-example').textContent = c.text;
}

// Карточка «Сколько подарить»: открытка для письма, на ней только сумма
function fillAmountCard(el, c) {
  // Без суммы: на красном стикере «Любая сумма», на лаймовом «от 100 ₽»
  const text = c.amount ? fmt(c.amount) : 'от ' + fmt(CONFIG.minAmount);
  el.className = 'sum';
  el.setAttribute('aria-label', c.amount ? 'Сертификат на ' + text : 'Сертификат на любую сумму ' + text);
  el.innerHTML = '<span class="tk-box"></span>';
  const d = c.look || findDesign(c.design);
  tkMount(el.firstChild, 'card', { ...d, id: 'sum-' + d.id, sticker: c.amount ? 'Сертификат' : 'Любая сумма' });
  el.firstChild.firstElementChild.classList.add('no-who');
  tkFill(el.firstChild, { amount: text });
}

// Ряд-карусель как на индийском лендинге: на компьютере круглые стрелки лежат поверх краёв ряда по центру карточек,
// на краю ряда стрелка пропадает, на телефоне ряд листается пальцем. Разметка и стили из static-pages/public/india (carousel-nav--overlay)
// loop: стрелки листают по кругу, с последней страницы на первую и обратно
function makeRail(row, loop) {
  const wrap = document.createElement('div');
  wrap.className = 'has-carousel-arrows';
  row.before(wrap);
  const nav = document.createElement('div');
  nav.className = 'carousel-nav carousel-nav--overlay';
  const arrow = (dir, label, d) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', label);
    b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + d + '"/></svg>';
    b.addEventListener('click', () => {
      // Каждое нажатие сдвигает ряд ровно на одну карточку
      const items = row.children;
      if (items.length < 2) return;
      const step = items[1].offsetLeft - items[0].offsetLeft;
      if (!loop) { row.scrollBy({ left: dir * step, behavior: 'smooth' }); return; }
      // По кругу: карточка, которая ушла за край, переезжает в другой конец ряда,
      // поэтому ряд всегда едет в ту сторону, куда нажали, без отката к началу
      const k = 1, page = step;
      if (dir > 0 && row.scrollLeft + row.clientWidth + page > row.scrollWidth + 2) {
        for (let i = 0; i < k; i++) row.append(row.firstElementChild);
        row.scrollLeft -= page;
      } else if (dir < 0 && row.scrollLeft - page < -2) {
        for (let i = 0; i < k; i++) row.prepend(row.lastElementChild);
        row.scrollLeft += page;
      }
      row.scrollBy({ left: dir * page, behavior: 'smooth' });
    });
    return b;
  };
  const prev = arrow(-1, 'Назад', 'M15 19 8 12l7-7');
  const next = arrow(1, 'Дальше', 'm9 5 7 7-7 7');
  nav.append(prev, next);
  wrap.append(row, nav);
  const update = () => {
    if (loop) return; // по кругу листать можно всегда
    prev.disabled = row.scrollLeft < 4;
    next.disabled = row.scrollLeft + row.clientWidth >= row.scrollWidth - 4;
  };
  row.addEventListener('scroll', update, { passive: true });
  new ResizeObserver(update).observe(row);
  update();
}

// Выбор открытки или билета: маленькие копии с текущей суммой, без имён
function buildPicker(containerId, list, side, onPick) {
  list.forEach((d) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'design';
    b.dataset.design = d.id;
    b.setAttribute('aria-label', d.name);
    b.title = d.name;
    b.innerHTML = '<span class="tk-box"></span>';
    tkMount(b.firstChild, side, d);
    b.firstChild.firstElementChild.classList.add('no-who');
    b.addEventListener('click', () => onPick(d.id));
    $(containerId).append(b);
  });
  makeRail($(containerId), true);
}

// Отмечает выбранный вариант и пишет текущую сумму на мини-копиях
function syncPicker(containerId, selectedId, amountText) {
  const row = $(containerId);
  row.querySelectorAll('.design').forEach((b) => {
    b.setAttribute('aria-pressed', b.dataset.design === selectedId);
    tkFill(b.firstChild, { amount: amountText });
  });
  // Когда ряд впервые стал видимым, прокручиваем его к выбранному варианту
  const sel = row.querySelector('[aria-pressed="true"]');
  if (sel && row.clientWidth && !row.dataset.placed) {
    row.dataset.placed = '1';
    row.scrollLeft += sel.getBoundingClientRect().left - row.getBoundingClientRect().left;
  }
}

// Количество: поле с кнопками − и +, от 1 до CONFIG.maxQty
function initQty(onChange) {
  const clamp = (n) => Math.min(Math.max(n || 1, 1), CONFIG.maxQty);
  const set = (n) => { $('qty').value = clamp(n); onChange(clamp(n)); };
  $('qtyMinus').addEventListener('click', () => set(+$('qty').value - 1));
  $('qtyPlus').addEventListener('click', () => set(+$('qty').value + 1));
  $('qty').addEventListener('input', () => { $('qty').value = $('qty').value.replace(/\D/g, '').slice(0, 2); if ($('qty').value) set(+$('qty').value); });
  $('qty').addEventListener('blur', () => set(+$('qty').value));
}
// Поле поздравления растёт под текст вместо полосы прокрутки
function growMessage() {
  const m = $('message');
  m.style.height = 'auto';
  m.style.height = Math.max(124, m.scrollHeight + 3) + 'px';
}

// Кнопки на краях диапазона
function syncQty(qty) {
  $('qtyMinus').disabled = qty <= 1;
  $('qtyPlus').disabled = qty >= CONFIG.maxQty;
}
// Текст кнопки оплаты: «Оплатить · 3 000 ₽», сумма за все сертификаты
const payText = (qty, amount, amountOk) => amountOk ? 'Оплатить · ' + fmt(qty * amount) : 'Оплатить';

// Письмо получателю: обращение, поздравление, код и ссылка на тот же лист А4, что уходит в PDF
function fillLetter(f) {
  $('letterTitle').textContent = (f.to ? f.to + ', вам' : 'Вам') + ' подарок';
  // Без своего текста везде одно поздравление по умолчанию: в письме, на билете и на листе
  $('letterMsg').textContent = f.msg || 'Пусть впереди будет много отличных путешествий!';
  $('certValid').textContent = 'Действует до ' + f.till;
}

// День и время отправки: свой календарь и список часов в стиле tutu.ru вместо системных полей.
// Значения лежат в скрытых полях sendDate и sendTime, страница читает их как раньше
const DT_MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const DT_WD = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
const DT_ICON = {
  date: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  time: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'
};
function initWhen() {
  const date = $('sendDate'), time = $('sendTime');
  const isoD = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const parse = (s) => new Date(s + 'T00:00');
  $('dateRow').insertAdjacentHTML('beforeend',
    '<div class="dt"><button type="button" class="input dt-btn" id="dtDate" aria-label="Дата отправки" aria-expanded="false"></button><div class="dt-pop dt-cal" id="dtCal" hidden></div></div>'
    + '<div class="dt dt-t"><button type="button" class="input dt-btn" id="dtTime" aria-label="Время отправки" aria-expanded="false"></button><div class="dt-pop dt-times" id="dtTimes" hidden></div></div>');
  let view = parse(date.value); view.setDate(1);

  // Время в минутах от начала суток. Сегодня прошедшее время выбрать нельзя
  const nowMin = () => { const n = new Date(); return n.getHours() * 60 + n.getMinutes(); };
  const toMin = (v) => +v.slice(0, 2) * 60 + +v.slice(3, 5);
  const fmtT = (m) => String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');
  const past = (m) => date.value === date.min && m <= nowMin();
  const fixTime = () => { if (past(toMin(time.value)) && nowMin() < 1439) time.value = fmtT(nowMin() + 1); };
  const sync = () => {
    const d = parse(date.value);
    $('dtDate').innerHTML = DT_ICON.date + '<span>' + d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' }) + ', ' + DT_WD[(d.getDay() + 6) % 7] + '</span>';
    $('dtTime').innerHTML = DT_ICON.time + '<span>' + time.value + '</span>';
  };
  const changed = (el) => { el.dispatchEvent(new Event('input', { bubbles: true })); sync(); };

  function drawCal() {
    const min = parse(date.min), max = new Date(min); max.setFullYear(max.getFullYear() + 1);
    const y = view.getFullYear(), m = view.getMonth();
    const lead = (new Date(y, m, 1).getDay() + 6) % 7;
    const days = new Date(y, m + 1, 0).getDate();
    let cells = '<span></span>'.repeat(lead);
    for (let d = 1; d <= days; d++) {
      const dt = new Date(y, m, d), v = isoD(dt), wd = (lead + d - 1) % 7;
      const cls = 'dt-day' + (wd > 4 ? ' is-we' : '') + (v === date.min ? ' is-today' : '') + (v === date.value ? ' is-on' : '');
      cells += `<button type="button" class="${cls}" data-v="${v}"${dt < min || dt > max ? ' disabled' : ''}>${d}</button>`;
    }
    const prevOff = y * 12 + m <= min.getFullYear() * 12 + min.getMonth();
    const nextOff = y * 12 + m >= max.getFullYear() * 12 + max.getMonth();
    $('dtCal').innerHTML = `<div class="dt-head"><button type="button" class="dt-nav" data-step="-1" aria-label="Предыдущий месяц"${prevOff ? ' disabled' : ''}>‹</button>`
      + `<b>${DT_MONTHS[m]} ${y}</b><button type="button" class="dt-nav" data-step="1" aria-label="Следующий месяц"${nextOff ? ' disabled' : ''}>›</button></div>`
      + '<div class="dt-grid">' + DT_WD.map((w, i) => `<span class="dt-wd${i > 4 ? ' is-we' : ''}">${w}</span>`).join('') + cells + '</div>';
  }
  // Время двумя колонками, как барабаны: слева часы, справа минуты. Каждая листается отдельно
  const pad = (n) => String(n).padStart(2, '0');
  function drawTimes() {
    const cur = toMin(time.value), ch = Math.floor(cur / 60), cm = cur % 60;
    let hs = '', ms = '';
    for (let h = 0; h < 24; h++) hs += `<button type="button" class="dt-time${h === ch ? ' is-on' : ''}" data-h="${h}"${past(h * 60 + 59) ? ' disabled' : ''}>${pad(h)}</button>`;
    for (let m = 0; m < 60; m++) ms += `<button type="button" class="dt-time${m === cm ? ' is-on' : ''}" data-m="${m}"${past(ch * 60 + m) ? ' disabled' : ''}>${pad(m)}</button>`;
    $('dtTimes').innerHTML = `<div class="dt-col" role="group" aria-label="Часы">${hs}</div><div class="dt-col" role="group" aria-label="Минуты">${ms}</div>`;
  }
  // Выбранные часы и минуты по центру своих колонок
  const centerTimes = (only) => $('dtTimes').querySelectorAll('.dt-col').forEach((col, i) => {
    const on = col.querySelector('.is-on');
    if (on && (only === undefined || only === i)) col.scrollTop = on.offsetTop - col.clientHeight / 2 + on.offsetHeight / 2;
  });
  const pops = [['dtDate', 'dtCal', drawCal], ['dtTime', 'dtTimes', drawTimes]];
  const close = () => pops.forEach(([b, p]) => { $(p).hidden = true; $(b).setAttribute('aria-expanded', 'false'); });
  pops.forEach(([b, p, draw]) => $(b).addEventListener('click', () => {
    const open = $(p).hidden;
    close();
    if (!open) return;
    if (p === 'dtCal') { view = parse(date.value); view.setDate(1); }
    draw(); $(p).hidden = false; $(b).setAttribute('aria-expanded', 'true');
    if (p === 'dtTimes') centerTimes();
  }));
  $('dtCal').addEventListener('click', (e) => {
    const nav = e.target.closest('.dt-nav'), day = e.target.closest('.dt-day');
    if (nav) { view.setMonth(view.getMonth() + +nav.dataset.step); drawCal(); }
    if (day) { date.value = day.dataset.v; fixTime(); changed(date); changed(time); close(); }
  });
  // Час выбирается без закрытия окна, минуты закрывают окно
  $('dtTimes').addEventListener('click', (e) => {
    const t = e.target.closest('.dt-time');
    if (!t) return;
    const cur = toMin(time.value);
    if (t.dataset.h !== undefined) {
      let m = +t.dataset.h * 60 + cur % 60;
      if (past(m)) m = nowMin() + 1;
      time.value = fmtT(m); changed(time);
      const keep = $('dtTimes').querySelector('.dt-col').scrollTop;
      drawTimes();
      $('dtTimes').querySelector('.dt-col').scrollTop = keep;
      centerTimes(1);
    } else {
      time.value = fmtT(Math.floor(cur / 60) * 60 + +t.dataset.m); changed(time); close();
    }
  });
  // Путь события считаем на момент нажатия: после перерисовки колонок нажатая кнопка уже не в окне
  document.addEventListener('click', (e) => { if (!e.composedPath().some((n) => n.classList && n.classList.contains('dt'))) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  fixTime();
  sync();
}

// Телефон: предпросмотр целиком открывается отдельным экраном поверх страницы по кнопке «Как увидит получатель»
function initPreviewSheet() {
  const sheet = document.querySelector('.preview');
  if (!sheet || !$('pvOpen')) return;
  const open = (on) => {
    sheet.classList.toggle('is-open', on);
    document.documentElement.classList.toggle('pv-lock', on);
    if (on) { sheet.scrollTop = 0; $('pvClose').focus({ preventScroll: true }); }
    else $('pvOpen').focus({ preventScroll: true });
  };
  $('pvOpen').addEventListener('click', () => open(true));
  $('pvClose').addEventListener('click', () => open(false));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && sheet.classList.contains('is-open')) open(false); });
  // Экран стал широким: предпросмотр снова стоит рядом с формой
  matchMedia('(min-width:1101px)').addEventListener('change', (e) => { if (e.matches && sheet.classList.contains('is-open')) open(false); });
}
initPreviewSheet();

// Телефон: разделы подвала сворачиваются, как на индийском лендинге. Соцсети и строки внизу видны всегда
function initFooterMenu() {
  const mq = matchMedia('(max-width:720px)');
  if (!mq.matches) return;
  document.querySelectorAll('.footer-col > h4').forEach((h) => {
    if (h.nextElementSibling?.classList.contains('socials')) return;
    const d = document.createElement('details');
    d.className = 'fgroup';
    const s = document.createElement('summary');
    s.textContent = h.textContent;
    d.append(s);
    let n = h.nextElementSibling;
    while (n && n.tagName === 'A') { const next = n.nextElementSibling; d.append(n); n = next; }
    h.replaceWith(d);
  });
  // Окно стало широким: все разделы раскрыты, как в обычном подвале
  mq.addEventListener('change', (e) => { if (!e.matches) document.querySelectorAll('.fgroup').forEach((d) => { d.open = true; }); });
}
initFooterMenu();

// Кнопка всегда в одну строку: если текст не помещается, шрифт уменьшается до 13px
function fitButton(b) {
  b.style.fontSize = '';
  let fs = parseFloat(getComputedStyle(b).fontSize);
  while (b.scrollWidth > b.clientWidth && fs > 13) { fs -= 0.5; b.style.fontSize = fs + 'px'; }
}

// Частые вопросы: открыт всегда один, закрыть можно по тому же заголовку или по стрелке справа.
// Если после закрытия соседнего вопроса заголовок уехал вверх за экран, возвращаем его на экран
function initFaq() {
  document.querySelectorAll('.faq-list').forEach((list) => list.addEventListener('toggle', (e) => {
    const d = e.target;
    if (!d.open) return;
    list.querySelectorAll('details[open]').forEach((o) => { if (o !== d) o.open = false; });
    const top = d.getBoundingClientRect().top;
    if (top < 0) d.scrollIntoView({ block: 'start' });
  }, true));
}
initFaq();

// Телефон: после нажатия кнопка не остаётся «выбранной» с обводкой, фокус с неё снимаем
document.addEventListener('pointerup', (e) => {
  const b = e.target.closest('button,.btn');
  if (b && e.pointerType !== 'mouse') setTimeout(() => b.blur(), 0);
});

// Предпросмотр листа А4: certificate.html в рамке. Рамка загружается один раз,
// дальше новые данные уходят сообщением и лист перерисовывается без перезагрузки и мигания
function showA4(frame, f, designId) {
  const data = { type: 'cert', design: designId, amount: f.amountNum || 0, to: f.to, from: f.from, msg: f.msg };
  frame._cert = data;
  if (!frame.src) {
    frame.addEventListener('load', () => frame.contentWindow.postMessage(frame._cert, location.origin));
    frame.src = 'certificate.html?embed=1&design=' + encodeURIComponent(designId);
    return;
  }
  frame.contentWindow?.postMessage(data, location.origin);
}

function showProto(title, items) {
  $('protoTitle').textContent = title;
  const body = $('protoBody');
  body.innerHTML = '<p>Это прототип, оплата и отправка не подключены. В боевой версии здесь будет:</p>';
  const ul = document.createElement('ul');
  items.forEach((t) => { const li = document.createElement('li'); li.textContent = t; ul.append(li); });
  body.append(ul);
  $('protoDialog').showModal();
}

document.querySelectorAll('[data-proto="business"]').forEach((b) =>
  b.addEventListener('click', () => showProto('Здесь будет форма заявки', [
    'Название компании и ИНН',
    'Контакт для связи',
    'Сколько сертификатов и на какие суммы',
  ]))
);
