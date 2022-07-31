import { INodeProps, NodeElement } from '../../utils/nodeElement';

class Footer extends NodeElement {
  constructor(nodeProps: INodeProps) {
    super({
      ...nodeProps,
      content: 'FOOTER',
      classNames: 'footer',
    });
  }
}

export default Footer;
