import {
  getScaleMatrix,
  getTranslationMatrix,
  multiply,
  project,
} from "../renderer/utils/matrix-math";
import CursorController, { CursorMode } from "./cursor-controller.class";

function canvasBoxToInitialTranslate(canvasElement: HTMLCanvasElement) {
  const { width, height } = canvasElement.getBoundingClientRect();
  const originX = width / 2;
  const originY = height / 2;

  const widthByHeight = (height * 210) / 297;
  if (widthByHeight < width) {
    const scale = (widthByHeight * 100) / 2100;
    const targetX = (width - widthByHeight) / 2;
    const targetY = height / 2;
    return [-targetX, -targetY, scale, originX, originY];
  }

  const heightByWidth = (width * 297) / 210;
  const targetY = (height - heightByWidth) / 2;
  const scale = (heightByWidth * 100) / 2970;
  return [0, 0, scale, originX, originY];
}

class StandManipulator {
  private translation = { x: 0, y: 0 };
  private scale = 20;
  private origin = { x: 0, y: 0 };
  private _renderFunction?: VoidFunction;
  private isDraggingStart = false;

  constructor(
    private canvasElement: HTMLCanvasElement,
    cursorController: CursorController,
  ) {
    this.setDefaultTranslating();
    canvasElement.addEventListener("mousedown", (event) => {
      event.preventDefault();
      if (event.button !== 1) return;
      cursorController.state = CursorMode.Grabbing;
      this.isDraggingStart = true;
    });

    const endDragging = () => {
      this.isDraggingStart = false;
      cursorController.state = CursorMode.Default;
    };

    canvasElement.addEventListener("mouseup", endDragging);
    canvasElement.addEventListener("mouseleave", endDragging);

    canvasElement.addEventListener("mousemove", (event) => {
      event.preventDefault();
      if (!this.isDraggingStart) return;

      this.translate(event.movementX, event.movementY);
    });

    const wheelTranslateHandler = (event: WheelEvent) => {
      if (event.shiftKey) {
        this.translate(event.deltaY, event.deltaX);
      } else {
        this.translate(-event.deltaX, -event.deltaY);
      }
    };

    const wheelScaleHandler = (event: WheelEvent) => {
      this.setScale(event.deltaY * -0.01);
    };

    canvasElement.addEventListener("wheel", (event) => {
      event.preventDefault();

      if (!event.ctrlKey) return wheelTranslateHandler(event);
      wheelScaleHandler(event);
    });
  }

  set renderFunction(renderFunction: VoidFunction) {
    this._renderFunction = renderFunction;
  }

  public setDefaultTranslating() {
    const [x, y, scale, originX, originY] = canvasBoxToInitialTranslate(this.canvasElement);
    this.translation = { x, y };
    this.scale = scale;
    this.origin = { x: originX, y: originY };
    this._renderFunction?.();
  }

  private translate(x: number, y: number) {
    this.translation.x += x;
    this.translation.y += y;
    this._renderFunction?.();
  }

  private setScale(newScale: number) {
    if (newScale < 0 && this.scale < 4) return;

    this.scale += newScale;
    this._renderFunction?.();
  }

  /** Not calls render */
  public setOrigin(x: number, y: number) {
    this.origin.x += x;
    this.origin.y += y;
  }

  get matrix() {
    const displacementOriginMatrix = getTranslationMatrix(
      this.origin.x,
      this.origin.y,
    );
    const translationMatrix = getTranslationMatrix(
      this.translation.x,
      this.translation.y,
    );
    const normalScale = this.scale * 0.01;
    const scaleMatrix = getScaleMatrix(normalScale, normalScale);

    let matrix = project(this.canvasElement.width, this.canvasElement.height);
    matrix = multiply(matrix, displacementOriginMatrix);
    matrix = multiply(matrix, translationMatrix);
    matrix = multiply(matrix, scaleMatrix);
    
    return matrix;
  }
}

export default StandManipulator;
