import { IRenderTreeNode, RenderType, TransformMatrixFunction } from "./render-tree.class";

class Sheet implements IRenderTreeNode {
  matrix: number[] = [0, 0, 0, 297, 210, 297, 210, 297, 210, 0, 0, 0];
  color: [number, number, number, number] = [0, 0, 0, 1];
  renderType: RenderType = RenderType.Triangle;

  private _lastTransition: TransformMatrixFunction | null = null;

  setTransition(transition: (prevMatrix: number[]) => number[]) {
    if (this._lastTransition) this.matrix = this._lastTransition(this.matrix);
    this._lastTransition = transition;
  }

  render() {
    if (this._lastTransition) this.matrix = this._lastTransition(this.matrix);
    this._lastTransition = null;
  }
}

export default Sheet;
