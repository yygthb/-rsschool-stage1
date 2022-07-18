import { getScrollWidth } from '../../utils/getScrollWidth';
import { INodeProps, NodeElement } from '../../utils/nodeElement';

const body = document.querySelector('body');

export class Popup extends NodeElement {
  private overflow: NodeElement;
  private popup: NodeElement;
  private content: NodeElement;
  private closeBtn: NodeElement;
  private scrollWidth: number = 0;

  constructor(nodeProps: INodeProps) {
    super(nodeProps);

    this.overflow = new NodeElement({
      parentNode: body,
      classNames: 'popup__overflow',
    });

    this.popup = new NodeElement({
      parentNode: this.overflow.node,
      classNames: 'popup',
    });

    this.content = new NodeElement({
      parentNode: this.popup.node,
      classNames: 'popup__content',
    });

    this.closeBtn = new NodeElement({
      parentNode: this.popup.node,
      classNames: 'popup__close',
      content: '╳',
    });
  }

  open(errorText: string) {
    this.scrollWidth = getScrollWidth();

    if (body) {
      body?.classList.add('lock');
      body.style.marginRight = `${this.scrollWidth}px`;
    }
    this.content.updateContent(errorText);

    this.closeBtn.node.onclick = () => {
      this.close();
    };
  }

  close() {
    if (body) {
      body?.classList.remove('lock');
      body.style.marginRight = '0';
    }

    this.overflow.destroy();
  }
}
