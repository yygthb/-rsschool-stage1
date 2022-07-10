import { IStoreCard } from './components/card';
import { StoreContent } from './components/content';
import { StoreFilter } from './components/filter';
import { SortValue } from './components/filter/select';
import { NodeElement, INodeProps } from './utils/nodeElement';

export enum FilterMethod {
  Sort = 'sort',
  Filter = 'filter',
}

export enum FilterConfigTitle {
  Title = 'title',
}

export interface IFilterConfig {
  [FilterConfigTitle.Title]: string;
}

export interface FilterProps {
  [FilterMethod.Sort]: SortValue;
  [FilterMethod.Filter]: IFilterConfig;
}

const defaultFilterProps: FilterProps = {
  [FilterMethod.Sort]: SortValue.TitleUp,
  [FilterMethod.Filter]: {
    [FilterConfigTitle.Title]: '',
  },
};

export class Store extends NodeElement {
  public storeContent: StoreContent;
  public storeFilter: StoreFilter;
  private filterProps: FilterProps = { ...defaultFilterProps };

  constructor(nodeProps: INodeProps, storeData: Array<IStoreCard>) {
    super(nodeProps);

    this.storeFilter = new StoreFilter({
      parentNode: this.node,
      classNames: 'aside store__filter',
    });
    this.storeFilter.init(this.sort, this.filter);

    this.storeContent = new StoreContent(
      {
        parentNode: this.node,
        classNames: 'main store__content',
      },
      storeData
    );

    this.storeContent.init(defaultFilterProps[FilterMethod.Sort]);
  }

  private sort = (selectValue: SortValue): void => {
    this.filterProps[FilterMethod.Sort] = selectValue;
    this.storeContent.sort(selectValue);
  };

  private filter = (value: string): void => {
    this.filterProps[FilterMethod.Filter][FilterConfigTitle.Title] = value;
    this.storeContent.filterByInput(value);
    this.storeContent.sort(this.filterProps[FilterMethod.Sort]);
  };
}
