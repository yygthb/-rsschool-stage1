import { NodeElement, INodeProps } from '../utils/nodeElement';
import { IMotoCard, StoreCard } from './card';

export class StoreContent extends NodeElement {
  constructor(nodeProps: INodeProps) {
    super(nodeProps);
  }

  render(storeData: Array<IMotoCard>) {
    this.clear();

    storeData.forEach((card) => {
      new StoreCard(
        {
          parentNode: this.node,
          classNames: 'card__item',
        },
        card
      );
    });
  }

  private clear() {
    this.node.innerHTML = '';
  }
}
