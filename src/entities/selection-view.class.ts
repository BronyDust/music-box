import RenderTreeNode from "./render-tree-node.abstract";
import { RenderType, TransformMatrixFunction } from "./render-tree.class";

class SelectionView extends RenderTreeNode {
  constructor(collider: number[]) {
    const [tx, ty, bx, by] = collider;
    const matrix = [
      tx, ty,
      tx, by,
      bx, by,
      bx, ty
    ];

    super(RenderType.LineLoop, matrix, [0,0,255,1], false);
  }

  /**
   * Wrapper over setTransition to convert collider to matrix
   */
  public updateMatrix(collider: number[]) {
    const [tx, ty, bx, by] = collider;
    const matrix = [
      tx, ty,
      tx, by,
      bx, by,
      bx, ty
    ];

    this.setTransition(() => matrix, true);
  }
}

export default SelectionView;
