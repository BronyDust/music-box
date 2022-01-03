class StandManipulator {
  private translation = { x: 0, y: 0 };
  private scale = 1;
  private _renderFunction?: VoidFunction;
  private isDraggingStart = false;

  constructor(canvasElement: HTMLCanvasElement) {
    canvasElement.addEventListener('mousedown', (event) => {
      event.preventDefault();
      this.isDraggingStart = true;
    });

    const endDragging = () => {
      this.isDraggingStart = false;
    };

    canvasElement.addEventListener('mouseup', endDragging);
    canvasElement.addEventListener('mouseleave', endDragging);

    canvasElement.addEventListener('mousemove', (event) => {
      event.preventDefault();
      if (!this.isDraggingStart) return;

      this.translate(event.movementX, event.movementY);
    });
  }

  set renderFunction(renderFunction: VoidFunction) {
    this._renderFunction = renderFunction;
  }

  private translate(x: number, y: number) {
    this.translation.x += x;
    this.translation.y += y;
    this._renderFunction?.();
  }

  private setScale(newScale: number) {
    this.scale += newScale;
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
