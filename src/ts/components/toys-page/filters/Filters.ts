import data from '../../../data';
import IInfoAboutToy from '../../interfaces/IInfoAboutToy';
import IFilterSettings from "../../interfaces/IFilterSettings";
import Sort from "./Sort/Sort";
import Range from "./Range/Range";
import Filter from "./Filter/Filter";
import Search from "./Search/Search";

class Filters {
  toys: IInfoAboutToy[];
  filtersSettings: IFilterSettings;
  typeOfFilters: (Range | Filter | Search)[];
  sort: Sort;
  clearLocalStorageBtn: HTMLButtonElement;
  error: HTMLDivElement;

  constructor() {
    this.toys = data;
    this.typeOfFilters = [
      new Range(),
      new Filter(),
      new Search()
    ];
    this.sort = new Sort();
    this.filtersSettings = {
      range: {
        count: {
          min: 1,
          max: 12
        },
        year: {
          min: 1940,
          max: 2020
        }
      },
      filter: {
        shapes: ['шар', 'колокольчик', 'шишка', 'снежинка', 'фигурка'],
        colors: ['белый', 'желтый', 'красный', 'синий', 'зелёный'],
        sizes: ['малый', 'средний', 'большой'],
        isFavorite: null
      },
      sort: 'По названию от "А" до "Я"',
      search: ''
    };

    this.error = <HTMLDivElement>document.querySelector('.toysearch-error');

    this.clearLocalStorageBtn = <HTMLButtonElement>document.querySelector('.reset-localStorage');
    this.clearLocalStorageBtn.addEventListener('click', () => localStorage.clear());

    window.addEventListener('hashchange', () => {
      this.updateFilters();
      localStorage.setItem('filters', JSON.stringify(this.filtersSettings));
    });

    window.addEventListener('beforeunload', () => {
      this.updateFilters();
      localStorage.setItem('filters', JSON.stringify(this.filtersSettings));
    });
  }

  filterToys(e: Event | null): IInfoAboutToy[] {
    this.updateFilters();
    const filteredToys = this.toys.filter(toy => this.checkFilters(this.filtersSettings, toy, e));
    this.sortToys(filteredToys);
    filteredToys.length === 0 ? this.showError() : this.removeError();
    return filteredToys;
  }

  showError(): void {
    this.error.classList.remove('hide');
  }

  removeError(): void {
    this.error.classList.add('hide');
  }

  sortToys(filteredToys: IInfoAboutToy[]): IInfoAboutToy[] {
    return this.sort.sortToys(filteredToys);
  }

  updateFilters(): void {
    this.typeOfFilters.forEach(filter => filter.getSettings(this.filtersSettings));
    this.sort.getSettings(this.filtersSettings);
  }

  checkFilters(actualFilters: IFilterSettings, toy: IInfoAboutToy, e: Event | null) {
    for (let i = 0; i < this.typeOfFilters.length; i++) {
      const isFit = this.typeOfFilters[i].checkFilter(actualFilters, toy, e);
      if (!isFit) return false;
    }
    return true;
  }

  resetFilters(): IInfoAboutToy[] {
    this.typeOfFilters.forEach(filter => filter.resetFilter());
    this.toys = this.sort.sortToys(this.toys);
    return this.toys;
  }

  filterToysWithSavedFIlters(e: Event | null): IInfoAboutToy[] {
    const savedFilters: string | null = localStorage.getItem('filters');
    let actualFilters: IFilterSettings = this.filtersSettings;
    if (savedFilters) {
      actualFilters = JSON.parse(savedFilters);
      this.typeOfFilters.forEach(filter => filter.setActive(actualFilters, this.filtersSettings));
      this.sort.setActive(actualFilters);
    }
    const filteredToys = this.toys.filter(toy => this.checkFilters(actualFilters, toy, e));
    this.sortToys(filteredToys);
    return filteredToys;
  }
}

export default Filters;