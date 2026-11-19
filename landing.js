// Общее для лендингов A и B: билет в первом экране и карточки «Кому подарить»
mountHero();

// «Кому подарить»: карточки только рассказывают, кому подойдет подарок, и не кликаются
CONFIG.giftCards.forEach((c) => {
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
