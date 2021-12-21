import { LinkedList } from "../abstracts/linked-list.class";
import Renderer from "../renderer";

export enum RenderType {
  Line,
  Triangle,
}

export type TransformMatrixFunction = (prevMatrix: number[]) => number[];

export interface IRenderTreeNode {
  renderType: RenderType;
  matrix: number[];
  color: [number, number, number, number];
  setTransition: (transition: TransformMatrixFunction) => void;
  render(): void;
}

class RenderTree {
  private _tree: LinkedList<IRenderTreeNode>;
  private _renderer: Renderer | null = null;

  constructor() {
    this.render = this.render.bind(this);
    this._tree = new LinkedList<IRenderTreeNode>(this.render);
  }

  set renderer(renderer: Renderer | null) {
    this._renderer = renderer;
  }

  get renderer() {
    return this._renderer;
  }

  get tree() {
    return this._tree;
  }

  render() {
    if (!this._renderer) return;

    for (const node of this._tree.iterator()) {
      node.render();

      this._renderer.setColor(...node.color);

      switch (node.renderType) {
        case RenderType.Line:
          this._renderer.renderLines(node.matrix);
          break;
        case RenderType.Triangle:
          this._renderer.renderTriangles(node.matrix);
          break;
      }
    }
  }
}

export default RenderTree;
