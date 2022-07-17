import { INodeProps, NodeElement } from '../utils/nodeElement';
import { cart } from './cart';
import { Container } from './container';

export class Header extends NodeElement {
  private container: Container;
  private content: NodeElement;

  constructor(nodeProps: INodeProps) {
    super({ ...nodeProps, tagName: 'header', classNames: 'header' });

    this.container = new Container({
      parentNode: this.node,
    });

    this.content = new NodeElement({
      parentNode: this.container.node,
      classNames: 'header__content',
    });

    this.renderContent();
  }

  private renderContent() {
    new NodeElement({
      parentNode: this.content.node,
      tagName: 'h1',
      classNames: 'app__title',
      content: 'MotoStore',
    });

    this.content.node.append(cart.node);
  }
}
