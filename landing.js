// Общее для лендингов A и B: билет в первом экране и карточки «Кому подарить»
mountHero();

// «Кому подарить»: карточки только рассказывают, кому подойдет подарок, и не кликаются
// На телефоне видна одна карточка и половина следующей, поэтому первыми самые частые поводы:
// любителям путешествий, к празднику, родителям, тем, кто живет далеко. На компьютере порядок как в CONFIG
const phoneOrder = ['Любителям путешествий', 'К празднику', 'Родителям', 'Тем, кто живет далеко'];
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
