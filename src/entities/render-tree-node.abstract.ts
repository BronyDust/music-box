import { RenderType, TransformMatrixFunction } from "./render-tree.class";

abstract class RenderTreeNode {
  constructor(
    public renderType: RenderType,
    public matrix: number[],
    public color: [number, number, number, number]
  ) {}

  public render() {
    if (this.lastTransition) this.matrix = this.lastTransition(this.matrix);
    this.lastTransition = null;
  };
  
  private lastTransition: TransformMatrixFunction | null = null;

  public setTransition(transition: TransformMatrixFunction, force?: true) {
    if (this.lastTransition && !force)
      this.matrix = this.lastTransition(this.matrix);
    this.lastTransition = transition;
  }
}

export default RenderTreeNode;
