import { IStoreCard } from './components/card';
import { StoreContent } from './components/content';
import { StoreFilter } from './components/filter';
import { FilterTitle, SortValue } from './components/filter/select';
import { NodeElement, INodeElement } from './utils/nodeElement';

export type FilterCbProp = {
  title: string;
  value: string;
};
// export type FilterProps = { [key in FilterTitle | string]: SortValue | string };
export interface FilterProps {
  [FilterTitle.sort]: SortValue;
}
export type IFilterCb = (prop: any) => void;
// export type FilterProps = { [key: string]: string };

const defaultFilterProps: FilterProps = {
  [FilterTitle.sort]: SortValue.titleUp,
};

export class Store extends NodeElement {
  public storeContent: StoreContent;
  public storeFilter: StoreFilter;
  private filterProps: FilterProps = { ...defaultFilterProps };

  constructor(props: INodeElement, storeData: Array<IStoreCard>) {
    super(props);

    this.storeFilter = new StoreFilter(
      {
        parentNode: this.node,
        classNames: 'aside store__filter',
      },
      this.filter
    );

    this.storeContent = new StoreContent(
      {
        parentNode: this.node,
        classNames: 'main store__content',
      },
      storeData,
      this.filterProps
    );
  }

  filter = (props: FilterProps): void => {
    console.log('filter: ', props);

    this.filterProps = props;
    this.storeContent.updateState(this.filterProps);
  };
}
