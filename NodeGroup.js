class NodeGroup {
  constructor() {
    this.id = uniqueId();
    this.nodes = new Set();
    this.dom = {

    };
    this.dragBox = new DragBox('Node Group');
  }

  _node(node) {
    this.nodes.add(node);
  }

  _render() {
    this.nodes.forEach(n => {
      this.dragBox._append(n);
    })

    return this.dragBox._render();
  }

}
