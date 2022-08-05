import { ICar, Navigation, IWinner } from '../../model/model';
import { INodeProps, NodeElement } from '../../utils/nodeElement';
import Garage from './pages/garage/Garage';
import GarageControl from './pages/garage/GarageControl';
import Winners from './pages/winners/Winners';

class Main extends NodeElement {
  private content: NodeElement;
  private garage!: Garage;
  private winners!: Winners;
  private sections: NodeElement[] = [];

  constructor(nodeProps: INodeProps) {
    super({
      ...nodeProps,
      classNames: 'main',
    });

    this.content = new NodeElement({
      parentNode: this.node,
      classNames: 'main__content content',
    });
  }

  init(cb) {
    this.garage = new Garage(
      { parentNode: this.content.node },
      new GarageControl({}, cb),
    );
    this.sections.push(this.garage);
    this.winners = new Winners({ parentNode: this.content.node });
    this.sections.push(this.winners);
  }

  renderGarage(garageData: ICar[]) {
    this.garage.renderCars(garageData);
  }

  addNewCar(newCar: ICar) {
    this.garage.addNewCar(newCar);
  }

  renderWinners(winnersData: IWinner[]) {
    this.winners.renderWinners(winnersData);
  }

  hideSections() {
    this.sections.forEach((section) => section.node.classList.remove('active'));
  }

  setContentSection(val: Navigation) {
    this.hideSections();
    if (val === Navigation.ToGarage) {
      this.garage.show();
    }
    if (val === Navigation.ToWinners) {
      this.winners.show();
    }
  }
}

export default Main;
