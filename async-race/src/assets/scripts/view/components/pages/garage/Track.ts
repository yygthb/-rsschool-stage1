import { ICar } from '../../../../model/model';
import { INodeProps, NodeElement } from '../../../../utils/nodeElement';
import Car from './Car';

class Track extends NodeElement {
  private car!: Car;
  private carInfo!: ICar;
  private carTitle!: NodeElement;
  private animationDuration;
  private requestId;

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

  setCarName(name: string) {
    this.carTitle.node.innerHTML = name;
  }

  performAnimation() {
    const { width: trackWidth } = this.node.getBoundingClientRect();
    const { width: carWidth } = this.car.node.getBoundingClientRect();

    const framesCount = (this.animationDuration / 1000) * 60;
    let currentML = 0;
    const end = ((trackWidth - carWidth) * 100) / trackWidth;
    const dx = end / framesCount;

    const step = () => {
      currentML += dx;
      this.car.node.style.marginLeft = `${Math.floor(currentML)}%`;

      if (currentML < end) {
        this.requestId = requestAnimationFrame(step);
      } else {
        this.car.node.style.marginLeft = `calc(100% - ${carWidth}px)`;
      }
    };

    step();
  }

  startCarAnimation(time: number) {
    this.animationDuration = time;
    this.requestId = requestAnimationFrame(this.performAnimation.bind(this));
  }

  carStopAnimation() {
    cancelAnimationFrame(this.requestId);
  }

  resetCarPosition() {
    cancelAnimationFrame(this.requestId);
    this.car.node.style.marginLeft = '0';
  }
}

export default Track;
