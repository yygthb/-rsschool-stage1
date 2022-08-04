import { ICar } from '../../../model/model';
import { INodeProps, NodeElement } from '../../../utils/nodeElement';
import GarageItem from './units/GarageItem';
import ContentSection from './ContentSection';

class Garage extends ContentSection {
  private garage: NodeElement[] = [];
  private track: NodeElement;

  constructor(nodeProps: INodeProps) {
    super(
      {
        ...nodeProps,
        tagName: 'section',
        classNames: 'content__garage',
      },
      'GARAGE'
    );

    this.track = new NodeElement({
      parentNode: this.node,
      classNames: 'garage__cars',
    });
  }

  renderCars(data: ICar[] = []) {
    data.forEach((car) => {
      const garageItem = new GarageItem(
        {
          parentNode: this.track.node,
        },
        car
      );
      garageItem.setColor(car.color);

      this.garage.push(garageItem);
    });

    this.showTotalCount(data.length);
  }
}

export default Garage;
