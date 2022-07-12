import { IFilterConfig } from '../controller/store';
import { NodeElement, INodeProps } from '../utils/nodeElement';
import { IMotoCard, StoreCard } from './card';
import { SortValue } from './filterElements/select';

export class StoreContent extends NodeElement {
  private baseState: Array<IMotoCard> = [];
  private state: Array<IMotoCard>;

  constructor(nodeProps: INodeProps, storeData: Array<IMotoCard>) {
    super(nodeProps);
    this.baseState = storeData;
    this.state = storeData;
  }

  init(sortProp: string, filterProp: IFilterConfig) {
    this.sort(sortProp);
    this.filter(filterProp);
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

  sort(sortProp: string): void {
    this.clear();

    switch (sortProp) {
      case SortValue.TitleUp:
        this.state.sort((a, b) => {
          if (
            (a.brand + a.model).toLowerCase() >
            (b.brand + b.model).toLowerCase()
          ) {
            return 1;
          } else {
            return -1;
          }
        });
        break;
      case SortValue.TitleDown:
        this.state.sort((a, b) => {
          if (
            (a.brand + a.model).toLowerCase() >
            (b.brand + b.model).toLowerCase()
          ) {
            return -1;
          } else {
            return 1;
          }
        });
        break;
      case SortValue.PriceUp:
        this.state.sort((a, b) => a.price - b.price);
        break;
      case SortValue.PriceDown:
        this.state.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    this.render();
  }

  filter({ title, price: [min, max] }: IFilterConfig): void {
    this.state = [...this.baseState];

    this.state = this.state.filter((item) => {
      if (
        (item.brand + ' ' + item.model).match(new RegExp(title.trim(), 'i')) &&
        +item.price > +min &&
        +item.price < +max
      ) {
        return item;
      }
    });
  }
}
