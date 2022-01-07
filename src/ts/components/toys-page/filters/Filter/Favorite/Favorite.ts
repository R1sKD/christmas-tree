import IInfoAboutToy from '../../../../interfaces/IInfoAboutToy';
import IFilterSettings from "../../../../interfaces/IFilterSettings";

class Favorite {
  favorite: HTMLInputElement;

  constructor() {
    this.favorite = <HTMLInputElement>document.querySelector('.filter__fav-input');
  }

  checkFilter(toy: IInfoAboutToy, filterSettings: IFilterSettings): boolean {
    const isFav = this.favorite.checked;
    if (isFav) {
      return toy.favorite === isFav;
    } else {
      this.setDefaultSettings(filterSettings);
      return true;
    }
  }

  getSettings(filtersSettings: IFilterSettings): void {
    filtersSettings.filter.isFavorite = this.favorite.checked;
  }

  setDefaultSettings(filtersSettings: IFilterSettings): void {
    filtersSettings.filter.isFavorite = null;
  }

  setActive(filtersSettings: IFilterSettings): void {
    filtersSettings.filter.isFavorite ? this.favorite.checked = true : this.favorite.checked = false;
  }
}

export default Favorite;