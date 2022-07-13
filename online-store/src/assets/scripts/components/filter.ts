import { NodeElement, INodeProps } from '../utils/nodeElement';
import { IInputCb, Input } from './filterElements/input';
import { ISelectCb, Select } from './filterElements/select';
import { ISliderCb, Slider } from './UI/slider';

export interface IFilterCb {
  sortCb: ISelectCb;
  priceCb: ISliderCb;
  titleCb: IInputCb;
  powerCb: ISliderCb;
}

export class StoreFilter extends NodeElement {
  private select: Select;
  private titleFilter: Input;
  private priceFilter: Slider;
  private powerFilter: Slider;

  constructor(nodeProps: INodeProps) {
    super(nodeProps);

    this.select = new Select({
      parentNode: this.node,
      tagName: 'select',
      classNames: 'filter__element filter__element-select',
    });

    this.titleFilter = new Input({
      parentNode: this.node,
      classNames: 'filter__element filter__element-input',
      attributes: [['placeholder', 'Find by model']],
    });

    this.priceFilter = new Slider({
      parentNode: this.node,
      classNames: 'filter__element filter__element-slider',
    });

    this.powerFilter = new Slider({
      parentNode: this.node,
      classNames: 'filter__element filter__element-slider',
    });
  }

  init({ sortCb, priceCb, titleCb, powerCb }: IFilterCb) {
    this.select.init(sortCb);
    this.titleFilter.init(titleCb);
    this.priceFilter.init(priceCb, [0, 3000000, 10000]);
    this.powerFilter.init(powerCb, [0, 300, 1]);
  }
}
