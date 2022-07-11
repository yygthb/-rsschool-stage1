import { NodeElement, INodeProps } from '../utils/nodeElement';
import { IInputCb, Input } from './filterElements/input';
import { ISelectCb, Select } from './filterElements/select';
import { Slider } from './filterElements/slider';

export class StoreFilter extends NodeElement {
  private select: Select;
  private input: Input;
  private slider: Slider;

  constructor(nodeProps: INodeProps) {
    super(nodeProps);

    this.select = new Select({
      parentNode: this.node,
      tagName: 'select',
      classNames: 'filter__element filter__element-select',
    });

    this.input = new Input({
      parentNode: this.node,
      classNames: 'filter__element filter__element-input',
      attributes: [['placeholder', 'Find by model']],
    });

    this.slider = new Slider({
      parentNode: this.node,
      classNames: 'filter__element filter__element-slider',
    });
  }

  init(sortCb: ISelectCb, inputCb: IInputCb) {
    this.select.init(sortCb);
    this.input.init(inputCb);
    this.slider.init();
  }
}
