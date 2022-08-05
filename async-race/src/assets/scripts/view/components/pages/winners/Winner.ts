import { INodeProps, NodeElement } from '../../../../utils/nodeElement';

class Winner extends NodeElement {
  constructor(nodeProps: INodeProps) {
    super({
      ...nodeProps,
      classNames: 'winner__car',
    });
  }
}

export default Winner;
