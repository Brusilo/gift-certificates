// Общее для лендингов A и B: билет в первом экране и карточки «Кому подарить»
mountHero();

// «Кому подарить»: карточки только рассказывают, кому подойдет подарок, и не кликаются
CONFIG.giftCards.forEach((c) => {
  const d = document.createElement('div');
  fillGiftCard(d, c);
  $('giftRow').append(d);
});
makeRail($('giftRow'));
