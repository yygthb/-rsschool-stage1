import { INodeProps, NodeElement } from '../utils/nodeElement';

export class Container extends NodeElement {
  constructor(nodeProps: INodeProps) {
    super({ ...nodeProps, classNames: 'container' });
  }
}
