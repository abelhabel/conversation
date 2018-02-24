class DragBox {
  constructor(label) {
    this.id = uniqueId();
    this.label = label;
    this.x = 0;
    this.y = 0;
    this.ox = 0;
    this.oy = 0;
    this.moving = false;
    this.mx = 0;
    this.my = 0;
    this.dom = {
      tag: _tag('div', 'drag-box'),
      bar: _tag('div', 'drag-box-bar'),
      content: _tag('div', 'drag-box-content'),
      label: _tag('div', 'drag-box-label')
    };
    this.dom.tag.classList.add(this.label.toLowerCase().replace(/\s/g,''));
    this.children = new Set();
    this.dom.tag.dragBox = this;
    this._attachEvents();
  }

  _attachEvents() {
    this.dom.bar.addEventListener('mousedown', this._startMove.bind(this));
    // this.dom.bar.addEventListener('mousemove', this._move.bind(this));
    // this.dom.bar.addEventListener('mouseup', this._stopMove.bind(this))
  }

  _startMove(e) {
    this.moving = true;
    this.mx = e.clientX;
    this.my = e.clientY;
  }

  _move(e) {
    if(!this.moving) return;
    console.log('moving')
    this.ox = (e.clientX - this.mx);
    this.oy = (e.clientY - this.my);
    this._updatePosition();

  }

  _stopMove(e, conversation) {
    console.log('stopmove', e)
    this.moving = false;
    this.ox = (e.clientX - this.mx);
    this.oy = (e.clientY - this.my);
    this.x = this.x + this.ox;
    this.y = this.y + this.oy;
    this.ox = 0;
    this.oy = 0;
    if(e.target.dragBox) {
      e.target.dragBox._append(this.dom.tag);
      this.x = this.y = 0;
    } else {
      // this.x = this.y = 0;
      conversation.dom.nodes.appendChild(this.dom.tag);

    }
    this._updatePosition();
  }

  _updatePosition() {
    this.dom.tag.style.top = this.y + this.oy + 'px';
    this.dom.tag.style.left = this.x + this.ox + 'px';
  }

  _append(tag) {
    this.children.add(tag);
    this._render();
  }

  _render() {

    this.dom.tag.appendChild(this.dom.bar);
    this.dom.tag.appendChild(this.dom.content);
    this.dom.tag.appendChild(this.dom.label);
    this.dom.label.textContent = this.label;
    this.children.forEach(c => {
      this.dom.content.appendChild(c);
    })

    return this.dom.tag;
  }

}
