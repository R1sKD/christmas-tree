import MenuTree from './trees/MenuTree';
import MenuBackground from './backgrounds/MenuBackground';
import MenuGarland from './garlands/MenuGarland';
import { snow } from './snow';
import IMenuSettings from '../../interfaces/IMenuSettings';
import { getSavedMenuSettings } from '../../localStorage/getSavedMenuSettings';

class Menu {
  menus: (MenuTree | MenuBackground | MenuGarland)[];
  musicBtn: HTMLButtonElement;
  snowBtn: HTMLButtonElement;
  treeContainer: HTMLDivElement;
  menuSettings: IMenuSettings;

  constructor() {
    this.menus = [
      new MenuTree(),
      new MenuBackground(),
      new MenuGarland()
    ];
    this.treeContainer = <HTMLDivElement>document.querySelector('.main-tree');

    this.musicBtn = <HTMLButtonElement>document.querySelector('.menu__top-btn--music');
    this.musicBtn.onclick = this.playMusic.bind(this);

    this.snowBtn = <HTMLButtonElement>document.querySelector('.menu__top-btn--snow');
    this.snowBtn.onclick = this.activateSnow.bind(this);

    this.menuSettings = getSavedMenuSettings() || {
      music: false,
      snow: false,
      tree: '1',
      background: '1',
      garland: 'multicolor',
      isGarland: true
    };

    this.setSettings();

    window.addEventListener('hashchange', () => {
      this.getSettings();
      localStorage.setItem('menuSettings', JSON.stringify(this.menuSettings));
    });

    window.addEventListener('beforeunload', () => {
      this.getSettings();
      localStorage.setItem('menuSettings', JSON.stringify(this.menuSettings));
    });
  }

  playMusic(): void {
    const music = <HTMLAudioElement>document.getElementById('tree-audio');
    this.musicBtn.classList.toggle('active');
    this.musicBtn.classList.contains('active') ? music.play() : music.pause();
  }

  activateSnow(): void {
    this.snowBtn.classList.toggle('active');
    if (this.snowBtn.classList.contains('active')) {
      snow(this.treeContainer);
    }
  }

  getSettings(): void {
    this.menus.forEach(menu => menu.getSettings(this.menuSettings));
    this.menuSettings.music = this.musicBtn.classList.contains('active') ? true : false;
    this.menuSettings.snow = this.snowBtn.classList.contains('active') ? true : false;
  }

  setSettings(): void {
    if (this.menuSettings.music) {
      window.addEventListener('click', this.playMusic.bind(this), {once: true});
    }
    this.menuSettings.snow ? this.activateSnow() : false;
    this.menus.forEach(menu => menu.setSettings(this.menuSettings));
  }
}

export default Menu;