class Node {
  constructor() {
    this.id = uniqueId();
    this.type = 'text';
    this.in = '';
    this.out = '';
    this.text = '';
    this.scripts = {
      shouldDisplay: '',
      onDisplay: '',
      onSelect: ''
    };
    this.dom = {
      node: _tag('textarea', 'node-node'),
    };
    this.dragBox = new DragBox('Node');
    this.dragBox._append(this.dom.node);
    this._attachEvents();
  }

  _attachEvents() {
    this.dom.node.addEventListener('keyup', this._text.bind(this));
  }

  _text(text) {
    this.text = this.dom.node.value;
  }

  _render() {
    this.dom.node.value = this.text;

    return this.dragBox._render();

  }
}
