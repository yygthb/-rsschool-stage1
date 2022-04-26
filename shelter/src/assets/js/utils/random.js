export const generateRandomNum = (min = 0, max = 7) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const shakeArray = (arr) => {
  const res = [];
  const usedIds = [];

  while (usedIds.length < arr.length) {
    let randomId = generateRandomNum(0, arr.length - 1);

    while (usedIds.includes(randomId)) {
      randomId = generateRandomNum(0, arr.length - 1);
    }
    usedIds.push(randomId);
    res.push(arr[randomId]);
  }

  return res;
};
