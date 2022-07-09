import { IStoreCard } from './components/card';
import { StoreContent } from './components/content';
import { StoreFilter } from './components/filter';
import { NodeElement, INodeElement } from './utils/nodeElement';

export class Store extends NodeElement {
  public storeContent: StoreContent;
  public storeFilter: StoreFilter;

  constructor(props: INodeElement, storeData: Array<IStoreCard>) {
    super(props);

    this.storeFilter = new StoreFilter({
      parentNode: this.node,
      content: 'Filter',
      classNames: 'aside store__filter',
    });

    this.storeContent = new StoreContent(
      {
        parentNode: this.node,
        classNames: 'main store__content',
      },
      storeData
    );
  }
}
