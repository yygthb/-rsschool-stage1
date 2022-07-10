import { IFilterCb } from '../store';
import { NodeElement, INodeElement } from '../utils/nodeElement';
import { Select } from './filter/select';

export class StoreFilter extends NodeElement {
  constructor(props: INodeElement, filterCb: IFilterCb) {
    super(props);

    this.init(filterCb);
  }

  private init(filterCb: IFilterCb) {
    new Select(
      {
        parentNode: this.node,
        tagName: 'select',
        classNames: 'filter__select',
      },
      filterCb
    );
  }
}
