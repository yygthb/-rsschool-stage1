import { INodeProps, NodeElement } from '../utils/nodeElement';

class Cart extends NodeElement {
  private _collection: string[] = [];
  private favsContent: NodeElement;

  get favs(): string[] {
    return this._collection;
  }

  set favs(values: string[]) {
    this._collection = values;
  }

  constructor(nodeProps: INodeProps) {
    super({ ...nodeProps, content: 'CART: ' });

    this.favsContent = new NodeElement({
      parentNode: this.node,
      tagName: 'span',
      content: this.favs.length.toString(),
    });
  }

  updateFavCount() {
    this.favsContent.node.innerHTML = this.favs.length.toString();
  }

  clickCb(id: string) {
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

    this.updateFavCount();
    return res;
  }

  reset() {
    this.favs = [];
  }
}

export const cart = new Cart({
  classNames: 'cart',
});
