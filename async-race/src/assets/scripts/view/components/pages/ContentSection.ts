import { INodeProps, NodeElement } from '../../../utils/nodeElement';

class ContentSection extends NodeElement {
  constructor(nodeProps: INodeProps, sectionTitle = '') {
    super({
      ...nodeProps,
      classNames: `main__section ${nodeProps.classNames}`,
    });

    new NodeElement({
      parentNode: this.node,
      tagName: 'h2',
      content: sectionTitle,
      classNames: 'section__title',
    });
  }

  show() {
    this.node.classList.add('active');
  }

  hide() {
    this.node.classList.remove('active');
  }
}

export default ContentSection;
