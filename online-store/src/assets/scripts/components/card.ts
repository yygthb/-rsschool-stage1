import { INodeProps, NodeElement } from '../utils/nodeElement';

export interface IStoreCard {
  id: string;
  model: string;
  price: string;
  display: {
    diagonal: string;
    resolution: string;
  };
}

export class StoreCard extends NodeElement {
  private _id: string = '';

  set id(val: string) {
    this._id = val;
  }

  get id() {
    return this._id;
  }

  constructor(nodeProps: INodeProps, data: IStoreCard) {
    super(nodeProps);

    this.render(data);
  }

  render({ id, model, price }: IStoreCard) {
    this.id = id;

    new NodeElement({
      parentNode: this.node,
      tagName: 'h3',
      classNames: 'item__model',
      content: model,
    });

    new NodeElement({
      parentNode: this.node,
      tagName: 'p',
      classNames: 'item__price',
      content: price,
    });
  }
}
