import { LinkedList } from "../abstracts/linked-list.class";
import Renderer from "../renderer";
import RenderTreeNode from "./render-tree-node.abstract";
import Selectable from "./selectable.class";
import SelectionView from "./selection-view.class";

export enum RenderType {
  Line,
  Triangle,
  LineLoop,
}

export type TransformMatrixFunction = (prevMatrix: number[]) => number[];

type SelectableRenderTreeNode = RenderTreeNode & { selectable: Selectable };

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

  private selectionView = new SelectionView([0, 0, 0, 0]);

  private _selectedNode: null | SelectableRenderTreeNode = null;
  private set selectedNode(selectedNode: null | SelectableRenderTreeNode) {
    this._selectedNode = selectedNode;

    if (!selectedNode) {
      this.onDeselect?.();
      return;
    }

    this.onSelect?.(selectedNode);
    this.selectionView.updateMatrix(selectedNode.selectable.collider);
  }

  private get selectedNode() {
    return this._selectedNode;
  }

  public onSelect: ((selected: RenderTreeNode & { selectable: Selectable }) => void) | null = null;
  public onDeselect: VoidFunction | null = null;

  public select(normalX: number, normalY: number) {
    let selected: null | SelectableRenderTreeNode = null;

    for (const node of this._tree.iteratorReversed()) {
      node.selectable?.deselect();

      if (selected || !node.selectable) continue;
      if (node.selectable.checkCollision(normalX, normalY)) selected = node as SelectableRenderTreeNode;
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

    if (!this.selectedNode) return;
    this.selectionView.render();
    const { color, matrix } = this.selectionView;
    this.renderer.setColor(...color);
    this.renderer.renderLineLoop(matrix);
  }
}

export default RenderTree;
