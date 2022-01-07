import data from '../../data';
import IInfoAboutToy from '../interfaces/IInfoAboutToy';
import ITreePageSettings from '../interfaces/ITreePageSettings';
import Menu from './menu/Menu';
import dragDropToys from './dragDropToys';
import html2canvas from 'html2canvas';
import { TreePage } from '../../views/pages/Tree';
import { getSavedMenuSettings } from '../localStorage/getSavedMenuSettings';
import { getSavedFavoriteToys } from '../localStorage/getSavedFavoriteToys';
import { getToysOnTree } from '../localStorage/getToysOnTree';

class Tree {
  menu: Menu;
  defaultToys: IInfoAboutToy[];
  toysContainer: HTMLUListElement;
  saveTreeButton: HTMLButtonElement;
  savedTreesContainer: HTMLUListElement;
  savedTrees: ITreePageSettings[];
  dragDropToys: dragDropToys;
  resetSettingsBtn: HTMLButtonElement;
  
  constructor() {
    this.menu = new Menu();
    this.defaultToys = data.slice(0, 20);
    this.toysContainer = <HTMLUListElement>document.querySelector('.toys__list');

    this.saveTreeButton = <HTMLButtonElement>document.getElementById('save-tree');
    this.saveTreeButton.onclick = this.saveTree.bind(this);
    this.savedTreesContainer = <HTMLUListElement>document.querySelector('.decorated-tree__list');

    this.resetSettingsBtn = <HTMLButtonElement>document.querySelector('.reset-tree');
    this.resetSettingsBtn.onclick = this.resetSettings.bind(this);

    this.savedTrees = [];

    this.renderToys();
    this.dragDropToys = new dragDropToys();
  }

  renderToys(): void {
    const toys: IInfoAboutToy[] = this.getSavedFavoriteToys() || this.defaultToys;
    this.toysContainer.innerHTML = '';
    toys.forEach((toy, index) => {
      this.toysContainer.appendChild(this.createToy(toy, index));
    });
  }

  getSavedFavoriteToys(): null | IInfoAboutToy[] {
    const savedToys: string | null = localStorage.getItem('favoriteToys');
    let actualToys: IInfoAboutToy[] = [];
    if (savedToys) {
      actualToys = JSON.parse(savedToys);
    }
    return actualToys.length !== 0 ? actualToys : null;
  }

  createToy(toy: IInfoAboutToy, index: number): HTMLLIElement {
    const li = document.createElement('li');
    li.classList.add('toys__item');
    let toyCard = ``;
    for (let i = 0; i < +toy.count; i++) {
      toyCard += `
        <img id="${toy.num}-${i}" class="toys__img" src="assets/toys/${toy.num}.png" alt="toy" draggable="true" data-num="${index}">
      `;
    }
    toyCard += `<span class="toys__count">${toy.count}</span>`;
    li.innerHTML = toyCard;
    return li;
  }

  saveTree(): void {
    const index = this.savedTrees.length;
    this.savedTreesContainer.appendChild(this.createSavedTree(index));
  }

  createSavedTree(index: number): HTMLLIElement {
    this.saveTreeSettings();
    const li = document.createElement('li');
    li.classList.add('decorated-tree__item');
    html2canvas(<HTMLDivElement>document.querySelector(".main-tree")).then(tree => {
      tree.style.width = '115px';
      tree.style.height = '115px';
      li.appendChild(tree);
    });
    li.addEventListener('click', () => {
      localStorage.setItem('menuSettings', JSON.stringify(this.savedTrees[index].menuSettings));
      localStorage.setItem('favoriteToys', JSON.stringify(this.savedTrees[index].favoriteToys));
      localStorage.setItem('toysOnTree', JSON.stringify(this.savedTrees[index].toysOnTree));
      TreePage.render();
      TreePage.after_render();
    });
    return li;
  }

  saveTreeSettings(): void {
    const pageSettings: ITreePageSettings = {};
    this.menu.getSettings();
    this.menu.menuSettings.snow = false;
    this.menu.menuSettings.music = false;
    localStorage.setItem('menuSettings', JSON.stringify(this.menu.menuSettings));
    localStorage.setItem('savedTrees', JSON.stringify(this.savedTrees));
    this.dragDropToys.saveToysOnTree();
    pageSettings.menuSettings = getSavedMenuSettings();
    pageSettings.favoriteToys = getSavedFavoriteToys();
    pageSettings.toysOnTree = getToysOnTree();
    this.savedTrees.push(pageSettings);
  }

  resetSettings(): void {
    this.menu.menuSettings = {
      music: false,
      snow: false,
      tree: '1',
      background: '1',
      garland: 'multicolor',
      isGarland: true
    };
    this.menu.setSettings();
    this.dragDropToys.resetToysOnTree();
    this.renderToys();
    this.dragDropToys = new dragDropToys();
  }
}

export default Tree;