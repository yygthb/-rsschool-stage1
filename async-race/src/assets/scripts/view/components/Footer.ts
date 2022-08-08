import { INodeProps, NodeElement } from '../../utils/nodeElement';
import Image from '../ui/Image';
import Link from '../ui/Link';

class Footer extends NodeElement {
  constructor(nodeProps: INodeProps) {
    super({
      ...nodeProps,
      classNames: 'footer',
    });

    this.init();
  }

  init() {
    this.courseLinkComponent();
    this.infoComponent();
  }

  private courseLinkComponent() {
    const courseLink = new Link({
      parentNode: this.node,
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
      src: './assets/img/icon/rs.svg',
      alt: 'RS-School icon',
      title: 'RS-School website',
    });
  }

  private infoComponent() {
    const info = new NodeElement({
      parentNode: this.node,
      tagName: 'span',
      classNames: 'info',
      content: '2022 © ',
    });

    const authorLink = new Link({
      parentNode: info.node,
      classNames: 'info__link',
      content: 'Yura Ya',
    });
    authorLink.init({
      href: 'https://github.com/yygthb',
      target: true,
    });
  }
}

export default Footer;
