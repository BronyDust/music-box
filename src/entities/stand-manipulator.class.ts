function canvasBoxToInitialTranslate(canvasElement: HTMLCanvasElement) {
  const { width, height } = canvasElement.getBoundingClientRect();

  const widthByHeight = (height * 210) / 297;
  if (widthByHeight < width) {
    const targetX = (width - widthByHeight) / 2;
    const scale = (widthByHeight * 100) / 2100;
    return [targetX, 0, scale];
  }

  const heightByWidth = (width * 297) / 210;
  const targetY = (height - heightByWidth) / 2;
  const scale = (heightByWidth * 100) / 2970;
  return [0, targetY, scale];
}

class StandManipulator {
  private translation = { x: 0, y: 0 };
  private scale = 20;
  private _renderFunction?: VoidFunction;
  private isDraggingStart = false;

  constructor(private canvasElement: HTMLCanvasElement) {
    this.setDefaultTranslating();
    canvasElement.addEventListener("mousedown", (event) => {
      event.preventDefault();
      this.isDraggingStart = true;
    });

    const endDragging = () => {
      this.isDraggingStart = false;
    };

    canvasElement.addEventListener("mouseup", endDragging);
    canvasElement.addEventListener("mouseleave", endDragging);

    canvasElement.addEventListener("mousemove", (event) => {
      event.preventDefault();
      if (!this.isDraggingStart) return;

      this.translate(event.movementX, event.movementY);
    });

    canvasElement.addEventListener("wheel", (event) => {
      event.preventDefault();

      this.setScale(event.deltaY * -0.01);
    });
  }

  set renderFunction(renderFunction: VoidFunction) {
    this._renderFunction = renderFunction;
  }

  public setDefaultTranslating() {
    const [x, y, scale] = canvasBoxToInitialTranslate(this.canvasElement);
    this.translation = { x, y };
    this.scale = scale;
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
    this.translation.x -= 10 * newScale;
    this.translation.y -= 10 * newScale;
    this._renderFunction?.();
  }

  get transformMatrix(): [number, number] {
    return [this.translation.x, this.translation.y];
  }

  get scaleMatrix(): [number, number] {
    return [this.scale, this.scale];
  }
}

export default StandManipulator;
