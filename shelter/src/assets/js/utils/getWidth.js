export const getWidth = () => {
  const body = document.querySelector('body');

  const windowW = window.innerWidth;
  const { width: bodyWidth } = body.getBoundingClientRect();

  const scrollWidth = windowW - bodyWidth;
  return { bodyWidth, scrollWidth };
};
