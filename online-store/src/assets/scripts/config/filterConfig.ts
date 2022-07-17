import { SortValue } from '../components/filterElements/select';
import {
  ControlMethod,
  FilterProp,
  IControls,
} from '../controller/storeController';

export type RadioType = {
  id: string;
  content: string;
  value: string;
  checked: boolean;
};

const conditionRadioControls = [
  { id: 'condition', content: 'All', value: 'all', checked: true },
  { id: 'condition', content: 'New', value: 'new', checked: false },
  { id: 'condition', content: 'Used', value: 'used', checked: false },
];

const motoTypeRadioControls = [
  { id: 'motoType', content: 'All', value: 'all', checked: true },
  { id: 'motoType', content: 'Classic', value: 'classic', checked: false },
  { id: 'motoType', content: 'Sport', value: 'sport', checked: false },
  { id: 'motoType', content: 'Cruiser', value: 'cruiser', checked: false },
  { id: 'motoType', content: 'Enduro', value: 'enduro', checked: false },
  { id: 'motoType', content: 'Scooter', value: 'scooter', checked: false },
];

const colorCheckboxControls = [
  { id: 'color', content: 'white', value: 'white', checked: false },
  { id: 'color', content: 'gray', value: 'gray', checked: false },
  { id: 'color', content: 'black', value: 'black', checked: false },
  { id: 'color', content: 'brown', value: 'brown', checked: false },
  { id: 'color', content: 'yellow', value: 'yellow', checked: false },
  { id: 'color', content: 'red', value: 'red', checked: false },
  { id: 'color', content: 'green', value: 'green', checked: false },
  { id: 'color', content: 'blue', value: 'blue', checked: false },
];

const engineRadioControls = [
  { id: 'engineType', content: 'All', value: 'all', checked: true },
  { id: 'engineType', content: 'Gas', value: 'gas', checked: false },
  { id: 'engineType', content: 'Electro', value: 'electro', checked: false },
];

const favRadioControls = [
  { id: 'fav', content: 'All', value: 'all', checked: true },
  { id: 'fav', content: 'Favorite', value: 'fav', checked: false },
];

const defaultControls: IControls = {
  [ControlMethod.Sort]: SortValue.TitleUp,
  [ControlMethod.Filter]: {
    [FilterProp.Title]: '',
    [FilterProp.MotoType]: 'all',
    [FilterProp.Price]: [0, 3000000],
    [FilterProp.EngineType]: 'all',
    [FilterProp.EnginePower]: [0, 300],
    [FilterProp.Condition]: 'all',
    [FilterProp.Fav]: 'all',
    [FilterProp.Colors]: [],
  },
};

export {
  motoTypeRadioControls,
  colorCheckboxControls,
  engineRadioControls,
  conditionRadioControls,
  favRadioControls,
  defaultControls,
};
