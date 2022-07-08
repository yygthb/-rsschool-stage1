import { Store } from './store';

const storeContainer = document.querySelector('#store') as HTMLElement;
if (storeContainer) {
  const store = new Store({
    parentNode: storeContainer,
    classNames: 'store',
  });
}
