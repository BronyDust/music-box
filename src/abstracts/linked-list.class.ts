export class LinkedListNode<T, D extends T = T> {
  public next: LinkedListNode<T> | null = null;
  public prev: LinkedListNode<T> | null = null;

  constructor(
    public value: D,
  ) {}
}

export class LinkedList<T> {
  private head: LinkedListNode<T> | null = null;
  private tail: LinkedListNode<T> | null = null;

  private _size = 0;

  constructor(private onChange: VoidFunction) {}

  /** To head */
  public insert<D extends T = T>(data: D): LinkedListNode<T, D> {
    const node = new LinkedListNode(data);
    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;
    } else {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }

    this._size++;
    this.onChange();

    return node;
  }

  get size() {
    return this._size;
  }

  /** To tail */
  public append<D extends T = T>(data: D): LinkedListNode<T, D> {
    const node = new LinkedListNode(data);
    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }

    this._size++;
    this.onChange();
    return node;
  }

  public deleteNode<D extends T = T>(node: LinkedListNode<T, D>): void {
    if (node === this.head) {
      this.head = node.next;
      node.next = null;
    } else if (node === this.tail) {
      this.tail = node.prev;
      node.prev = null;
    } else {
      const left = node.prev;
      const right = node.next;
      if (left) left.next = right;
      if (right) right.prev = left;

      node.prev = null;
      node.next = null;
    }

    this._size--;
    this.onChange();
  }

  *iterator() {
    let current = this.head;

    while (current) {
      yield current.value;
      current = current.next;
    }
  }

  *iteratorReversed() {
    let current = this.tail;

    while (current) {
      yield current.value;
      current = current.prev;
    }
  }
}
