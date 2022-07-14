import { INodeProps, NodeElement } from '../../utils/nodeElement';

export type IButtonCb = () => void;

export class Button extends NodeElement {
  constructor(nodeProps: INodeProps) {
    super({ ...nodeProps, tagName: 'button' });
  }

  init(cb: IButtonCb) {
    const button = this.node as HTMLButtonElement;
    button.onclick = () => {
      cb();
    };
  }
}
