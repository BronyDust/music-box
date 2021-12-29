import RenderTreeNode from "./render-tree-node.abstract";
import { RenderType, TransformMatrixFunction } from "./render-tree.class";

class Sheet extends RenderTreeNode {
  public height: number;
  public width: number;
  public margins = {
    top: 30,
    right: 21,
    bottom: 25,
    left: 21
  };

  constructor() {
    const height = 297;
    const width = 210;

    super(
      RenderType.Triangle,
      [0, 0, 0, height, width, height, width, height, width, 0, 0, 0],
      [255, 255, 255, 1]
    );

    this.height = height;
    this.width = width;
  }
}

export default Sheet;
