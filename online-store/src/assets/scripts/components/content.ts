import { NodeElement, INodeElement } from '../utils/nodeElement';
import { IStoreCard, StoreCard } from './card';

export class StoreContent extends NodeElement {
  state: Array<IStoreCard>;

  constructor(props: INodeElement, storeData: Array<IStoreCard>) {
    super(props);
    this.state = storeData;

    this.render();
  }

  render() {
    this.state.forEach((cardItem) => {
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
