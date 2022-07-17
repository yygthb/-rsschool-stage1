import { CartStorage } from '../controller/cartStorage';
import { INodeProps, NodeElement } from '../utils/nodeElement';
import { Image } from './UI/Image';

class Cart extends NodeElement {
  private favsContent: NodeElement;
  private cart: CartStorage;

  constructor(nodeProps: INodeProps) {
    super({ ...nodeProps });

    this.cart = new CartStorage();

    const favImg = new Image({
      parentNode: this.node,
      classNames: 'cart-icon',
    });
    favImg.init({
      src: './assets/img/icons/star.svg',
      alt: 'cart icon',
      title: 'Favorites collection',
    });

    this.favsContent = new NodeElement({
      parentNode: this.node,
      tagName: 'span',
      classNames: 'cart-count',
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
