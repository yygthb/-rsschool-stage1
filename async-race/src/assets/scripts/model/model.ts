export enum Navigation {
  ToGarage = 'To Garage',
  ToWinners = 'To Winners',
}

export interface ICar {
  id: number;
  color: string;
  name: string;
  velocity?: number;
  distance?: number;
}

export type ICarInfo = Pick<ICar, 'color' | 'name'>;

export interface IWinner extends ICar {
  wins: number;
  time: number;
}

class Model {
  navTitles: Navigation[];
  private _activePage!: Navigation;
  private _garage: ICar[] = [];
  private _winners: IWinner[] = [];
  private _selectedCar!: ICar;

  get activePage() {
    return this._activePage;
  }

  set activePage(val: Navigation) {
    this._activePage = val;
  }

  get garage() {
    return this._garage;
  }

  set garage(val: ICar[]) {
    this._garage = [...val];
  }

  get winners() {
    return this._winners;
  }

  set winners(val: IWinner[]) {
    const arr = [...val];
    this._winners = arr.map((winner) => ({
      ...winner,
      ...this.garage.find((car) => car.id === winner.id),
    }));
    this.winnersSort();
  }

  set selectedCar(val: ICar) {
    this._selectedCar = val;
  }

  get selectedCar(): ICar {
    return this._selectedCar;
  }

  constructor() {
    this.navTitles = [Navigation.ToGarage, Navigation.ToWinners];
    this.activePage = Navigation.ToGarage;
  }

  addNewCar(car: ICar) {
    this.garage.push(car);
  }

  carUpdate(id: number, props: Record<string, ICar>) {
    const carIndex = this.garage.findIndex((item) => item.id === id);
    this._garage[carIndex] = { ...this._garage[carIndex], ...props };
    return this._garage[carIndex];
  }

  carDelete(id: number) {
    this.garage.filter((car) => car.id !== id);
  }

  winnerDelete(id: number) {
    this.winners.filter((car) => car.id !== id);
  }

  winnersSort() {
    this.winners.sort((a, b) => +b.wins - +a.wins);
  }
}

export default Model;
