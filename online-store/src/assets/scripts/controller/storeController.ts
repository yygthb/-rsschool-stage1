import { IMotoCard } from '../components/card';
import { SortValue } from '../components/filterElements/select';
import { CheckboxCbValue } from '../components/filterElements/checkbox';

export enum ControlMethod {
  Sort = 'sort',
  Filter = 'filter',
}

export enum FilterProp {
  Title = 'title',
  MotoType = 'motoType',
  Price = 'price',
  EngineType = 'engineType',
  EnginePower = 'enginePower',
  Condition = 'condition',
  Colors = 'colors',
  Fav = 'fav',
}

export enum EngineProp {
  Type = 'type',
  Power = 'power',
}

export type EngineType = 'all' | 'gas' | 'electro';

export type MotoType =
  | 'all'
  | 'classic'
  | 'sport'
  | 'cruiser'
  | 'enduro'
  | 'scooter';

export interface IFilterConfig {
  [FilterProp.Title]: string;
  [FilterProp.MotoType]: string;
  [FilterProp.Price]: [number, number];
  [FilterProp.EngineType]: string;
  [FilterProp.EnginePower]: [number, number];
  [FilterProp.Condition]: string;
  [FilterProp.Fav]: string;
  [FilterProp.Colors]: CheckboxCbValue;
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
    this.controls = controls;

    this.baseState = [...data];
    this.state = [...data];

    this.updateContentState();
  }

  setFav(id: string) {
    const card = this.baseState.find((card) => card.id === id);
    if (card) {
      card.isFav = !card.isFav;
    }
  }

  sortByValue = (selectValue: SortValue): void => {
    this.controls[ControlMethod.Sort] = selectValue;
    this.sortState();
  };

  filterBy<T extends IFilterConfig, U extends keyof IFilterConfig>(
    filterProp: U,
    value: T[U]
  ): void {
    this.controls[ControlMethod.Filter][filterProp] = value;
    this.updateContentState();
  }

  resetFilter(filterProps: IFilterConfig) {
    this.controls[ControlMethod.Filter] = { ...filterProps };
    this.updateContentState();
  }

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
    console.log(this.state.length);
  }

  private filterState(): void {
    const {
      title,
      motoType,
      price: [priceMin, priceMax],
      engineType,
      enginePower: [powerMin, powerMax],
      condition,
      colors,
      fav,
    } = this.controls[ControlMethod.Filter];

    this.state = [...this.baseState];

    this.state = this.state.filter((item) => {
      if (
        // filter by title
        (item.brand + ' ' + item.model).match(new RegExp(title.trim(), 'i')) &&
        // filter by moto type
        (motoType === 'all' || item.type === motoType) &&
        // fiilter by price
        +item.price > +priceMin &&
        +item.price < +priceMax &&
        // filter by engine power
        +item.enginePower > +powerMin &&
        +item.enginePower < +powerMax &&
        // filter by engine type
        (engineType === 'all' || item.engineType === engineType) &&
        // filter by condition
        (condition === 'all' || item.condition === condition) &&
        // filter by color
        (!colors.length || colors.includes(item.color)) &&
        // filter by fav
        (fav === 'all' || (item.isFav && item.isFav === true))
        // (item.isFav === true && isFav === true)
      ) {
        return item;
      }
    });
  }
}
