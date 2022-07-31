import { Navigation } from '../../model/model';
import { INodeProps, NodeElement } from '../../utils/nodeElement';
import { ClickNavCb } from '../ui/Button';
import NavItem from '../ui/NavItem';

class Nav extends NodeElement {
  private navItems: NavItem[] = [];

  constructor(nodeProps: INodeProps) {
    super({
      ...nodeProps,
      tagName: 'nav',
      classNames: 'header__nav',
    });
  }

  init(navTitles: Navigation[], clickCb: ClickNavCb) {
    navTitles.forEach((navTitle) => {
      const navItem = new NavItem({
        parentNode: this.node,
        content: navTitle,
      });
      navItem.click(clickCb);
      this.navItems.push(navItem);
    });
  }

  setActiveNavItem(val: Navigation) {
    this.resetActiveTab();
    this.navItems.forEach((navItem) => {
      if (navItem.node.textContent === val) {
        navItem.active();
      }
    });
  }

  private resetActiveTab() {
    this.navItems.forEach((navItem) => {
      navItem.reset();
    });
  }
}

export default Nav;
