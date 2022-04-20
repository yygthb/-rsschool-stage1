import { createElement } from '../utils/createElement.js';

function createPetCard(pet) {
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
  const petBreed = createElement({
    tagName: 'p',
    classNames: 'pet__breed',
    child: `${pet.type} - ${pet.breed}`,
  });
  const petDescr = createElement({
    tagName: 'p',
    classNames: 'pet__description',
    child: pet.description,
  });
  const petInfo = createElement({
    tagName: 'ul',
    classNames: 'pet__info',
    child: [
      createElement({
        tagName: 'li',
        child: createInfoItem('age', pet.age),
      }),
      ...Object.entries(pet.info).map(([key, value]) => {
        return createElement({
          tagName: 'li',
          child: createInfoItem(key, value),
        });
      }),
    ],
  });
  const petText = createElement({
    classNames: 'pet__text',
    child: [petName, petBreed, petDescr, petInfo],
  });
  const button = createElement({
    tagName: 'button',
    classNames: 'button secondary',
    child: 'Learn more',
  });

  const card = createElement({
    classNames: 'slider__item pet-card',
    child: [imgWrap, petText, button],
  });
  return card;
}

function createInfoItem(key, value) {
  const keySpan = createElement({
    tagName: 'span',
    child: `${key}: `,
  });

  return typeof value === 'string'
    ? [keySpan, value]
    : [keySpan, value.join(', ')];
}

export class Pet {
  constructor(pet) {
    this.name = pet.name;
    this.img = pet.img;
    this.type = pet.type;
    this.breed = pet.breed;
    this.description = pet.description;
    this.age = pet.age;
    this.info = pet.info;

    this.container = createPetCard(pet);
  }
}
