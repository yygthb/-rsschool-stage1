import { INodeElement, NodeElement } from '../../utils/nodeElement';
import { SelectorCb } from '../filter';

enum SortOption {
  titleUp = 'title-up',
  titleDown = 'title-down',
  priceUp = 'price-up',
  priceDown = 'price-up',
}

type SelectOptionType = {
  value: SortOption;
  content: string;
};

const sortOptions: SelectOptionType[] = [
  {
    value: SortOption.titleUp,
    content: 'By title (A-Z)',
  },
  {
    value: SortOption.titleDown,
    content: 'By title (Z-A)',
  },
  {
    value: SortOption.priceUp,
    content: 'By price (🡥)',
  },
  {
    value: SortOption.priceDown,
    content: 'By price (🡦)',
  },
];

export class Select extends NodeElement {
  constructor(props: INodeElement, cb: SelectorCb) {
    super({ ...props, classNames: `select ${props.classNames || null}` });

    this.init(cb);
  }

  init(cb: SelectorCb) {
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
      cb(n.options[n.selectedIndex].value);
    };
  }
}
