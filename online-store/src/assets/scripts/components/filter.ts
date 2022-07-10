import { NodeElement, INodeProps } from '../utils/nodeElement';
import { ISelectCb, Select } from './filter/select';

export class StoreFilter extends NodeElement {
  private select: Select;

  constructor(nodeProps: INodeProps) {
    super(nodeProps);

    this.select = new Select({
      parentNode: this.node,
      tagName: 'select',
      classNames: 'filter__select',
    });
  }

  init(sortCb: ISelectCb) {
    this.select.init(sortCb);
  }
}
