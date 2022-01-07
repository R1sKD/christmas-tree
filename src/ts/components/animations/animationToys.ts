import IToyElementInfo from '../interfaces/IToyElementInfo';

export function getToyCardsInfo(container: Element): IToyElementInfo[] {
  return Array.from(container.children).map((toy) => {
    const rect = toy.getBoundingClientRect();
    const toyName = (toy.querySelector('.toy-card__title') as HTMLElement).innerHTML.trim();
    return {
      element: toy,
      toyName: toyName,
      x: rect.left,
      y: rect.top,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top,
    }
  });
}

export function animateToyCards(
  oldToyCards: IToyElementInfo[],
  newToyCards: IToyElementInfo[]
): void {

  if (newToyCards.length > oldToyCards.length) return;
  for (const newToyCardInfo of newToyCards) {
    const oldToyCardInfo = <IToyElementInfo>oldToyCards.find(
      (toyCardInfo) => toyCardInfo.toyName === newToyCardInfo.toyName
    )

    const translateX = oldToyCardInfo.x - newToyCardInfo.x
    const translateY = oldToyCardInfo.y - newToyCardInfo.y
    const scaleX = oldToyCardInfo.width / newToyCardInfo.width
    const scaleY = oldToyCardInfo.height / newToyCardInfo.height

    newToyCardInfo.element.animate(
      [
        {
          transform: `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`,
        },
        { transform: 'none' },
      ],
      {
        duration: 250,
        easing: 'ease-out',
      }
    )
  }
}