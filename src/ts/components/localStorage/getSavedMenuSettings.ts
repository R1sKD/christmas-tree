import IMenuSettings from '../interfaces/IMenuSettings';

export function getSavedMenuSettings(): IMenuSettings | null {
  const savedMenuSettings: string | null = localStorage.getItem('menuSettings');
  let actualMenuSettings: null | IMenuSettings;
  if (savedMenuSettings) {
    actualMenuSettings = JSON.parse(savedMenuSettings);
    return actualMenuSettings;
  }
  return null;
}