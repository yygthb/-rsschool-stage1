const body = document.querySelector('body');
const header = document.querySelector('.header-container');

if (header) {
  const burger = header.querySelector('.burger');
  const menuContainer = header.querySelector('.header-nav');
  let isBurgerOpened = false;

  burger.onclick = burgerOpen;

  menuContainer.onclick = burgerClose;

  function burgerOpen(e) {
    if (!isBurgerOpened) {
      isBurgerOpened = true;
      menuContainer.classList.add('open');
      burger.classList.add('open');
      body.classList.add('lock');

      if (burger.closest('body.index')) {
        const scrollToTop = window.scrollY;
        burger.style.top = `${scrollToTop + 40}px`;
      }
    } else {
      burgerClose(e);
    }
  }

  function burgerClose(e) {
    if (
      e.target.dataset.close === 'mobile-menu' ||
      e.currentTarget === burger
    ) {
      isBurgerOpened = false;
      menuContainer.classList.remove('open');
      burger.classList.remove('open');
      body.classList.remove('lock');

      if (burger.closest('body.index')) {
        burger.style.top = 0;
      }
    }
  }
}
