import { ICar } from '../../../../model/model';
import { INodeProps, NodeElement } from '../../../../utils/nodeElement';
import GarageItem from './GarageItem';
import ContentSection from '../ContentSection';
import GarageControl from './GarageControl';
import RaceControl from './RaceControl';

class Garage extends ContentSection {
  private garage: GarageItem[] = [];
  private controls: GarageControl;
  private carsContainer: NodeElement;

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
    new RaceControl({
      parentNode: this.node,
    });

    this.carsContainer = new NodeElement({
      parentNode: this.node,
      classNames: 'garage__cars',
    });
  }

  findCarInGarage(id: number) {
    const foundIndex = this.garage.findIndex((item) => item.carInfo.id === id);
    return this.garage[foundIndex];
  }

  renderCars(data: ICar[] = []) {
    data.forEach((car) => {
      const garageItem = new GarageItem(
        {
          parentNode: this.carsContainer.node,
        },
        car,
      );
      this.garage.push(garageItem);
    });

    this.showTotalCount(data.length);
  }

  addNewCar(car: ICar) {
    const garageItem = new GarageItem(
      {
        parentNode: this.carsContainer.node,
      },
      car,
    );

    const newCarControl = Object.entries(this.controls)[1][1];
    newCarControl.reset();

    this.garage.push(garageItem);
    this.showTotalCount(this.garage.length);
  }

  carMethod<T>(fnTitle: string, props: T) {
    this[fnTitle].call(this, props);
  }

  carSelect(car: ICar | null) {
    const editCarControl = Object.entries(this.controls)[2][1];
    if (car) {
      editCarControl.carName.setValue(car.name);
      editCarControl.carColor.setValue(car.color);
    } else {
      editCarControl.reset();
    }
  }

  carUpdate(car: ICar) {
    const foundedCar = this.findCarInGarage(car.id);
    foundedCar.setCarName(car.name);
    foundedCar.setCarColor(car.color);
    this.carSelect(null);
  }

  carDelete(id: number) {
    this.garage = this.garage.filter((car) => {
      if (car.carInfo.id === id) {
        car.destroy();
        return false;
      }
      return true;
    });
    this.showTotalCount(this.garage.length);
  }

  carDrive(car: ICar) {
    const foundedCar = this.findCarInGarage(car.id);
    if (car.distance && car.velocity) {
      foundedCar.carDrive(car.distance / car.velocity);
    }
  }

  carStop(id: number) {
    const foundedCar = this.findCarInGarage(id);
    foundedCar.carStop();
  }

  resetCarPosition(id: number) {
    const foundedCar = this.findCarInGarage(id);
    foundedCar.resetCarPosition();
  }
}

export default Garage;
