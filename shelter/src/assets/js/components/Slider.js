import pets from '../layout/pets';
import controlButtons from '../layout/button-slider';
import { createElement } from '../utils/createElement';
import { getRandom } from '../utils/getRandom';
import { Pet } from './Pet';
import { Modal } from './Modal';

const modal = new Modal().init();

export class Slider {
  constructor() {
    this.boundFunction = this.animationendEventHandler.bind(this);
  }

  init({ sliderClassNames }) {
    this.currentCardNums = [];
    this.nextCardNums = [];

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
    this.sliderCurrent = createElement({
      classNames: 'slider__item slider__item-current',
    });
    this.generateCards(this.sliderCurrent);

    this.sliderPrev = createElement({
      classNames: 'slider__item slider__item-prev',
    });
    this.generateCards(this.sliderPrev);

    this.sliderNext = createElement({
      classNames: 'slider__item slider__item-next',
    });
    this.generateCards(this.sliderNext, this.nextCardNums);

    this.sliderContainer.append(
      this.sliderPrev,
      this.sliderCurrent,
      this.sliderNext
    );
  }

  generateCards(sliderNode, arr) {
    sliderNode.innerHTML = '';
    const reservedCards = [...this.currentCardNums];
    this.currentCardNums = [];

    if (!arr || !(Array.isArray(arr) && arr.length)) {
      for (let i = 0; i < 3; i++) {
        while (this.currentCardNums.length < 3) {
          let petNum = getRandom();
          while (
            this.currentCardNums.includes(petNum) ||
            reservedCards.includes(petNum)
          ) {
            petNum = getRandom();
          }
          this.currentCardNums.push(petNum);
          reservedCards.push(petNum);
          const pet = new Pet(pets[petNum]);
          pet.container.addEventListener('click', (e) => {
            e.preventDefault();
            modal.open(new Pet(pets[petNum]).container);
          });
          sliderNode.append(pet.container);
        }
      }
      this.nextCardNums = [...this.currentCardNums];
    } else {
      for (let item of arr) {
        const pet = new Pet(pets[item]);
        pet.container.addEventListener('click', (e) => {
          e.preventDefault();
          modal.open(new Pet(pets[item]).container);
        });
        sliderNode.append(pet.container);
      }
    }
  }

  swipe(e) {
    if (e.currentTarget.classList.contains('slider__control-prev')) {
      this.controls.forEach((control) => {
        control.classList.add('disabled');
      });
      this.sliderContainer.classList.add('swipe-left');
      this.sliderContainer.addEventListener('animationend', this.boundFunction);
    }

    if (e.currentTarget.classList.contains('slider__control-next')) {
      this.controls.forEach((control) => {
        control.classList.add('disabled');
      });
      this.sliderContainer.classList.add('swipe-right');
      this.sliderContainer.addEventListener('animationend', this.boundFunction);
    }
  }

  animationendEventHandler() {
    // console.log('animationend');
    this.sliderContainer.classList.remove('swipe-left');
    this.sliderContainer.classList.remove('swipe-right');
    this.controls.forEach((control) => {
      control.classList.remove('disabled');
    });

    // update sliderCurrent
    this.sliderCurrent.innerHTML = '';
    for (let item of this.nextCardNums) {
      const pet = new Pet(pets[item]);
      pet.container.addEventListener('click', (e) => {
        e.preventDefault();
        modal.open(new Pet(pets[item]).container);
      });
      this.sliderCurrent.append(pet.container);
    }
    this.currentCardNums = [...this.nextCardNums];

    // generate new random cards
    this.generateCards(this.sliderPrev);
    console.log('nextCardNums: ', this.nextCardNums);
    this.generateCards(this.sliderNext, this.nextCardNums);
  }
}
