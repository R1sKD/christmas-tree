import App from '../../components/app/app';

const About = {
  render: async () => {
    const view = `
    <div class="toys-page">
        <div class="toys-page__inner">
          <ul class="controls">
            <li class="controls__item">
              <div class="filter" data-sort="filter">
                <div class="controls__title">
                  Фильтры по значению
                </div>
                <div class="filter__shape">
                  Форма:
                  <button class="filter__button filter__button--ball" data-shape="шар"></button>
                  <button class="filter__button filter__button--bell" data-shape="колокольчик"></button>
                  <button class="filter__button filter__button--cone" data-shape="шишка"></button>
                  <button class="filter__button filter__button--snowflake" data-shape="снежинка"></button>
                  <button class="filter__button filter__button--toy" data-shape="фигурка"></button>
                </div>
                <div class="filter__color">
                  Цвет:
                  <button class="filter__button filter__button--white" data-color="белый"></button>
                  <button class="filter__button filter__button--yellow" data-color="желтый"></button>
                  <button class="filter__button filter__button--red" data-color="красный"></button>
                  <button class="filter__button filter__button--blue" data-color="синий"></button>
                  <button class="filter__button filter__button--green" data-color="зелёный"></button>
                </div>
                <div class="filter__size">
                  Размер:
                  <button class="filter__button filter__button--small" data-size="малый"></button>
                  <button class="filter__button filter__button--medium" data-size="средний"></button>
                  <button class="filter__button filter__button--big" data-size="большой"></button>
                </div>
                <div class="filter__fav">
                  <label class="filter__fav-label">
                    Только любимые:
                    <input class="filter__fav-input" type="checkbox">
                  </label>
                </div>
              </div>
            </li>
            <li class="controls__item">
              <div class="range">
                <div class="controls__title">
                  Фильтры по диапазону
                </div>
                <span class="range__subtitle">
                  Количество экземпляров:
                </span>
                <div class="range__count" data-range="count">
                  <span class="range__count-start">1</span>
                  <div class="range__count-slider range-slider"></div>
                  <span class="range__count-end">12</span>
                </div>
                <span class="range__subtitle">
                  Год приобретения:
                </span>
                <div class="range__year" data-range="year">
                  <span class="range__year-start">1940</span>
                  <div class="range__year-slider  range-slider"></div>
                  <span class="range__year-end">2020</span>
                </div>
              </div>
            </li>
            <li class="controls__item">
              <div class="sort">
                <div class="controls__title">
                  Сортировка
                </div>
                <select class="sort__select" data-sort="sort">
                  <option value='По названию от "А" до "Я"' selected>По названию от "А" до "Я"</option>
                  <option value='По названию от "Я" до "А"'>По названию от "Я" до "А"</option>
                  <option value='По количеству по возрастанию'>По количеству по возрастанию</option>
                  <option value='По количеству по убыванию'>По количеству по убыванию</option>
                </select>
                <button class="sort__button button reset-filters">Сброс фильтров</button>
                <button class="button reset-localStorage">Очистить local storage</button>
              </div>
            </li>
          </ul>

          <div class="toysearch-error">Извините, совпадений не обнаружнено</div>

          <ul class="toys-page__list">

          </ul>
        </div>
      </div>
        `;
    return view;
  },
  after_render: async () => {
    new App();
  }

}

export default About;