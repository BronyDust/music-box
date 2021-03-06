import { createContext } from "solid-js";
import { render } from "solid-js/web";
import css from "./index.module.css";
import App from "./App";
import RenderTree from "./entities/render-tree.class";
import Renderer from "./renderer";
import PageManager from "./agents/page-manager.class";
import StandManipulator from "./entities/stand-manipulator.class";
import CursorController from "./entities/cursor-controller.class";

export const PageManagerContext = createContext<PageManager>(null!);
export const StandManipulatorContext = createContext<StandManipulator>(null!);

function initialize() {
  const canvasElement = document.createElement("canvas");
  canvasElement.classList.add(css.canvas);
  canvasElement.tabIndex = -1;
  document.body.appendChild(canvasElement);

  const appRoot = document.createElement("div");
  appRoot.classList.add(css.rootElement);
  document.body.appendChild(appRoot);

  const canvasContext = canvasElement.getContext('webgl2');
  if (!canvasContext) throw new Error('FATAL: cannot get webgl context!');

  const clearCanvas = () => {
    canvasContext.clearColor(0, 0, 0, 0);
    canvasContext.clear(canvasContext.COLOR_BUFFER_BIT);
  }

  const renderer = new Renderer(canvasContext);
  const cursorController = new CursorController();
  const standManipulator = new StandManipulator(canvasElement, cursorController);
  const renderTree = new RenderTree(renderer, clearCanvas);

  const updateFunction = () => {
    clearCanvas();
    const { width, height } = canvasElement.getBoundingClientRect();
    canvasElement.width = width;
    canvasElement.height = height;
    canvasContext.viewport(0, 0, width, height);

    renderer.setMatrix(standManipulator.matrix);
    renderTree.render();
  };

  standManipulator.renderFunction = () => {
    renderer.setMatrix(standManipulator.matrix);
    renderTree.render();
  };

  updateFunction();
  window.addEventListener("resize", updateFunction);

  const pageManager = new PageManager(renderTree);
  pageManager.initSheet();

  canvasElement.addEventListener('click', (event) => {
    event.preventDefault();

    const { pageX, pageY } = event;
    const [
      scaleX,,,
      , scaleY,,
      transformX, transformY
    ] = standManipulator.matrix;

    renderTree.select((pageX - transformX) / scaleX * 100, (pageY - transformY) / scaleY * 100);
    renderTree.render();
  });

  render(
    () => (
      <PageManagerContext.Provider value={pageManager}>
        <StandManipulatorContext.Provider value={standManipulator}>
          <App />
        </StandManipulatorContext.Provider>
      </PageManagerContext.Provider>
    ),
    appRoot,
  );
}

initialize();
