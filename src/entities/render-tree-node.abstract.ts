import Selectable from "../abstracts/selectable.class";
import { RenderType, TransformMatrixFunction } from "./render-tree.class";

abstract class RenderTreeNode extends Selectable {
  constructor(
    public renderType: RenderType,
    public matrix: number[],
    public color: [number, number, number, number]
  ) {
    const tx = matrix[0];
    const ty = matrix[1];
    const bx = matrix[matrix.length - 2];
    const by = matrix[matrix.length - 1];
    super([tx, ty, bx, by]);
  }

  public render() {
    if (this.lastTransition) {
      this.matrix = this.lastTransition(this.matrix);
      const tx = this.matrix[0];
      const ty = this.matrix[1];
      const bx = this.matrix[this.matrix.length - 2];
      const by = this.matrix[this.matrix.length - 1];
      this.collider = [tx, ty, bx, by];
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
