class Conversation {
  constructor() {
    this.container = document.body;
    this.rendered = false;
    this.nodes = new Set();
    this.nodeGroups = new Set();
    this.dom = {
      tag: _tag('div', 'conversation'),
      header: _tag('div', 'conversation-header'),
      nodes: _tag('div', 'conversation-nodes'),
      settings: _tag('div', 'conversation-settings'),
      addNode: _tag('div', 'button conversation-add-node'),
      addNodeGroup: _tag('div', 'button conversation-add-nodegroup')
    };
    this._attachEvents();
  }

  _attachEvents() {
    this.dom.addNode.addEventListener('click', this._node.bind(this));
    this.dom.addNodeGroup.addEventListener('click', this._nodeGroup.bind(this));
    this.dom.nodes.addEventListener('mousemove', this._moveDragBox.bind(this));
    this.dom.nodes.addEventListener('mouseup', this._stopMoveDragBox.bind(this));
  }

  _moveDragBox(e) {
    this.nodes.forEach(n => n.dragBox.moving && n.dragBox._move(e, this));
    this.nodeGroups.forEach(n => n.dragBox.moving && n.dragBox._move(e, this));
  }

  _stopMoveDragBox(e) {
    this.nodes.forEach(n => n.dragBox.moving && n.dragBox._stopMove(e, this));
    this.nodeGroups.forEach(n => n.dragBox.moving && n.dragBox._stopMove(e, this));
  }

  _node() {
    var node = new Node();
    this.nodes.add(node);
    this._render();
  }

  _nodeGroup() {
    var ng = new NodeGroup();
    this.nodeGroups.add(ng);
    this._render();
  }

  _render() {
    if(!this.rendered) {
      this.rendered = true;
      this.container.appendChild(this.dom.tag);
      this.dom.tag.appendChild(this.dom.header);
      this.dom.header.appendChild(this.dom.addNode);
      this.dom.header.appendChild(this.dom.addNodeGroup);
      this.dom.addNode.textContent = 'Add Node';
      this.dom.addNodeGroup.textContent = 'Add Node Group';
      this.dom.tag.appendChild(this.dom.nodes);
      this.dom.tag.appendChild(this.dom.settings);
    }

    this.nodes.forEach(n => {
      this.dom.nodes.appendChild(n._render());
    })

    this.nodeGroups.forEach(n => {
      this.dom.nodes.appendChild(n._render());
    })
  }

}
