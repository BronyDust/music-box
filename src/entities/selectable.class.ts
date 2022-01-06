function matrixToCollider(matrix: number[]): [number, number, number, number] {
  let minX = 0;
  let minY = 0;
  let maxX = 0;
  let maxY = 0;

  if (matrix.length % 2) throw new Error('Matrix should contain xy pairs!');
  for (let i = 0, j = 1; j < matrix.length; i += 2, j += 2) {
    const x = matrix[i];
    const y = matrix[j];

    if (minX > x) minX = x;
    if (minY > y) minY = y;
    if (maxX < x) maxX = x;
    if (maxY < y) maxY = y;
  }

  return [minX, minY, maxX, maxY];
}

class Selectable {
  private _isSelected = false;
  private _collider: [number, number, number, number];

  constructor(matrix: number[], private _matrixToCollider = matrixToCollider) {
    this._collider = _matrixToCollider(matrix);
  }

  get isSelected() {
    return this._isSelected;
  }

  public deselect() {
    this._isSelected = false;
  }

  get collider() {
    return this._collider;
  }

  public updateCollider(matrix: number[]) {
    this._collider = this._matrixToCollider(matrix);
  }

  public checkCollision(x: number, y: number) {
    if (!this._collider) return;
    const [tx, ty, bx, by] = this._collider;

    let xCollision = false;
    let yCollision = false;
    if (x > tx && x < bx) xCollision = true;
    if (y > ty && y < by) yCollision = true;

    if (xCollision && yCollision) this._isSelected = true;
    return this._isSelected;
  }
}

export default Selectable;
