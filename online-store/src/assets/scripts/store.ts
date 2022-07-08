import { StoreContent } from './components/content';
import { StoreFilter } from './components/filter';
import { NodeElement, INodeElement } from './utils/nodeElement';

export class Store extends NodeElement {
  public storeContent: StoreContent;
  public storeFilter: StoreFilter;

  constructor(props: INodeElement) {
    super(props);

    this.storeFilter = new StoreContent({
      parentNode: this.node,
      content: 'Filter',
      classNames: 'aside store__filter',
    });

    this.storeContent = new StoreContent({
      parentNode: this.node,
      content: 'Store',
      classNames: 'main store__content',
    });
  }
}
