import { ICar, Navigation } from '../model/model';
import { NodeElement } from '../utils/nodeElement';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import { ClickNavCb } from './ui/Button';

class App extends NodeElement {
  private header: Header;
  private main: Main;

  constructor(selector: string) {
    super({});

    this.node = <HTMLElement>document.querySelector(selector);

    this.header = new Header({
      parentNode: this.node,
    });

    this.main = new Main({
      parentNode: this.node,
    });

    new Footer({
      parentNode: this.node,
    });
  }

  initNav(navTitles: Navigation[], clickNavCb: ClickNavCb) {
    this.header.initNav(navTitles, clickNavCb);
  }

  renderContent(garage: ICar[], winners) {
    this.main.renderGarage(garage);
    this.main.renderWinners(winners);
  }

  addCar(newCar: ICar) {
    this.main.addNewCar(newCar);
  }

  selectCar(car: ICar) {
    this.main.selectCar(car);
  }

  updateCar(car: ICar) {
    this.main.updateCar(car);
  }

  deleteCar(id: number) {
    this.main.deleteCar(id);
  }

  setActiveNavItem(val: Navigation) {
    this.header.setActiveNavItem(val);
    this.main.setContentSection(val);
  }
}

export default App;
