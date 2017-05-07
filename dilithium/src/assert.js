'use strict';

// Lightweight replacement for invariant/node assert

module.exports = function assert(condition) {
  if (!condition) {
    throw new Error('assertion failure');
  }
};
