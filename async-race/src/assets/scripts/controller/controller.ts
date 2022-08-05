import Api, { ApiMethod } from '../api/api';
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

    emitter.add(EmitterEvents.UPDATE_CAR, this.updateCar.bind(this));
    emitter.add(EmitterEvents.DELETE_CAR, this.deleteCar.bind(this));
  }

  async init() {
    this.view.initNav(this.model.navTitles, this.clickNavBtn.bind(this));
    this.setActiveNavBtn();

    this.api = new Api(BASE_URL);
    const [garage, winners] = await this.getContent();
    this.view.renderContent(garage, winners);
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
    }
  }

  async deleteCar(id: number) {
    const res = await this.api.deleteCar(id);
    if (res && res.status === 200) {
      this.model.deleteCar(id);
      this.view.deleteCar(id);
    }
  }
}

export default Controller;
