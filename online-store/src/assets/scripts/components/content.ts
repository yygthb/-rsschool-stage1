import { NodeElement, INodeProps } from '../utils/nodeElement';
import { IStoreCard, StoreCard } from './card';
import { SortValue } from './filterElements/select';

export class StoreContent extends NodeElement {
  private baseState: Array<IStoreCard> = [];
  private state: Array<IStoreCard>;

  constructor(nodeProps: INodeProps, storeData: Array<IStoreCard>) {
    super(nodeProps);
    this.baseState = storeData;
    this.state = storeData;
  }

  // init(sortProp: SortValue) {
  init(sortProp: string) {
    this.sort(sortProp);
  }

  private render() {
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

  private clear() {
    this.node.innerHTML = '';
  }

  // sort(sortProp: SortValue): void {
  sort(sortProp: string): void {
    this.clear();

    switch (sortProp) {
      case SortValue.TitleUp:
        this.state.sort((a, b) => {
          if (a.model.toLowerCase() > b.model.toLowerCase()) {
            return 1;
          } else {
            return -1;
          }
        });
        break;
      case SortValue.TitleDown:
        this.state.sort((a, b) => {
          if (a.model.toLowerCase() > b.model.toLowerCase()) {
            return -1;
          } else {
            return 1;
          }
        });
        break;
      case SortValue.PriceUp:
        this.state.sort((a, b) => +a.price - +b.price);
        break;
      case SortValue.PriceDown:
        this.state.sort((a, b) => +b.price - +a.price);
        break;
      default:
        break;
    }

    this.render();
  }

  filterByInput(value: string): void {
    this.state = this.baseState.filter((item) =>
      item.model.match(new RegExp(value.trim(), 'i'))
    );
  }
}
