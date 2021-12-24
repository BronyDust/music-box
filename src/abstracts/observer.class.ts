abstract class Observer<T> {
  constructor(public state: T) {}
  
  public subscribers = new Set<(d: T) => void>();

  public subscribe(observer: (d: T) => void) {
    this.subscribers.add(observer);
  }

  public unsubscribe(observer: (d: T) => void) {
    this.subscribers.delete(observer);
  }

  public notify() {
    this.subscribers.forEach((cb) => cb(this.state));
  }
}

export default Observer;
