import IInfoAboutToy from '../../../interfaces/IInfoAboutToy';
import IFilterSettings from "../../../interfaces/IFilterSettings";

class Sort {
  sort: HTMLSelectElement;

  constructor() {
    this.sort = <HTMLSelectElement>document.querySelector('.sort__select');
  }

  sortToys(toys: IInfoAboutToy[]): IInfoAboutToy[] {
    const selectedSort: string = this.sort.selectedOptions[0].innerHTML;
    let sortedToys: IInfoAboutToy[] = [];
    switch (selectedSort) {
      case 'По названию от "А" до "Я"': {
        sortedToys = this.sortByNameAscending(toys);
      }
        break;
      case 'По названию от "Я" до "А"': {
        sortedToys = this.sortByNameDescending(toys);
      }
        break;
      case 'По количеству по возрастанию': {
        sortedToys = this.sortByCountAscending(toys);
      }
        break;
      case 'По количеству по убыванию': {
        sortedToys = this.sortByCountDescending(toys);
      }
        break;
    }
    return sortedToys;
  }

  sortByNameAscending(toys: IInfoAboutToy[]): IInfoAboutToy[] {
    return toys.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
  }

  sortByNameDescending(toys: IInfoAboutToy[]): IInfoAboutToy[] {
    return toys.sort((a, b) => a.name < b.name ? 1 : a.name > b.name ? -1 : 0);
  }

  sortByCountAscending(toys: IInfoAboutToy[]): IInfoAboutToy[] {
    return toys.sort((a, b) => +a.count - +b.count);
  }

  sortByCountDescending(toys: IInfoAboutToy[]): IInfoAboutToy[] {
    return toys.sort((a, b) => +b.count - +a.count);
  }

  getSettings(filtersSettings: IFilterSettings): void {
    filtersSettings.sort = this.sort.selectedOptions[0].innerHTML;
  }

  setActive(filtersSettings: IFilterSettings): void {
    this.sort.value = filtersSettings.sort;
  }
}

export default Sort;