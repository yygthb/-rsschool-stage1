import { IStoreCard } from '../components/card';
import { StoreContent } from '../components/content';
import { StoreFilter } from '../components/filter';
import { SortValue } from '../components/filterElements/select';
import { NodeElement, INodeProps } from '../utils/nodeElement';

export enum FilterMethod {
  Sort = 'sort',
  Filter = 'filter',
}

export enum FilterConfigTitle {
  Title = 'title',
  Price = 'price',
}

export interface IFilterConfig {
  [FilterConfigTitle.Title]: string;
  [FilterConfigTitle.Price]: [number, number];
}

export interface IFilterProps {
  [FilterMethod.Sort]: SortValue;
  [FilterMethod.Filter]: IFilterConfig;
}

const defaultFilterProps: IFilterProps = {
  [FilterMethod.Sort]: SortValue.TitleUp,
  [FilterMethod.Filter]: {
    [FilterConfigTitle.Title]: '',
    [FilterConfigTitle.Price]: [0, 10000],
  },
};

export class Store extends NodeElement {
  public storeContent: StoreContent;
  public storeFilter: StoreFilter;
  private filterProps: IFilterProps = { ...defaultFilterProps };

  constructor(nodeProps: INodeProps, storeData: Array<IStoreCard>) {
    super(nodeProps);

    this.storeFilter = new StoreFilter({
      parentNode: this.node,
      classNames: 'store__filter',
    });
    this.storeFilter.init(this.sort, this.filterByPrice, this.filterByTitle);

    this.storeContent = new StoreContent(
      {
        parentNode: this.node,
        classNames: 'store__content',
      },
      storeData
    );

    this.storeContent.init(
      defaultFilterProps[FilterMethod.Sort],
      defaultFilterProps[FilterMethod.Filter]
    );
  }

  private sort = (selectValue: SortValue): void => {
    this.filterProps[FilterMethod.Sort] = selectValue;
    this.storeContent.sort(selectValue);
  };

  private filterByTitle = (value: string): void => {
    this.filterProps[FilterMethod.Filter][FilterConfigTitle.Title] = value;
    this.updateContent();
  };

  private filterByPrice = ([min, max]: [number, number]): void => {
    this.filterProps[FilterMethod.Filter][FilterConfigTitle.Price] = [min, max];
    this.updateContent();
  };

  private updateContent() {
    this.storeContent.filter(this.filterProps[FilterMethod.Filter]);
    this.storeContent.sort(this.filterProps[FilterMethod.Sort]);
  }
}
