import IInfoAboutCurrentToy from '../interfaces/IInfoAboutCurrentToy';

class dragDropToys {
  isParentToysList: boolean;
  infoAboutCurrentToy: IInfoAboutCurrentToy;
  toyContainers: NodeListOf<HTMLLIElement>;
  tree: HTMLDivElement;
  draggable: NodeListOf<HTMLImageElement>;
  target: HTMLAreaElement;

  constructor() {
    this.isParentToysList = true;
    this.infoAboutCurrentToy = {};
    this.toyContainers = document.querySelectorAll('.toys__item');
    
    this.tree = <HTMLDivElement>document.querySelector('.main-tree__img-container');

    this.draggable = document.querySelectorAll('[draggable]');
    this.target = <HTMLAreaElement>document.querySelector('[data-drop-target]');

    this.draggable.forEach(toy => {
      toy.addEventListener("dragstart", (e) => this.handleDragStart(e));
      toy.addEventListener("dragend", (e) => this.checkPosition(e));
    });

    this.target.addEventListener("dragover", (e) => this.handleOverDrop(e));
    this.target.addEventListener("drop", (e) => this.handleOverDrop(e));

    this.setToysOnTree();

    window.addEventListener('hashchange', () => {
      this.saveToysOnTree();
    });

    window.addEventListener('beforeunload', () => {
      this.saveToysOnTree();
    });
  }

  saveToysOnTree(): void {
    const toysOnTree = Array.from(this.tree.querySelectorAll('img')).slice(1).map(toy => [toy.id, toy.style.left, toy.style.top]);
    localStorage.setItem('toysOnTree', JSON.stringify(toysOnTree));
  }

  setToysOnTree(): void {
    const savedToysOnTree = localStorage.getItem('toysOnTree');
    this.resetToysOnTree();
    if (savedToysOnTree !== null) {
      const toysOnTree: string[] = JSON.parse(savedToysOnTree);
      toysOnTree.forEach(toyOnTree => {
        const toy = <HTMLImageElement>document.getElementById(`${toyOnTree[0]}`);
        if (toy) {
          this.tree.appendChild(toy);
          toy.style.left = toyOnTree[1];
          toy.style.top = toyOnTree[2];
          this.updateCountToys(toy);
        }
      });
    }
  }

  resetToysOnTree(): void {
    const toysOnTree = Array.from(this.tree.querySelectorAll('img')).slice(1);
    toysOnTree.forEach(img => this.tree.removeChild(img));
    localStorage.setItem('toysOnTree', JSON.stringify([]));
  }

  handleDragStart(e: DragEvent): void {
    (e.dataTransfer as DataTransfer).setData("text", (e.target as HTMLElement).id);
    this.isParentToysList = (e.target as HTMLElement).closest('.toys__list') ? true : false;
    this.getInfoAboutToy(e);
  }

  getInfoAboutToy(e: Event): void {
    
    const toyParent = (e.target as HTMLImageElement).parentNode;
    this.infoAboutCurrentToy.parentElem = <HTMLElement>toyParent;
    this.infoAboutCurrentToy.width = (e.target as HTMLImageElement).offsetWidth;
    this.infoAboutCurrentToy.height = (e.target as HTMLImageElement).offsetHeight;
  }

  handleOverDrop(e: DragEvent): void {
    e.preventDefault();
    if (e.type !== "drop") {
      return;
    }
    
    const toyId = (e.dataTransfer as DataTransfer).getData("text");
    const toy = <HTMLImageElement>document.getElementById(toyId);

    (toy.parentNode as HTMLElement).removeChild(toy);
    this.setToyCoords(e, toy, this.tree);
    this.tree.appendChild(toy);
    this.updateCountToys(toy);
  }

  setToyCoords(e: DragEvent, toy: HTMLImageElement, tree: HTMLDivElement): void {
    const newToyPositionLeft = e.clientX - tree.getBoundingClientRect().left - (<number>this.infoAboutCurrentToy.width / 2) + 'px';
    const newToyPositionTop = e.clientY - tree.getBoundingClientRect().top - (<number>this.infoAboutCurrentToy.height / 2) + 'px';
    toy.style.position = 'absolute';
    toy.style.left = newToyPositionLeft;
    toy.style.top = newToyPositionTop;
  }

  updateCountToys(toy: HTMLImageElement): void {
    const containerNumber = <string>toy.dataset.num;
    const countContainer = this.toyContainers[+containerNumber].querySelector('span');
    (countContainer as HTMLElement).innerHTML = this.countToys(containerNumber);
  }

  countToys(containerNumber: string): string {
    const toys = this.toyContainers[+containerNumber].querySelectorAll('img').length;
    return toys.toString();
  }

  checkPosition(e: DragEvent): void {
    if (this.isParentToysList) return;
    const treeCoords = this.tree.getBoundingClientRect();
    const mouseX = e.pageX;
    if (mouseX <= treeCoords.left || treeCoords.right <= mouseX) {
      this.returnToyInToysConatiner(e);
    }
  }

  returnToyInToysConatiner(e: Event): void {
    const toy = <HTMLImageElement>e.target;
    const containerNumber = <string>toy.dataset.num;
    toy.style.left = '12px';
    toy.style.top = '12px';
    this.toyContainers[+containerNumber].append(toy);
    this.updateCountToys(toy);
  }
}

export default dragDropToys;