import RenderTreeNode from "./render-tree-node.abstract";
import { RenderType } from "./render-tree.class";

class Sheet extends RenderTreeNode {
  public height: number;
  public width: number;
  public margins = {
    top: 300,
    right: 210,
    bottom: 250,
    left: 210
  };

  constructor() {
    const height = 2970;
    const width = 2100;

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
