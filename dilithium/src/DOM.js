'use strict';

// Remove all children from this node.
function empty(node) {
  [].slice.call(node.childNodes).forEach(node.removeChild, node);
}

// Very naive version of React's DOM property setting algorithm. Many
// properties need to be updated differently.
function setProperty(node, attr, value) {
  // The DOM Component layer in this implementation isn't filtering so manually
  // skip children here.
  if (attr === 'children') {
    return;
  }

  node.setAttribute(attr, value);
}

// Remove the property from the node.
function removeProperty(node, attr) {
  node.removeAttribute(attr);
}

function updateStyles(node, styles) {
  Object.keys(styles).forEach(style => {
    // TODO: Warn about improperly formatted styles (eg, contains hyphen)
    // TODO: Warn about bad vendor prefixed styles
    // TODO: Warn for invalid values (eg, contains semicolon)
    // TODO: Handle shorthand property expansions (eg 'background')
    // TODO: Auto-suffix some values with 'px'
    node.style[style] = styles[style];
  });
}

function appendChild(node, child) {
  node.appendChild(child);
}

function appendChildren(node, children) {
  if (Array.isArray(children)) {
    children.forEach(child => appendChild(node, child));
  } else {
    appendChild(node, children);
  }
}

function insertChildAfter(node, child, afterChild) {
  node.insertBefore(
    child,
    afterChild ? afterChild.nextSibling : node.firstChild,
  );
}

function removeChild(node, child) {
  node.removeChild(child);
}

module.exports = {
  setProperty,
  removeProperty,
  updateStyles,
  empty,
  appendChild,
  appendChildren,
  insertChildAfter,
  removeChild,
};
