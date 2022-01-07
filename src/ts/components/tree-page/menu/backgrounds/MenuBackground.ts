import IMenuSettings from '../../../interfaces/IMenuSettings';

class MenuBackground {
  backgroundsConatiner: HTMLUListElement;
  treeContainer: HTMLDivElement;

  constructor() {
    this.backgroundsConatiner = <HTMLUListElement>document.querySelector('.menu__background-list');
    this.backgroundsConatiner.addEventListener('click', (e) => this.changeBackgroundTree.call(this, e));

    this.treeContainer = <HTMLDivElement>document.querySelector('.main-tree');
  }

  changeBackgroundTree(e: Event): void {
    if ((e.target as HTMLElement).tagName !== 'LI') return;
    this.setStyle(e);
    this.treeContainer.style.backgroundImage = `url("assets/bg/${(e.target as HTMLElement).dataset.background}.jpg")`;
  }

  setStyle(e: Event): void {
    this.resetStyle();
    (e.target as HTMLElement).classList.add('active');
  }

  getSettings(menuSettings: IMenuSettings): void {
    const currentBackground = Array.from(this.backgroundsConatiner.children).filter(li => li.classList.contains('active'))[0];
    currentBackground ?
      menuSettings.background = <string>(currentBackground as HTMLLIElement).dataset.background
      : menuSettings.background = '1';
  }

  setSettings(menuSettings: IMenuSettings): void {
    this.resetStyle();
    this.treeContainer.style.backgroundImage = `url("assets/bg/${menuSettings.background}.jpg")`;
    const li = <HTMLLIElement>document.querySelector(`[data-background="${menuSettings.background}"]`);
    li.classList.add('active');
  }

  resetStyle(): void {
    this.backgroundsConatiner.querySelectorAll('li').forEach(el => el.classList.remove('active'));
  }
}

export default MenuBackground;