import IInfoAboutToy from '../../../../interfaces/IInfoAboutToy';
import IFilterSettings from "../../../../interfaces/IFilterSettings";

class Size {
  sizeButtons: NodeListOf<HTMLButtonElement>;

  constructor() {
    this.sizeButtons = document.querySelectorAll('.filter__size button');
  }

  checkFilter(toy: IInfoAboutToy, filterSettings: IFilterSettings): boolean {
    return filterSettings.filter.sizes.includes(toy.size);
  }

  getSettings(filtersSettings: IFilterSettings): void {
    filtersSettings.filter.sizes.length = 0;
    this.sizeButtons.forEach(sizeBtn => {
      if (sizeBtn.classList.contains('active')) {
        const size = <string>sizeBtn.dataset.size;
        filtersSettings.filter.sizes.push(size);
      }
    });
    if (filtersSettings.filter.sizes.length === 0) {
      this.setDefaultSettings(filtersSettings);
    }
  }

  setDefaultSettings(filtersSettings: IFilterSettings): void {
    filtersSettings.filter.sizes = ['малый', 'средний', 'большой'];
  }

  setActive(filtersSettings: IFilterSettings, defaultFiltersSettings: IFilterSettings): void {
    const sizesSettings = filtersSettings.filter.sizes;
    this.sizeButtons.forEach(sizeBtn => {
      const size = <string>sizeBtn.dataset.size;
      if (sizesSettings.includes(size) && sizesSettings.length !== defaultFiltersSettings.filter.sizes.length) {
        sizeBtn.classList.add('active');
      }
    });
  }
}

export default Size;