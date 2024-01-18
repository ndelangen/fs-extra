# fs-extra but fully ESM/CJS compatible. 1.0.0

This package allows you to import/require without deciding if you'll want ESM or CJS inside your import.

This package uses exportsMaps in `package.json` to achieve the affect where if you:

- `import` this package, you'll get the ESM version of `fs-extra` (`fs-extra/esm`)
- `require` this package, you'll get the CJS version of `fs-extra`

This is useful if you're bundling/running your code for multiple environments.

## Usage

```js
import * as fse from "@ndelangen/fs-extra-unified";
```

This package will yield the correct type definitions, but only implements/exports the implementations and types from `fs-extra/esm`.
So you'll want to use `node:fs/promises` for things such as `readFile` and `writeFile`.

I wrote this because I needed it in storybook, and https://www.npmjs.com/package/fs-extra-unified re-implemented the entire fs-extra API, causing it to lag behind and risk security patches to not be applied.
As this package has `fs-extra` is a peerDependency, it does not implement any functionality itself.
