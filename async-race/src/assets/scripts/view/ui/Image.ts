import { INodeProps, NodeElement } from '../../utils/nodeElement';

interface IImageProps {
  src: string;
  alt?: string;
  title?: string;
}

class Image extends NodeElement {
  constructor(nodeProps: INodeProps) {
    super({ ...nodeProps, tagName: 'img' });
  }

  init({ src = '', alt = '', title = '' }: IImageProps) {
    const image = this.node as HTMLImageElement;
    image.src = src;
    image.alt = alt;
    image.title = title;
  }
}

export default Image;
