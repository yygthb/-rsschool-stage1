import pets from '../layout/pets';
import controlButtons from '../layout/button-slider';
import { createElement } from '../utils/createElement';
import { getRandom } from '../utils/getRandom';
import { Pet } from './Pet';
import { Modal } from './Modal';

const ANIMATION_SPEED = 300;

const modal = new Modal().init();

export class Slider {
  constructor() {
    this.cardsToRender = [];
  }

  init({ sliderClassNames }) {
    this.sliderContainer = createElement({
      classNames: 'slider__container',
    });
    this.wrap = createElement({
      classNames: 'slider__wrap',
    });

    this.container = createElement({
      classNames: `slider ${sliderClassNames}`,
    });

    this.renderCards();
    this.renderControls();

    this.wrap.append(this.sliderContainer);
    this.container.append(this.wrap);
    return this;
  }

  renderControls() {
    this.controls = [];
    Object.keys(controlButtons).forEach((button) => {
      const $controlBtn = createElement({
        tagName: 'button',
        classNames: `control slider__control slider__control-${button}`,
        child: controlButtons[button],
      });
      this.controls.push($controlBtn);
      this.container.append($controlBtn);
    });

    this.controls.forEach((control) => {
      control.addEventListener('click', this.swipe.bind(this));
    });
  }

  renderCards() {
    this.sliderPrev = createElement({
      classNames: 'slider__item slider__item-prev',
    });
    for (let i = 0; i < 3; i++) {
      this.sliderPrev.append(new Pet(pets[1]).container);
    }

    this.sliderCurrent = createElement({
      classNames: 'slider__item slider__item-current',
    });
    for (let i = 0; i < 3; i++) {
      this.sliderCurrent.append(new Pet(pets[0]).container);
    }

    this.sliderNext = createElement({
      classNames: 'slider__item slider__item-current',
    });
    for (let i = 0; i < 3; i++) {
      this.sliderNext.append(new Pet(pets[2]).container);
    }

    this.sliderContainer.append(
      this.sliderPrev,
      this.sliderCurrent,
      this.sliderNext
    );
  }

  swipe(e) {
    if (e.currentTarget.classList.contains('slider__control-prev')) {
      console.log('swipe to prev');
      this.controls.forEach((control) => {
        control.classList.add('disabled');
      });
      this.sliderContainer.classList.add('swipe-left');
      this.sliderContainer.addEventListener('animationend', () => {
        this.sliderContainer.classList.remove('swipe-left');
        this.controls.forEach((control) => {
          control.classList.remove('disabled');
        });
        const prev = this.sliderPrev.innerHTML;
        this.sliderCurrent.innerHTML = prev;
      });
    }

    if (e.currentTarget.classList.contains('slider__control-next')) {
      console.log('swipe to next');
      this.controls.forEach((control) => {
        control.classList.add('disabled');
      });
      this.sliderContainer.classList.add('swipe-right');
      this.sliderContainer.addEventListener('animationend', () => {
        this.sliderContainer.classList.remove('swipe-right');
        this.controls.forEach((control) => {
          control.classList.remove('disabled');
          const next = this.sliderNext.innerHTML;
          this.sliderCurrent.innerHTML = next;
        });
      });
    }
  }
}
