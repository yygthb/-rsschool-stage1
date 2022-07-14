import { SortValue } from '../components/filterElements/select';
import {
  ControlMethod,
  EngineProp,
  FilterProp,
  IControls,
} from '../controller/storeController';

const conditionFilterControls = [
  { id: 'condition', content: 'все', value: 'all', checked: true },
  { id: 'condition', content: 'new', value: 'new', checked: false },
  { id: 'condition', content: 'used', value: 'used', checked: false },
];

const motoTypeFilterControls = [
  { id: 'brand', content: 'все', value: 'all', checked: true },
  { id: 'brand', content: 'Classic', value: 'classic', checked: false },
  { id: 'brand', content: 'Sport', value: 'sport', checked: false },
  { id: 'brand', content: 'Cruiser', value: 'cruiser', checked: false },
  { id: 'brand', content: 'Enduro', value: 'enduro', checked: false },
  { id: 'brand', content: 'Scooter', value: 'scooter', checked: false },
];

const colorFilterControls = [
  { id: 'color', content: 'white', value: 'white', checked: false },
  { id: 'color', content: 'gray', value: 'gray', checked: false },
  { id: 'color', content: 'black', value: 'black', checked: false },
  { id: 'color', content: 'brown', value: 'brown', checked: false },
  { id: 'color', content: 'yellow', value: 'yellow', checked: false },
  { id: 'color', content: 'red', value: 'red', checked: false },
  { id: 'color', content: 'green', value: 'green', checked: false },
  { id: 'color', content: 'blue', value: 'blue', checked: false },
];

const engineFilterControls = [
  { id: 'engine-type', content: 'все', value: 'all', checked: true },
  { id: 'engine-type', content: 'gas', value: 'gas', checked: false },
  { id: 'engine-type', content: 'electro', value: 'electro', checked: false },
];

const defaultControls: IControls = {
  [ControlMethod.Sort]: SortValue.TitleUp,
  [ControlMethod.Filter]: {
    [FilterProp.Title]: '',
    [FilterProp.MotoType]: 'all',
    [FilterProp.Price]: [0, 3000000],
    [FilterProp.Engine]: {
      [EngineProp.Type]: 'all',
      [EngineProp.Power]: [0, 300],
    },
    [FilterProp.Condition]: 'all',
    [FilterProp.Colors]: [],
  },
};

export {
  motoTypeFilterControls,
  colorFilterControls,
  engineFilterControls,
  conditionFilterControls,
  defaultControls,
};
