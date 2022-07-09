import { NodeElement, INodeElement } from '../utils/nodeElement';
import { IStoreCard, StoreCard } from './card';

export class StoreContent extends NodeElement {
  constructor(props: INodeElement, storeData: Array<IStoreCard>) {
    super(props);

    this.render(storeData);
  }

  render(data: Array<IStoreCard>) {
    data.forEach((cardItem) => {
      new StoreCard(
        {
          parentNode: this.node,
          classNames: 'card__item',
        },
        cardItem
      );
    });
  }
}
