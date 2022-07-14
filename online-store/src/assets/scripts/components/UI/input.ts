import { INodeProps, NodeElement } from '../../utils/nodeElement';

export type IInputCb = (value: string) => void;

export class Input extends NodeElement {
  private input: HTMLInputElement;

  get value() {
    return this.input.value;
  }

  set value(val: string) {
    this.input.value = val;
  }

  constructor(nodeProps: INodeProps) {
    super({ ...nodeProps, tagName: 'input' });

    this.input = this.node as HTMLInputElement;
  }

  init(cb: IInputCb, isChecked = false) {
    this.input.checked = isChecked;
    this.input.oninput = () => {
      cb(this.input.value);
    };
  }

  reset(value: string, isChecked = false) {
    this.value = value;
    this.input.checked = isChecked;
  }
}
