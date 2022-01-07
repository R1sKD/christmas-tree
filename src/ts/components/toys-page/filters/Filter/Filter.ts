import IInfoAboutToy from '../../../interfaces/IInfoAboutToy';
import IFilterSettings from "../../../interfaces/IFilterSettings";
import Shape from './Shape/Shape';
import Color from './color/Color';
import Size from './Size/Size';
import Favorite from './Favorite/Favorite';

class Filter {
  filterButtons: NodeListOf<HTMLButtonElement>;
  favorite: HTMLInputElement;
  filters: (Shape | Color | Size | Favorite)[];

  constructor() {
    this.filters = [
      new Shape(),
      new Color(),
      new Size(),
      new Favorite()
    ];
    this.filterButtons = document.querySelectorAll('.filter button');
    this.favorite = <HTMLInputElement>document.querySelector('.filter__fav-input');
    this.filterButtons.forEach(btn => btn.addEventListener('click', () => {
      btn.classList.toggle('active');
    }));
  }

  checkFilter(filterSettings: IFilterSettings, toy: IInfoAboutToy, e: Event | null): boolean {
    if (e) {
      const currentElem = <HTMLElement>e.target;
      if (currentElem.closest('.filter')) {
        if (currentElem.tagName === 'BUTTON') {
          this.getSettings(filterSettings);
          const checkedFilters = this.filters.map(filter => filter.checkFilter(toy, filterSettings));
          return checkedFilters.includes(false) ? false : true;
        }
      }
    }
    return this.defaultCheck(filterSettings, toy);
  }

  defaultCheck(filterSettings: IFilterSettings, toy: IInfoAboutToy): boolean {
    const checkedFilters = this.filters.map(filter => filter.checkFilter(toy, filterSettings));
    return checkedFilters.includes(false) ? false : true;
  }

  getSettings(filtersSettings: IFilterSettings): void {
    this.filters.forEach(filter => filter.getSettings(filtersSettings));
  }

  setActive(filtersSettings: IFilterSettings, defaultFiltersSettings: IFilterSettings): void {
    this.filters.forEach(filter => filter.setActive(filtersSettings, defaultFiltersSettings));
  }

  resetFilter() {
    this.filterButtons.forEach(btn => btn.classList.remove('active'));
    this.favorite.checked = false;
  }
}

export default Filter;