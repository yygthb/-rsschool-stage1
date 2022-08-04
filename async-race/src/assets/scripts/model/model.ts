export enum Navigation {
  ToGarage = 'To Garage',
  ToWinners = 'To Winners',
}

export interface ICar {
  id: number;
  color: string;
  name: string;
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

  constructor() {
    this.navTitles = [Navigation.ToGarage, Navigation.ToWinners];
    this.activePage = Navigation.ToGarage;
  }
}

export default Model;
