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
    this.renderCards(0, 8);
    this.renderControls();

    this.container.append(this.content);
    this.container.append(this.control);
    return this;
  }

  renderControls() {
    Object.keys(controlButtons).forEach((button) => {
      const $controlBtn = createElement({
        tagName: 'button',
        classNames: 'control',
        child: controlButtons[button],
      });
      this.control.append($controlBtn);
    });
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
}
