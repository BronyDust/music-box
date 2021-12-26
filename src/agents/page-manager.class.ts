import { LinkedListNode } from "../abstracts/linked-list.class";
import Observer from "../abstracts/observer.class";
import RenderTree, { IRenderTreeNode } from "../entities/render-tree.class";
import Sheet from "../entities/sheet.class";

/**
 * Ordered enum
 */
export enum PageManagerState {
  NoSheet,
  Sheet
}

class PageManager extends Observer<PageManagerState> {
  private sheetNode: LinkedListNode<IRenderTreeNode, Sheet> | null = null;

  constructor(private renderTree: RenderTree) {
    super(PageManagerState.NoSheet);
  }

  public initSheet() {
    if (this.sheetNode) return;

    const sheet = new Sheet();
    this.sheetNode = this.renderTree.tree.insert(sheet);
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

    const staff = this.sheetNode.value.createStaff();
    this.renderTree.tree.insert(staff);
    this.notify();
  }
}

export default PageManager;
