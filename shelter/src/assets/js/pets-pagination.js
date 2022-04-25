import { Pagination } from './components/Pagination';

const pets = document.querySelector('.pets__content');

const pagination = new Pagination({ classNames: 'pets__pagination' }).init();

pets.append(pagination.container);
