import { Navigation } from '../../model/model';
import { INodeProps, NodeElement } from '../../utils/nodeElement';

class Main extends NodeElement {
  private garage!: NodeElement;
  private winners!: NodeElement;
  private sections: NodeElement[] = [];

  constructor(nodeProps: INodeProps) {
    super({
      ...nodeProps,
      classNames: 'main',
    });

    this.init();
  }

  init() {
    const content = new NodeElement({
      parentNode: this.node,
      classNames: 'main__content content',
    });

    this.garage = new NodeElement({
      parentNode: content.node,
      tagName: 'section',
      content: 'GARAGE',
      classNames: 'main__section content__garage',
    });

    this.winners = new NodeElement({
      parentNode: content.node,
      tagName: 'section',
      content: 'WiNNERS',
      classNames: 'main__section content__winners',
    });

    this.sections.push(this.garage);
    this.sections.push(this.winners);
  }

  hideSections() {
    this.sections.forEach((section) => section.node.classList.remove('active'));
  }

  setContentSection(val: Navigation) {
    this.hideSections();
    if (val === Navigation.ToGarage) {
      this.garage.node.classList.add('active');
    }
    if (val === Navigation.ToWinners) {
      this.winners.node.classList.add('active');
    }
  }
}

export default Main;
