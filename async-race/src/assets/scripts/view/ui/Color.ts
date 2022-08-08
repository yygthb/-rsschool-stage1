import { INodeProps } from '../../utils/nodeElement';
import Input from './Input';

class Color extends Input {
  constructor(nodeProps: INodeProps) {
    super({
      ...nodeProps,
      tagName: 'input-color',
    });

    this.node.setAttribute('type', 'color');
  }

  clear() {
    (<HTMLInputElement> this.node).value = '#000000';
  }
}

export default Color;
