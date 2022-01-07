import IFilterSettings from "../../../interfaces/IFilterSettings";
import IInfoAboutToy from '../../../interfaces/IInfoAboutToy';
import * as noUiSlider from 'nouislider';

class Range {
  rangeCount: noUiSlider.target;
  rangeYear: noUiSlider.target;
  countMin: HTMLSpanElement;
  countMax: HTMLSpanElement;
  yearMin: HTMLSpanElement;
  yearMax: HTMLSpanElement;
  resetSliderBtn: HTMLButtonElement;

  constructor() {
    this.rangeCount = <noUiSlider.target>document.querySelector('.range__count-slider');
    this.rangeYear = <noUiSlider.target>document.querySelector('.range__year-slider');
    this.countMin = <HTMLSpanElement>document.querySelector('.range__count-start');
    this.countMax = <HTMLSpanElement>document.querySelector('.range__count-end');
    this.yearMin = <HTMLSpanElement>document.querySelector('.range__year-start');
    this.yearMax = <HTMLSpanElement>document.querySelector('.range__year-end');
    this.resetSliderBtn = <HTMLButtonElement>document.querySelector('.reset-filters');
    this.renderSlider();
    (<noUiSlider.API>this.rangeCount.noUiSlider).on('update', values => {
      values = values.map(value => parseInt((value as string)));
      this.countMin.innerHTML = values[0].toString();
      this.countMax.innerHTML = values[1].toString();
    });

    (<noUiSlider.API>this.rangeYear.noUiSlider).on('update', values => {
      values = values.map(value => parseInt((value as string)));
      this.yearMin.innerHTML = values[0].toString();
      this.yearMax.innerHTML = values[1].toString();
    });
    this.resetSliderBtn.addEventListener('click', () => {
      this.resetFilter();
    });
  }

  checkFilter(filterSettings: IFilterSettings, toy: IInfoAboutToy): boolean {
    const isFit: boolean = this.checkCountRange(filterSettings, toy) && this.checkYearRange(filterSettings, toy);
    return isFit;
  }

  checkCountRange(filterSettings: IFilterSettings, toy: IInfoAboutToy): boolean {
    const countMin: number = filterSettings.range.count.min;
    const countMax: number = filterSettings.range.count.max;
    const isFit = (countMin <= +toy.count) && (+toy.count <= countMax);
    return isFit;
  }

  checkYearRange(filterSettings: IFilterSettings, toy: IInfoAboutToy): boolean {
    const yearMin: number = filterSettings.range.year.min;
    const yearMax: number = filterSettings.range.year.max;
    const isFit = (yearMin <= +toy.year) && (+toy.year <= yearMax);
    return isFit;
  }

  getSettings(filtersSettings: IFilterSettings) {
    filtersSettings.range.count.min = +this.countMin.innerHTML;
    filtersSettings.range.count.max = +this.countMax.innerHTML;
    filtersSettings.range.year.min = +this.yearMin.innerHTML;
    filtersSettings.range.year.max = +this.yearMax.innerHTML;
  }

  renderSlider(): void {
    const minCount = 1;
    const maxCount = 12;
    const minYear = 1940;
    const maxYear = 2020;

    noUiSlider.create(this.rangeCount, {
      start: [minCount, maxCount],
      step: 1,
      connect: true,
      range: {
        'min': 1,
        'max': 12
      },
      format: {
        to: function (value) {
          return value + ',-';
        },
        from: function (value) {
          return Number(value.replace(',-', ''));
        }
      }
    });

    noUiSlider.create(this.rangeYear, {
      start: [minYear, maxYear],
      step: 10,
      connect: true,
      range: {
        'min': 1940,
        'max': 2020
      },
      format: {
        to: function (value) {
          return value + ',-';
        },
        from: function (value) {
          return Number(value.replace(',-', ''));
        }
      }
    });
  }

  setActive(filtersSettings: IFilterSettings): void {
    (<noUiSlider.API>this.rangeCount.noUiSlider).set([filtersSettings.range.count.min, filtersSettings.range.count.max]);
    (<noUiSlider.API>this.rangeYear.noUiSlider).set([filtersSettings.range.year.min, filtersSettings.range.year.max]);
  }

  resetFilter(): void {
    (<noUiSlider.API>this.rangeCount.noUiSlider).reset();
    (<noUiSlider.API>this.rangeYear.noUiSlider).reset();
  }
}

export default Range;