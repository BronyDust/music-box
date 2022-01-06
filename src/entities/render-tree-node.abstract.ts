import Selectable from "../abstracts/selectable.class";
import { RenderType, TransformMatrixFunction } from "./render-tree.class";

function matrixToCollider(matrix: number[]): [number, number, number, number] {
  let minX = 0;
  let minY = 0;
  let maxX = 0;
  let maxY = 0;

  if (matrix.length % 2) throw new Error('Matrix should contain xy pairs!');
  for (let i = 0, j = 1; j < matrix.length; i += 2, j += 2) {
    const x = matrix[i];
    const y = matrix[j];

    if (minX > x) minX = x;
    if (minY > y) minY = y;
    if (maxX < x) maxX = x;
    if (maxY < y) maxY = y;
  }

  return [minX, minY, maxX, maxY];
}

abstract class RenderTreeNode extends Selectable {
  constructor(
    public renderType: RenderType,
    public matrix: number[],
    public color: [number, number, number, number]
  ) {
    super(matrixToCollider(matrix));
  }

  public render() {
    if (this.lastTransition) {
      this.matrix = this.lastTransition(this.matrix);
      this.collider = matrixToCollider(this.matrix);
    }
    this.lastTransition = null;
  };
  
  private lastTransition: TransformMatrixFunction | null = null;

  public setTransition(transition: TransformMatrixFunction, force?: true) {
    if (this.lastTransition && !force)
      this.matrix = this.lastTransition(this.matrix);
    this.lastTransition = transition;
  }
}

export default RenderTreeNode;
