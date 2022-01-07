export function snow(treeContainer: HTMLDivElement) {
  const snowBtn = <HTMLButtonElement>document.querySelector('.menu__top-btn--snow');
  const flake = document.createElement('div');
  flake.innerHTML = '❆';
  flake.style.cssText = 'position:absolute;color:#fff;z-index: 2;';
  const treeContainerHeight = parseInt(getComputedStyle(treeContainer).height);
  const treeContainerWidth = parseInt(getComputedStyle(treeContainer).width);
  const millisec = 100;
  const snowTimerID = setInterval(function () {
    const startLeft = Math.random() * treeContainerWidth;
    const endLeft = Math.random() * treeContainerWidth;
    const flakeSize = 5 + 20 * Math.random();
    const durationTime = 4000 + 7000 * Math.random();
    const startOpacity = 0.7 + 0.3 * Math.random();
    const endOpacity = 0.2 + 0.2 * Math.random();
    const cloneFlake = flake.cloneNode(true);
    (cloneFlake as HTMLElement).style.cssText += `
                        left: ${startLeft}px;
                        opacity: ${startOpacity};
                        font-size:${flakeSize}px;
                        top: 0;
                        transition:${durationTime}ms;
                    `;
    treeContainer.appendChild(cloneFlake);
    setTimeout(function () {
      (cloneFlake as HTMLElement).style.cssText += `
                                left: ${endLeft}px;
                                top:${treeContainerHeight - 40}px;
                                opacity:${endOpacity};
                            `;
      setTimeout(function () {
        (cloneFlake as HTMLElement).remove();
      }, durationTime);
    }, 0);
  }, millisec);
  snowBtn.addEventListener('click', () => {
    if (!snowBtn.classList.contains('active')) {
      clearInterval(snowTimerID);
    }
  });
}
