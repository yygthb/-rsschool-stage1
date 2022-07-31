import { Navigation } from '../../model/model';
import { INodeProps, NodeElement } from '../../utils/nodeElement';
import { ClickNavCb } from '../ui/Button';
import Nav from './Nav';

class Header extends NodeElement {
  private nav!: Nav;

  constructor(nodeProps: INodeProps) {
    super({
      ...nodeProps,
      classNames: 'header',
    });

    new NodeElement({
      parentNode: this.node,
      content: 'LOGO',
    });
  }

  initNav(navTitles: Navigation[], clickNavCb: ClickNavCb) {
    this.nav = new Nav({
      parentNode: this.node,
    });
    this.nav.init(navTitles, clickNavCb);
  }

  setActiveNavItem(val: Navigation) {
    this.nav.setActiveNavItem(val);
  }
}

export default Header;
