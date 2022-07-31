import { INodeProps, NodeElement } from '../../utils/nodeElement';

export type ClickNavCb = (val: Button) => void;

class Button extends NodeElement {
  constructor(nodeProps: INodeProps) {
    super({
      ...nodeProps,
      tagName: 'button',
    });
    this.node as HTMLButtonElement;
  }

  click(cb: ClickNavCb) {
    this.node.onclick = () => {
      cb(this);
    };
  }
}

export default Button;