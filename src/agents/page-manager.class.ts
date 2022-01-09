import { LinkedListNode } from "../abstracts/linked-list.class";
import Observer from "../abstracts/observer.class";
import RenderTreeNode from "../entities/render-tree-node.abstract";
import RenderTree from "../entities/render-tree.class";
import Sheet from "../entities/sheet.class";
import Staff from "../entities/staff.class";

export enum PageManagerState {
  NothingSelected,
  SheetSelected,
  StaffSelected,
}

class PageManager extends Observer<PageManagerState> {
  private sheetNode: LinkedListNode<RenderTreeNode, Sheet> | null = null;
  private _selectedStaff: LinkedListNode<Staff> | null = null;

  get selectedStaff() {
    return this._selectedStaff;
  }

  constructor(private renderTree: RenderTree) {
    super(PageManagerState.NothingSelected);
    renderTree.onDeselect = () => {
      this.state = PageManagerState.NothingSelected;
      this.notify();
    };
  }

  public initSheet() {
    if (this.sheetNode) return;

    const sheet = new Sheet();
    if (sheet.selectable) {
      sheet.selectable.onSelect = () => {
        this.state = PageManagerState.SheetSelected;
        this.notify();
      }
    }

    const a = sheet.getHasSpace(10, 10);
    console.log(a);

    this.sheetNode = this.renderTree.tree.append(sheet);
    this.notify();
  }

  public createStaff() {
    // if (!this.sheetNode) return;
    // const sheet = this.sheetNode.value;

    // const { bottom, left, right } = sheet.margins;
    // if (this.sheetFilledSpace + bottom + 8 >= sheet.height) return;

    // const { width } = sheet;

    // const staff = new Staff(
    //   [left, this.sheetFilledSpace],
    //   [width - right, this.sheetFilledSpace + 80],
    //   [65, 65],
    // );
    
    // const staffNode = this.renderTree.tree.append(staff);
    // this.pageStaffs.add(staffNode);
    // this.sheetFilledSpace += staff.height;

    // if (staff.selectable) {
    //   staff.selectable.onSelect = () => {
    //     this._selectedStaff = staffNode;
    //     this.state = PageManagerState.StaffSelected;
    //     this.notify();
    //   }
    //   staff.selectable.onDeselect = () => {
    //     this._selectedStaff = null;
    //   }
    // }

    // this.notify();
  }

  public removeSelectedStaff() {
    // if (!this._selectedStaff) return;

    // this.pageStaffs.delete(this._selectedStaff);
    // this.renderTree.tree.deleteNode(this._selectedStaff);
    // this.notify();
  }
}

export default PageManager;
