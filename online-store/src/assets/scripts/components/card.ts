import { INodeProps, NodeElement } from '../utils/nodeElement';

export interface IMotoCard {
  id: string;
  brand: string;
  model: string;
  type: string;
  price: number;
  engine: {
    type: string;
    power: string;
  };
  color: string;
  condition: string;
}

export class StoreCard extends NodeElement {
  private _id: string = '';

  set id(val: string) {
    this._id = val;
  }

  get id() {
    return this._id;
  }

  constructor(nodeProps: INodeProps, data: IMotoCard) {
    super(nodeProps);

    this.render(data);
  }

  render({ id, brand, model, price, type }: IMotoCard) {
    this.id = id;

    const img = new NodeElement({
      parentNode: this.node,
      classNames: 'item__img',
    });
    img.node.style.backgroundImage = `url(assets/img/moto/${type}/${id}.webp)`;

    const info = new NodeElement({
      parentNode: this.node,
      classNames: 'item__info',
    });

    new NodeElement({
      parentNode: info.node,
      tagName: 'h3',
      classNames: 'item__title',
      content: `${brand} ${model}`,
    });

    new NodeElement({
      parentNode: info.node,
      tagName: 'p',
      classNames: 'item__price',
      content: price.toLocaleString(),
    });
  }
}
