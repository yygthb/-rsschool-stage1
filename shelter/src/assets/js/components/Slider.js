import pets from '../layout/pets';
import controlButtons from '../layout/button-slider';
import { createElement } from '../utils/createElement';
import { getRandom } from '../utils/getRandom';
import { Pet } from './Pet';

const ANIMATION_SPEED = 300;

export class Slider {
  constructor({ sliderClassNames }) {
    this.cardsToRender = [];

    this.controls = [];
    this.sliderContainer = createElement({
      classNames: 'slider__container',
    });

    this.container = createElement({
      classNames: `slider ${sliderClassNames}`,
    });
  }

  init() {
    this.getControls();
    this.controls.forEach((control) => this.container.append(control));

    this.renderCards();

    this.container.append(this.sliderContainer);
    return this;
  }

  getControls() {
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
      this.controls.push($controlBtn);
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
        const $petCard = new Pet(pets[idx]).container;
        this.sliderContainer.append($petCard);
      });
    }, ANIMATION_SPEED);
  }
}
