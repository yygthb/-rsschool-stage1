import { INodeProps, NodeElement } from '../../utils/nodeElement';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

export type ISliderCb = (value: [number, number]) => void;

export class Slider extends NodeElement {
  constructor(nodeProps: INodeProps) {
    super({ ...nodeProps, classNames: `slider ${nodeProps.classNames}` });
  }

  init(cb: ISliderCb, [min, max, step]: [number, number, number]) {
    const slider = this.node as noUiSlider.target;

    noUiSlider.create(slider, {
      start: [min, max],
      connect: true,
      step: step,
      range: {
        min: min,
        max: max,
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

    const sliderInfo = new NodeElement({
      parentNode: this.node,
      classNames: 'slider__info',
    });
    const spanMin = new NodeElement({
      parentNode: sliderInfo.node,
      tagName: 'p',
      classNames: 'slider-value slider-value-min',
      content: min.toString(),
    });
    const spanMax = new NodeElement({
      parentNode: sliderInfo.node,
      tagName: 'p',
      classNames: 'slider-value slider-value-max',
      content: max.toString(),
    });

    if (slider.noUiSlider) {
      slider.noUiSlider.on(
        'change',
        function ([valueMin, valueMax]: (string | number)[]) {
          spanMin.updateContent(valueMin.toString());
          spanMax.updateContent(valueMax.toString());
          cb([+valueMin, +valueMax]);
        }
      );
    }
  }
}
