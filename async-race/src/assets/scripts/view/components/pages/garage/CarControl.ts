import { ICarInfo } from '../../../../model/model';
import { INodeProps, NodeElement } from '../../../../utils/nodeElement';
import Button from '../../../ui/Button';
import Color from '../../../ui/Color';
import Input from '../../../ui/Input';

class CarControl extends NodeElement {
  private title: NodeElement;
  private wrapper: NodeElement;
  private carName: Input;
  private carColor: Color;
  private btn: Button;

  constructor(nodeProps: INodeProps, title = '', btnTitle = '') {
    super({
      ...nodeProps,
      classNames: 'garage-config__car',
    });

    this.title = new NodeElement({
      parentNode: this.node,
      tagName: 'p',
      classNames: 'garage-config__title',
      content: title,
    });

    this.wrapper = new NodeElement({
      parentNode: this.node,
      classNames: 'garage-config__wrapper',
    });

    this.carName = new Input({
      parentNode: this.wrapper.node,
    });

    this.carColor = new Color({
      parentNode: this.wrapper.node,
    });

    this.btn = new Button({
      parentNode: this.wrapper.node,
      content: btnTitle,
    });
  }

  carControlCb(cb: (obj: ICarInfo) => void) {
    this.btn.click(() => {
      cb({
        name: this.carName.getValue(),
        color: this.carColor.getValue(),
      });
    });
  }

  reset() {
    this.carName.clear();
    this.carColor.clear();
  }
}

export default CarControl;
