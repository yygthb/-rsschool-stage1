export const getRandom = (min = 0, max = 7) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};
