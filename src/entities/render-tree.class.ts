import { LinkedList } from "../abstracts/linked-list.class";
import Renderer from "../renderer";
import RenderTreeNode from "./render-tree-node.abstract";

export enum RenderType {
  Line,
  Triangle,
}

export type TransformMatrixFunction = (prevMatrix: number[]) => number[];

class RenderTree {
  private _tree: LinkedList<RenderTreeNode>;

  constructor(private renderer: Renderer, private clear: VoidFunction) {
    this.render = this.render.bind(this);
    this._tree = new LinkedList<RenderTreeNode>(this.render);
  }

  get tree() {
    return this._tree;
  }

  render() {
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
      }
    }
  }
}

export default RenderTree;
