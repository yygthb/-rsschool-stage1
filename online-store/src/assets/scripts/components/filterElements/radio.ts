import { INodeProps, NodeElement } from '../../utils/nodeElement';
import { IInputCb, Input } from '../UI/Input';

type RadioInput = {
  id: string;
  content: string;
  value: string;
  checked: boolean;
};

export class SelectRadio extends NodeElement {
  private inputs: Array<Input> = [];

  constructor(nodeProps: INodeProps) {
    super({
      ...nodeProps,
      classNames: `radio__container ${nodeProps.classNames}`,
    });
  }

  init(cb: IInputCb, btns: Array<RadioInput>) {
    btns.forEach((radioBtn) => {
      const input = new Input({
        parentNode: this.node,
        attributes: [
          ['type', 'radio'],
          ['id', `${radioBtn.id}-${radioBtn.value}`],
          ['value', radioBtn.value],
          ['name', radioBtn.id],
        ],
      });
      input.init(cb, radioBtn.checked);
      new NodeElement({
        parentNode: this.node,
        tagName: 'label',
        content: radioBtn.content,
        attributes: [['for', `${radioBtn.id}-${radioBtn.value}`]],
      });
      this.inputs.push(input);
    });
  }

  reset(defaultBtns: Array<RadioInput>) {
    this.inputs.forEach((input) => {
      defaultBtns.forEach((btn) => {
        if (btn.value === input.value) {
          input.reset(btn.value, btn.checked);
        }
      });
    });
  }
}
