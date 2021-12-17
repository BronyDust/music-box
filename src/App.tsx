import { Component, onCleanup, onMount } from "solid-js";
import Canvas from "./agents/canvas.class";
import css from './App.module.css';

let canvasManager: Canvas | undefined;

export function getCanvasManager() {
  return canvasManager;
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
    if (!canvasRef || !canvasManager) return;

    const { width, height } = canvasRef.getBoundingClientRect();
    canvasRef.width = width;
    canvasRef.height = height;

    canvasManager.syncResolution();
  }

  onMount(() => {
    if (!canvasRef) return;
    canvasManager = new Canvas(canvasRef);

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
