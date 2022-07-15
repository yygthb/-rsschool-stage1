import { NodeElement, INodeProps } from '../utils/nodeElement';
import { FavClickCb, IMotoCard, StoreCard } from './card';

export class StoreContent extends NodeElement {
  private clickCartCb: FavClickCb;

  constructor(nodeProps: INodeProps, clickCartCb: FavClickCb) {
    super(nodeProps);

    this.clickCartCb = clickCartCb;
  }

  render(storeData: Array<IMotoCard>) {
    this.clear();

    storeData.forEach((card) => {
      new StoreCard(
        {
          parentNode: this.node,
          classNames: 'card__item',
        },
        card,
        this.clickCartCb
      );
    });
  }

  private clear() {
    this.node.innerHTML = '';
  }
}
