#!/bin/bash

set -e

# Create dist dir if not exists
[ ! -e dist ] && mkdir dist

# Build CJS and ESM modules
npx tsc --module esnext --target es6
[ ! -e dist/esm ] && mkdir dist/esm
cp build/index.js dist/esm/error3.js
npx rollup build/index.js --format=cjs --name=Error3 -o dist/commonjs/error3.js
npx babel-minify --sourceType module dist/esm/error3.js -o dist/esm/error3.min.js

# Build UMD module
npx tsc --target es5 --module esnext && \
npx rollup build/index.js --format=umd --name=Error3 -o dist/error3.js && \
npx babel-minify dist/error3.js -o dist/error3.min.js \

# Rewrite types
TYPES=dist/types/index.d.ts
sed -i.bak 's/export default /declare /g' $TYPES
sed -i.bak 's/export {};//g' $TYPES
sed -i.bak 's/export //g' $TYPES
echo 'export = Error3;' >> $TYPES
rm "$TYPES.bak"
