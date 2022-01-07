import Toys from '../toys-page/Toys';

class App {
  toys: Toys;

  constructor() {
    this.toys = new Toys();
    this.start();
  }

  start(): void {
    this.toys.renderToys();
  }
}

export default App;