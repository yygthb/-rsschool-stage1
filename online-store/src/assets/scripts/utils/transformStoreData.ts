import { IMotoCard } from '../components/card';

export const transfromStore = (
  data: Array<IMotoCard>,
  favs: string[] = []
): Array<IMotoCard> => {
  data.forEach((item) => {
    if (favs.includes(item.id)) {
      item.isFav = true;
    }
  });

  return data;
};
