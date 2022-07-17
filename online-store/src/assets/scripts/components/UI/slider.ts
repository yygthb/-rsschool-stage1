import { INodeProps, NodeElement } from '../../utils/nodeElement';
import * as noUiSlider from 'nouislider';

export type ISliderCb = (value: [number, number]) => void;

export class Slider extends NodeElement {
  private slider!: noUiSlider.target;
  private sliderInfo!: NodeElement;
  private spanMin!: NodeElement;
  private spanMax!: NodeElement;
  private _range!: [number, number];

  get range() {
    return this._range;
  }

  set range([min, max]: [number, number]) {
    this._range = [min, max];
  }

  constructor(nodeProps: INodeProps) {
    super({ ...nodeProps, classNames: `slider ${nodeProps.classNames}` });
  }

  init(
    cb: ISliderCb,
    [min, max, step]: [number, number, number],
    [start, end]: [number, number] = [min, max]
  ) {
    this.slider = this.node as noUiSlider.target;

    this.range = [min, max];

    noUiSlider.create(this.slider, {
      start: [start, end],
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

    this.sliderInfo = new NodeElement({
      parentNode: this.node,
      classNames: 'slider__info',
    });

    this.spanMin = new NodeElement({
      parentNode: this.sliderInfo.node,
      tagName: 'p',
      classNames: 'slider-value slider-value-min',
      content: 'min val',
    });

    this.spanMax = new NodeElement({
      parentNode: this.sliderInfo.node,
      tagName: 'p',
      classNames: 'slider-value slider-value-max',
      content: 'max val',
    });

    this.spanMin.updateContent(start.toString());
    this.spanMax.updateContent(end.toString());

    if (this.slider.noUiSlider) {
      this.slider.noUiSlider.on('change', this.sliderHandler.bind(this));
      this.slider.noUiSlider.on(
        'change',
        function ([valueMin, valueMax]: (string | number)[]) {
          cb([+valueMin, +valueMax]);
        }
      );
    }
  }

  private sliderHandler = ([valueMin, valueMax]: (string | number)[]) => {
    this.spanMin.updateContent(valueMin.toString());
    this.spanMax.updateContent(valueMax.toString());
  };

  reset() {
    if (this.slider.noUiSlider) {
      const [min, max] = this.range;
      this.slider.noUiSlider.set([min, max]);
      this.spanMin.updateContent(min.toString());
      this.spanMax.updateContent(max.toString());
    }
  }
}
