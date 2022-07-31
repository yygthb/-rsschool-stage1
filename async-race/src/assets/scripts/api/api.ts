enum Route {
  CARS = '/garage',
  CAR = '/garage/:',
  MOVING = '/engine',
  WINNERS = '/winners',
}

class Api {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  async getData(route: string) {
    try {
      const res = await fetch(this.url + route);
      if (res.ok === true) {
        const data = await res.json();
        return data;
      }
      return [];
    } catch (error) {
      if (typeof error === 'string') {
        throw new Error(error);
      } else if (error instanceof Error) {
        throw new Error(error.message);
      }
      return [];
    }
  }

  async getGarage() {
    return this.getData(Route.CARS);
  }

  async getWinners() {
    return this.getData(Route.WINNERS);
  }
}

export default Api;
