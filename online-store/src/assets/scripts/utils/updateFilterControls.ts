import { RadioType } from '../config/filterConfig';

export const updateRadios = <T extends RadioType>(
  radios: T[],
  activeValue: string
): T[] => {
  const radioBtns = JSON.parse(JSON.stringify(radios)) as T[];
  radioBtns.forEach((radio) => {
    if (radio.value === activeValue) {
      radio.checked = true;
    } else {
      radio.checked = false;
    }
  });

  return radioBtns;
};

export const updateCheckboxes = <T extends RadioType>(
  radios: T[],
  activeValues: string[] = []
): T[] => {
  const radioBtns = JSON.parse(JSON.stringify(radios)) as T[];
  radioBtns.forEach((radio) => {
    if (activeValues.includes(radio.value)) {
      radio.checked = true;
    } else {
      radio.checked = false;
    }
  });

  return radioBtns;
};
