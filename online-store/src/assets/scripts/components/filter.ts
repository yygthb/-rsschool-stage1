import { NodeElement, INodeProps } from '../utils/nodeElement';
import { IInputCb, Input } from './filterElements/input';
import { ISelectCb, Select } from './filterElements/select';

export class StoreFilter extends NodeElement {
  private select: Select;
  private input: Input;

  constructor(nodeProps: INodeProps) {
    super(nodeProps);

    this.select = new Select({
      parentNode: this.node,
      tagName: 'select',
      classNames: 'filter__select',
    });

    this.input = new Input({
      parentNode: this.node,
      tagName: 'input',
      classNames: 'filter__input',
      attributes: [['placeholder', 'Find by model']],
    });
  }

  init(sortCb: ISelectCb, inputCb: IInputCb) {
    this.select.init(sortCb);
    this.input.init(inputCb);
  }
}
