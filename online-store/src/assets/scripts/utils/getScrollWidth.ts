export const getScrollWidth = (): number => {
  const body = document.querySelector('body');

  const windowW = window.innerWidth;
  if (body) {
    const { width: bodyWidth } = body.getBoundingClientRect();
    const scrollWidth = windowW - bodyWidth;

    return scrollWidth;
  }

  return 0;
};
