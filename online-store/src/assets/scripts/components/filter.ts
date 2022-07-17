import { NodeElement, INodeProps } from '../utils/nodeElement';
import { IInputCb, Input } from './UI/Input';
import { ISelectCb, Select, SortValue } from './filterElements/select';
import { ICheckBoxCb, CheckBox } from './filterElements/checkbox';
import { Radio } from './filterElements/radio';
import { ISliderCb, Slider } from './UI/Slider';
import { Button, IButtonCb } from './UI/Button';
import { FilterProp, IFilterConfig } from '../controller/storeController';
import {
  transfromCheckboxes,
  transfromRadios,
} from '../utils/transformFilterControls';
import {
  colorCheckboxControls,
  conditionRadioControls,
  engineRadioControls,
  favRadioControls,
  motoTypeRadioControls,
} from '../config/filterConfig';
import { FilterTitle } from './filterElements/filterTitle';

export interface IFilterCb {
  titleCb: IInputCb;
  priceCb: ISliderCb;
  powerCb: ISliderCb;
  engineTypeCb: IInputCb;
  conditionCb: IInputCb;
  motoTypeCb: IInputCb;
  checkboxCb: ICheckBoxCb;
  favCb: IInputCb;
  resetFilterCb: IButtonCb;
}

export class StoreFilter extends NodeElement {
  private titleFilter: Input;
  private priceFilter: Slider;
  private powerFilter: Slider;
  private engineType: Radio;
  private condition: Radio;
  private motoType: Radio;
  private color: CheckBox;
  private fav: Radio;
  private resetFilterBtn: Button;

  constructor(nodeProps: INodeProps) {
    super(nodeProps);

    this.titleFilter = new Input({
      parentNode: this.node,
      classNames: 'filter__el filter__el-input',
      attributes: [['placeholder', 'Search...']],
    });

    new FilterTitle({
      parentNode: this.node,
      content: 'Category',
    });
    this.motoType = new Radio({
      parentNode: this.node,
      classNames: 'filter__el, filter__el-type',
    });

    new FilterTitle({
      parentNode: this.node,
      content: 'Price',
    });
    this.priceFilter = new Slider({
      parentNode: this.node,
      classNames: 'filter__el filter__el-slider',
    });

    new FilterTitle({
      parentNode: this.node,
      content: 'Engine Power',
    });
    this.powerFilter = new Slider({
      parentNode: this.node,
      classNames: 'filter__el filter__el-slider',
    });

    new FilterTitle({
      parentNode: this.node,
      content: 'Engine Type',
    });
    this.engineType = new Radio({
      parentNode: this.node,
      classNames: 'radio__horiz filter__el filter__el-engine',
    });

    new FilterTitle({
      parentNode: this.node,
      content: 'Condition',
    });
    this.condition = new Radio({
      parentNode: this.node,
      classNames: 'radio__horiz filter__el filter__el-condition',
    });

    new FilterTitle({
      parentNode: this.node,
      content: 'Color',
    });
    this.color = new CheckBox({
      parentNode: this.node,
      classNames: 'filter__el filter__el-color',
    });

    new FilterTitle({
      parentNode: this.node,
      content: 'Favorites',
    });
    this.fav = new Radio({
      parentNode: this.node,
      classNames: 'radio__horiz filter__el filter__el-fav',
    });

    this.resetFilterBtn = new Button({
      parentNode: this.node,
      tagName: 'button',
      classNames: 'filter__reset',
      content: 'reset filter',
    });
  }

  init(
    {
      priceCb,
      titleCb,
      powerCb,
      engineTypeCb,
      conditionCb,
      motoTypeCb,
      checkboxCb,
      favCb,
      resetFilterCb,
    }: IFilterCb,
    loadFilter: IFilterConfig
  ) {
    const engineTypeBtns = transfromRadios(
      engineRadioControls,
      loadFilter[FilterProp.EngineType]
    );
    const conditionBtns = transfromRadios(
      conditionRadioControls,
      loadFilter[FilterProp.Condition]
    );
    const motoTypeBtns = transfromRadios(
      motoTypeRadioControls,
      loadFilter[FilterProp.MotoType]
    );
    const colorBtns = transfromCheckboxes(
      colorCheckboxControls,
      loadFilter[FilterProp.Colors]
    );
    const favBtns = transfromRadios(
      favRadioControls,
      loadFilter[FilterProp.Fav]
    );

    this.titleFilter.init(titleCb, false, loadFilter[FilterProp.Title]);
    this.priceFilter.init(
      priceCb,
      [0, 3000000, 10000],
      loadFilter[FilterProp.Price]
    );
    this.powerFilter.init(
      powerCb,
      [0, 300, 1],
      loadFilter[FilterProp.EnginePower]
    );
    this.engineType.init(engineTypeCb, engineTypeBtns);
    this.condition.init(conditionCb, conditionBtns);
    this.motoType.init(motoTypeCb, motoTypeBtns);
    this.color.init(checkboxCb, colorBtns);
    this.fav.init(favCb, favBtns);
    this.resetFilterBtn.init(resetFilterCb);
  }

  reset(defaultFilterConfig: IFilterConfig) {
    this.titleFilter.reset(defaultFilterConfig[FilterProp.Title]);
    this.priceFilter.reset();
    this.powerFilter.reset();
    this.engineType.reset(engineRadioControls);
    this.motoType.reset(motoTypeRadioControls);
    this.condition.reset(conditionRadioControls);
    this.color.reset(colorCheckboxControls);
    this.fav.reset(favRadioControls);
  }
}
