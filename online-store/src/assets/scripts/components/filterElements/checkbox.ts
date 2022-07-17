import { INodeProps, NodeElement } from '../../utils/nodeElement';
import { Input } from '../UI/Input';

type RadioInput = {
  id: string;
  content: string;
  value: string;
  checked: boolean;
};

export type CheckboxCbValue = string[];
export type ICheckBoxCb = (values: CheckboxCbValue) => void;

export class CheckBox extends NodeElement {
  private inputs: Array<Input> = [];
  private colors: string[] = [];

  constructor(nodeProps: INodeProps) {
    super({
      ...nodeProps,
      classNames: `checkbox__container ${nodeProps.classNames}`,
    });
  }

  init(cb: ICheckBoxCb, btns: Array<RadioInput>) {
    btns.forEach((checkbox) => {
      if (checkbox.checked) {
        this.colors.push(checkbox.value);
      }
      const input = new Input({
        parentNode: this.node,
        attributes: [
          ['type', 'checkbox'],
          ['id', `${checkbox.id}-${checkbox.value}`],
          ['value', checkbox.value],
          ['name', checkbox.id],
        ],
      });
      const callback = (value: string) => {
        if (this.colors.includes(value)) {
          this.colors = this.colors.filter((color) => color !== value);
        } else {
          this.colors.push(value);
        }
        cb(this.colors);
      };
      input.init(callback, checkbox.checked);
      new NodeElement({
        parentNode: this.node,
        tagName: 'label',
        classNames: `label label-${checkbox.value}`,
        attributes: [['for', `${checkbox.id}-${checkbox.value}`]],
      });
      this.inputs.push(input);
    });
  }

  reset(defaultBtns: Array<RadioInput>) {
    this.colors = [];
    this.inputs.forEach((input) => {
      defaultBtns.forEach((btn) => {
        if (btn.value === input.value) {
          input.reset(btn.value, btn.checked);
        }
      });
    });
  }
}
