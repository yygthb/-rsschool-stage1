import { INodeProps, NodeElement } from '../utils/nodeElement';
import { Container } from './container';
import { Store } from './store';

export class Main extends NodeElement {
  private container: Container;
  private content: NodeElement;

  constructor(nodeProps: INodeProps) {
    super({ ...nodeProps, tagName: 'main', classNames: 'main' });

    this.container = new Container({
      parentNode: this.node,
    });

    this.content = new NodeElement({
      parentNode: this.container.node,
      classNames: 'main__content',
    });

    this.renderStore();
  }

  private renderStore() {
    new Store({
      parentNode: this.content.node,
      classNames: 'store',
    });
  }
}
