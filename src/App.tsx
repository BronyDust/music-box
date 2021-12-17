import { Component, onCleanup, onMount } from "solid-js";
import Canvas from "./agents/canvas.class";
import css from './App.module.css';
import Renderer from "./renderer";
import { RenderTree, RenderTreeNode, RenderType } from "./renderer/render-tree.class";

let canvasManager: Canvas | undefined;
let renderer: Renderer | undefined;
let renderTree: RenderTree | undefined;

export function getCanvasManager() {
  return canvasManager;
}

export function getRenderer() {
  return renderer;
}

export function getRenderTree() {
  return renderTree;
}

/**
 * App entry point
 */
const App: Component = () => {
  let canvasRef: HTMLCanvasElement | undefined;
  let lastNode: RenderTreeNode | undefined;

  const updateCanvasResolution = () => {
    if (!canvasRef) return;

    const { width, height } = canvasRef.getBoundingClientRect();
    canvasRef.width = width;
    canvasRef.height = height;

    canvasManager?.syncResolution();
    renderer?.provideResolutionToShader();
  }

  const addRandomElement = () => {
    if (!renderTree) return;

    const random = Math.random();

    const node = renderTree.createNode(RenderType.Lines, [
      0,0,0,1
    ], [
      0, 100 * random,
      100, 100 * random,
    ]);

    if (!renderTree.head || !lastNode) {
      renderTree.head = node;
    } else {
      lastNode.attach(node);
    }

    lastNode = node;

    renderTree.render();
  }

  onMount(() => {
    if (!canvasRef) return;
    canvasManager = new Canvas(canvasRef);
    renderer = new Renderer(canvasManager);
    renderTree = new RenderTree(renderer);

    updateCanvasResolution();

    window.addEventListener('resize', updateCanvasResolution);

    onCleanup(() => {
      window.removeEventListener('resize', updateCanvasResolution);
      canvasManager?.clear();
    });
  });

  return (
    <>
      <button class={css.button} onclick={addRandomElement}>ADD</button>
      <canvas class={css.canvas} ref={canvasRef} />
    </>
  );
};

export default App;
