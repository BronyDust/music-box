import compileShader from "./utils/compile-shader";
import vertexSource from "./vertex.glsl";
import fragmentSource from "./fragment.glsl";
import webglProgram from "./utils/webgl-program";
import { Matrix3x3 } from "./utils/matrix-math";

class Renderer {
  private positionAttributeLocation: number;
  private colorUniformLocation: WebGLUniformLocation;
  private transformMatrixUniformLocation: WebGLUniformLocation;

  /**
   * Fill buffer data
   *
   * It's possible to pass gl rendering hint
   */
  private setBufferData(
    matrix: Float32Array,
    hint = this.context.STATIC_DRAW,
  ) {
    this.context.bufferData(this.context.ARRAY_BUFFER, matrix, hint);
  }

  constructor(private context: WebGL2RenderingContext) {
    // Create program
    const vertexShader = compileShader(
      context,
      context.VERTEX_SHADER,
      vertexSource,
    );
    const fragmentShader = compileShader(
      context,
      context.FRAGMENT_SHADER,
      fragmentSource,
    );
    if (!vertexShader || !fragmentShader)
      throw new Error("FATAL: cannot compile shaders");
    const program = webglProgram(context, vertexShader, fragmentShader);
    if (!program) throw new Error("FATAL: cannot link WebGL program");
    context.useProgram(program);

    // Get pointers
    this.positionAttributeLocation = context.getAttribLocation(
      program,
      "manual_position",
    );
    const transformMatrixUniformLocation = context.getUniformLocation(program, 'user_matrix');
    if (!transformMatrixUniformLocation)
      throw new Error('FATAL: cannot find "user_matrix" uniform location');
    this.transformMatrixUniformLocation = transformMatrixUniformLocation;

    const colorUniformLocation = context.getUniformLocation(
      program,
      "user_color",
    );
    if (!colorUniformLocation)
      throw new Error('FATAL: cannot find "user_color" uniform location');
    this.colorUniformLocation = colorUniformLocation;

    // Attach buffer
    const positionBuffer = context.createBuffer();
    if (!positionBuffer) throw new Error("FATAL: cannot create WebGL buffer");
    context.bindBuffer(context.ARRAY_BUFFER, positionBuffer);
    const vertexArray = context.createVertexArray();
    if (!vertexArray) throw new Error("FATAL: cannot create vertex array");
    context.bindVertexArray(vertexArray);
    context.enableVertexAttribArray(this.positionAttributeLocation);

    // Explain how to render data from buffer to webgl context
    const size = 2;
    const type = context.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    context.vertexAttribPointer(
      this.positionAttributeLocation,
      size,
      type,
      normalize,
      stride,
      offset,
    );
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

    this.context.uniform4f(
      this.colorUniformLocation,
      red,
      green,
      blue,
      alpha,
    );
  }

  public setMatrix(matrix: Matrix3x3) {
    this.context.uniformMatrix3fv(this.transformMatrixUniformLocation, false, matrix);
  }

  public renderTriangles(coords: number[]) {
    const typedMatrix = new Float32Array(coords);
    if (typedMatrix.length % 2)
      throw new Error(
        "FATAL: triangle cannot be rendered. Check coordinates array",
      );

    const points = typedMatrix.length / 2;
    if (points % 3)
      throw new Error(
        "FATAL: triangles cannot be rendered. Some of triangles have not enough points",
      );

    this.setBufferData(typedMatrix);

    const primitiveType = this.context.TRIANGLES;
    const primitiveOffset = 0;
    this.context.drawArrays(primitiveType, primitiveOffset, points);
  }

  public renderLines(coords: number[]) {
    const typedMatrix = new Float32Array(coords);
    if (typedMatrix.length % 2)
      throw new Error(
        "FATAL: lines cannot be rendered. Check coordinates array",
      );

    const points = typedMatrix.length / 2;
    if (points % 2)
      throw new Error(
        "FATAL: lines cannot be rendered. Some of lines have not enough points",
      );

    this.setBufferData(typedMatrix);

    const primitiveType = this.context.LINES;
    const primitiveOffset = 0;
    this.context.drawArrays(primitiveType, primitiveOffset, points);
  }

  public renderLineLoop(coords: number[]) {
    const typedMatrix = new Float32Array(coords);
    if (typedMatrix.length % 2)
      throw new Error(
        "FATAL: lines cannot be rendered. Be sure coordinates has xy full pairs",
      );

    const points = typedMatrix.length / 2;
    if (points < 3)
      throw new Error(
        "FATAL: lines cannot be rendered. Coords should contain 3+ points",
      );

    this.setBufferData(typedMatrix);
    
    const primitiveType = this.context.LINE_LOOP;
    const primitiveOffset = 0;
    this.context.drawArrays(primitiveType, primitiveOffset, points);
  }
}

export default Renderer;
