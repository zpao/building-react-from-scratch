'use strict';

// This determines if we're going to end up reusing an internal instance or not.
// This is one of the big shortcuts that React does, stopping us from
// instantiating and comparing full trees. Instead we immediately throw away
// a subtree when updating from one element type to another.
function shouldUpdateComponent(prevElement, nextElement) {
  let prevType = typeof prevElement;
  let nextType = typeof nextElement;

  // Quickly allow strings.
  if (prevType === 'string') {
    return nextType === 'string';
  }

  // Otherwise look at element.type. In React we would also look at the key.
  return prevElement.type === nextElement.type;
}

module.exports = shouldUpdateComponent;
