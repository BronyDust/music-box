import RenderTreeNode from "./render-tree-node.abstract";
import { RenderType } from "./render-tree.class";

class SelectionView extends RenderTreeNode {
  constructor(matrix: number[]) {
    super(RenderType.LineLoop, matrix, [0,0,1,1], false);
  }
}

export default SelectionView;
