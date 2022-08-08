const brands = [
  'AUDI',
  'BMW',
  'VW',
  'FORD',
  'VOLVO',
  'SKODA',
  'KIA',
  'LEXUS',
  'OPEL',
  'RENAULT',
  'NISSAN',
];

const models = [
  'Kalina',
  'Granta',
  'A8',
  'Mustang',
  'Creta',
  'Corolla',
  'Priora',
  'Highlander',
  'Santa Fe',
  'Solaris',
  'Polo',
  'Almera',
  'Vesta',
];

const colorCodeUnit = '0123456789abcdef';

const generateCarName = () => {
  const randBrand = brands[Math.floor(Math.random() * brands.length)];
  const randModel = models[Math.floor(Math.random() * models.length)];
  return [randBrand, randModel];
};

const generateCarColor = () => {
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += colorCodeUnit[Math.floor(Math.random() * colorCodeUnit.length)];
  }
  return color;
};

export default {
  generateCarName,
  generateCarColor,
};
