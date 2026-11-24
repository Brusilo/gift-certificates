// Подарочный билет Туту: лицевая сторона и оборот, как в макете для печати.
// Вариант оформления берётся из CONFIG.designs, тексты подставляются через tkFill.
const TK = 'assets/ticket/';
const TK_BERRY = '#A181FF';
const TK_BLUEBERRY = '#011F90';
// Фигуры в мм от левого верхнего угла основной части 165 × 99 мм
const TK_STEP = 'M96 0 H165 V68 Q165 74 159 74 H112 Q106 74 107.6 68.2 L117.3 36 Q119 30 113 30 H93 Q87 30 88.6 24.2 L96 0 Z';
const TK_STEP_UP = TK_STEP.replace('M96 0 H165', 'M96.92 -3 H165'); // заходит за край билета на 3 мм
const TK_LOW = 'M-3 71 H63 Q67 71 65.9 74.84 L65.4 76.66 Q64.3 80.5 68.3 80.5 H90 Q95 80.5 93.6 85.3 L88.8 102 H-3 Z';
const TK_CARD = 'M7.70,9.13 Q10.32,0.00 19.82,0.00 L45.80,0.00 Q51.20,0.00 49.71,5.19 L43.50,26.87 Q40.88,36.00 31.38,36.00 L5.40,36.00 Q0.00,36.00 1.49,30.81 Z';
let tkUid = 0;

function tkArt(d) {
  let art = '';
  if (d.blob) art += `<div class="tk-art tk-blob" style="background-image:url('${TK + d.blob}')"></div>`;
  // Фото открытки для письма: обычный кадр, форму даёт маска большой формы
  if (d.photo) art += `<div class="tk-art tk-blob" style="background-image:url('${d.photo}')"></div>`;
  if (d.stepPhoto) {
    const id = 'tkc' + (++tkUid);
    const [x, y, w, h] = d.ix || [70, 0, 95, 74];
    art += `<svg class="tk-art tk-photo" viewBox="0 0 165 99" preserveAspectRatio="none" aria-hidden="true"><defs><clipPath id="${id}"><path d="${TK_STEP}"/></clipPath></defs>`
      + `<image href="${TK + d.stepPhoto}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMinYMid slice" clip-path="url(#${id})"/></svg>`;
  }
  if (d.step || d.low) {
    art += '<svg class="tk-art tk-shapes" viewBox="0 -3 165 105" preserveAspectRatio="none" aria-hidden="true">'
      + (d.step ? `<path fill="${d.step}" d="${TK_STEP_UP}"/>` : '')
      + (d.low ? `<path fill="${d.low}" d="${TK_LOW}"/>` : '') + '</svg>';
  }
  if (d.suit) art += `<img class="tk-art tk-suit" src="${TK}suitcase.webp" alt="">`;
  if (d.art3d) art += `<img class="tk-art tk-3d" src="${d.art3d}" alt="">`;
  return art;
}

// «Кому» и «От кого» внизу. На фото подпись непрозрачная и с тенью, на светлой ступеньке синяя
function tkWho(d) {
  const cls = ['tk-who', d.blob || d.photo ? 'solid' : '', d.low && d.low.toUpperCase() !== TK_BLUEBERRY ? 'lowl' : ''].join(' ').trim();
  return `<div class="${cls}"><div class="l"><span class="tk-lab">Кому</span><b class="tk-val" data-f="to" data-fit="9"></b></div><div class="r"><span class="tk-lab">От&nbsp;кого</span><b class="tk-val" data-f="from" data-fit="9"></b></div></div>`;
}

const tkLogo = (d) => `<img class="tk-logo" src="${TK}${[TK_BLUEBERRY, '#5F17C5'].includes(d.main.toUpperCase()) ? 'lg-on-navy.svg' : 'lg-on-violet.svg'}" alt="Туту">`;

