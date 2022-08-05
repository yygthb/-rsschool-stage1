import { ICar } from '../../../../model/model';
import { INodeProps, NodeElement } from '../../../../utils/nodeElement';
import Car from './Car';

class Track extends NodeElement {
  private car!: Car;
  private carInfo!: ICar;
  private carTitle!: NodeElement;

  constructor(nodeProps: INodeProps, carInfo: ICar) {
    super({
      ...nodeProps,
      classNames: 'car-track',
    });

    this.carTitle = new NodeElement({
      parentNode: this.node,
      content: carInfo.name,
      classNames: 'car-title',
    });

    this.car = new Car({
      parentNode: this.node,
    });
    this.carInfo = carInfo;

    this.init();
  }

  init() {}

  setCarColor(color: string) {
    this.car.setColor(color);
  }
}

export default Track;
