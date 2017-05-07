'use strict';

const MultiChild = require('./MultiChild');
const DOM = require('./DOM');
const assert = require('./assert');

class DOMComponentWrapper extends MultiChild {
  constructor(element) {
    super();
    this._currentElement = element;
    this._domNode = null;
  }

  mountComponent() {
    // TODO: special handling for various element types
    // TODO: determine namespace DOM element should be created in (eg svg)
    // TODO: validate DOM nesting for helpful warnings
    // TODO: even more specifically handle <script> tags so code doesn't run
    // TODO: custom elements need to be created slightly differently

    // Create the DOM element
    let el = document.createElement(this._currentElement.type);

    this._domNode = el;

    this._updateDOMProperties({}, this._currentElement.props);

    this._createInitialDOMChildren(this._currentElement.props);

    return el;
  }

  unmountComponent() {
    // React needs to do some special handling for some node types, specifically
    // removing event handlers that had to be attached to this node and couldn't
    // be handled through propagation.
    this.unmountChildren();
  }

  receiveComponent(nextElement) {
    this.updateComponent(this._currentElement, nextElement);
  }

  updateComponent(prevElement, nextElement) {
    // debugger;
    this._currentElement = nextElement;
    this._updateDOMProperties(prevElement.props, nextElement.props);
    this._updateDOMChildren(prevElement.props, nextElement.props);
  }

  _createInitialDOMChildren(props) {
    // Text content
    if (
      typeof props.children === 'string' ||
      typeof props.children === 'number'
    ) {
      // TODO: validate element type can have text children
      // TODO: wrap with helper, there are browser inconsistencies
      this._domNode.textContent = props.children;
    } else if (props.children) {
      // Single element or Array
      let mountImages = this.mountChildren(props.children);
      DOM.appendChildren(this._domNode, mountImages);
    }
  }

  _updateDOMChildren(prevProps, nextProps) {
    // React does a bunch of work to handle dangerouslySetInnerHTML.
    // React also handles switching between text children and more DOM nodes.
    // We will simply assert if we are toggling.
    let prevType = typeof prevProps.children;
    let nextType = typeof nextProps.children;
    assert(prevType === nextType);

    // Childless node, skip
    if (nextType === 'undefined') {
      return;
    }

    // Much like the initial step, handline text differently than elements.
    if (nextType === 'string' || nextType === 'number') {
      this._domNode.textContent = nextProps.children;
    } else {
      this.updateChildren(nextProps.children);
    }
  }

  _updateDOMProperties(prevProps, nextProps) {
    let styleUpdates = {};

    // Loop over previous props so we know what we need to remove
    Object.keys(prevProps).forEach(prop => {
      // We're updating or adding a value, which we'll catch in the next loop so
      // we can skip here. That means the only props remaining will be removals.
      if (nextProps.hasOwnProperty(prop) || prevProps[prop] == null) {
        return;
      }

      // Unset all previous styles since we know there are no new ones.
      if (prop === 'style') {
        Object.keys(prevProps[prop]).forEach(style => {
          styleUpdates[style] = '';
        });
      } else {
        // Handle propery removals. In React we currently have a white list of known
        // properties, which allows us to special case some things like "checked".
        // We'll just remove blindly.
        DOM.removeProperty(this._domNode, prop);
      }
    });

    // Handle updates / additions
    Object.keys(nextProps).forEach(prop => {
      let prevValue = prevProps[prop];
      let nextValue = nextProps[prop];

      // Don't do anything if we have identical values.
      if (Object.is(prevValue, nextValue)) {
        return;
      }

      if (prop === 'style') {
        // Update carefully. We need to remove old styles and add new ones
        if (prevValue) {
          Object.keys(prevValue).forEach(style => {
            if (!nextValue || !nextValue.hasOwnProperty(style)) {
              styleUpdates[style] = '';
            }
          });
          Object.keys(nextValue).forEach(style => {
            if (prevValue[style] !== nextValue[style]) {
              styleUpdates[style] = nextValue[style];
            }
          });
        } else {
          // If there was no previous style, we can just treat the new style as the update.
          styleUpdates = nextValue;
        }
      } else {
        // DOM updates
        DOM.setProperty(this._domNode, prop, nextValue);
      }

      DOM.updateStyles(this._domNode, styleUpdates);
    });
  }
}

module.exports = DOMComponentWrapper;
