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
    this.renderCards(0);
    this.renderControlBtns();

    this.container.append(this.content);
    this.container.append(this.control);
    return this;
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

  renderCards(start) {
    this.content.innerHTML = '';
    this.petCards.slice(start, start + 8).forEach((item, idx) => {
      const pet = new Pet(item);
      pet.container.addEventListener('click', (e) => {
        e.preventDefault();
        modal.open(new Pet(item).container);
      });
      this.content.append(pet.container);
    });
  }

  renderControlBtns() {
    this.current = createElement({
      tagName: 'button',
      classNames: 'control active control__current',
      child: [`${this.pagination.current}`],
    });
    this.control.append(this.current);

    const controlBtns = Object.keys(controlButtons).map((button) => {
      return createElement({
        tagName: 'button',
        classNames: `control control__${button}`,
        child: controlButtons[button],
        attributes: [['pagination', button]],
      });
    });

    for (let btn of controlBtns) {
      btn.addEventListener('click', (e) => {
        this.handlerControlBtns(e);
      });
      this.control.append(btn);
    }

    this.updateControlBtnStyles();
  }

  updateControlBtnStyles() {
    for (let button of this.control.children) {
      const paginationAttr = button.getAttribute('pagination');
      if (this.pagination.current === 1) {
        button.classList.remove('disabled');
        button.removeAttribute('disabled');
        if (paginationAttr === 'first' || paginationAttr === 'prev') {
          button.classList.add('disabled');
          button.setAttribute('disabled', 'disabled');
        }
      } else if (this.pagination.current === this.pagination.pages) {
        button.classList.remove('disabled');
        button.removeAttribute('disabled');
        if (paginationAttr === 'next' || paginationAttr === 'last') {
          button.classList.add('disabled');
          button.setAttribute('disabled', 'disabled');
        }
      } else {
        button.classList.remove('disabled');
        button.removeAttribute('disabled');
      }
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

  handlerControlBtns(e) {
    e.preventDefault();

    const t = e.currentTarget;

    if (t.classList.contains('control') && t.hasAttribute('pagination')) {
      const paginationAction = t.getAttribute('pagination');

      if (paginationAction === 'next') {
        this.pagination.current++;
        this.changePage();
      }

      if (paginationAction === 'last') {
        this.pagination.current = this.pagination.pages;
        this.changePage();
      }

      if (paginationAction === 'prev') {
        this.pagination.current--;
        this.changePage();
      }

      if (paginationAction === 'first') {
        this.pagination.current = 1;
        this.changePage();
      }
    }
  }

  changePage() {
    this.current.textContent = this.pagination.current;
    this.renderCards((this.pagination.current - 1) * this.pagination.step);
    this.updateControlBtnStyles();
  }
}
