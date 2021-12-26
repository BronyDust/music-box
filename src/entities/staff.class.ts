import {
  IRenderTreeNode,
  RenderType,
  TransformMatrixFunction,
} from "./render-tree.class";

class Staff implements IRenderTreeNode {
  matrix: number[];
  renderType = RenderType.Line;
  color: [number, number, number, number] = [0, 0, 0, 1];
  height: number;

  constructor(
    zeroPoint: [number, number],
    lastPoint: [number, number],
    margin: [number, number],
  ) {
    const [top, bottom] = margin;
    const [zx, zy] = zeroPoint;
    const [lx, ly] = lastPoint;
    this.height = ly - zy + top + bottom;
    const gap = (ly - zy) / 5;

    const zyMargined = zy + top;

    this.matrix = [
      zx,
      zyMargined,
      lx,
      zyMargined,
      zx,
      zyMargined + gap,
      lx,
      zyMargined + gap,
      zx,
      zyMargined + gap * 2,
      lx,
      zyMargined + gap * 2,
      zx,
      zyMargined + gap * 3,
      lx,
      zyMargined + gap * 3,
      zx,
      zyMargined + gap * 4,
      lx,
      zyMargined + gap * 4,
      zx,
      zyMargined + gap * 5,
      lx,
      zyMargined + gap * 5,
    ];
  }

  private _lastTransition: TransformMatrixFunction | null = null;

  setTransition(transition: (prevMatrix: number[]) => number[], force?: true) {
    if (this._lastTransition && !force)
      this.matrix = this._lastTransition(this.matrix);
    this._lastTransition = transition;
  }

  render() {
    if (this._lastTransition) this.matrix = this._lastTransition(this.matrix);
    this._lastTransition = null;
  }
}

export default Staff;
