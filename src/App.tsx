import { Component } from "solid-js";
import Canvas from "./agents/canvas.class";
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
  return (
    <div>asd</div>
  );
};

export default App;
