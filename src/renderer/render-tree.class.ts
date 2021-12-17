import Renderer from ".";

export enum RenderType {
  Lines,
  Triangles
}

type MatrixTransition = (prevMatrix: number[]) => number[];

export class RenderTreeNode {
  private nextNode: RenderTreeNode | null = null;
  private matrixTransition: MatrixTransition | null = null;
  private alreadyCalculatedMatrix: number[];
  public isChanged = false;

  constructor(
    private renderTree: RenderTree,
    public type: RenderType,
    public color: [number, number, number, number],
    initialMatrix: number[]
  ) {
    this.alreadyCalculatedMatrix = initialMatrix;
  }

  set transition(transition: (prevMatrix: number[]) => number[]) {
    this.isChanged = true;
    this.matrixTransition = transition;

    this.renderTree.render();
  }

  public setColor(color: [number, number, number, number]) {
    this.color = color;
    this.renderTree.render();
  }

  get matrix() {
    if (this.isChanged) {
      this.render();
    }
    return this.alreadyCalculatedMatrix;
  }

  public render() {
    if (this.matrixTransition) this.alreadyCalculatedMatrix = this.matrixTransition(this.alreadyCalculatedMatrix);

    this.matrixTransition = null;

    this.isChanged = false;

    return this.alreadyCalculatedMatrix;
  }

  get next() {
    return this.nextNode;
  }

  public attach(node: RenderTreeNode) {
    this.nextNode = node;

    return () => {
      this.nextNode = null;
    }
  }
}

export class RenderTree {
  public head: RenderTreeNode | null = null;

  constructor(private renderer: Renderer) {}

  public createNode(
    type: RenderType,
    color: [number, number, number, number],
    initialMatrix: number[]
  ) {
    return new RenderTreeNode(this, type, color, initialMatrix);
  }

  public render() {
    let current: RenderTreeNode | null = this.head;

    while(current) {
      this.renderer.setColor(...current.color);

      switch(current.type) {
        case RenderType.Lines:
          this.renderer.renderLines(current.matrix);
          break;
        case RenderType.Triangles:
          this.renderer.renderTriangles(current.matrix);
          break;
      }
      
      current = current.next;
    }
  }
}
