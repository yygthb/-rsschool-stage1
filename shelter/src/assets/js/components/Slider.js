import pets from '../layout/pets';
import controlButtons from '../layout/button-slider';
import { createElement } from '../utils/createElement';
import { getRandom } from '../utils/getRandom';
import { Pet } from './Pet';
import { Modal } from './Modal';

const ANIMATION_SPEED = 300;

const modal = new Modal().init();

export class Slider {
  constructor({ sliderClassNames }) {
    this.cardsToRender = [];

    this.sliderContainer = createElement({
      classNames: 'slider__container',
    });

    this.container = createElement({
      classNames: `slider ${sliderClassNames}`,
    });
  }

  init() {
    this.renderControls();
    this.renderCards();

    this.container.append(this.sliderContainer);
    return this;
  }

  renderControls() {
    Object.keys(controlButtons).forEach((button) => {
      const $controlBtn = createElement({
        tagName: 'button',
        classNames: `control slider__control slider__control-${button}`,
        child: controlButtons[button],
      });
      $controlBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.renderCards();
      });
      this.container.append($controlBtn);
    });
  }

  renderCards() {
    const prev = [...this.cardsToRender];
    this.cardsToRender = [];
    this.sliderContainer.classList.add('hide');

    setTimeout(() => {
      this.sliderContainer.innerHTML = '';
      this.sliderContainer.classList.remove('hide');

      while (this.cardsToRender.length < 3) {
        let petNum = getRandom();
        while (this.cardsToRender.includes(petNum) || prev.includes(petNum)) {
          petNum = getRandom();
        }
        this.cardsToRender.push(petNum);
      }

      this.cardsToRender.forEach((idx) => {
        const pet = new Pet(pets[idx]);
        pet.container.addEventListener('click', (e) => {
          e.preventDefault();
          modal.open(new Pet(pets[idx]).container);
        });
        this.sliderContainer.append(pet.container);
      });
    }, ANIMATION_SPEED);
  }
}
