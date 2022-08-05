import { ICar } from '../model/model';

enum Route {
  CARS = '/garage/',
  MOVING = '/engine',
  WINNERS = '/winners',
}

export enum ApiMethod {
  CREATE = 'POST',
  UPDATE = 'PUT',
  DELETE = 'DELETE',
}

function catchError(error: unknown) {
  if (typeof error === 'string') {
    throw new Error(error);
  } else if (error instanceof Error) {
    throw new Error(error.message);
  }
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
      catchError(error);
      return [];
    }
  }

  async getGarage() {
    return this.getData(Route.CARS);
  }

  async getWinners() {
    return this.getData(Route.WINNERS);
  }

  async createCar(data: ICar) {
    try {
      const res = await fetch(this.url + Route.CARS, {
        method: ApiMethod.CREATE,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return res;
    } catch (error) {
      catchError(error);
      return false;
    }
  }

  async deleteCar(id: number) {
    try {
      const res = await fetch(this.url + Route.CARS + id, {
        method: ApiMethod.DELETE,
      });
      return res;
    } catch (error) {
      catchError(error);
      return false;
    }
  }
}

export default Api;
