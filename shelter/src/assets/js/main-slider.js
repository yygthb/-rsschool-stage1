import { Slider } from './components/Slider';

const pets = document.querySelector('.rs-slider');

const slider = new Slider().init({
  sliderClassNames: 'pets__slider',
});

pets.append(slider.container);
