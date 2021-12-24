export class LinkedListNode<T, D extends T = T> {
  public next: LinkedListNode<T> | null = null;
  public prev: LinkedListNode<T> | null = null;

  constructor(
    public value: D,
  ) {}
}

export class LinkedList<T> {
  private head: LinkedListNode<T> | null = null;
  private _size = 0;

  constructor(private onChange: VoidFunction) {}

  /** To head */
  public insert<D extends T = T>(data: D): LinkedListNode<T, D> {
    const node = new LinkedListNode(data);
    if (!this.head) {
      this.head = node;
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
    if (!this.head) {
      this.head = node;
    } else {
      let lastNode = this.head;

      while(lastNode.next) {
        lastNode = lastNode.next;
      }

      node.prev = lastNode;
      lastNode.next = node;
    }

    this._size++;
    this.onChange();
    return node;
  }

  public deleteNode<D extends T = T>(node: LinkedListNode<T, D>): void {
    if (!node.prev) {
      this.head = node.next;
    } else {
      const prevNode = node.prev;
      prevNode.next = node.next;
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
}
