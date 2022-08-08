import { INodeProps, NodeElement } from '../../utils/nodeElement';

class Input extends NodeElement {
  constructor(nodeProps: INodeProps) {
    super({
      ...nodeProps,
      tagName: 'input',
    });
  }

  getValue() {
    return (<HTMLInputElement> this.node).value;
  }

  setValue(val: string) {
    (<HTMLInputElement> this.node).value = val;
  }

  clear() {
    (<HTMLInputElement> this.node).value = '';
  }
}

export default Input;
