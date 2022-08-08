import { ICar } from '../../../../model/model';
import { EmitterEvents } from '../../../../types/types';
import emitter from '../../../../utils/eventEmitter';
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
    this.start.node.onclick = () => {
      emitter.emit(EmitterEvents.START_ENGINE, this.carInfo);
    };
    this.stop = new Button({
      parentNode: this.engineControls.node,
      content: 'Stop',
    });
    this.stop.node.onclick = () => {
      emitter.emit(EmitterEvents.STOP_ENGINE, this.carInfo);
    };

    this.carEdit = new NodeElement({
      parentNode: this.node,
      classNames: 'car-edit',
    });
    this.edit = new Button({
      parentNode: this.carEdit.node,
      content: 'Edit',
    });
    this.edit.node.onclick = () => {
      emitter.emit(EmitterEvents.SELECT_CAR, this.carInfo.id);
    };
    this.delete = new Button({
      parentNode: this.carEdit.node,
      content: 'Delete',
    });
    this.delete.node.onclick = () => {
      emitter.emit(EmitterEvents.DELETE_CAR, this.carInfo.id);
    };

    this.track = new Track(
      {
        parentNode: this.node,
      },
      this.carInfo,
    );
    this.setCarColor(this.carInfo.color);
  }

  setCarColor(color: string) {
    this.track.setCarColor(color);
  }

  setCarName(name: string) {
    this.track.setCarName(name);
  }

  driveCar(time: number) {
    this.track.startCarAnimation(time);
  }

  stopCar() {
    this.track.stopCarAnimation();
  }

  resetCarPosition() {
    this.track.resetCarPosition();
  }
}

export default GarageItem;
