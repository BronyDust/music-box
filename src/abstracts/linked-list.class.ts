export class LinkedListNode<T> {
  constructor(public value: T, public next: LinkedListNode<T> | null = null ) {}
}

export class LinkedList<T> {
  private _head: LinkedListNode<T> | null = null;
  private _size = 0;

  constructor(private _onChange?: VoidFunction) {}

  get head() {
    return this._head;
  }

  get size() {
    return this._size;
  }

  appendToStart(value: T) {
    this._size++;
    const node = new LinkedListNode(value);
    node.next = this._head;
    this._head = node;
    this._onChange?.();
  }

  remove(value: T) {
    if (!this._head) return;

    if (this._head.value === value) {
      this._head = this._head.next;
      this._size--;
      this._onChange?.();
      return;
    }

    let current = this._head;
    while (current.next) {
      if (current.next.value === value) {
        current.next = current.next.next;
        this._size--;
        this._onChange?.();
        return;
      }

      current = current.next;
    }
  }

  *iterator() {
    let current = this._head;

    while (current) {
      yield current.value;
      current = current.next;
    }
  }
}
