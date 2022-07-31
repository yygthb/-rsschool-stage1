import Button from './Button';

class NavItem extends Button {
  active() {
    this.node.classList.add('active');
  }

  reset() {
    this.node.classList.remove('active');
  }
}

export default NavItem;
