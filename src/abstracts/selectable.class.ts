abstract class Selectable {
  private _isSelected = false;

  constructor(private _collider: [number, number, number, number]) {}

  get isSelected() {
    return this._isSelected;
  }

  public deselect() {
    this._isSelected = false;
  }

  set collider(collider: [number, number, number, number]) {
    this._collider = collider;
  }

  public checkCollision(x: number, y: number) {
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
