abstract class Observer<T> {
  constructor(private _state: T) {}

  set state(newState: T) {
    this._state = newState;
  }

  get state() {
    return this._state;
  }
  
  private subscribers = new Set<(d: T) => void>();

  public subscribe(observer: (d: T) => void) {
    this.subscribers.add(observer);
  }

  public unsubscribe(observer: (d: T) => void) {
    this.subscribers.delete(observer);
  }

  public notify() {
    this.subscribers.forEach((cb) => cb(this._state));
  }
}

export default Observer;
