import RenderTreeNode from "./render-tree-node.abstract";
import {
  RenderType,
  TransformMatrixFunction,
} from "./render-tree.class";

class Staff extends RenderTreeNode {
  public height: number;

  constructor(
    zeroPoint: [number, number],
    lastPoint: [number, number],
    margin: [number, number],
  ) {
    const [top, bottom] = margin;
    const [zx, zy] = zeroPoint;
    const [lx, ly] = lastPoint;
    const gap = (ly - zy) / 5;
    const zyMargined = zy + top;

    super(
      RenderType.Line,
      [
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
      ],
      [0, 0, 0, 1]
    );
    
    this.height = ly - zy + top + bottom;
  }
}

export default Staff;