// Открытка для письма: та же основная часть билета, на красном стикере «Сертификат», на лаймовом сумма
function tkCardHtml(d) {
  return `<div class="tk tk-card" style="--main:${d.main}">
<div class="tk-main">${tkArt(d)}${tkLogo(d)}
<div class="tk-stks"><span class="tk-stk tk-stk-w" data-fit="13.8" data-max="92">${d.sticker || 'Сертификат'}</span><span class="tk-stk tk-stk-s" data-f="amount" data-fit="20.9" data-max="100"></span></div>
${tkWho(d)}
</div></div>`;
}

function tkFrontHtml(d) {
  const icon = (f, cap, cls = '') => `<div class="tk-icon"><i><img class="${cls}" src="${TK}ic-${f}-w.svg" alt=""></i><span>${cap}</span></div>`;
  return `<div class="tk tk-front" style="--main:${d.main};--stub:${d.stub}">
<div class="tk-main">${tkArt(d)}${tkLogo(d)}
<div class="tk-stks"><span class="tk-stk tk-stk-w" data-fit="13.8" data-max="92">${d.sticker || 'Сертификат'}</span><span class="tk-stk tk-stk-s" data-f="amount" data-fit="20.9" data-max="100"></span></div>
${tkWho(d)}
</div>
<div class="tk-perf"></div>
<div class="tk-stub"><div class="tk-tt">Билет<br>к&nbsp;мечте</div>
<div class="tk-icons">${icon('train', 'Поезда')}${icon('plane', 'Самолёты', 'pl')}${icon('bus', 'Автобусы')}${icon('bed', 'Отели', 'bd')}</div>
<div class="tk-any">Любое направление<br>и&nbsp;любые даты</div></div>
</div>`;
}

function tkBackHtml(d) {
  const card = `<svg viewBox="0 0 51.2 36" preserveAspectRatio="none" aria-hidden="true"><path fill="${TK_BERRY}" d="${TK_CARD}"/></svg>`;
  return `<div class="tk tk-back" style="--stub:${d.stub}">
<div class="tk-stub">
<div class="tk-qbox"><div class="tk-qr"><img src="${TK}qr.svg" alt="QR-код"></div><div class="tk-qcap">Подробные условия использования сертификата</div></div>
<div class="tk-sup"><b>Поддержка 24/7</b>в&nbsp;чате на&nbsp;tutu.ru<br>и&nbsp;в&nbsp;приложении Туту</div>
</div>
<div class="tk-perf"></div>
<div class="tk-main">
<div class="tk-wish"><p class="tk-msg" data-f="msg"></p></div>
<div class="tk-info">
<div class="tk-steps"><img class="tk-arr" src="${TK}arrow-navy.svg" style="left:33.5%" alt=""><img class="tk-arr" src="${TK}arrow-navy.svg" style="left:66.5%" alt="">
<div class="tk-step">${card}<span class="tk-n">1</span><p>Выберите билеты<br>или отель<br>на&nbsp;Туту</p></div>
<div class="tk-step">${card}<span class="tk-n">2</span><p>При оплате<br>введите код<br>сертификата</p></div>
<div class="tk-step">${card}<span class="tk-n">3</span><p>Заказ дороже&nbsp;–<br>доплатите картой,<br>дешевле&nbsp;–<br>отправим<br>сертификат<br>на&nbsp;остаток</p></div>
</div>
<div class="tk-code"><div class="tk-code-l"><span>Код сертификата</span><span class="tk-till" data-f="till"></span></div><b class="tk-code-c">XXXX-XXXX-XXXX-XXXX-XXXX</b></div>
</div>
</div>
</div>`;
}

// Рисует сторону билета в обёртке .tk-box. Пересобирает разметку, только если сменился вариант оформления.
// Билет в скрытом блоке не измерить, поэтому имена подгоняем ещё раз, когда он появляется или меняет размер
const tkObserver = new ResizeObserver((entries) => entries.forEach((e) => tkFit(e.target)));
function tkMount(box, side, d) {
  if (!box.dataset.tkObserved) { tkObserver.observe(box); box.dataset.tkObserved = '1'; }
  const key = side + ':' + d.id;
  if (box.dataset.tk === key) return;
  box.dataset.tk = key;
  box.innerHTML = side === 'back' ? tkBackHtml(d) : side === 'card' ? tkCardHtml(d) : tkFrontHtml(d);
}

