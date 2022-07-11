import { Footer } from './components/footer';
import { Header } from './components/header';
import { Main } from './components/main';
import { INodeProps, NodeElement } from './utils/nodeElement';

class App extends NodeElement {
  constructor(nodeProps: INodeProps) {
    super(nodeProps);
  }
}

const body = document.querySelector('body');
if (body) {
  const app = new App({
    parentNode: body,
    classNames: 'app',
  });

  new Header({
    parentNode: app.node,
  });

  new Main({
    parentNode: app.node,
  });

  new Footer({
    parentNode: app.node,
  });
}
