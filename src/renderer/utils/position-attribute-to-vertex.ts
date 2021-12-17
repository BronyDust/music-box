type Config = {
  size: number;
  type: number;
  stride: number;
  normalize?: boolean;
  offset?: number;
};

function positionAttributeToVertex(
  positionAttributeLocation: number,
  context: WebGL2RenderingContext,
  config: Config,
) {
  const vertexArray = context.createVertexArray();
  if (!vertexArray) throw new Error("FATAL: cannot create vertex array");

  context.bindVertexArray(vertexArray);
  context.enableVertexAttribArray(positionAttributeLocation);

  const { size, type, normalize = false, stride, offset = 0 } = config;

  context.vertexAttribPointer(
    positionAttributeLocation,
    size,
    type,
    normalize,
    stride,
    offset,
  );
}

export default positionAttributeToVertex;