// Тексты билета. Пустое поле показывает подсказку бледнее, длинное имя уменьшается, чтобы влезть.
function tkFill(box, f) {
  const set = (name, value, placeholder) => {
    const el = box.querySelector(`[data-f="${name}"]`);
    if (!el) return;
    el.textContent = value || placeholder || '';
    el.classList.toggle('is-empty', !value && !!placeholder);
  };
  set('amount', f.amount);
  set('to', f.to, 'Получатель');
  set('from', f.from, 'Ваше имя');
  // На обороте только поздравление: имя получателя и дарителя уже есть на лицевой стороне.
  // Без поздравления там крупно «Подарок на поездку»
  const msg = box.querySelector('[data-f="msg"]');
  if (msg) {
    msg.textContent = (f.msg || '').trim() || 'Пусть впереди будет много отличных путешествий!';
    msg.classList.toggle('is-default', !(f.msg || '').trim());
  }
  set('till', f.till ? 'Действует до ' + f.till : '');
  tkFit(box);
}

// Длинный текст уменьшаем до ширины поля, у стикера с поводом — до data-max мм
function tkFit(box) {
  const tk = box.querySelector('.tk');
  if (!tk) return;
  const mmPx = tk.offsetWidth / (tk.classList.contains('tk-card') ? 165 : 215);
  box.querySelectorAll('[data-fit]').forEach((el) => {
    const base = +el.dataset.fit;
    el.style.fontSize = '';
    const room = el.dataset.max ? +el.dataset.max * mmPx : el.clientWidth;
    const need = el.dataset.max ? el.offsetWidth : el.scrollWidth;
    if (!room || need <= room) return;
    const k = Math.max(0.45, room / need * 0.98);
    el.style.fontSize = `calc(${(base * k).toFixed(2)} * var(--mm))`;
  });
  tkFitWish(box, mmPx);
  tkOverhang(box, mmPx);
}

// Стикер с суммой всегда выступает правее «Сертификата» на 6 мм. Короткая сумма не дотягивает,
// тогда плашка удлиняется, а текст встаёт по центру
function tkOverhang(box, mmPx) {
  const red = box.querySelector('.tk-stk-w'), lime = box.querySelector('.tk-stk-s');
  if (!red || !lime || !red.offsetWidth) return;
  lime.style.minWidth = '';
  const need = red.offsetLeft + red.offsetWidth + 6 * mmPx - lime.offsetLeft;
  if (lime.offsetWidth < need) lime.style.minWidth = `calc(${(need / mmPx).toFixed(2)} * var(--mm))`;
}

// Поздравление на обороте: самый крупный размер до 9 мм, при котором текст помещается в верхнюю зону и не больше 4 строк
function tkFitWish(box, mmPx) {
  const zone = box.querySelector('.tk-wish'), el = box.querySelector('.tk-wish .tk-msg');
  if (!zone || !el || !zone.clientHeight) return;
  const room = zone.clientHeight - 2 * mmPx;
  const lh = el.classList.contains('is-default') ? 1.1 : 1.18;
  for (let fs = 9; fs >= 5; fs -= 0.2) {
    el.style.fontSize = `calc(${fs.toFixed(1)} * var(--mm))`;
    const lines = Math.round((el.offsetHeight - 1.4 * mmPx) / (fs * mmPx * lh));
    if (el.offsetHeight <= room && lines <= 4) break;
  }
}

// Шрифты догружаются позже разметки, после них ширина имён меняется
document.fonts && document.fonts.ready.then(() => document.querySelectorAll('.tk-box').forEach(tkFit));
