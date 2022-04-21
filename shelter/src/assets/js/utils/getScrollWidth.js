export const getScrollWidth = () => {
  const body = document.querySelector('body');

  const windowW = window.innerWidth;
  const { width: bodyW } = body.getBoundingClientRect();

  const scrollW = windowW - bodyW;
  return scrollW;
};
