# deno-dxt
DXT (de)compression for Deno (or browser), with the same API as [dxt-js](https://www.npmjs.com/package/dxt-js).

Like [dxt-js](https://www.npmjs.com/package/dxt-js), it's based on [libsquish](https://sourceforge.net/projects/libsquish) compiled to WebAssembly, although using WASI instead of Emscripten.
## Usage
```typescript
import * as dxt from "https://denopkg.com/Liamolucko/deno-dxt/mod.ts";
const imageData = getRawRGBADataFromSomeWhere();
const compressedData = dxt.compress(imageData, 256, 256, dxt.flags.DXT5); // Assumes 256x256 image
const uncompressedData = dxt.decompress(compressedData, 256, 256, dxt.flags.DXT5);
console.log(uncompressedData);
```

## Build
### Requirements
- [wasi-sdk](https://github.com/WebAssembly/wasi-sdk)
```sh
cd build
make WASI=[WASI_SDK_PATH]
```
