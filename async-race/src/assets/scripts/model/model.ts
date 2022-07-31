export enum Navigation {
  ToGarage = 'To Garage',
  ToWinners = 'To Winners',
}

class Model {
  navTitles: Navigation[];
  private _activePage!: Navigation;

  get activePage() {
    return this._activePage;
  }

  set activePage(val: Navigation) {
    this._activePage = val;
  }

  constructor() {
    this.navTitles = [Navigation.ToGarage, Navigation.ToWinners];
    this.activePage = Navigation.ToGarage;
  }
}

export default Model;
