import pets from '../layout/pets';
import controlButtons from '../layout/button-pagination';
import { createElement } from '../utils/createElement';
import { Modal } from './Modal';
import { Pet } from './Pet';
import { getRandom } from '../utils/getRandom';

const modal = new Modal().init();

export class Pagination {
  constructor({ classNames }) {
    this.content = createElement({
      classNames: 'pagination__content',
    });
    this.control = createElement({
      classNames: 'pagination__control',
    });
    this.container = createElement({
      classNames: `pagination__container ${classNames}`,
    });
  }

  init() {
    this.generateCards();
    this.updateConfig();
    this.renderCards(this.pagination.current - 1, this.pagination.step);
    this.renderControlBtns();
    this.handlerControlBtns();

    this.container.append(this.content);
    this.container.append(this.control);
    return this;
  }

  renderControlBtns() {
    const current = createElement({
      tagName: 'button',
      classNames: 'control active control__current',
      child: [`${this.pagination.current}`],
    });
    this.control.append(current);

    this.controlBtns = Object.keys(controlButtons).map((button) => {
      return createElement({
        tagName: 'button',
        classNames: `control control__${button}`,
        child: controlButtons[button],
        attributes: [['pagination', button]],
      });
    });
    Object.keys(controlButtons).forEach((button) => {
      const $controlBtn = createElement({
        tagName: 'button',
        classNames: `control control__${button}`,
        child: controlButtons[button],
        attributes: [['pagination', button]],
      });
      this.control.append($controlBtn);
    });
  }

  updateControlBtns() {
    for (let button of this.control.children) {
      const paginationAttr = button.getAttribute('pagination');
      if (this.pagination.current === 1) {
        if (paginationAttr === 'first' || paginationAttr === 'prev') {
          button.classList.add('disabled');
          button.setAttribute('disabled', 'disabled');
        }
      }
    }
  }

  renderCards(start, end) {
    this.petCards.splice(start, end).forEach((item, idx) => {
      const pet = new Pet(item);
      pet.container.addEventListener('click', (e) => {
        e.preventDefault();
        modal.open(new Pet(item).container);
      });
      this.content.append(pet.container);
    });
  }

  generateCards() {
    this.petCards = [];
    for (let i = 0; i < 6; i++) {
      const usedNums = [];
      const usedCards = [];

      while (usedCards.length < 8) {
        let cardNum = getRandom();
        while (usedNums.includes(cardNum) && usedCards.length < 8) {
          cardNum = getRandom();
        }
        usedNums.push(cardNum);
        usedCards.push(pets[cardNum]);
      }

      this.petCards = [...this.petCards, ...usedCards];
    }
  }

  updateConfig() {
    const cardsLength = this.petCards.length;
    const step = 8; // by window width
    this.pagination = {
      current: 1,
      step,
      pages: Math.ceil(cardsLength / step),
    };
  }

  handlerControlBtns() {
    this.control.addEventListener('click', (e) => {
      e.preventDefault();

      if (
        e.target.classList.contains('control') &&
        e.target.hasAttribute('pagination')
      ) {
        console.log(e.target.getAttribute('pagination'));
      }
    });

    this.updateControlBtns();
  }
}
