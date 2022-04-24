import pets from '../layout/pets';
import controlButtons from '../layout/button-pagination';
import { createElement } from '../utils/createElement';
import { Modal } from './Modal';
import { Pet } from './Pet';
import { getRandom } from '../utils/getRandom';
import { getWidth } from '../utils/getWidth';

const ANIMATION_SPEED = 300;

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
    this.config();
    this.renderCards(0);
    this.renderControlBtns();

    this.container.append(this.content);
    this.container.append(this.control);
    return this;
  }

  config() {
    const cardsLength = 48;
    let step = 8; // desktop

    const { bodyWidth } = getWidth();
    if (bodyWidth < 1280) {
      step = 6;

      if (bodyWidth < 768) {
        step = 3;
      }
    }

    this.pagination = {
      current: 1,
      step,
      pages: Math.ceil(cardsLength / step),
    };

    this.generateCards(this.pagination.step, this.pagination.pages);
  }

  generateCards(step, pages) {
    this.petCards = [];
    for (let i = 0; i < pages; i++) {
      const usedNums = [];
      const usedCards = [];

      while (usedCards.length < step) {
        let cardNum = getRandom();
        while (usedNums.includes(cardNum) && usedCards.length < step) {
          cardNum = getRandom();
        }
        usedNums.push(cardNum);
        usedCards.push(pets[cardNum]);
      }

      this.petCards = [...this.petCards, ...usedCards];
    }
  }

  renderCards(start) {
    this.content.classList.add('hide');

    setTimeout(() => {
      this.content.innerHTML = '';
      this.content.classList.remove('hide');

      this.petCards.slice(start, start + 8).forEach((item, idx) => {
        const pet = new Pet(item);
        pet.container.addEventListener('click', (e) => {
          e.preventDefault();
          modal.open(new Pet(item).container);
        });
        this.content.append(pet.container);
      });
    }, ANIMATION_SPEED);
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
