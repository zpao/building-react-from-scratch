'use strict';

var Component = require('./src/Component');
var Element = require('./src/Element');
var Mount = require('./src/Mount');

// Do dependency injection to work around circular dependencies
var DOMComponentWrapper = require('./src/DOMComponentWrapper');
var HostComponent = require('./src/HostComponent');
HostComponent.inject(DOMComponentWrapper);

module.exports = {
  Component: Component,
  createElement: Element.createElement,

  render: Mount.render,
  unmountComponentAtNode: Mount.unmountComponentAtNode,
};
