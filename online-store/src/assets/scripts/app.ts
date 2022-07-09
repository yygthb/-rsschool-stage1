import { Store } from './store';
import state from './state/state.json';

const storeContainer = document.querySelector('#store') as HTMLElement;
if (storeContainer) {
  new Store(
    {
      parentNode: storeContainer,
      classNames: 'store',
    },
    state.notebooks
  );
}
