import { createElement } from '../utils/createElement.js';

const petCard = (pet) => {
  const petImg = createElement({
    tagName: 'img',
    classNames: 'pet__img',
    attributes: [
      ['src', pet.img],
      ['alt', 'pet photo'],
    ],
  });
  const imgWrap = createElement({
    tagName: 'figure',
    classNames: 'pet__img-wrapper',
    child: [petImg],
  });
  const petName = createElement({
    tagName: 'h4',
    classNames: 'pet__name',
    child: pet.name,
  });
  const button = createElement({
    tagName: 'button',
    classNames: 'button secondary',
    child: 'Learn more',
  });

  const card = createElement({
    classNames: 'slider__item pet-card',
    child: [imgWrap, petName, button],
  });
  return card;
};

export class Pet {
  constructor(pet) {
    this.name = pet.name;
    this.img = pet.img;
    this.type = pet.type;
    this.breed = pet.breed;
    this.description = pet.description;
    this.age = pet.age;
    this.inoculations = pet.inoculations;
    this.diseases = pet.diseases;
    this.parasites = pet.parasites;

    this.container = petCard(pet);
  }
}
