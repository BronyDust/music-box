import { Component, onCleanup, onMount } from "solid-js";
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

/**
 * App entry point
 * 
 * Used to:
 * - place canvas
 * - 
 */
const App: Component = () => {
  let canvasRef: HTMLCanvasElement | undefined;

  const updateCanvasResolution = () => {
    if (!canvasRef) return;

    const { width, height } = canvasRef.getBoundingClientRect();
    canvasRef.width = width;
    canvasRef.height = height;

    canvasManager?.syncResolution();
    renderer?.provideResolutionToShader();
  }

  onMount(() => {
    if (!canvasRef) return;
    canvasManager = new Canvas(canvasRef);
    renderer = new Renderer(canvasManager);

    updateCanvasResolution();
    window.addEventListener('resize', updateCanvasResolution);

    onCleanup(() => {
      window.removeEventListener('resize', updateCanvasResolution);
      canvasManager?.clear();
    });
  });



  return (
    <>
      <canvas class={css.canvas} ref={canvasRef} />
    </>
  );
};

export default App;
