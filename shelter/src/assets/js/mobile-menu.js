const body = document.querySelector('body');
const header = document.querySelector('.header-container');

if (header) {
  const burger = header.querySelector('.burger');
  const menuContainer = header.querySelector('.header-nav');

  burger.onclick = () => {
    console.log('click on burger');
    menuContainer.classList.toggle('open');
    burger.classList.toggle('open');
    body.classList.toggle('lock');
  };

  menuContainer.onclick = (e) => {
    if (e.target.dataset.close === 'mobile-menu') {
      menuContainer.classList.remove('open');
      burger.classList.remove('open');
      body.classList.remove('lock');
    }
  };
}
