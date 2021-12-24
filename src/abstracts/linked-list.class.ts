export class LinkedListNode<T> {
  public next: LinkedListNode<T> | null = null;
  public prev: LinkedListNode<T> | null = null;

  constructor(
    public value: T,
  ) {}
}

export class LinkedList<T> {
  private head: LinkedListNode<T> | null = null;
  private _size = 0;

  constructor(private onChange: VoidFunction) {}

  /** To head */
  public insert(data: T): LinkedListNode<T> {
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
  public append(data: T): LinkedListNode<T> {
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

    this.onChange();
    this._size++;
    return node;
  }

  public deleteNode(node: LinkedListNode<T>): void {
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
