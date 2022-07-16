import { IMotoCard } from '../components/card';
import { SortValue } from '../components/filterElements/select';
import { CheckboxCbValue } from '../components/filterElements/checkbox';
import { FilterStorage } from './filterStorage';

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
  private _stateOriginal!: Array<IMotoCard>;
  private _stateToRender!: Array<IMotoCard>;
  private filterStorage: FilterStorage;

  set stateOriginal(state: Array<IMotoCard>) {
    this._stateOriginal = state;
  }

  get stateOriginal() {
    return this._stateOriginal;
  }

  set stateToRender(state: Array<IMotoCard>) {
    this._stateToRender = state;
  }

  get stateToRender() {
    return this._stateToRender;
  }

  constructor(data: Array<IMotoCard>, filterStorage: FilterStorage) {
    this.filterStorage = filterStorage;

    this.stateOriginal = [...data];
    this.stateToRender = [...data];

    this.updateContentState();
  }

  setFav(id: string) {
    const card = this.stateOriginal.find((card) => card.id === id);
    if (card) {
      card.isFav = !card.isFav;
    }
  }

  sortByValue = (selectValue: SortValue): void => {
    this.filterStorage.sort = selectValue;
    this.sort();
  };

  filterBy<T extends IFilterConfig, U extends keyof IFilterConfig>(
    filterProp: U,
    value: T[U]
  ): void {
    this.filterStorage.updateFilter(filterProp, value);
    this.updateContentState();
  }

  resetFilter() {
    this.filterStorage.reset();
    this.updateContentState();
  }

  private updateContentState() {
    this.filter();
    this.sort();
  }

  private sort(): void {
    switch (this.filterStorage.sort) {
      case SortValue.TitleUp:
        this.stateToRender.sort((a, b) => {
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
        this.stateToRender.sort((a, b) => {
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
        this.stateToRender.sort((a, b) => a.price - b.price);
        break;
      case SortValue.PriceDown:
        this.stateToRender.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    console.log(this.stateToRender.length);
  }

  private filter(): void {
    const {
      title,
      motoType,
      price: [priceMin, priceMax],
      engineType,
      enginePower: [powerMin, powerMax],
      condition,
      colors,
      fav,
    } = this.filterStorage.filters;

    this.stateToRender = [...this.stateOriginal];

    this.stateToRender = this.stateToRender.filter((item) => {
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
