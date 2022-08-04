import { ICar } from '../../../../model/model';
import { INodeProps, NodeElement } from '../../../../utils/nodeElement';
import Button from '../../../ui/Button';
import Car from './Car';

class GarageItem extends NodeElement {
  private _carInfo!: ICar;
  private engineControls!: NodeElement;
  private start!: Button;
  private stop!: Button;
  private carControls!: NodeElement;
  private edit!: Button;
  private delete!: Button;
  private track!: NodeElement;
  private car!: Car;

  get carInfo() {
    return this._carInfo;
  }

  set carInfo(val: ICar) {
    this._carInfo = val;
  }

  constructor(nodeProps: INodeProps, car: ICar) {
    super({
      ...nodeProps,
      classNames: 'garage__line',
    });

    this.carInfo = car;
    this.init();
  }

  init() {
    this.engineControls = new NodeElement({
      parentNode: this.node,
      classNames: 'engine-controls',
    });
    this.start = new Button({
      parentNode: this.engineControls.node,
      content: 'Start',
    });
    this.start = new Button({
      parentNode: this.engineControls.node,
      content: 'Stop',
    });

    this.carControls = new NodeElement({
      parentNode: this.node,
      classNames: 'car-controls',
    });
    this.edit = new Button({
      parentNode: this.carControls.node,
      content: 'Edit',
    });
    this.delete = new Button({
      parentNode: this.carControls.node,
      content: 'Delete',
    });

    this.track = new NodeElement({
      parentNode: this.node,
      classNames: 'car-track',
    });
    this.car = new Car({
      parentNode: this.track.node,
    });

    this.delete.node.onclick = () => {
      console.log('delete car', this.carInfo.id);
      // this.destroy();
    };
  }

  setColor(color: string) {
    this.car.setColor(color);
  }
}

export default GarageItem;
