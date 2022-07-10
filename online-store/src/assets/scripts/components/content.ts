import { FilterProps } from '../store';
import { NodeElement, INodeElement } from '../utils/nodeElement';
import { IStoreCard, StoreCard } from './card';
import { FilterTitle, SortValue } from './filter/select';

export class StoreContent extends NodeElement {
  private baseState: Array<IStoreCard> = [];
  private state: Array<IStoreCard>;

  constructor(
    props: INodeElement,
    storeData: Array<IStoreCard>,
    filterProps: FilterProps
  ) {
    super(props);
    this.baseState = storeData;
    this.state = storeData;

    this.updateState(filterProps);
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

  updateState(filterProps: FilterProps) {
    this.node.innerHTML = '';

    console.log('filterProps: ', filterProps);
    for (const k in filterProps) {
      console.log('key: ', k);
      if (k === FilterTitle.sort) {
        this.sort(filterProps[k]);
      }
    }
    this.render();
  }

  private sort(sortProp: unknown): void {
    switch (sortProp) {
      case SortValue.titleUp:
        this.state = this.baseState.sort((a, b) => {
          if (a.model.toLowerCase() > b.model.toLowerCase()) {
            return 1;
          } else {
            return -1;
          }
        });
        break;
      case SortValue.titleDown:
        this.state = this.baseState.sort((a, b) => {
          if (a.model.toLowerCase() > b.model.toLowerCase()) {
            return -1;
          } else {
            return 1;
          }
        });
        break;
      case SortValue.priceUp:
        this.state = this.baseState.sort((a, b) => +a.price - +b.price);
        break;
      case SortValue.priceDown:
        this.state = this.baseState.sort((a, b) => +b.price - +a.price);
        break;
      default:
        break;
    }
  }
}
