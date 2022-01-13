import RenderTreeNode from "./render-tree-node.abstract";
import { RenderType } from "./render-tree.class";

export interface ISheetParticipant {
  height: number;
  width: number;
  placeByY(y: number): void;
}

class Sheet extends RenderTreeNode {
  private height: number;
  private fullWidth: number;
  private margins = {
    top: 250,
    right: 210,
    bottom: 250,
    left: 210
  };
  private innerThings = new Set<ISheetParticipant>();

  constructor() {
    const height = 2970;
    const width = 2100;

    super(
      RenderType.Triangle,
      [0, 0, 0, height, width, height, width, height, width, 0, 0, 0],
      [255, 255, 255, 1]
    );

    this.height = height;
    this.fullWidth = width;
  }

  private get filledHeight() {
    let filledHeight = 0;
    for (const thing of this.innerThings) {
      filledHeight += thing.height;
    }

    return filledHeight;
  }

  public get width() {
    const { left, right } = this.margins;
    return this.fullWidth - left - right;
  }

  /**
   * Has the sheet enough space for thing with box like that?
   */
  public getHasSpace(height: number, width: number) {
    const { filledHeight, height: sheetHeight, margins } = this;
    const { top, bottom } = margins;

    if (filledHeight + height > sheetHeight - top - bottom) return false;
    if (width > this.width) return false;

    return true;
  }
}

export default Sheet;
