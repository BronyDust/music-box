import { LinkedList } from "../abstracts/linked-list.class";
import Renderer from "../renderer";
import RenderTreeNode from "./render-tree-node.abstract";

export enum RenderType {
  Line,
  Triangle,
  LineLoop,
}

export type TransformMatrixFunction = (prevMatrix: number[]) => number[];

class RenderTree {
  private _tree: LinkedList<RenderTreeNode>;

  constructor(
    private renderer: Renderer,
    private clear: VoidFunction,
  ) {
    this.render = this.render.bind(this);
    this._tree = new LinkedList<RenderTreeNode>(this.render);
  }

  get tree() {
    return this._tree;
  }

  private _selectedNode: null | RenderTreeNode = null;
  private set selectedNode(selectedNode: null | RenderTreeNode) {
    if (this._selectedNode === selectedNode) return;
    this._selectedNode = selectedNode;

    selectedNode ? this.onSelect?.(selectedNode) : this.onDeselect?.();
  }

  public onSelect: ((selected: RenderTreeNode) => void) | null = null;
  public onDeselect: VoidFunction | null = null;

  public select(normalX: number, normalY: number) {
    let selected: null | RenderTreeNode = null;

    for (const node of this._tree.iteratorReversed()) {
      node.selectable?.deselect();

      if (selected || !node.selectable) continue;
      if (node.selectable.checkCollision(normalX, normalY)) selected = node;
    }

    this.selectedNode = selected;
  }

  public deselect() {
    for (const node of this._tree.iteratorReversed()) node.selectable?.deselect();
    this.selectedNode = null;
  }

  public render() {
    this.clear();

    for (const node of this._tree.iterator()) {
      node.render();

      this.renderer.setColor(...node.color);

      switch (node.renderType) {
        case RenderType.Line:
          this.renderer.renderLines(node.matrix);
          break;
        case RenderType.Triangle:
          this.renderer.renderTriangles(node.matrix);
          break;
        case RenderType.LineLoop:
          this.renderer.renderLineLoop(node.matrix);
          break;
      }
    }
  }
}

export default RenderTree;
