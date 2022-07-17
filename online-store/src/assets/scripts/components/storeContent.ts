import { NodeElement, INodeProps } from '../utils/nodeElement';
import { FavClickCb, IMotoCard, StoreCard } from './card';
import { ISelectCb, Select, SortValue } from './filterElements/select';

export class StoreContent extends NodeElement {
  private storeInfo: NodeElement;
  private cardsCount!: NodeElement;
  private select!: Select;
  private storeCards: NodeElement;
  private clickCartCb!: FavClickCb;

  constructor(nodeProps: INodeProps) {
    super({ ...nodeProps });

    this.storeInfo = new NodeElement({
      parentNode: this.node,
      classNames: 'store__info',
    });

    this.storeCards = new NodeElement({
      parentNode: this.node,
      classNames: 'store__cards',
    });
  }

  init(clickCartCb: FavClickCb, sortCb: ISelectCb, loadSort: SortValue) {
    this.cardsCount = new NodeElement({
      parentNode: this.storeInfo.node,
      tagName: 'p',
      classNames: 'store__info-count',
    });

    const sortContainer = new NodeElement({
      parentNode: this.storeInfo.node,
      classNames: 'store__info-sort',
    });
    new NodeElement({
      parentNode: sortContainer.node,
      tagName: 'span',
      content: 'Sort by ',
    });
    this.select = new Select({
      parentNode: sortContainer.node,
      tagName: 'select',
      classNames: 'store__info-select',
    });
    this.select.init(sortCb, loadSort);
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
