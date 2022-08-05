import { INodeProps, NodeElement } from '../../utils/nodeElement';

class Input extends NodeElement {
  private input: HTMLInputElement;

  constructor(nodeProps: INodeProps) {
    super({
      ...nodeProps,
      tagName: 'input',
    });

    this.input = this.node as HTMLInputElement;
  }

  getValue() {
    return this.input.value;
  }

  setValue(val: string) {
    this.input.value = val;
  }

  clear() {
    this.input.value = '';
  }
}

export default Input;
