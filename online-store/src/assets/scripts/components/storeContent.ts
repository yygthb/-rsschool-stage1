import { NodeElement, INodeProps } from '../utils/nodeElement';
import { FavClickCb, IMotoCard, StoreCard } from './card';

export class StoreContent extends NodeElement {
  private storeInfo: NodeElement;
  private cardsCount: NodeElement;
  private storeCards: NodeElement;
  private clickCartCb: FavClickCb;

  constructor(nodeProps: INodeProps, clickCartCb: FavClickCb) {
    super({ ...nodeProps });

    this.storeInfo = new NodeElement({
      parentNode: this.node,
      classNames: 'store__info',
    });

    this.cardsCount = new NodeElement({
      parentNode: this.storeInfo.node,
      tagName: 'p',
      classNames: 'store__info-count',
    });

    this.storeCards = new NodeElement({
      parentNode: this.node,
      classNames: 'store__cards',
    });

    this.clickCartCb = clickCartCb;
  }

  render(storeData: Array<IMotoCard>) {
    this.clear();

    storeData.forEach((card) => {
      new StoreCard(
        {
          parentNode: this.storeCards.node,
          classNames: 'card__item',
        },
        card,
        this.clickCartCb
      );
    });

    this.cardsCount.updateContent(`${storeData.length} motos found`);
  }

  private clear() {
    this.storeCards.clearContent();
  }
}
