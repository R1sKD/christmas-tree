import IInfoAboutToy from '../interfaces/IInfoAboutToy';

export function getSavedFavoriteToys(): IInfoAboutToy[] | null {
  const savedFavoriteToys: string | null = localStorage.getItem('favoriteToys');
  let actualFavoriteToys: null | IInfoAboutToy[];
  if (savedFavoriteToys) {
    actualFavoriteToys = JSON.parse(savedFavoriteToys);
    return actualFavoriteToys;
  }
  return null;
}