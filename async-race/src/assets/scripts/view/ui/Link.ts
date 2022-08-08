import { INodeProps, NodeElement } from '../../utils/nodeElement';

interface ILinkProps {
  href: string;
  target?: boolean;
}

class Link extends NodeElement {
  constructor(nodeProps: INodeProps) {
    super({ ...nodeProps, tagName: 'a' });
  }

  init({ href = '#', target = false }: ILinkProps) {
    const link = this.node as HTMLLinkElement;
    link.href = href;

    if (target) {
      link.setAttribute('target', '_blank');
    }
  }
}

export default Link;
