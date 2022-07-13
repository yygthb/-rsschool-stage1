export interface INodeProps {
  parentNode?: HTMLElement | null;
  tagName?: string;
  classNames?: string;
  content?: string;
  attributes?: Array<AttrType>;
}

type AttrType = [string, string];

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
      attributes.forEach(([attrName, attrValue]) => {
        if (attrName.match(/data-/)) {
          el.dataset[attrName.slice(5)] = attrValue;
        } else {
          el.setAttribute(attrName, attrValue);
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
