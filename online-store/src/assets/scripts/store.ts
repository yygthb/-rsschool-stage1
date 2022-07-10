import { IStoreCard } from './components/card';
import { StoreContent } from './components/content';
import { StoreFilter } from './components/filter';
import { FilterTitle, SortValue } from './components/filter/select';
import { NodeElement, INodeProps } from './utils/nodeElement';

export interface FilterProps {
  [FilterTitle.Sort]: SortValue;
  // [key: string]: string;
}

const defaultFilterProps: FilterProps = {
  [FilterTitle.Sort]: SortValue.TitleUp,
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
    this.storeFilter.init(this.sort);

    this.storeContent = new StoreContent(
      {
        parentNode: this.node,
        classNames: 'main store__content',
      },
      storeData
    );

    this.storeContent.init(defaultFilterProps[FilterTitle.Sort]);
  }

  private sort = (selectValue: SortValue): void => {
    this.filterProps[FilterTitle.Sort] = selectValue;
    this.storeContent.sort(this.filterProps[FilterTitle.Sort]);
  };
}
