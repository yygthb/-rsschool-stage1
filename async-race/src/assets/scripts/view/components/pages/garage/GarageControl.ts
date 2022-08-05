import { ApiMethod } from '../../../../api/api';
import { ICar } from '../../../../model/model';
import { INodeProps, NodeElement } from '../../../../utils/nodeElement';
import CarControl from './CarControl';

class GarageControl extends NodeElement {
  private newCarControl: CarControl;
  private editCarControl: CarControl;

  constructor(nodeProps: INodeProps, btnCb) {
    super({
      ...nodeProps,
      classNames: 'garage-config',
    });

    this.newCarControl = new CarControl(
      {
        parentNode: this.node,
      },
      'Add new Car to Garage',
      'Save',
    );
    this.newCarControl.carControlCb((carInfo: ICar) => {
      btnCb([ApiMethod.CREATE, carInfo]);
    });

    this.editCarControl = new CarControl(
      {
        parentNode: this.node,
      },
      'Edit Car from Garage',
      'Save',
    );
    this.editCarControl.carControlCb((carInfo: ICar) => {
      btnCb([ApiMethod.UPDATE, carInfo]);
    });
  }
}

export default GarageControl;
