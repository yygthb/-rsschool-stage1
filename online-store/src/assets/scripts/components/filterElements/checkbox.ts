import { INodeProps, NodeElement } from '../../utils/nodeElement';
import { Input } from '../UI/input';

type RadioInput = {
  id: string;
  content: string;
  value: string;
  checked: boolean;
};

export type CheckboxCbValue = string[];
export type ICheckBoxCb = (values: CheckboxCbValue) => void;

export class SelectCheckbox extends NodeElement {
  constructor(nodeProps: INodeProps) {
    super({
      ...nodeProps,
      classNames: `checkbox__container ${nodeProps.classNames}`,
    });
  }

  init(cb: ICheckBoxCb, btns: Array<RadioInput>) {
    let colors: string[] = [];

    btns.forEach((checkbox) => {
      if (checkbox.checked) {
        colors.push(checkbox.value);
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
        if (colors.includes(value)) {
          colors = colors.filter((color) => color !== value);
        } else {
          colors.push(value);
        }
        cb(colors);
      };
      input.init(callback, checkbox.checked);
      new NodeElement({
        parentNode: this.node,
        tagName: 'label',
        content: checkbox.content,
        attributes: [['for', `${checkbox.id}-${checkbox.value}`]],
      });
    });
  }
}
