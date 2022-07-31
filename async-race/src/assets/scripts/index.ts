import Controller from './controller/controller';
import App from './view/app';
import Model from './model/model';

const appView = new App('#app');

new Controller(appView, new Model());
