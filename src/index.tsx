import { createContext } from "solid-js";
import { render } from "solid-js/web";
import css from './index.module.css';
import App from "./App";
import RenderTree from "./entities/render-tree.class";

export const RenderTreeContext = createContext<RenderTree>(null!);

function initialize() {
  const canvasElement = document.createElement('canvas');
  canvasElement.classList.add(css.canvas);
  document.body.appendChild(canvasElement);

  const appRoot = document.createElement('div');
  appRoot.classList.add(css.rootElement);
  document.body.appendChild(appRoot);

  const renderTree = new RenderTree();

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
