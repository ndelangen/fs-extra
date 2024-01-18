import { pathToFileURL } from "node:url";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { exports } from "resolve.exports";
import { readPackageUp } from "read-package-up";

const esm = await getESM();
const cjs = await getCJS();

for (const key of Object.keys(esm)) {
  if (!cjs[key]) {
    throw new Error(`CJS does not have export ${key}`);
  }
}

for (const key of Object.keys(cjs)) {
  if (!esm[key]) {
    throw new Error(`ESM does not have export ${key}`);
  }
}

console.log("test passed");

async function getESM() {
  const pkg = await readPackageUp({
    cwd: dirname(fileURLToPath(import.meta.url)),
  });

  if (!pkg.packageJson.exports) {
    throw new Error("package.json does not have an exports field");
  }

  const specifier = exports(pkg.packageJson, ".");

  if (!specifier) {
    throw new Error("package.json does not have a specifier");
  }

  const resolved = join(pathToFileURL(".").href, specifier[0]);
  const esm = await import(join(resolved));
  return esm;
}

async function getCJS() {
  const createRequire = (await import("node:module")).createRequire;
  const require = createRequire(import.meta.url);
  return require(".");
}
