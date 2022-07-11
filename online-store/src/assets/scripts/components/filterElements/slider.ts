import { INodeProps, NodeElement } from '../../utils/nodeElement';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { Input } from './input';

export type ISliderCb = (value: [number, number]) => void;

export class Slider extends NodeElement {
  constructor(nodeProps: INodeProps) {
    super(nodeProps);
  }

  init(cb: ISliderCb) {
    const slider = this.node as noUiSlider.target;

    noUiSlider.create(slider, {
      start: [0, 10000],
      connect: true,
      step: 1000,
      range: {
        min: 0,
        max: 10000,
      },
      format: {
        from: function (value) {
          return parseInt(value);
        },
        to: function (value) {
          return parseInt(value.toString());
        },
      },
    });

    const input1 = new Input({
      parentNode: this.node,
      classNames: 'filter__slider-min',
    });
    const inputMin = input1.node as HTMLInputElement;
    const input2: Input = new Input({
      parentNode: this.node,
      classNames: 'filter__slider-max',
    });
    const inputMax = input2.node as HTMLInputElement;

    if (slider.noUiSlider) {
      slider.noUiSlider.on(
        'change',
        function ([valueMin, valueMax]: (string | number)[]) {
          inputMin.value = valueMin.toString();
          inputMax.value = valueMax.toString();
          cb([+valueMin, +valueMax]);
        }
      );
    }
  }
}
