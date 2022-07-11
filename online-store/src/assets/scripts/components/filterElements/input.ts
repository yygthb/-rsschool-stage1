import { INodeProps, NodeElement } from '../../utils/nodeElement';

export type IInputCb = (value: string) => void;

export class Input extends NodeElement {
  constructor(nodeProps: INodeProps) {
    super({ ...nodeProps, tagName: 'input' });
  }

  init(cb: IInputCb) {
    const input = this.node as HTMLInputElement;
    input.oninput = () => {
      cb(input.value);
    };
  }
}
