import pets from '../layout/pets';
import controlButtons from '../layout/button-pagination';
import { createElement } from '../utils/createElement';
import { Modal } from './Modal';
import { Pet } from './Pet';

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
    this.renderCards();
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

  renderCards() {
    [...Array(8).keys()].forEach((item, idx) => {
      const pet = new Pet(pets[idx]);
      pet.container.addEventListener('click', (e) => {
        e.preventDefault();
        modal.open(new Pet(pets[idx]).container);
      });
      this.content.append(pet.container);
    });
  }
}
