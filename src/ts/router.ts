import './components/header/header';
import Home from './views/pages/Home';
import Toys from './views/pages/Toys';
import Tree from './views/pages/Tree';

import Utils from './services/Utils';

type renderHTML = () => Promise<string>;
type afterRenderHTML = () => Promise<void>;

interface HTMLPage {
  render: renderHTML;
  after_render: afterRenderHTML;
}

interface route {
  [key: string]: HTMLPage;
}

const routes: route = {
  '/'    : Home,
  '/toys': Toys,
  '/tree': Tree
};

const router = async () => {

  const content = <HTMLElement>document.getElementById('main-container');

  const request = Utils.parseRequestURL();
  const parsedURL: string = request.resource ? '/' + request.resource : '/';

  const page: HTMLPage = routes[parsedURL];

  content.innerHTML = await page.render();
  await page.after_render();
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);