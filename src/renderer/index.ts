import compileShader from "./utils/compile-shader";
import vertexSource from "./vertex.glsl";
import fragmentSource from "./fragment.glsl";
import webglProgram from "./utils/webgl-program";
import Canvas from "../agents/canvas.class";

class Renderer {
  private positionAttributeLocation: number;
  private resolutionUniformLocation: WebGLUniformLocation;
  private colorUniformLocation: WebGLUniformLocation;

  /**
   * Fill buffer data
   *
   * It's possible to pass gl rendering hint
   */
  private setBufferData(
    matrix: Float32Array,
    hint = this.canvas.gl.STATIC_DRAW,
  ) {
    this.canvas.gl.bufferData(
      this.canvas.gl.ARRAY_BUFFER,
      matrix,
      hint,
    );
  }

  constructor(private canvas: Canvas) {
    // Create program
    const vertexShader = compileShader(
      canvas.gl,
      canvas.gl.VERTEX_SHADER,
      vertexSource,
    );
    const fragmentShader = compileShader(
      canvas.gl,
      canvas.gl.FRAGMENT_SHADER,
      fragmentSource,
    );
    if (!vertexShader || !fragmentShader)
      throw new Error("FATAL: cannot compile shaders");
    const program = webglProgram(canvas.gl, vertexShader, fragmentShader);
    if (!program) throw new Error("FATAL: cannot link WebGL program");
    canvas.gl.useProgram(program);

    // Get pointers
    this.positionAttributeLocation = canvas.gl.getAttribLocation(
      program,
      "manual_position",
    );
    const resolutionUniformLocation = canvas.gl.getUniformLocation(
      program,
      "user_resolution",
    );
    if (!resolutionUniformLocation)
      throw new Error('FATAL: cannot find "user_resolution" uniform location');
    this.resolutionUniformLocation = resolutionUniformLocation;
    const colorUniformLocation = canvas.gl.getUniformLocation(
      program,
      "user_color",
    );
    if (!colorUniformLocation)
      throw new Error('FATAL: cannot find "user_color" uniform location');
    this.colorUniformLocation = colorUniformLocation;

    // Attach buffer
    const positionBuffer = canvas.gl.createBuffer();
    if (!positionBuffer) throw new Error("FATAL: cannot create WebGL buffer");
    canvas.gl.bindBuffer(canvas.gl.ARRAY_BUFFER, positionBuffer);
    const vertexArray = canvas.gl.createVertexArray();
    if (!vertexArray) throw new Error("FATAL: cannot create vertex array");
    canvas.gl.bindVertexArray(vertexArray);
    canvas.gl.enableVertexAttribArray(this.positionAttributeLocation);

    // Explain how to render data from buffer to webgl context
    const size = 2;
    const type = canvas.gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    canvas.gl.vertexAttribPointer(
      this.positionAttributeLocation,
      size,
      type,
      normalize,
      stride,
      offset,
    );
  }

  /**
   * Passes actual canvas w/h to vertex shader to be
   * able to transform absolute x/y to relative canvases
   * [-1, 1]
   */
  public provideResolutionToShader() {
    const { width, height } = this.canvas.gl.canvas;
    this.canvas.gl.uniform2f(this.resolutionUniformLocation, width, height);
  }

  /**
   * Set rgba to all vertex pixels
   *
   * Values will be cut off
   */
  public setColor(r: number, g: number, b: number, a = 1) {
    const [red, green, blue] = [r, g, b].map((dig: number) =>
      Math.max(0, Math.min(dig, 255)),
    );

    const alpha = Math.max(0, Math.min(a, 1));

    this.canvas.gl.uniform4f(
      this.colorUniformLocation,
      red,
      green,
      blue,
      alpha,
    );
  }

  public renderTriangles(coords: number[]) {
		const typedMatrix = new Float32Array(coords);
		if (typedMatrix.length % 2) throw new Error('FATAL: triangle cannot be rendered. Check coordinates array');

    const points = typedMatrix.length / 2;
		if (points % 3) throw new Error('FATAL: triangles cannot be rendered. Some of triangles have not enough points');

		this.setBufferData(typedMatrix);

		const primitiveType = this.canvas.gl.TRIANGLES;
		const primitiveOffset = 0;
		this.canvas.gl.drawArrays(primitiveType, primitiveOffset, points);
	}

  public renderLines(coords: number[]) {
    const typedMatrix = new Float32Array(coords);
    if (typedMatrix.length % 2) throw new Error('FATAL: lines cannot be rendered. Check coordinates array');

    const points = typedMatrix.length / 2;
		if (points % 2) throw new Error('FATAL: lines cannot be rendered. Some of lines have not enough points');

    this.setBufferData(typedMatrix);

		const primitiveType = this.canvas.gl.LINES;
		const primitiveOffset = 0;
		this.canvas.gl.drawArrays(primitiveType, primitiveOffset, points);
  }
}

export default Renderer;
