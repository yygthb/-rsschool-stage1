const LS_SORT_ITEM = 'store__cart';

export class CartStorage {
  private _favItems: string[] = [];

  get favs(): string[] {
    return this._favItems;
  }

  set favs(values: string[]) {
    this._favItems = values;
  }

  constructor() {
    this.favs = [];

    this.init();
  }

  init() {
    const favItemsFromLS = JSON.parse(
      localStorage.getItem(LS_SORT_ITEM) || '[]'
    ) as string[];
    this.favs = favItemsFromLS;
  }

  private saveCartToLS() {
    localStorage.setItem(LS_SORT_ITEM, JSON.stringify(this.favs));
  }

  clickHandler(id: string) {
    let res: string = 'ok';
    if (this.favs.includes(id)) {
      this.favs = this.favs.filter((item) => item !== id);
    } else {
      if (this.favs.length < 5) {
        this.favs.push(id);
      } else {
        alert('the cart is full');
        res = 'error';
      }
    }
    this.saveCartToLS();
    return res;
  }
}
