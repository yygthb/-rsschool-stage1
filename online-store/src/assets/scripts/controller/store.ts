import { IStoreCard } from '../components/card';
import { StoreContent } from '../components/content';
import { StoreFilter } from '../components/filter';
import { SortValue } from '../components/filterElements/select';
import { NodeElement, INodeProps } from '../utils/nodeElement';

export enum ControlMethod {
  Sort = 'sort',
  Filter = 'filter',
}

export enum FilterProp {
  Title = 'title',
  Price = 'price',
}

export interface IFilterConfig {
  [FilterProp.Title]: string;
  [FilterProp.Price]: [number, number];
}

export interface IControlProps {
  [ControlMethod.Sort]: SortValue;
  [ControlMethod.Filter]: IFilterConfig;
}

const defaultFilterProps: IControlProps = {
  [ControlMethod.Sort]: SortValue.TitleUp,
  [ControlMethod.Filter]: {
    [FilterProp.Title]: '',
    [FilterProp.Price]: [0, 10000],
  },
};

export class Store extends NodeElement {
  public storeContent: StoreContent;
  public storeFilter: StoreFilter;
  private filterProps: IControlProps = { ...defaultFilterProps };

  constructor(nodeProps: INodeProps, storeData: Array<IStoreCard>) {
    super(nodeProps);

    this.storeFilter = new StoreFilter({
      parentNode: this.node,
      classNames: 'store__filter',
    });
    this.storeFilter.init({
      sortCb: this.sort,
      sliderCb: this.filterByPrice,
      inputCb: this.filterByTitle,
    });

    this.storeContent = new StoreContent(
      {
        parentNode: this.node,
        classNames: 'store__content',
      },
      storeData
    );

    this.storeContent.init(
      defaultFilterProps[ControlMethod.Sort],
      defaultFilterProps[ControlMethod.Filter]
    );
  }

  private sort = (selectValue: SortValue): void => {
    this.filterProps[ControlMethod.Sort] = selectValue;
    this.storeContent.sort(selectValue);
  };

  private filterByTitle = (value: string): void => {
    this.filterProps[ControlMethod.Filter][FilterProp.Title] = value;
    this.updateContent();
  };

  private filterByPrice = ([min, max]: [number, number]): void => {
    this.filterProps[ControlMethod.Filter][FilterProp.Price] = [min, max];
    this.updateContent();
  };

  private updateContent() {
    this.storeContent.filter(this.filterProps[ControlMethod.Filter]);
    this.storeContent.sort(this.filterProps[ControlMethod.Sort]);
  }
}
