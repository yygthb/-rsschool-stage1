import { INodeProps, NodeElement } from '../utils/nodeElement';
import { Container } from './container';
import { Image } from './UI/Image';
import { Link } from './UI/Link';

export class Footer extends NodeElement {
  private container: Container;
  private content: NodeElement;

  constructor(nodeProps: INodeProps) {
    super({ ...nodeProps, tagName: 'footer', classNames: 'footer' });

    this.container = new Container({
      parentNode: this.node,
    });

    this.content = new NodeElement({
      parentNode: this.container.node,
      classNames: 'footer__content',
    });

    this.renderContent();
  }

  private renderContent() {
    this.courseLinkComponent();
    this.infoComponent();
  }

  private courseLinkComponent() {
    const courseLink = new Link({
      parentNode: this.content.node,
      classNames: 'course-link',
    });
    courseLink.init({
      href: 'https://rs.school/',
      target: true,
    });

    const courseImg = new Image({
      parentNode: courseLink.node,
      classNames: 'school-logo',
    });
    courseImg.init({
      src: './assets/img/icons/rs.svg',
      alt: 'RS-School icon',
      title: 'RS-School website',
    });
  }

  private infoComponent() {
    const info = new NodeElement({
      parentNode: this.content.node,
      tagName: 'span',
      classNames: 'info',
      content: '2022 ',
    });

    const authorLink = new Link({
      parentNode: info.node,
      classNames: 'info__link',
      content: 'Yura Ya',
      attributes: [['title', 'Yura Ya github']],
    });
    authorLink.init({
      href: 'https://github.com/yygthb',
      target: true,
    });
  }
}
