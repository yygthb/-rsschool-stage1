import { INodeProps, NodeElement } from '../utils/nodeElement';
import { Image } from './UI/Image';

export interface IMotoCard {
  id: string;
  brand: string;
  model: string;
  type: string;
  price: number;
  engineType: string;
  enginePower: string;
  color: string;
  condition: string;
  isFav?: boolean;
}

export type FavClickCb = (val: string) => string;

export class StoreCard extends NodeElement {
  private _id: string = '';
  private _isFav: boolean = false;

  set id(val: string) {
    this._id = val;
  }

  get id() {
    return this._id;
  }

  set isFav(val: boolean) {
    this._isFav = val;
  }

  get isFav() {
    return this._isFav;
  }

  constructor(nodeProps: INodeProps, data: IMotoCard, cb: FavClickCb) {
    super(nodeProps);

    this.init(data, cb);
  }

  init(
    { id, brand, model, price, type, isFav = false }: IMotoCard,
    cb: FavClickCb
  ) {
    this.id = id;

    const img = new NodeElement({
      parentNode: this.node,
      classNames: 'item__img',
    });
    img.node.style.backgroundImage = `url(assets/img/moto/${type}/${id}.webp)`;

    const info = new NodeElement({
      parentNode: this.node,
      classNames: 'item__info',
    });

    new NodeElement({
      parentNode: info.node,
      tagName: 'h3',
      classNames: 'item__title',
      content: `${brand} ${model}`,
    });

    new NodeElement({
      parentNode: info.node,
      tagName: 'p',
      classNames: 'item__price',
      content: price.toLocaleString(),
    });

    const favBtn = new NodeElement({
      parentNode: this.node,
      tagName: 'button',
      classNames: 'item__fav-button',
    });

    if (isFav) {
      this.node.classList.add('fav');
    }

    favBtn.node.onclick = () => {
      const res: string = cb(this.id);
      if (res === 'ok') {
        this.updateFav();
      }
    };

    const favImg = new Image({
      parentNode: favBtn.node,
      classNames: 'fav-icon',
    });
    favImg.init({
      src: './assets/img/icons/star.svg',
      alt: 'star icon',
      title: 'Add to favorites ',
    });
  }

  updateFav() {
    this.isFav = !this.isFav;
    this.node.classList.toggle('fav');
  }
}
