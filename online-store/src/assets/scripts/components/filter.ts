import { NodeElement, INodeElement } from '../utils/nodeElement';
import { Select } from './filter/select';

export type SelectorCb = (value: string) => void;

const selectChanged = (value: string): void =>
  console.log('sort selector changed to ', value);

export class StoreFilter extends NodeElement {
  constructor(props: INodeElement) {
    super(props);

    this.init();
  }

  private init() {
    new Select(
      {
        parentNode: this.node,
        tagName: 'select',
        classNames: 'filter__select',
      },
      selectChanged
    );
  }
}
