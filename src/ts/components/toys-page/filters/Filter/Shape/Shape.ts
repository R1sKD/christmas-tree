import IInfoAboutToy from '../../../../interfaces/IInfoAboutToy';
import IFilterSettings from "../../../../interfaces/IFilterSettings";

class Shape {
  shapeButtons: NodeListOf<HTMLButtonElement>;

  constructor() {
    this.shapeButtons = document.querySelectorAll('.filter__shape button');
  }

  checkFilter(toy: IInfoAboutToy, filterSettings: IFilterSettings): boolean {
    return filterSettings.filter.shapes.includes(toy.shape);
  }

  getSettings(filtersSettings: IFilterSettings): void {
    filtersSettings.filter.shapes.length = 0;
    this.shapeButtons.forEach(shapeBtn => {
      if (shapeBtn.classList.contains('active')) {
        const shape = <string>shapeBtn.dataset.shape;
        filtersSettings.filter.shapes.push(shape);
      }
    });
    if (filtersSettings.filter.shapes.length === 0) {
      this.setDefaultSettings(filtersSettings);
    }
  }

  setDefaultSettings(filtersSettings: IFilterSettings): void  {
    filtersSettings.filter.shapes = ['шар', 'колокольчик', 'шишка', 'снежинка', 'фигурка'];
  }

  setActive(filtersSettings: IFilterSettings, defaultFiltersSettings: IFilterSettings): void {
    const shapesSettings = filtersSettings.filter.shapes;
    this.shapeButtons.forEach(btn => {
      const shape = <string>btn.dataset.shape;
      if (shapesSettings.includes(shape) && shapesSettings.length !== defaultFiltersSettings.filter.shapes.length) {
        btn.classList.add('active');
      }
    });
  }
}

export default Shape;