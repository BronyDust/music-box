import { createContext } from "solid-js";
import { render } from "solid-js/web";
import css from "./index.module.css";
import App from "./App";
import RenderTree from "./entities/render-tree.class";
import Canvas from "./agents/canvas.class";
import Renderer from "./renderer";
import PageManager from "./agents/page-manager.class";

export const PageManagerContext = createContext<PageManager>(null!);

function initialize() {
  const canvasElement = document.createElement("canvas");
  canvasElement.classList.add(css.canvas);
  document.body.appendChild(canvasElement);

  const appRoot = document.createElement("div");
  appRoot.classList.add(css.rootElement);
  document.body.appendChild(appRoot);

  const canvasManager = new Canvas(canvasElement);
  const renderer = new Renderer(canvasManager);
  const renderTree = new RenderTree(renderer, () => canvasManager.clear());

  const updateFunction = () => {
    canvasManager.clear();
    canvasManager.syncResolution();
    renderer.provideResolutionToShader();
    renderTree.render();
  };

  updateFunction();
  window.addEventListener("resize", updateFunction);

  const pageManager = new PageManager(renderTree);
  pageManager.initSheet();

  render(
    () => (
      <PageManagerContext.Provider value={pageManager}>
        <App />
      </PageManagerContext.Provider>
    ),
    appRoot,
  );
}

initialize();
