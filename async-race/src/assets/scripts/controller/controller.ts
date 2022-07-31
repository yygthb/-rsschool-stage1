import Model, { Navigation } from '../model/model';
import App from '../view/app';
import Button from '../view/ui/Button';

class Controller {
  private view: App;
  private model: Model;

  constructor(view: App, model: Model) {
    this.view = view;
    this.model = model;

    this.init();
  }

  init() {
    this.view.initNav(this.model.navTitles, this.clickNavBtn.bind(this));
    this.setActiveNavBtn();
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
}

export default Controller;
