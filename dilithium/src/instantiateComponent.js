'use strict';

const Element = require('./Element');
const assert = require('./assert');
const HostComponent = require('./HostComponent');

function instantiateComponent(element) {
  assert(Element.isValidElement(element));

  let type = element.type;

  let wrapperInstance;
  if (typeof type === 'string') {
    wrapperInstance = HostComponent.construct(element);
  } else if (typeof type === 'function') {
    wrapperInstance = new element.type(element.props);
    wrapperInstance._construct(element);
  } else if (typeof element === 'string' || typeof element === 'number') {
    wrapperInstance = HostComponent.constructTextComponent(element);
  }

  return wrapperInstance;

  // If we have a string type, create a wrapper
  // Otherwise we have a Component
  // return new element.type(element.props)
}

module.exports = instantiateComponent;
