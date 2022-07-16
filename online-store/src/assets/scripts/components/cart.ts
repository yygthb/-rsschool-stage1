import { CartStorage } from '../controller/cartStorage';
import { INodeProps, NodeElement } from '../utils/nodeElement';

class Cart extends NodeElement {
  private favsContent: NodeElement;
  private cart: CartStorage;

  constructor(nodeProps: INodeProps) {
    super({ ...nodeProps, content: 'CART: ' });

    this.cart = new CartStorage();

    this.favsContent = new NodeElement({
      parentNode: this.node,
      tagName: 'span',
      content: this.cart.favs.length.toString(),
    });
  }

  updateFavCount() {
    this.favsContent.node.innerHTML = this.cart.favs.length.toString();
  }

  clickCb(id: string) {
    const res = this.cart.clickHandler(id);

    this.updateFavCount();
    return res;
  }

  getFavs() {
    return this.cart.favs;
  }
}

export const cart = new Cart({
  classNames: 'cart',
});
