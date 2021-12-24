import { createContext } from "solid-js";
import { render } from "solid-js/web";
import css from './index.module.css';
import App from "./App";
import RenderTree from "./entities/render-tree.class";
import Canvas from "./agents/canvas.class";
import Renderer from "./renderer";
import Sheet from "./entities/Sheet.class";

export const RenderTreeContext = createContext<RenderTree>(null!);

function initialize() {
  const canvasElement = document.createElement('canvas');
  canvasElement.classList.add(css.canvas);
  document.body.appendChild(canvasElement);

  const appRoot = document.createElement('div');
  appRoot.classList.add(css.rootElement);
  document.body.appendChild(appRoot);

  const canvasManager = new Canvas(canvasElement);
  const renderer = new Renderer(canvasManager);
  const renderTree = new RenderTree(renderer);

  const updateFunction = () => {
    canvasManager.syncResolution();
    renderer.provideResolutionToShader();
    renderTree.render();
  }

  updateFunction();
  window.addEventListener('resize', updateFunction);

  const sheet = new Sheet();
  renderTree.tree.insert(sheet);

  render(
    () => (
      <RenderTreeContext.Provider value={renderTree}>
        <App />
      </RenderTreeContext.Provider>
    ),
    appRoot,
  );
}

initialize();
