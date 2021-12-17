/**
 * Triangulates rectangle and returns 2d points matrix
 */
export const triangulateRectangle = (
  x: number,
  y: number,
  width: number,
  height: number,
) => [
  x,
  y,
  x,
  y + height,
  x + width,
  y + height,
  x + width,
  y + height,
  x + width,
  y,
  x,
  y,
];
