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

    const newCarControl = Object.entries(this.controls)[1][1];
    newCarControl.reset();

    this.garage.push(garageItem);
    this.showTotalCount(this.garage.length);
  }

  selectCar(car: ICar | null) {
    const editCarControl = Object.entries(this.controls)[2][1];
    if (car) {
      editCarControl.carName.setValue(car.name);
      editCarControl.carColor.setValue(car.color);
    } else {
      editCarControl.reset();
    }
  }

  updateCar(car: ICar) {
    const foundIndex = this.garage.findIndex(
      (item) => item.carInfo.id === car.id,
    );
    const foundCar = this.garage[foundIndex];
    foundCar.setCarName(car.name);
    foundCar.setCarColor(car.color);
    this.selectCar(null);
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

  driveCar(car: ICar) {
    const foundIndex = this.garage.findIndex(
      (item) => item.carInfo.id === car.id,
    );
    const foundCar = this.garage[foundIndex];
    if (car.distance && car.velocity) {
      foundCar.driveCar(car.distance / car.velocity);
    }
  }

  stopCar(id: number) {
    const foundIndex = this.garage.findIndex(
      (item) => item.carInfo.id === id,
    );
    const foundCar = this.garage[foundIndex];
    foundCar.stopCar();
  }

  resetCarPosition(id: number) {
    const foundIndex = this.garage.findIndex(
      (item) => item.carInfo.id === id,
    );
    const foundCar = this.garage[foundIndex];
    foundCar.resetCarPosition();
  }
}

export default Garage;
