// Общее для версий A и B: суммы, открытки, билеты, шаблоны поздравлений, карточки «Кому подарить».
const CONFIG = {
  minAmount: 500,
  maxAmount: 200000,
  defaultAmount: 5000,
  defaultDesign: 'classic',
  defaultTicket: 'meadow',
  validityMonths: 12,
  // Открытки к поводам для письма получателю. Нарисованы как основная часть билета: фон, логотип, стикеры, «Кому» и «От кого».
  // На красном стикере всегда «Сертификат», на лаймовом сумма. photo — фото в большой форме, art3d / suit — 3D-предмет, step — светлая ступенька, snow — снег.
  // Сначала те же открытки, что в «Сколько подарить», и в том же порядке
  designs: [
    { id: 'pagoda',   name: 'Пагода',        main: '#011F90', blob: 'blob-pagoda.jpg' },
    { id: 'plum',     name: 'Оранжевый чемодан', main: '#5F17C5', suit: true },
    { id: 'sea',      name: 'Бассейн',       main: '#011F90', blob: 'blob-pool.jpg' },
    { id: 'meadow',   name: 'Чемодан в поле', main: '#A181FF', blob: 'blob-meadow.jpg' },
    { id: 'family',   name: 'Чемоданы на машине', main: '#011F90', blob: 'blob-car.jpg' },
    { id: 'spb',      name: 'Аэропорт',      main: '#A181FF', blob: 'blob-airport.jpg' },
    { id: 'classic',  name: 'Просто так',    main: '#A181FF', suit: true },
    { id: 'birthday', name: 'День рождения', main: '#A181FF', step: '#D6C8FF', art3d: 'assets/art/bubbles.webp' },
    { id: 'newyear',  name: 'Новый год',     main: '#011F90', snow: true, suit: true }
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
  // Плитки «Кому подарить»: кому подойдёт подарок.
  // Клик выбирает в форме открытку и шаблон поздравления, сумму не трогает
  // Фото сверху, фиолетовая волна снизу
  giftCards: [
    { title: 'Родителям', text: 'Отдых там, где они давно мечтали побывать', photo: 'assets/who/sauna.png', pos: '50% 40%', design: 'classic', template: 'parents' },
    { title: 'Тем, кто живет далеко', text: 'Чтобы встретиться как можно скорее', photo: 'assets/who/far-couple-train.jpg', pos: '72% 40%', design: 'family' },
    { title: 'Путешественникам', text: 'Они знают, куда отправиться в следующий раз', photo: 'assets/who/airport.webp', pos: '58% 30%', design: 'sea', template: 'friend' },
    { title: 'К празднику', text: 'Подарок, который запомнится надолго', photo: 'assets/who/holiday-pizza.webp', pos: '50% 55%', design: 'birthday', template: 'birthday' }
  ],
  // Блок «Сколько подарить»: только суммы, каждая на своей открытке для письма. Клик выбирает сумму и открытку
  // Синие и фиолетовые открытки по очереди: на розовой панели синие заметнее
  amountCards: [
    { amount: null,  design: 'pagoda' },
    { amount: 1000,  design: 'plum' },
    { amount: 3000,  design: 'sea' },
    { amount: 5000,  design: 'meadow' },
    { amount: 10000, design: 'family' },
    { amount: 25000, design: 'spb' }
  ]
};

const $ = (id) => document.getElementById(id);
const fmt = (n) => n.toLocaleString('ru-RU').replace(/ | /g, ' ') + ' ₽';
const findIn = (list, id, fallback) => list.find((d) => d.id === id) || list.find((d) => d.id === fallback);
const findDesign = (id) => findIn(CONFIG.designs, id, CONFIG.defaultDesign);
const findTicket = (id) => findIn(CONFIG.tickets, id, CONFIG.defaultTicket);
const untilText = (d) => d.toLocaleDateString('ru-RU');

// Первый экран: лицевая сторона билета поверх оборота
function mountHero() {
  const d = findTicket(CONFIG.defaultTicket);
  const until = new Date();
  until.setMonth(until.getMonth() + CONFIG.validityMonths);
  const f = { amount: fmt(10000), to: 'Маша', from: 'Петя', msg: 'Пусть впереди будет много хороших поездок!', till: untilText(until) };
  tkMount($('heroBack'), 'back', d); tkFill($('heroBack'), f);
  tkMount($('heroFront'), 'front', d); tkFill($('heroFront'), f);
}

// Плитка «Кому подарить» — маленький билет: сверху получатель и иконка транспорта, как на корешке сертификата,
// ниже линии отрыва талон с коротким текстом и стрелкой
function fillGiftCard(el, c) {
  el.className = 'gift';
  el.setAttribute('aria-label', c.title + '. ' + c.text);
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
  // Без суммы: на красном стикере «Любая сумма», на лаймовом «от 500 ₽»
  const text = c.amount ? fmt(c.amount) : 'от ' + fmt(CONFIG.minAmount);
  el.className = 'sum';
  el.setAttribute('aria-label', c.amount ? 'Сертификат на ' + text : 'Сертификат на любую сумму ' + text);
  el.innerHTML = '<span class="tk-box"></span>';
  const d = findDesign(c.design);
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
