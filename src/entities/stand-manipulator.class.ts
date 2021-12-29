function debounce(cb: VoidFunction, cd: number) {
  let timeout: number | null = null;

  return function run() {
    const unAllocTimeout = () => {
      timeout = null;
    }

    const callNow = !timeout;
    
    if (timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(unAllocTimeout, cd);
    if (callNow) cb();
  }
}

class StandManipulator {
  private translation = { x: 0, y: 0 };
  private debouncedRender?: VoidFunction;
  private isDraggingStart = false;

  constructor(canvasElement: HTMLCanvasElement) {
    canvasElement.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      this.isDraggingStart = true;
    });

    const endDragging = () => {
      this.isDraggingStart = false;
    };

    canvasElement.addEventListener('pointerup', endDragging);
    canvasElement.addEventListener('pointercancel', endDragging);
    canvasElement.addEventListener('pointerleave', endDragging);

    canvasElement.addEventListener('pointermove', (event) => {
      event.preventDefault();
      if (!this.isDraggingStart) return;
      

      this.translate(event.movementX, event.movementY);
    });
  }

  set renderFunction(renderFunction: VoidFunction) {
    this.debouncedRender = renderFunction;
  }

  private translate(x: number, y: number) {
    this.translation.x += x;
    this.translation.y += y;
    this.debouncedRender?.();
  }

  get transformMatrix(): [number, number] {
    return [this.translation.x, this.translation.y];
  }
}

export default StandManipulator;
