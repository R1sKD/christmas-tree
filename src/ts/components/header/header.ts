const nav = <HTMLElement>document.querySelector('.header__nav');
const links = nav.querySelectorAll('.header__link');

function setActiveLink() {
  const url: string = location.hash.slice(1).toLowerCase() || '/';
  const link = <HTMLElement>document.querySelector(`a[href*="${url}"]`);
  links.forEach(link => link.classList.remove('active'));
  link.classList.add('active');
}

window.addEventListener('hashchange', setActiveLink);
window.addEventListener('load', setActiveLink);
