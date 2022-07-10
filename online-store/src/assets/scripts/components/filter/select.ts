import { IFilterCb } from '../../store';
import { INodeElement, NodeElement } from '../../utils/nodeElement';

export enum FilterTitle {
  sort = 'sort',
}

export enum SortValue {
  titleUp = 'title-up',
  titleDown = 'title-down',
  priceUp = 'price-up',
  priceDown = 'price-down',
}

enum SortContent {
  titleUp = 'By title (A-Z)',
  titleDown = 'By title (Z-A)',
  priceUp = 'By price (🡥)',
  priceDown = 'By price (🡦)',
}

type SelectOptionType = {
  value: SortValue;
  content: string;
};

const sortOptions: SelectOptionType[] = [
  {
    value: SortValue.titleUp,
    content: SortContent.titleUp,
  },
  {
    value: SortValue.titleDown,
    content: SortContent.titleDown,
  },
  {
    value: SortValue.priceUp,
    content: SortContent.priceUp,
  },
  {
    value: SortValue.priceDown,
    content: SortContent.priceDown,
  },
];

export class Select extends NodeElement {
  constructor(props: INodeElement, cb: IFilterCb) {
    super({ ...props, classNames: `select ${props.classNames || null}` });

    this.init(cb);
  }

  init(cb: IFilterCb) {
    sortOptions.forEach((option) => {
      new NodeElement({
        parentNode: this.node,
        tagName: 'option',
        content: option.content,
        attributes: [['value', option.value]],
      });
    });

    const n = this.node as HTMLSelectElement;
    n.onchange = () => {
      cb({
        [FilterTitle.sort]: n.options[n.selectedIndex].value,
      });
    };
  }
}
