import { NodeElement, INodeProps } from '../utils/nodeElement';
import { IInputCb, Input } from './UI/Input';
import { ISelectCb, Select } from './filterElements/select';
import { ICheckBoxCb, CheckBox } from './filterElements/checkbox';
import { Radio } from './filterElements/radio';
import { ISliderCb, Slider } from './UI/Slider';
import {
  colorFilterControls,
  conditionFilterControls,
  engineFilterControls,
  motoTypeFilterControls,
} from '../config/filterConfig';
import { Button, IButtonCb } from './UI/Button';
import { FilterProp, IFilterConfig } from '../controller/storeController';

export interface IFilterCb {
  sortCb: ISelectCb;
  titleCb: IInputCb;
  priceCb: ISliderCb;
  powerCb: ISliderCb;
  engineTypeCb: IInputCb;
  conditionCb: IInputCb;
  motoTypeCb: IInputCb;
  checkboxCb: ICheckBoxCb;
  resetFilterCb: IButtonCb;
}

export class StoreFilter extends NodeElement {
  private select: Select;
  private titleFilter: Input;
  private priceFilter: Slider;
  private powerFilter: Slider;
  private engineType: Radio;
  private condition: Radio;
  private motoType: Radio;
  private color: CheckBox;
  private resetFilterBtn: Button;

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

    this.motoType = new Radio({
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

    this.engineType = new Radio({
      parentNode: this.node,
    });

    this.condition = new Radio({
      parentNode: this.node,
    });

    this.color = new CheckBox({
      parentNode: this.node,
    });

    this.resetFilterBtn = new Button({
      parentNode: this.node,
      tagName: 'button',
      classNames: 'filter__reset',
      content: 'reset filter',
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
    checkboxCb,
    resetFilterCb,
  }: IFilterCb) {
    this.select.init(sortCb);
    this.titleFilter.init(titleCb);
    this.priceFilter.init(priceCb, [0, 3000000, 10000]);
    this.powerFilter.init(powerCb, [0, 300, 1]);
    this.engineType.init(engineTypeCb, engineFilterControls);
    this.condition.init(conditionCb, conditionFilterControls);
    this.motoType.init(motoTypeCb, motoTypeFilterControls);
    this.color.init(checkboxCb, colorFilterControls);
    this.resetFilterBtn.init(resetFilterCb);
  }

  reset(defaultFilterConfig: IFilterConfig) {
    this.titleFilter.reset(defaultFilterConfig[FilterProp.Title]);
    this.priceFilter.reset();
    this.powerFilter.reset();
    this.engineType.reset(engineFilterControls);
    this.motoType.reset(motoTypeFilterControls);
    this.condition.reset(conditionFilterControls);
    this.color.reset(colorFilterControls);
  }
}
