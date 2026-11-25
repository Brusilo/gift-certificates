// Общее для лендингов A и B: билет в первом экране и карточки «Кому подарить»
mountHero();

// «Кому подарить»: карточки только рассказывают, кому подойдет подарок, и не кликаются
// На телефоне видна одна карточка и половина следующей, поэтому первыми самые частые поводы:
// любителям путешествий, к празднику, родителям, тем, кто живет далеко. На компьютере порядок как в CONFIG
const phoneOrder = ['Любителям путешествий', 'Друзьям и коллегам', 'Родителям', 'Тем, кто живет далеко'];
const giftCards = matchMedia('(max-width:720px)').matches
  ? [...CONFIG.giftCards].sort((a, b) => phoneOrder.indexOf(a.title) - phoneOrder.indexOf(b.title))
  : CONFIG.giftCards;
giftCards.forEach((c) => {
  const d = document.createElement('div');
  fillGiftCard(d, c);
  $('giftRow').append(d);
});
makeRail($('giftRow'));

// Телефон: разделы страницы прячутся в меню под кнопкой в шапке, как на индийском лендинге
const topBar = document.querySelector('.top');
const menu = (open) => { topBar.classList.toggle('is-menu-open', open); $('menuBtn').setAttribute('aria-expanded', open); };
$('menuBtn').addEventListener('click', () => menu(!topBar.classList.contains('is-menu-open')));
$('topNav').addEventListener('click', (e) => { if (e.target.closest('a')) menu(false); });

// «Как подарить»: блок текста по ширине самой длинной строки, чтобы стоял ровно по центру фигуры,
// а строки внутри шли по левому краю. Пересчитываем при смене ширины и после загрузки шрифтов
function fitSteps() {
  document.querySelectorAll('.use-step h3').forEach((h) => {
    h.style.width = '';
    const r = document.createRange();
    r.selectNodeContents(h);
    h.style.width = Math.ceil(r.getBoundingClientRect().width) + 1 + 'px';
  });
}
fitSteps();
addEventListener('resize', fitSteps);
document.fonts && document.fonts.ready.then(fitSteps);
