import { INodeProps, NodeElement } from '../../../utils/nodeElement';

class Car extends NodeElement {
  constructor(nodeProps: INodeProps) {
    super({
      ...nodeProps,
      classNames: 'garage__car car',
    });
  }

  title(val: string) {
    this.node.textContent = val;
  }
}

export default Car;
