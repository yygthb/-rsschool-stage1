import { ICar } from '../../../../model/model';
import { INodeProps, NodeElement } from '../../../../utils/nodeElement';
import Button from '../../../ui/Button';
import Track from './Track';

class GarageItem extends NodeElement {
  private _carInfo!: ICar;
  private engineControls!: NodeElement;
  private start!: Button;
  private stop!: Button;
  private carEdit!: NodeElement;
  private edit!: Button;
  private delete!: Button;
  private track!: Track;

  get carInfo() {
    return this._carInfo;
  }

  set carInfo(val: ICar) {
    this._carInfo = val;
  }

  constructor(nodeProps: INodeProps, car: ICar) {
    super({
      ...nodeProps,
      classNames: 'garage__line',
    });

    this.carInfo = car;
    this.init();
  }

  init() {
    this.engineControls = new NodeElement({
      parentNode: this.node,
      classNames: 'engine-controls',
    });
    this.start = new Button({
      parentNode: this.engineControls.node,
      content: 'Start',
    });
    this.start = new Button({
      parentNode: this.engineControls.node,
      content: 'Stop',
    });

    this.carEdit = new NodeElement({
      parentNode: this.node,
      classNames: 'car-edit',
    });
    this.edit = new Button({
      parentNode: this.carEdit.node,
      content: 'Edit',
    });
    this.delete = new Button({
      parentNode: this.carEdit.node,
      content: 'Delete',
    });

    this.track = new Track(
      {
        parentNode: this.node,
      },
      this.carInfo,
    );

    this.delete.node.onclick = () => {
      console.log('delete car', this.carInfo.id);
      // this.destroy();
    };
  }

  setCarColor(color: string) {
    this.track.setCarColor(color);
  }
}

export default GarageItem;
