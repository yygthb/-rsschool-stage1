import { IWinner } from '../../../../model/model';
import { INodeProps, NodeElement } from '../../../../utils/nodeElement';

class Winner extends NodeElement {
  private _winnerInfo!: IWinner;

  get winnerInfo() {
    return this._winnerInfo;
  }

  set winnerInfo(val: IWinner) {
    this._winnerInfo = val;
  }

  constructor(nodeProps: INodeProps, winner: IWinner) {
    super({
      ...nodeProps,
      classNames: 'winner__car',
    });

    this.winnerInfo = winner;
  }
}

export default Winner;
