import { IMotoCard } from '../components/card';
import { SortValue } from '../components/filterElements/select';

export enum ControlMethod {
  Sort = 'sort',
  Filter = 'filter',
}

export enum FilterProp {
  Title = 'title',
  Price = 'price',
  Engine = 'engine',
  Condition = 'condition',
}

export enum EngineProp {
  Type = 'type',
  Power = 'power',
}

export type EngineType = 'all' | 'gas' | 'electro';

export interface IFilterConfig {
  [FilterProp.Title]: string;
  [FilterProp.Price]: [number, number];
  [FilterProp.Engine]: {
    [EngineProp.Type]: string;
    [EngineProp.Power]: [number, number];
  };
  [FilterProp.Condition]: string;
}

export interface IControls {
  [ControlMethod.Sort]: SortValue;
  [ControlMethod.Filter]: IFilterConfig;
}

export class StoreController {
  private _baseState!: Array<IMotoCard>;
  private _state!: Array<IMotoCard>;
  private _controls!: IControls;

  set baseState(state: Array<IMotoCard>) {
    this._baseState = state;
  }

  get baseState() {
    return this._baseState;
  }

  set state(state: Array<IMotoCard>) {
    this._state = state;
  }

  get state() {
    return this._state;
  }

  set controls(controls: IControls) {
    this._controls = controls;
  }

  get controls() {
    return this._controls;
  }

  constructor(data: Array<IMotoCard>, controls: IControls) {
    this.controls = { ...controls };

    this.baseState = [...data];
    this.state = [...data];

    this.sortState();
    this.filterState();
  }

  sortByValue = (selectValue: SortValue): void => {
    this.controls[ControlMethod.Sort] = selectValue;
    this.sortState();
  };

  filterByTitle = (value: string): void => {
    this.controls[ControlMethod.Filter][FilterProp.Title] = value;
    this.updateContentState();
  };

  filterByPrice = ([min, max]: [number, number]): void => {
    this.controls[ControlMethod.Filter][FilterProp.Price] = [min, max];
    this.updateContentState();
  };

  filterByPower = ([min, max]: [number, number]): void => {
    this.controls[ControlMethod.Filter][FilterProp.Engine][EngineProp.Power] = [
      min,
      max,
    ];
    this.updateContentState();
  };

  filterByEngineType = (value: string): void => {
    this.controls[ControlMethod.Filter][FilterProp.Engine][EngineProp.Type] =
      value;
    this.updateContentState();
  };

  filterByCondition = (value: string): void => {
    this.controls[ControlMethod.Filter][FilterProp.Condition] = value;
    this.updateContentState();
  };

  private updateContentState() {
    this.filterState();
    this.sortState();
  }

  private sortState(): void {
    switch (this.controls[ControlMethod.Sort]) {
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
  }

  private filterState(): void {
    const {
      title,
      price: [priceMin, priceMax],
      engine: {
        power: [powerMin, powerMax],
        type,
      },
      condition,
    } = this.controls[ControlMethod.Filter];

    this.state = [...this.baseState];

    this.state = this.state.filter((item) => {
      if (
        // filter by title
        (item.brand + ' ' + item.model).match(new RegExp(title.trim(), 'i')) &&
        // fiilter by price
        +item.price > +priceMin &&
        +item.price < +priceMax &&
        // filter by engine power
        +item.engine.power > +powerMin &&
        +item.engine.power < +powerMax &&
        // filter by engine type
        (type === 'all' || item.engine.type === type) &&
        // filter by condition
        (condition === 'all' || item.condition === condition)
      ) {
        return item;
      }
    });
  }
}
