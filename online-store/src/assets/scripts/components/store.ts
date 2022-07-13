import { StoreContent } from './content';
import { StoreFilter } from './filter';
import { SortValue } from './filterElements/select';
import { NodeElement, INodeProps } from '../utils/nodeElement';
import {
  ControlMethod,
  EngineProp,
  FilterProp,
  IControls,
  StoreController,
} from '../controller/storeController';
import { state } from '../state/state';

const defaultControls: IControls = {
  [ControlMethod.Sort]: SortValue.TitleUp,
  [ControlMethod.Filter]: {
    [FilterProp.Title]: '',
    [FilterProp.Price]: [0, 3000000],
    [FilterProp.Engine]: {
      [EngineProp.Type]: 'all',
      [EngineProp.Power]: [0, 300],
    },
  },
};

export class Store extends NodeElement {
  public storeContent: StoreContent;
  public storeFilter: StoreFilter;
  private controller: StoreController;

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

    this.init();
  }

  private init() {
    this.storeFilter.init({
      sortCb: this.sortCallback.bind(this),
      titleCb: this.filterByTitleCb.bind(this),
      priceCb: this.filterByPriceCb.bind(this),
      powerCb: this.filterByPowerCb.bind(this),
      engineTypeCb: this.filterByEngineType.bind(this),
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

  private filterByEngineType(value: string) {
    this.controller.filterByEndineType(value);
    this.storeContent.render(this.controller.state);
  }
}
