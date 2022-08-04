import { INodeProps, NodeElement } from '../../../utils/nodeElement';

class ContentSection extends NodeElement {
  private intro: NodeElement;
  private totalCount: NodeElement;

  constructor(nodeProps: INodeProps, sectionTitle = '') {
    super({
      ...nodeProps,
      classNames: `main__section ${nodeProps.classNames}`,
    });

    this.intro = new NodeElement({
      parentNode: this.node,
      classNames: 'section__intro',
    });

    new NodeElement({
      parentNode: this.intro.node,
      tagName: 'h2',
      content: sectionTitle,
      classNames: 'section__title',
    });

    this.totalCount = new NodeElement({
      parentNode: this.intro.node,
      tagName: 'p',
      classNames: 'cars__count',
    });
  }

  show() {
    this.node.classList.add('active');
  }

  hide() {
    this.node.classList.remove('active');
  }

  showTotalCount(val: number) {
    this.totalCount.node.innerHTML = `There're ${val} car(s)`;
  }
}

export default ContentSection;
