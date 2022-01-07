const Home = {
    render: async () => {
        const view = `
            <div class="main-page">
              <div class="main-page__inner">
                <div class="main-page__box">
                  <h1 class="main-page__title">
                    Новогодняя игра
                    <span class="main-page__name">
                    "Наряди ёлку"
                    </span>
                  </h1>
                </div>
                <a class="main-page__button button" href="#toys">
                  Начать
                </a>
              </div>
            </div>
          `;
        return view;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    , after_render: async () => {
    }

}

export default Home;