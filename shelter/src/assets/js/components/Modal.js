import { createElement } from '../utils/createElement';
import { Pet } from './Pet';

const ANIMATION_SPEED = 300;

export class Modal {
  constructor() {}

  init() {
    this.container = createElement({
      classNames: 'overlay',
      parent: document.querySelector('body'),
      attributes: [['data-modal', 'close']],
    });

    this.container.addEventListener('click', this.close.bind(this));

    return this;
  }

  open(petData) {
    document.querySelector('body').classList.add('lock');
    this.container.classList.add('open');

    this.modal = createElement({
      classNames: 'modal',
    });

    const pet = new Pet(petData);
    this.modal.append(pet.container);
    this.container.append(this.modal);
  }

  close(e) {
    e.preventDefault();

    if (e.target.dataset.modal === 'close') {
      this.container.classList.remove('open');
      setTimeout(() => {
        this.container.textContent = '';
        document.querySelector('body').classList.remove('lock');
      }, ANIMATION_SPEED);
    }
  }
}
