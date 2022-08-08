import { EmitterEvents } from '../../../../types/types';
import emitter from '../../../../utils/eventEmitter';
import { INodeProps, NodeElement } from '../../../../utils/nodeElement';
import Button from '../../../ui/Button';

class RaceControl extends NodeElement {
  private addCars: Button;
  private raceStart: Button;
  private raceReset: Button;

  constructor(nodeProps: INodeProps) {
    super({
      ...nodeProps,
      classNames: 'garage-config config__race',
    });

    this.addCars = new Button({
      parentNode: this.node,
      content: 'Add new Cars to Garage',
    });

    this.raceStart = new Button({
      parentNode: this.node,
      content: 'Start Race',
    });

    this.raceReset = new Button({
      parentNode: this.node,
      content: 'Reset Race',
    });

    this.init();
  }

  init() {
    this.addCars.node.onclick = () => {
      emitter.emit(EmitterEvents.ADD_CARS);
    };
    this.raceStart.node.onclick = () => {
      emitter.emit(EmitterEvents.RACE_START);
    };
    this.raceReset.node.onclick = () => {
      emitter.emit(EmitterEvents.RACE_RESET);
    };
  }
}

export default RaceControl;
