import { SortValue } from '../components/filterElements/select';
import { ControlMethod, IControls, IFilterConfig } from './storeController';

const LS_SORT_ITEM = 'store__sortBy';
const LS_FILTER_ITEM = 'store__filters';

export class FilterStorage {
  private _sort!: SortValue;
  private _filter!: IFilterConfig;
  private initialControls: IControls;

  get sort() {
    return this._sort;
  }

  set sort(value: SortValue) {
    localStorage.setItem(LS_SORT_ITEM, value);
    this._sort = value;
  }

  get filters() {
    return this._filter;
  }

  set filters(value: IFilterConfig) {
    this._filter = value;
  }

  constructor(defaultConfig: IControls) {
    this.initialControls = { ...JSON.parse(JSON.stringify(defaultConfig)) };

    this.init();
  }

  private init() {
    const sortFromLS = localStorage.getItem(LS_SORT_ITEM) as SortValue;
    this.sort = sortFromLS || this.initialControls[ControlMethod.Sort];

    const filtersFromLS = JSON.parse(
      localStorage.getItem(LS_FILTER_ITEM) || '{}'
    ) as IFilterConfig;
    this.filters = {
      ...this.initialControls[ControlMethod.Filter],
      ...filtersFromLS,
    };

    localStorage.setItem(LS_SORT_ITEM, this.sort);
    this.writeFilterToLS();
  }

  reset() {
    this.filters = { ...this.initialControls[ControlMethod.Filter] };
    this.writeFilterToLS();
  }

  private writeFilterToLS() {
    localStorage.setItem(LS_FILTER_ITEM, JSON.stringify(this.filters));
  }

  updateFilter<T extends IFilterConfig, U extends keyof IFilterConfig>(
    key: U,
    value: T[U]
  ) {
    this.filters = { ...this.filters, [key]: value };
    localStorage.setItem(LS_FILTER_ITEM, JSON.stringify(this.filters));
  }

  getStoreFilters() {
    return {
      [ControlMethod.Sort]: this.sort,
      [ControlMethod.Filter]: this.filters,
    };
  }
}
