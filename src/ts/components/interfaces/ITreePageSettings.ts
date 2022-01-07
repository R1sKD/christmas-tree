import IMenuSettings from './IMenuSettings';
import IInfoAboutToy from './IInfoAboutToy';

interface ITreePageSettings {
  menuSettings?: IMenuSettings | null;
  favoriteToys?: IInfoAboutToy[] | null;
  toysOnTree?: string[] | null;
}

export default ITreePageSettings;