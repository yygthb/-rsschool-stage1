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
    emitter.add(EmitterEvents.STOP_ENGINE, this.resetCarPosition.bind(this));
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

  async selectCar(id: number) {
    const selectedCar = await this.api.getCar(id);
    this.model.selectedCar = selectedCar;
    this.view.carMethod('selectCar', this.model.selectedCar);
  }

  async updateCar(props: [ApiMethod, ICar]) {
    const [method, car] = props;
    if (car.name.trim()) {
      if (method === ApiMethod.CREATE) {
        const res = await this.api.createCar(car);
        if (res && res.status === 201) {
          const newCar = await res.json();
          this.model.addNewCar(newCar);
          this.view.carMethod('addNewCar', newCar);
        }
      }
      if (method === ApiMethod.UPDATE) {
        const res = await this.api.updateCar(
          this.model.selectedCar?.id || 0,
          car,
        );
        if (res && res.status === 200) {
          const newCar = await res.json();
          this.model.updateCar(newCar.id, newCar);
          this.view.carMethod('updateCar', newCar);
        }
      }
    }
  }

  async deleteCar(id: number) {
    const res = await this.api.deleteCar(id);
    if (res && res.status === 200) {
      this.model.deleteCar(id);
      this.view.carMethod('deleteCar', id);
    }
  }

  async engineStart(carInfo: ICar) {
    const data = await this.api.engine(EngineStatus.START, carInfo.id);
    if (data && data.status === 200) {
      const car = await data.json();
      const updatedCar = this.model.updateCar(carInfo.id, {
        velocity: car.velocity,
        distance: car.distance,
      });
      this.view.carMethod('driveCar', updatedCar);
      const drive = await this.driveCar(carInfo.id);
      if (drive && drive.status === 500) {
        this.view.carMethod('stopCar', carInfo.id);
      }
      await this.engineStop(carInfo.id);
    }
  }

  async driveCar(id: number) {
    const data = await this.api.engine(EngineStatus.DRIVE, id);
    return data;
  }

  async engineStop(id: number) {
    const data = await this.api.engine(EngineStatus.STOP, id);
    if (data && data.status === 200) {
      const car = await data.json();
      const updatedCar = {
        velocity: car.velocity,
        distance: car.distance,
      };
      this.model.updateCar(id, updatedCar);
    }
  }

  async resetCarPosition(id: number) {
    this.view.carMethod('resetCarPosition', id);
    await this.engineStop(id);
  }
}

export default Controller;
