class Canvas {
  private canvasContext: WebGL2RenderingContext;

  constructor(private canvas: HTMLCanvasElement) {
    const context = canvas.getContext("webgl2");
    if (!context) throw new Error("FATAL: cannot get webgl context!");

    this.canvasContext = context;
  }

  /**
   * Clear canvas with color
   */
  public clear(r = 0, g = 0, b = 0, a = 0) {
    this.canvasContext.clearColor(r, g, b, a);
    this.canvasContext.clear(this.canvasContext.COLOR_BUFFER_BIT);
  }

  /**
   * Sync canvas w/h with context viewport
   */
  public syncResolution() {
    const { width, height } = this.canvas;
    this.canvasContext.viewport(0, 0, width, height);
  }

  get gl() {
    return this.canvasContext;
  }
}

export default Canvas;
