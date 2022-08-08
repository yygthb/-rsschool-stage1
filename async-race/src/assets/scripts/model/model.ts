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

export interface IWinner extends ICar {
  wins: number;
  time: number;
}

class Model {
  navTitles: Navigation[];
  private _activePage!: Navigation;
  private _garage: ICar[] = [];
  private _winners: IWinner[] = [];
  private _selectedCar: ICar | null = null;

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
  }

  set selectedCar(val: ICar | null) {
    this._selectedCar = val;
  }

  get selectedCar(): ICar | null {
    return this._selectedCar;
  }

  constructor() {
    this.navTitles = [Navigation.ToGarage, Navigation.ToWinners];
    this.activePage = Navigation.ToGarage;
  }

  updateCar(car: ICar) {
    const carIndex = this.garage.findIndex((item) => item.id === car.id);
    this._garage[carIndex] = { ...car };
  }

  deleteCar(id: number) {
    this.garage.filter((car) => car.id !== id);
  }
}

export default Model;
