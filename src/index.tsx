import { createContext } from "solid-js";
import { render } from "solid-js/web";
import css from "./index.module.css";
import App from "./App";
import RenderTree from "./entities/render-tree.class";
import Canvas from "./agents/canvas.class";
import Renderer from "./renderer";
import PageManager from "./agents/page-manager.class";
import StandManipulator from "./entities/stand-manipulator.class";
import CursorController from "./entities/cursor-controller.class";
import Staff from "./entities/staff.class";

export const PageManagerContext = createContext<PageManager>(null!);
export const StandManipulatorContext = createContext<StandManipulator>(null!);

// function initialize() {
//   const canvasElement = document.createElement("canvas");
//   canvasElement.classList.add(css.canvas);
//   canvasElement.tabIndex = -1;
//   document.body.appendChild(canvasElement);

//   const appRoot = document.createElement("div");
//   appRoot.classList.add(css.rootElement);
//   document.body.appendChild(appRoot);

//   const canvasManager = new Canvas(canvasElement);
//   const renderer = new Renderer(canvasManager);
//   const cursorController = new CursorController();
//   const standManipulator = new StandManipulator(canvasElement, cursorController);
//   const renderTree = new RenderTree(renderer, () => canvasManager.clear());

//   const updateFunction = () => {
//     canvasManager.clear();
//     canvasManager.syncResolution();
//     renderer.provideResolutionToShader();
//     renderer.setScale(standManipulator.scaleMatrix);
//     renderer.setTranslation(standManipulator.transformMatrix);
//     renderTree.render();
//   };

//   standManipulator.renderFunction = () => {
//     renderer.setScale(standManipulator.scaleMatrix);
//     renderer.setTranslation(standManipulator.transformMatrix);
//     renderTree.render();
//   };

//   updateFunction();
//   window.addEventListener("resize", updateFunction);

//   const pageManager = new PageManager(renderTree);
//   pageManager.initSheet();

//   canvasElement.addEventListener('click', (event) => {
//     event.preventDefault();

//     const { pageX, pageY } = event;
//     const [ transformX, transformY ] = standManipulator.transformMatrix;
//     const [ scaleX, scaleY ] = standManipulator.scaleMatrix;

//     renderTree.select((pageX - transformX) / scaleX * 100, (pageY - transformY) / scaleY * 100);
//     renderTree.render();
//   });

//   render(
//     () => (
//       <PageManagerContext.Provider value={pageManager}>
//         <StandManipulatorContext.Provider value={standManipulator}>
//           <App />
//         </StandManipulatorContext.Provider>
//       </PageManagerContext.Provider>
//     ),
//     appRoot,
//   );
// }

// initialize();

function init() {
  const canvasElement = document.createElement("canvas");
  canvasElement.classList.add(css.canvas);
  canvasElement.tabIndex = -1;
  document.body.appendChild(canvasElement);
  const canvasContext = canvasElement.getContext('webgl2');
  if (!canvasContext) throw new Error();

  const renderer = new Renderer(canvasContext);
  renderer.setScale([100,100]);
  renderer.setTranslation([0,0]);
  const { width, height } = canvasElement.getBoundingClientRect();
  canvasElement.width = width;
  canvasElement.height = height;
  
  canvasContext.viewport(0, 0, width, height);

  renderer.provideResolutionToShader();
  const renderTree = new RenderTree(renderer, () => {
    canvasContext.clearColor(0,0,0,0);
    canvasContext.clear(canvasContext.COLOR_BUFFER_BIT);
  });

  const staff = new Staff([0,0], [200, 50], [0,0]);
  renderTree.tree.append(staff);

  const image = new Image(width, height);
  image.onload = () => {
    console.log(image);
  }
  image.src = canvasElement.toDataURL();
}

init();
