import { NodeElement, INodeProps } from '../utils/nodeElement';
import { IInputCb, Input } from './filterElements/input';
import { ISelectCb, Select } from './filterElements/select';
import { SelectRadio } from './UI/radio';
import { ISliderCb, Slider } from './UI/slider';

export interface IFilterCb {
  sortCb: ISelectCb;
  titleCb: IInputCb;
  priceCb: ISliderCb;
  powerCb: ISliderCb;
  engineTypeCb: IInputCb;
  conditionCb: IInputCb;
  motoTypeCb: IInputCb;
}

const motoTypeFilterControls = [
  { id: 'brand', content: 'все', value: 'all', checked: true },
  { id: 'brand', content: 'Classic', value: 'classic', checked: false },
  { id: 'brand', content: 'Sport', value: 'sport', checked: false },
  { id: 'brand', content: 'Cruiser', value: 'cruiser', checked: false },
  { id: 'brand', content: 'Enduro', value: 'enduro', checked: false },
  { id: 'brand', content: 'Scooter', value: 'scooter', checked: false },
];

const engineFilterControls = [
  { id: 'engine-type', content: 'все', value: 'all', checked: true },
  { id: 'engine-type', content: 'gas', value: 'gas', checked: false },
  { id: 'engine-type', content: 'electro', value: 'electro', checked: false },
];

const conditionFilterControls = [
  { id: 'condition', content: 'все', value: 'all', checked: true },
  { id: 'condition', content: 'new', value: 'new', checked: false },
  { id: 'condition', content: 'used', value: 'used', checked: false },
];

export class StoreFilter extends NodeElement {
  private select: Select;
  private titleFilter: Input;
  private priceFilter: Slider;
  private powerFilter: Slider;
  private engineType: SelectRadio;
  private condition: SelectRadio;
  private motoType: SelectRadio;

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

    this.motoType = new SelectRadio({
      parentNode: this.node,
    });

    this.priceFilter = new Slider({
      parentNode: this.node,
      classNames: 'filter__element filter__element-slider',
    });

    this.powerFilter = new Slider({
      parentNode: this.node,
      classNames: 'filter__element filter__element-slider',
    });

    this.engineType = new SelectRadio({
      parentNode: this.node,
    });

    this.condition = new SelectRadio({
      parentNode: this.node,
    });
  }

  init({
    sortCb,
    priceCb,
    titleCb,
    powerCb,
    engineTypeCb,
    conditionCb,
    motoTypeCb,
  }: IFilterCb) {
    this.select.init(sortCb);
    this.titleFilter.init(titleCb);
    this.priceFilter.init(priceCb, [0, 3000000, 10000]);
    this.powerFilter.init(powerCb, [0, 300, 1]);
    this.engineType.init(engineTypeCb, engineFilterControls);
    this.condition.init(conditionCb, conditionFilterControls);
    this.motoType.init(motoTypeCb, motoTypeFilterControls);
  }
}
