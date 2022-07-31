import Api from '../api/api';
import Model, { Navigation } from '../model/model';
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
  }

  async init() {
    this.view.initNav(this.model.navTitles, this.clickNavBtn.bind(this));
    this.setActiveNavBtn();

    this.api = new Api(BASE_URL);
    const [garage, winners] = await this.getContent();
    this.view.initContent(garage, winners);
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
}

export default Controller;
