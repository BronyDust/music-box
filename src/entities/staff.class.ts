import { IRenderTreeNode, RenderType, TransformMatrixFunction } from "./render-tree.class";

class Staff implements IRenderTreeNode {
  matrix: number[];
  renderType = RenderType.Line;
  color: [number, number, number, number] = [0, 0, 0, 1];
  height: number;

  constructor(zeroPoint: [number, number], lastPoint: [number, number]) {
    const [zx, zy] = zeroPoint;
    const [lx, ly] = lastPoint;
    this.height = ly - zy;
    const gap = this.height / 5;

    this.matrix = [
      zx,
      zy,
      lx,
      zy,
      zx,
      zy + gap,
      lx,
      zy + gap,
      zx,
      zy + gap * 2,
      lx,
      zy + gap * 2,
      zx,
      zy + gap * 3,
      lx,
      zy + gap * 3,
      zx,
      zy + gap * 4,
      lx,
      zy + gap * 4,
      zx,
      zy + gap * 5,
      lx,
      zy + gap * 5,
    ];
  }

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

export default Staff;
