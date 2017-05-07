# Dilithium
*A basic re-implementation of the React Stack Reconciler with zero dependencies.*

* * *

The code here was written with the purpose of breaking down the implementation details of React. It was written as part of my "Building React From Scratch" talk at React Rally 2016.

I attempted to comment the code throughout so that it could be used for others to learn how React works.

Obviously this is not meant to be a replacement for React and doesn't cover all of the things that React does. In fact, it's missing some major pieces, like the event system.

## Building

```sh
npm install
npm run build
```

This builds a standalone browser version. It wasn't really tested that way and you might have some issues. Testing was done running the demo, which just bundles this with the app.

## License

The code here is based on React and thus retains React's BSD license.
