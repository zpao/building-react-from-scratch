'use strict';

const Reconciler = require('./Reconciler');

function enqueueSetState(instance, partialState) {
  // This is where React would do queueing, storing a series
  // of partialStates. The Updater would apply those in a batch later.
  // This is complicated so we won't do it today. Instead we'll update state
  // and then tell the reconciler this component needs to be updated, synchronously.

  instance._pendingState = Object.assign({}, instance.state, partialState);

  Reconciler.performUpdateIfNecessary(instance);
}

module.exports = {
  enqueueSetState,
};
