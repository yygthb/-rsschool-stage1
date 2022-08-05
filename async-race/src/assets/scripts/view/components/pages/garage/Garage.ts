import { ICar } from '../../../../model/model';
import { INodeProps, NodeElement } from '../../../../utils/nodeElement';
import GarageItem from './GarageItem';
import ContentSection from '../ContentSection';
import GarageControl from './GarageControl';

class Garage extends ContentSection {
  private garage: GarageItem[] = [];
  private controls: GarageControl;
  private track: NodeElement;

  constructor(nodeProps: INodeProps, controls: GarageControl) {
    super(
      {
        ...nodeProps,
        tagName: 'section',
        classNames: 'content__garage',
      },
      'GARAGE',
    );

    this.controls = controls;
    this.node.append(this.controls.node);

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
        car,
      );
      this.garage.push(garageItem);
    });

    this.showTotalCount(data.length);
  }

  addNewCar(newCar: ICar) {
    const garageItem = new GarageItem(
      {
        parentNode: this.track.node,
      },
      newCar,
    );

    const carControl = Object.entries(this.controls)[1][1];
    carControl.reset();

    this.garage.push(garageItem);
    this.showTotalCount(this.garage.length);
  }

  deleteCar(id: number) {
    this.garage = this.garage.filter((car) => {
      if (car.carInfo.id === id) {
        car.destroy();
        return false;
      }
      return true;
    });
    this.showTotalCount(this.garage.length);
  }
}

export default Garage;
