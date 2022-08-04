import { ICar, Navigation, IWinner } from '../../model/model';
import { INodeProps, NodeElement } from '../../utils/nodeElement';
import Garage from './pages/Garage';
import Winners from './pages/Winners';

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
    this.garage = new Garage({ parentNode: this.content.node });
    this.sections.push(this.garage);
    this.winners = new Winners({ parentNode: this.content.node });
    this.sections.push(this.winners);
  }

  renderGarage(garageData: ICar[]) {
    console.log('renderGarage: ', garageData);
    this.garage.renderCars(garageData);
  }

  renderWinners(winnersData: IWinner[]) {
    // console.log('renderWinners: ', winnersData);
    this.winners.renderWinners(winnersData);
  }

  hideSections() {
    this.sections.forEach((section) => section.node.classList.remove('active'));
  }

  setContentSection(val: Navigation) {
    this.hideSections();
    if (val === Navigation.ToGarage) {
      // this.garage.node.classList.add('active');
      this.garage.show();
    }
    if (val === Navigation.ToWinners) {
      // this.winners.node.classList.add('active');
      this.winners.show();
    }
  }
}

export default Main;
