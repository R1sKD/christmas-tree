import IInfoAboutToy from '../interfaces/IInfoAboutToy';
import Filters from './filters/Filters';
import { getToyCardsInfo, animateToyCards } from '../animations/animationToys';
import { getSavedFavoriteToys } from '../localStorage/getSavedFavoriteToys';
import * as noUiSlider from 'nouislider';

class Toys {
  toys: IInfoAboutToy[];
  filters: Filters;
  toysContainer: HTMLDivElement;
  favoriteToys: IInfoAboutToy[];
  selectedToys: number;
  selectedCountContainer: HTMLSpanElement;
  sort: HTMLSelectElement;
  rangeCount: noUiSlider.target;
  rangeYear: noUiSlider.target;
  filter: HTMLDivElement;
  resetFilterBtn: HTMLButtonElement;
  searchToy: HTMLInputElement;
  searchToyResetBtn: HTMLButtonElement;

  constructor() {
    this.filters = new Filters();
    this.toys = this.filters.filterToysWithSavedFIlters(null);
    this.toysContainer = <HTMLDivElement>document.querySelector('.toys-page__list');

    this.favoriteToys = getSavedFavoriteToys() || [];
    this.selectedToys = this.favoriteToys.length;
    this.selectedCountContainer = <HTMLSpanElement>document.querySelector('.select__count');
    this.renderSelected();
    this.toysContainer.addEventListener('click', (e) => this.selectToy(e));

    this.sort = <HTMLSelectElement>document.querySelector('.sort__select');
    this.sort.addEventListener('change', this.updateData.bind(this));

    this.rangeCount = <noUiSlider.target>document.querySelector('.range__count-slider');
    this.rangeYear = <noUiSlider.target>document.querySelector('.range__year-slider');
    (<noUiSlider.API>this.rangeCount.noUiSlider).on('update', () => this.updateData.call(this, null));
    (<noUiSlider.API>this.rangeYear.noUiSlider).on('update', () => this.updateData.call(this, null));

    this.filter = <HTMLDivElement>document.querySelector('.filter');
    this.filter.addEventListener('click', (e) => {
      const clickedElem = <HTMLElement>e.target;
      if (clickedElem.tagName === 'BUTTON' || clickedElem.closest('.filter__fav')) {
        this.updateData.call(this, e);
      }
    });

    this.resetFilterBtn = <HTMLButtonElement>document.querySelector('.reset-filters');
    this.resetFilterBtn.addEventListener('click', (e) => {
      this.updateData.call(this, e);
    });

    this.searchToy = <HTMLInputElement>document.querySelector('.search');
    this.searchToy.addEventListener('input', this.updateData.bind(this));
    this.searchToyResetBtn = <HTMLButtonElement>document.querySelector('.reset-search');
    this.searchToyResetBtn.addEventListener('click', (e) => {
      this.updateData.call(this, e);
    });

    window.addEventListener('hashchange', () => {
      localStorage.setItem('favoriteToys', JSON.stringify(this.favoriteToys));
    });

    window.addEventListener('beforeunload', () => {
      localStorage.setItem('favoriteToys', JSON.stringify(this.favoriteToys));
    });
  }

  updateData(e: Event | null): void {
    if (e && (e.target as HTMLButtonElement) === this.resetFilterBtn) {
      this.toys = this.filters.resetFilters();
    } else {
      this.toys = this.filters.filterToys(e);
    }
    this.renderToys();
  }

  renderToys(): void {
    const toysContainer = this.toysContainer;
    const oldToyCards = getToyCardsInfo(toysContainer);
    const toys = this.toys;
    toysContainer.innerHTML = '';
    toys.forEach(toy => toysContainer.appendChild(this.createToyCard(toy)));
    const newToyCards = getToyCardsInfo(toysContainer);
    animateToyCards(oldToyCards, newToyCards);
  }

  createToyCard(toy: IInfoAboutToy): HTMLLIElement {
    const favoriteToys = this.favoriteToys;
    const isFavorite = favoriteToys.map(favToy => favToy.name === toy.name).includes(true);
    const li = document.createElement('li');
    li.classList.add('toys-page__item');
    const toyCard = `
      <article class="toy-card ${isFavorite ? 'active' : ''}">
        <div class="toy-card__title">
          ${toy.name}
        </div>
        <div class="toy-card__box">
          <img class="toy-card__img" src="assets/toys/${toy.num}.png" alt="toy card">
          <ul class="toy-card__info">
            <li class="toy-card__item">
              <div class="toy-card__count">
                Количество: <span>${toy.count}</span>
              </div>
            </li>
            <li class="toy-card__item">
              <div class="toy-card__year">
                Год покупки: <span>${toy.year}</span>
              </div>
            </li>
            <li class="toy-card__item">
              <div class="toy-card__shape">
                Форма: <span>${toy.shape}</span>
              </div>
            </li>
            <li class="toy-card__item">
              <div class="toy-card__color">
                Цвет: <span>${toy.color}</span>
              </div>
            </li>
            <li class="toy-card__item">
              <div class="toy-card__size">
                Размер: <span>${toy.size}</span>
              </div>
            </li>
            <li class="toy-card__item">
              <div class="toy-card__fav">
                Любимая: <span>${toy.favorite ? 'Да' : "Нет"}</span>
              </div>
          </ul>
          <div class="toy-card__mark"></div>
        </div>
      </article>
    `;
    li.innerHTML = toyCard;
    return li;
  }

  selectToy(e: Event): void {
    const elem = <HTMLElement>e.target;
    const toyCard: HTMLElement | null = elem.closest('.toy-card');
    if (!toyCard) return;
    if (toyCard.classList.contains('active')) {
      this.removeFavoriteToy(toyCard);
    } else if (this.selectedToys != 20) {
      this.addFavoriteToy(toyCard);
    } else {
      alert('Извините, все слоты заполнены');
    }
  }

  addFavoriteToy(toyCard: HTMLElement): void {
    toyCard.classList.add('active');
    const toyName = (toyCard.querySelector('.toy-card__title') as HTMLElement).innerHTML.trim();
    const toy = <IInfoAboutToy>this.toys.find(toy => toy.name === toyName);
    this.selectedToys++;
    this.favoriteToys.push(toy);
    this.renderSelected();
  }

  removeFavoriteToy(toyCard: HTMLElement): void {
    toyCard.classList.remove('active');
    const toyName = (toyCard.querySelector('.toy-card__title') as HTMLElement).innerHTML.trim();
    const toyIndex = this.favoriteToys.findIndex(toy => toy.name === toyName);
    this.selectedToys--;
    this.favoriteToys.splice(toyIndex, 1);
    this.renderSelected();
  }

  renderSelected() {
    this.selectedCountContainer.innerHTML = this.selectedToys.toString();
  }
}

export default Toys;