import { StoreContent } from './content';
import { StoreFilter } from './filter';
import { SortValue } from './filterElements/select';
import { NodeElement, INodeProps } from '../utils/nodeElement';
import {
  ControlMethod,
  IControls,
  StoreController,
} from '../controller/storeController';
import { state } from '../state/state';
import { CheckboxCbValue } from './filterElements/checkbox';
import { defaultControls } from '../config/filterConfig';

export class Store extends NodeElement {
  public storeContent: StoreContent;
  public storeFilter: StoreFilter;
  private controller: StoreController;
  private initialControls: IControls;

  constructor(nodeProps: INodeProps) {
    super(nodeProps);

    this.storeContent = new StoreContent({
      parentNode: this.node,
      classNames: 'store__content',
      content: 'Content',
    });

    this.storeFilter = new StoreFilter({
      parentNode: this.node,
      classNames: 'store__filter',
      content: 'Filter',
    });

    this.controller = new StoreController(state, defaultControls);

    this.initialControls = JSON.parse(JSON.stringify(defaultControls));

    this.init();
  }

  private init() {
    this.storeFilter.init({
      sortCb: this.sortCallback.bind(this),
      titleCb: this.filterByTitleCb.bind(this),
      priceCb: this.filterByPriceCb.bind(this),
      powerCb: this.filterByPowerCb.bind(this),
      engineTypeCb: this.filterByEngineTypeCb.bind(this),
      conditionCb: this.filterByConditionCb.bind(this),
      motoTypeCb: this.filterByMotoType.bind(this),
      checkboxCb: this.filterByColor.bind(this),
      resetFilterCb: this.resetFilter.bind(this),
    });

    this.storeContent.render(this.controller.state);
  }

  private sortCallback(selectValue: SortValue) {
    this.controller.sortByValue(selectValue);
    this.storeContent.render(this.controller.state);
  }

  private filterByTitleCb(value: string) {
    this.controller.filterByTitle(value);
    this.storeContent.render(this.controller.state);
  }

  private filterByPriceCb([min, max]: [number, number]) {
    this.controller.filterByPrice([min, max]);
    this.storeContent.render(this.controller.state);
  }

  private filterByPowerCb([min, max]: [number, number]) {
    this.controller.filterByPower([min, max]);
    this.storeContent.render(this.controller.state);
  }

  private filterByEngineTypeCb(value: string) {
    this.controller.filterByEngineType(value);
    this.storeContent.render(this.controller.state);
  }

  private filterByConditionCb(value: string) {
    this.controller.filterByCondition(value);
    this.storeContent.render(this.controller.state);
  }

  private filterByMotoType(value: string) {
    this.controller.filterByMotoType(value);
    this.storeContent.render(this.controller.state);
  }

  private filterByColor(value: CheckboxCbValue) {
    this.controller.filterByColor(value);
    this.storeContent.render(this.controller.state);
  }

  private resetFilter() {
    this.storeFilter.reset(this.initialControls[ControlMethod.Filter]);

    this.controller.resetFilter(this.initialControls[ControlMethod.Filter]);
    this.storeContent.render(this.controller.state);
  }
}
