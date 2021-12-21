import { Component, onCleanup, onMount, useContext } from "solid-js";
import Canvas from "./agents/canvas.class";
import css from './App.module.css';
import Renderer from "./renderer";

let canvasManager: Canvas | undefined;
let renderer: Renderer | undefined;

export function getCanvasManager() {
  return canvasManager;
}

export function getRenderer() {
  return renderer;
}

const App: Component = () => {
  let canvasRef: HTMLCanvasElement | undefined;

  const updateCanvasResolution = () => {
    if (!canvasRef) return;

    const { width, height } = canvasRef.getBoundingClientRect();
    canvasRef.width = width;
    canvasRef.height = height;

    canvasManager?.syncResolution();
    renderer?.provideResolutionToShader();
    renderTree?.render();
  }

  onMount(() => {
    if (!canvasRef) return;
    canvasManager = new Canvas(canvasRef);
    renderer = new Renderer(canvasManager);

    updateCanvasResolution();
    if (renderTree) renderTree.renderer = renderer;

    window.addEventListener('resize', updateCanvasResolution);

    onCleanup(() => {
      window.removeEventListener('resize', updateCanvasResolution);
      canvasManager?.clear();
    });
  });

  return (
    <>
      <Page />
      <canvas class={css.canvas} ref={canvasRef} />
    </>
  );
};

export default App;
