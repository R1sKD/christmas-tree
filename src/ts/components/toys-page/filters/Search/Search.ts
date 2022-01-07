import IFilterSettings from "../../../interfaces/IFilterSettings";
import IInfoAboutToy from '../../../interfaces/IInfoAboutToy';

class Search {
  search: HTMLInputElement;
  searchToyResetBtn: HTMLButtonElement;

  constructor() {
    this.search = <HTMLInputElement>document.querySelector('.search');
    this.searchToyResetBtn = <HTMLButtonElement>document.querySelector('.reset-search');
    this.search.addEventListener('focus', () => this.searchToyResetBtn.style.display = 'block');
    this.search.addEventListener('blur', () => {
      if (this.search.value === '') {
        this.searchToyResetBtn.style.display = 'none';
      }
    });
    this.searchToyResetBtn.addEventListener('click', this.resetFilter.bind(this));
  }

  getSettings(filtersSettings: IFilterSettings): void {
    filtersSettings.search = this.search.value;
  }

  checkFilter(filtersSettings: IFilterSettings, toy: IInfoAboutToy): boolean {
    if (!this.search.value) return true;
    const searchValue: string = this.search.value;
    const regExp = new RegExp(`${searchValue}`, 'i');
    return regExp.test(toy.name);
  }

  resetFilter(): void {
    this.search.value = '';
    this.searchToyResetBtn.style.display = 'none';
  }

  setActive(): void {
    this.search.focus();
  }
}

export default Search;