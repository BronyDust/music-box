import { LinkedListNode } from "../abstracts/linked-list.class";
import Observer from "../abstracts/observer.class";
import RenderTreeNode from "../entities/render-tree-node.abstract";
import RenderTree from "../entities/render-tree.class";
import Sheet from "../entities/sheet.class";
import Staff from "../entities/staff.class";

/**
 * Ordered enum
 */
export enum PageManagerState {
  NoSheet,
  Sheet,
}

class PageManager extends Observer<PageManagerState> {
  private sheetNode: LinkedListNode<RenderTreeNode, Sheet> | null = null;
  private sheetFilledSpace = 0;
  private pageStaffs = new Set<Staff>();

  constructor(private renderTree: RenderTree) {
    super(PageManagerState.NoSheet);
    renderTree.onSelect = (e) => console.log(e);
  }

  public initSheet() {
    if (this.sheetNode) return;

    const sheet = new Sheet();

    this.sheetFilledSpace = sheet.margins.top;
    this.sheetNode = this.renderTree.tree.append(sheet);
    this.state = PageManagerState.Sheet;
    this.notify();
  }

  public deleteSheet() {
    if (!this.sheetNode) return;

    this.renderTree.tree.deleteNode(this.sheetNode);
    this.sheetNode = null;
    this.state = PageManagerState.NoSheet;
    this.notify();
  }

  public createStaff() {
    if (!this.sheetNode) return;
    const sheet = this.sheetNode.value;

    const { bottom, left, right } = sheet.margins;
    if (this.sheetFilledSpace + bottom + 8 >= sheet.height) return;

    const { width } = sheet;

    const staff = new Staff(
      [left, this.sheetFilledSpace],
      [width - right, this.sheetFilledSpace + 80],
      [65, 65],
    );
    this.renderTree.tree.append(staff);
    this.sheetFilledSpace += staff.height;

    this.notify();
  }
}

export default PageManager;
