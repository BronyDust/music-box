export enum CursorMode {
  Default = 'default',
  Grabbing = 'grabbing',
}

class CursorController {
  private _state = CursorMode.Default;

  set state(state: CursorMode) {
    this._state = state;
    this.update();
  }

  private update() {
    document.body.style.cursor = this._state;
  }
}

export default CursorController;
