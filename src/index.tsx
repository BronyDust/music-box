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

  const canvasManager = new Canvas(canvasElement);
  const renderer = new Renderer(canvasManager);

  canvasManager.syncResolution();
  renderer.provideResolutionToShader();

  const appRoot = document.createElement('div');
  appRoot.classList.add(css.rootElement);
  document.body.appendChild(appRoot);

  const renderTree = new RenderTree(renderer);

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
