import Tree from '../../components/tree-page/Tree';

export const TreePage = {
  render: async () => {    
    const view = `
      <div class="tree">
      <div class="container">
        <div class="tree__inner">
          <div class="menu">
            <div class="menu__top">
              <button class="menu__top-btn menu__top-btn--music" type="button"></button>
              <button class="menu__top-btn menu__top-btn--snow" type="button"></button>
            </div>
            <div class="menu__tree">
              <div class="menu__title">
                Выберите ёлку
              </div>
              <ul class="menu__tree-list">
                <li class="menu__tree-item" data-tree="1"></li>
                <li class="menu__tree-item" data-tree="2"></li>
                <li class="menu__tree-item" data-tree="3"></li>
                <li class="menu__tree-item" data-tree="4"></li>
                <li class="menu__tree-item" data-tree="5"></li>
                <li class="menu__tree-item" data-tree="6"></li>
              </ul>
            </div>
            <div class="menu__background">
              <div class="menu__title">
                Выберите фон
              </div>
              <ul class="menu__background-list">
                <li class="menu__background-item" data-background="1"></li>
                <li class="menu__background-item" data-background="2"></li>
                <li class="menu__background-item" data-background="3"></li>
                <li class="menu__background-item" data-background="4"></li>
                <li class="menu__background-item" data-background="5"></li>
                <li class="menu__background-item" data-background="6"></li>
                <li class="menu__background-item" data-background="7"></li>
                <li class="menu__background-item" data-background="8"></li>
                <li class="menu__background-item" data-background="9"></li>
                <li class="menu__background-item" data-background="10"></li>
              </ul>
            </div>
            <div class="menu__garland">
              <div class="menu__title">
                Гирлянда
              </div>
              <ul class="menu__garland-list">
                <li class="menu__garland-item">
                  <button class="menu__garland-btn menu__garland-btn--multicolor" data-color="multicolor"></button>
                </li>
                <li class="menu__garland-item">
                  <button class="menu__garland-btn menu__garland-btn--red" data-color="red"></button>
                </li>
                <li class="menu__garland-item">
                  <button class="menu__garland-btn menu__garland-btn--blue" data-color="blue"></button>
                </li>
                <li class="menu__garland-item">
                  <button class="menu__garland-btn menu__garland-btn--yellow" data-color="yellow"></button>
                </li>
                <li class="menu__garland-item">
                  <button class="menu__garland-btn menu__garland-btn--green" data-color="green"></button>
                </li>
              </ul>
              <label class="menu__garland-label">
                <input class="menu__garland-checkbox" type="checkbox">
                <div class="menu__garland-onoff"></div>
                <div class="menu__garland-switch"></div>
              </label>
            </div>
            <button id="reset-tree" class="button reset-tree">Сбросить</button>
            <button id="save-tree" class="button save-tree">Сохранить</button>
          </div>
          <div class="main-tree">
            <div class="garland">
 
            </div>
            <map name="tree-map" >
              <area data-drop-target="true" coords="248,1,193,78,194,130,156,130,162,197,106,216,116,261,116,324,71,350,100,408,13,443,79,516,4,555,63,641,114,684,257,707,358,695,441,662,466,616,497,548,428,503,452,455,409,407,424,354,381,322,391,286,397,227,355,200,354,145,313,123,309,70" shape="poly">
            </map>
            <div style="position: relative;" class="main-tree__img-container">
              <img class="main-tree__img" src="assets/tree/1.png" alt="tree" usemap="#tree-map">
            </div>
          </div>
          <div class="toys">
            <div class="menu__title">
              Игрушки
            </div>
            <ul class="toys__list">
              
            </ul>
            <div class="decorated-tree">
              <div class="menu__title">
                Вы нарядили
              </div>
              <ul class="decorated-tree__list">
    
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <audio id="tree-audio" src="assets/audio/audio.mp3"></audio>
    `;
    return view;
  },
  after_render: async () => {
    new Tree();
    const balls = document.querySelectorAll('.ball');
    balls.forEach(ball => (ball as HTMLDivElement).style.display = 'none');
  }
}

export default TreePage;