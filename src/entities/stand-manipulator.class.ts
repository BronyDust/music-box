/**
 * Just a storage for translate/scale matrix and methods
 */
class StandManipulator {
  private translation = { x: 0, y: 0 };

  public translate(x: number, y: number) {
    this.translation.x += x;
    this.translation.y += y;
  }

  get transformMatrix(): [number, number] {
    return [this.translation.x, this.translation.y];
  }
}

export default StandManipulator;
