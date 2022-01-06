import { RenderType, TransformMatrixFunction } from "./render-tree.class";
import Selectable from "./selectable.class";

abstract class RenderTreeNode {
  private _selectable: Selectable | null = null;

  constructor(
    public renderType: RenderType,
    public matrix: number[],
    public color: [number, number, number, number],
    isSelectable = true,
    matrixToCollider?: (matrix: number[]) => [number, number, number, number]
  ) {
    if (isSelectable) this._selectable = new Selectable(matrix, matrixToCollider);
  }

  get selectable() {
    return this._selectable;
  }

  public render() {
    if (this.lastTransition) {
      this.matrix = this.lastTransition(this.matrix);
      if (this._selectable) this._selectable.updateCollider(this.matrix);
    }
    this.lastTransition = null;
  };
  
  private lastTransition: TransformMatrixFunction | null = null;

  public setTransition(transition: TransformMatrixFunction, force?: true) {
    if (this.lastTransition && !force) {
      this.matrix = this.lastTransition(this.matrix);
      if (this._selectable) this._selectable.updateCollider(this.matrix);
    }

    this.lastTransition = transition;
  }
}

export default RenderTreeNode;
