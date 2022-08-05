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
}

export default Color;
