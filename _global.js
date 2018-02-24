function _tag(type, className, style) {
  var tag = document.createElement(type);
  tag.className = className;
  style && Object.keys(style).forEach(a => {
    tag.style[a] = style[a];
  })
  return tag;
}

function uniqueId() {
  return Date.now().toString(32) + Math.random().toString().substr(3, 6).toString(32);
}
