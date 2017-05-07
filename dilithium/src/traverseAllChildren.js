'use strict';

const SEPARATOR = '.';
const SUBSEPARATOR = ':';

function getComponentKey(component, index) {
  // This is where we would use the key prop to generate a unique id that
  // persists across moves. However we're skipping that so we'll just use the
  // index.

  // We'll convert this to base 36 for compactness.
  return index.toString(36);
}

function traverseAllChildren(children, callback, traverseContext) {
  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

function traverseAllChildrenImpl(
  children,
  nameSoFar,
  callback,
  traverseContext,
) {
  // TODO: support null, undefined, booleans, numbers, iterators

  // Handle a single child.
  if (typeof children === 'string' || !Array.isArray(children)) {
    // We'll treat this name as if it were a lone item in an array, as going from
    // a single child to an array is fairly common.

    // This callback gets called with traverseContext as an argument. This is
    // passed in from the reconciler and it used there to track the children.
    callback(
      traverseContext,
      children,
      nameSoFar + SEPARATOR + getComponentKey(children, 0),
    );
    return 1;
  }

  // Otherwise we have an array. React also supports iterators but we won't.
  // We need to return the number of children so start tracking that.
  // Note that this isn't simply children.length - since children can contain nested
  // arrays, we need to account for that too, as those are rendered at the same level.
  let subTreeCount = 0;
  let nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  // Loop over all children, generate the next key prefix, and then recurse!
  children.forEach((child, i) => {
    let nextName = nextNamePrefix + getComponentKey(child, i);
    subTreeCount += traverseAllChildrenImpl(
      child,
      nextName,
      callback,
      traverseContext,
    );
  });

  return subTreeCount;
}

module.exports = traverseAllChildren;
