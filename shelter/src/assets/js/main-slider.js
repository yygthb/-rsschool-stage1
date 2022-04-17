import { Slider } from './components/Slider';

const pets = document.querySelector('.pets__content');

const slider = new Slider({
  sliderClassNames: 'pets__slider class1 class2',
}).init();

pets.append(slider.container);
