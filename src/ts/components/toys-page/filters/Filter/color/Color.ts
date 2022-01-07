import IInfoAboutToy from '../../../../interfaces/IInfoAboutToy';
import IFilterSettings from "../../../../interfaces/IFilterSettings";

class Color {
  colorButtons: NodeListOf<HTMLButtonElement>;

  constructor() {
    this.colorButtons = document.querySelectorAll('.filter__color button');
  }

  checkFilter(toy: IInfoAboutToy, filterSettings: IFilterSettings): boolean {
    return filterSettings.filter.colors.includes(toy.color);
  }

  getSettings(filtersSettings: IFilterSettings): void {
    filtersSettings.filter.colors.length = 0;
    this.colorButtons.forEach(colorBtn => {
      if (colorBtn.classList.contains('active')) {
        const color = <string>colorBtn.dataset.color;
        filtersSettings.filter.colors.push(color);
      }
    });
    if (filtersSettings.filter.colors.length === 0) {
      this.setDefaultSettings(filtersSettings);
    }
  }

  setDefaultSettings(filtersSettings: IFilterSettings): void {
    filtersSettings.filter.colors = ['белый', 'желтый', 'красный', 'синий', 'зелёный'];
  }

  setActive(filtersSettings: IFilterSettings, defaultFiltersSettings: IFilterSettings): void {
    const colorsSettings = filtersSettings.filter.colors;
    this.colorButtons.forEach(btn => {
      const color = <string>btn.dataset.color;
      if (colorsSettings.includes(color) && colorsSettings.length !== defaultFiltersSettings.filter.colors.length) {
        btn.classList.add('active');
      }
    });
  }
}

export default Color;