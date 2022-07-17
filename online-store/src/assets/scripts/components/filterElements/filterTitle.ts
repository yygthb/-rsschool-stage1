import { INodeProps, NodeElement } from '../../utils/nodeElement';

export class FilterTitle extends NodeElement {
  constructor(nodeProps: INodeProps) {
    super({ ...nodeProps, tagName: 'h4', classNames: 'filter__el-title' });
  }
}
