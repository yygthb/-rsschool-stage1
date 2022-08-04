import { ICar } from '../../../model/model';
import { INodeProps, NodeElement } from '../../../utils/nodeElement';
import Car from './Car';
import ContentSection from './ContentSection';

class Garage extends ContentSection {
  private garage: NodeElement[] = [];

  constructor(nodeProps: INodeProps) {
    super(
      {
        ...nodeProps,
        tagName: 'section',
        classNames: 'content__garage',
      },
      'GARAGE',
    );
  }

  renderCars(data: ICar[] = []) {
    data.forEach((car) => {
      const carItem = new Car({
        parentNode: this.node,
        content: `${car.id} - ${car.name}`,
      });
      this.garage.push(carItem);
    });

    this.showTotalCount(data.length);
  }
}

export default Garage;
