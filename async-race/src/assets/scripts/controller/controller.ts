import Api, { ApiMethod, EngineStatus } from '../api/api';
import Model, { ICar, Navigation } from '../model/model';
import { EmitterEvents } from '../types/types';
import emitter from '../utils/eventEmitter';
import App from '../view/app';
import Button from '../view/ui/Button';

const BASE_URL = 'http://127.0.0.1:3000';

class Controller {
  private view: App;
  private model: Model;
  private api!: Api;

  constructor(view: App, model: Model) {
    this.view = view;
    this.model = model;

    this.init();

    emitter.add(EmitterEvents.SELECT_CAR, this.selectCar.bind(this));
    emitter.add(EmitterEvents.UPDATE_CAR, this.updateCar.bind(this));
    emitter.add(EmitterEvents.DELETE_CAR, this.deleteCar.bind(this));

    emitter.add(EmitterEvents.START_ENGINE, this.engineStart.bind(this));
    emitter.add(EmitterEvents.STOP_ENGINE, this.engineStop.bind(this));
  }

  async init() {
    this.view.initNav(this.model.navTitles, this.clickNavBtn.bind(this));
    this.setActiveNavBtn();

    this.api = new Api(BASE_URL);
    const [garage, winners] = await this.getContent();
    this.view.renderContent(garage, winners);

    console.log('Garage: ', garage);
  }

  clickNavBtn(val: Button) {
    if (val.node.textContent === Navigation.ToGarage) {
      this.model.activePage = Navigation.ToGarage;
    }
    if (val.node.textContent === Navigation.ToWinners) {
      this.model.activePage = Navigation.ToWinners;
    }
    this.setActiveNavBtn();
  }

  setActiveNavBtn() {
    this.view.setActiveNavItem(this.model.activePage);
  }

  async getContent() {
    const garageData = await this.api.getGarage();
    this.model.garage = garageData;
    const winnersData = await this.api.getWinners();
    this.model.winners = winnersData;

    return [this.model.garage, this.model.winners];
  }

  async updateCar(props: [ApiMethod, ICar]) {
    const [method, car] = props;
    if (car.name.trim()) {
      if (method === ApiMethod.CREATE) {
        const res = await this.api.createCar(car);
        if (res && res.status === 201) {
          const newCar = await res.json();
          this.model.garage.push(newCar);
          this.view.addCar(newCar);
        }
      }
      if (method === ApiMethod.UPDATE) {
        const res = await this.api.updateCar(
          this.model.selectedCar?.id || 0,
          car,
        );
        if (res && res.status === 200) {
          const newCar = await res.json();
          this.model.updateCar(newCar);
          this.view.updateCar(newCar);
        }
      }
    }
  }

  async selectCar(id: number) {
    const selectedCar = await this.api.getCar(id);
    this.model.selectedCar = selectedCar;
    this.view.selectCar(selectedCar);
  }

  async deleteCar(id: number) {
    const res = await this.api.deleteCar(id);
    if (res && res.status === 200) {
      this.model.deleteCar(id);
      this.view.deleteCar(id);
    }
  }

  async engineStart(carInfo: ICar) {
    const car = await this.api.engine(EngineStatus.START, carInfo.id);
    const updatedCar = {
      ...carInfo,
      velocity: car.velocity,
      distance: car.distance,
    };
    this.model.updateCar(updatedCar);
    this.view.driveCar(updatedCar);
  }

  async engineStop(carInfo: ICar) {
    const car = await this.api.engine(EngineStatus.STOP, carInfo.id);
    const updatedCar = {
      ...carInfo,
      velocity: car.velocity,
      distance: car.distance,
    };
    this.model.updateCar(updatedCar);
    this.view.stopCar(updatedCar);
  }
}

export default Controller;
