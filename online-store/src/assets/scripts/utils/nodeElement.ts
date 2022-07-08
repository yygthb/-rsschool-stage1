export interface INodeElement {
  parentNode?: HTMLElement | null;
  tagName?: string;
  classNames?: string;
  content?: string;
}

export class NodeElement {
  public node: HTMLElement;

  constructor({
    parentNode = null,
    tagName = 'div',
    content = '',
    classNames = '',
  }: INodeElement) {
    const el = document.createElement(tagName);

    if (classNames) {
      el.classList.add(...classNames.split(' '));
    }

    if (parentNode) {
      parentNode.append(el);
    }

    el.innerHTML = content;

    this.node = el;
  }
}
