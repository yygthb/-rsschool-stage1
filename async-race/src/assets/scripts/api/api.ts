import { ICar } from '../model/model';

enum Route {
  CARS = '/garage/',
  ENGINE = '/engine',
  WINNERS = '/winners',
}

export enum ApiMethod {
  CREATE = 'POST',
  UPDATE = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export enum EngineStatus {
  START = 'started',
  STOP = 'stopped',
  DRIVE = 'drive',
}

function catchError(error) {
  if (error instanceof Error) {
    console.log(error.message);
  } else {
    console.log('Unexpected error', error);
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
      const data = await res.json();
      return data;
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

  async carUpdate(id: number, data: ICar) {
    try {
      const res = await fetch(this.url + Route.CARS + id || '', {
        method: ApiMethod.UPDATE,
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

  async getCar(id: number) {
    return this.getData(Route.CARS + id);
  }

  async carDelete(id: number) {
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

  async engine(status: EngineStatus, id: number) {
    try {
      const query = new URLSearchParams();
      query.set('id', id.toString());
      query.set('status', status);

      const res = await fetch(`${this.url + Route.ENGINE}?${query}`, {
        method: ApiMethod.PATCH,
      });
      return res;
    } catch (error) {
      catchError(error);
      return false;
    }
  }
}

export default Api;
