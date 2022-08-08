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

    this.init();
  }

  init() {
    this.garage = new Garage(
      { parentNode: this.content.node },
      new GarageControl({}),
    );
    this.sections.push(this.garage);
    this.winners = new Winners({ parentNode: this.content.node });
    this.sections.push(this.winners);
  }

  renderGarage(garageData: ICar[]) {
    this.garage.renderCars(garageData);
  }

  carMethod<T>(fnTitle: string, car: T) {
    this.garage.carMethod(fnTitle, car);
  }

  renderWinners(winnersData: IWinner[]) {
    this.winners.renderWinners(winnersData);
  }

  winnerDelete(id: number) {
    this.winners.winnerDelete(id);
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
