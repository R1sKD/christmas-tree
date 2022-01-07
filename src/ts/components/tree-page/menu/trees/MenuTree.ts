import IMenuSettings from '../../../interfaces/IMenuSettings';

class MenuTree {
  treesContainer: HTMLUListElement;
  tree: HTMLImageElement;

  constructor() {
    this.treesContainer = <HTMLUListElement>document.querySelector('.menu__tree-list');
    this.treesContainer.addEventListener('click', (e) => this.changeTree.call(this, e));

    this.tree = <HTMLImageElement>document.querySelector('.main-tree__img');
  }

  changeTree(e: Event): void {
    if ((e.target as HTMLElement).tagName !== 'LI') return;
    this.setStyle(e);
    this.tree.src = `assets/tree/${(e.target as HTMLElement).dataset.tree}.png`;
  }

  setStyle(e: Event): void {
    this.resetStyle();
    (e.target as HTMLElement).classList.add('active');
  }

  getSettings(menuSettings: IMenuSettings): void {
    const currentTree = Array.from(this.treesContainer.children).filter(li => li.classList.contains('active'))[0];
    currentTree ? menuSettings.tree = <string>(currentTree as HTMLLIElement).dataset.tree : menuSettings.tree = '1';
  }

  setSettings(menuSettings: IMenuSettings): void {
    this.resetStyle();
    this.tree.src = `assets/tree/${menuSettings.tree}.png`;
    const li = <HTMLLIElement>document.querySelector(`[data-tree="${menuSettings.tree}"]`);
    li.classList.add('active');
  }

  resetStyle(): void {
    this.treesContainer.querySelectorAll('li').forEach(el => el.classList.remove('active'));
  }
}

export default MenuTree;