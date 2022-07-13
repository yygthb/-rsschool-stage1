export interface INodeProps {
  parentNode?: HTMLElement | null;
  tagName?: string;
  classNames?: string;
  content?: string;
  attributes?: Array<AttrType>;
}

type AttrType = [string, string] | [string];

export class NodeElement {
  public node: HTMLElement;

  constructor({
    parentNode = null,
    tagName = 'div',
    content = '',
    classNames = '',
    attributes = [],
  }: INodeProps) {
    const el = document.createElement(tagName);

    if (classNames) {
      el.classList.add(...classNames.split(' '));
    }

    if (parentNode) {
      parentNode.append(el);
    }

    if (attributes.length) {
      attributes.forEach((attr) => {
        if (attr.length === 2) {
          if (attr[0].match(/data-/)) {
            el.dataset[attr[0].slice(5)] = attr[1];
          } else {
            el.setAttribute(attr[0], attr[1]);
          }
        }
      });
    }

    el.innerHTML = content;

    this.node = el;
  }

  updateContent(value: string) {
    this.node.innerHTML = value;
  }
}
