import { AttrType, INodeProps, NodeElement } from '../../utils/nodeElement';

export enum SortValue {
  TitleUp = 'title-up',
  TitleDown = 'title-down',
  PriceUp = 'price-up',
  PriceDown = 'price-down',
}

enum SortContent {
  TitleUp = 'By title (A-Z)',
  TitleDown = 'By title (Z-A)',
  PriceUp = 'By price (🡥)',
  PriceDown = 'By price (🡦)',
}

type SelectOptionType = {
  value: SortValue;
  content: string;
};

const sortOptions: SelectOptionType[] = [
  {
    value: SortValue.TitleUp,
    content: SortContent.TitleUp,
  },
  {
    value: SortValue.TitleDown,
    content: SortContent.TitleDown,
  },
  {
    value: SortValue.PriceUp,
    content: SortContent.PriceUp,
  },
  {
    value: SortValue.PriceDown,
    content: SortContent.PriceDown,
  },
];

export type ISelectCb = (selectValue: SortValue) => void;

export class Select extends NodeElement {
  constructor(nodeProps: INodeProps) {
    super({
      ...nodeProps,
      classNames: `select ${nodeProps.classNames || null}`,
    });
  }

  init(cb: ISelectCb, selected: SortValue = SortValue.TitleDown) {
    sortOptions.forEach((opt) => {
      const selectedAttr: AttrType =
        opt.value === selected ? ['selected', 'true'] : [''];
      new NodeElement({
        parentNode: this.node,
        tagName: 'option',
        content: opt.content,
        attributes: [['value', opt.value], selectedAttr],
      });
    });

    const select = this.node as HTMLSelectElement;
    select.onchange = () => {
      cb(select.options[select.selectedIndex].value as SortValue);
    };
  }
}
