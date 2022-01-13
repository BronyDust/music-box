import RenderTreeNode from "./render-tree-node.abstract";
import {
  RenderType,
} from "./render-tree.class";
import { ISheetParticipant } from "./sheet.class";

class Staff extends RenderTreeNode implements ISheetParticipant {
  public height = 80;

  constructor(public width: number) {
    super(
      RenderType.Line,
      [0, 0, 100, 100],
      [0, 0, 0, 1],
      true
    );
  }

  placeByY(y: number): void {
    console.log(y);
  }
}

export default Staff;
