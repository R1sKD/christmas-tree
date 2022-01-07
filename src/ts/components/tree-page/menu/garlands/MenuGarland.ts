import IMenuSettings from '../../../interfaces/IMenuSettings';

class MenuGarland {
  garlandContainer: HTMLUListElement;
  garlandButtons: NodeListOf<HTMLButtonElement>;
  inputGarland: HTMLInputElement;
  currentGarland: string;
  garland: HTMLDivElement;
  lightBulbs: NodeListOf<Element>[];

  constructor() {
    this.garlandContainer = <HTMLUListElement>document.querySelector('.menu__garland');
    this.garlandContainer.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).tagName === 'BUTTON') {
        this.changeGarland.call(this, e)
      } else if ((e.target as HTMLElement).closest('.menu__garland-label')) {
        this.onoffGarland();
      }
    });
    this.currentGarland = 'multicolor';
    this.inputGarland = <HTMLInputElement>document.querySelector('.menu__garland-checkbox');
    this.garlandButtons = this.garlandContainer.querySelectorAll('button');

    this.garland = <HTMLDivElement>document.querySelector('.garland');
    this.renderGarland();
    this.lightBulbs = [
      document.querySelectorAll('.lightrope li'),
      document.querySelectorAll('.lightrope li:nth-child(2n+1)'),
      document.querySelectorAll('.lightrope li:nth-child(4n+2)')
    ];
  }

  renderGarland(): void {
    this.garland.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
      const lightrope = document.createElement('ul');
      lightrope.classList.add(`lightrope`, `lightrope-${i-1}`);
      lightrope.innerHTML = this.createLightBulbs(i);
      this.garland.appendChild(lightrope);
    }
  }

  createLightBulbs(requireLightBulbs: number): string {
    let lightBulbs = '';
    for (let i = 0; i < requireLightBulbs*4 + 1; i++) {
      lightBulbs += `<li></li>`;
    }
    return lightBulbs;
  }

  changeGarland(e: Event): void {
    const button = <HTMLElement>e.target;
    const color = <string>button.dataset.color;
    this.saveSettings(color);
    this.activateGarland();
  }

  saveSettings(color: string): void {
    this.currentGarland = color;
    this.inputGarland.checked = true;
  }

  activateGarland(): void {
    this.setStyle();
    for (let i = 0; i < this.lightBulbs.length; i++) {
      this.lightBulbs[i].forEach(lightBulb => {
        (lightBulb as HTMLLIElement).style.animationName = `${this.currentGarland}-${i}`;
      });
    }
  }

  deactivateGarland(): void {
    this.resetStyle();
    this.inputGarland.checked = false;
    for (let i = 0; i < this.lightBulbs.length; i++) {
      this.lightBulbs[i].forEach(lightBulb => {
        (lightBulb as HTMLLIElement).style.animationName = `none`;
      });
    }
  }

  setStyle(): void {
    this.resetStyle();
    const currentButton = <HTMLButtonElement>this.garlandContainer.querySelector(`[data-color="${this.currentGarland}"]`);
    currentButton.classList.add('active');
  }

  resetStyle(): void {
    this.garlandButtons.forEach(button => button.classList.remove('active'));
  }

  onoffGarland(): void {
    this.inputGarland.checked ? this.activateGarland() : this.deactivateGarland();
  }

  getSettings(menuSettings: IMenuSettings): void {
    menuSettings.garland = this.currentGarland;
    menuSettings.isGarland = this.inputGarland.checked;
  }

  setSettings(menuSettings: IMenuSettings): void {
    this.inputGarland.checked = menuSettings.isGarland;
    this.currentGarland = menuSettings.garland;
    menuSettings.isGarland ? this.activateGarland() : false;
  }
}

export default MenuGarland;