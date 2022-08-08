import { IWinner } from '../../../../model/model';
import { INodeProps } from '../../../../utils/nodeElement';
import ContentSection from '../ContentSection';
import Winner from './Winner';

class Winners extends ContentSection {
  private winners: Winner[] = [];

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
      const win = new Winner(
        {
          parentNode: this.node,
          content: `${winner.name} (${winner.wins})`,
        },
        winner,
      );
      this.winners.push(win);
    });

    this.showTotalCount(data.length);
  }

  winnerDelete(id: number) {
    this.winners = this.winners.filter((winner) => {
      if (winner.winnerInfo.id === id) {
        winner.destroy();
        return false;
      }
      return true;
    });

    this.showTotalCount(this.winners.length);
  }
}

export default Winners;
