import { IWinner } from '../../../model/model';
import { INodeProps } from '../../../utils/nodeElement';
import ContentSection from './ContentSection';
import Winner from './units/Winner';

class Winners extends ContentSection {
  constructor(nodeProps: INodeProps) {
    super(
      {
        ...nodeProps,
        tagName: 'section',
        classNames: 'content__winners',
      },
      'WINNERS',
    );
  }

  renderWinners(data: IWinner[] = []) {
    data.forEach((winner) => {
      new Winner({
        parentNode: this.node,
        content: `${winner.name} (${winner.wins})`,
      });
    });

    this.showTotalCount(data.length);
  }
}

export default Winners;
