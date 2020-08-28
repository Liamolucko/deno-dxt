# deno-dxt
DXT (de)compression for Deno (or browser), with the same API as [dxt-js](https://www.npmjs.com/package/dxt-js).

Like [dxt-js](https://www.npmjs.com/package/dxt-js), it's based on [libsquish](https://sourceforge.net/projects/libsquish) compiled to WebAssembly, although using WASI instead of Emscripten.
## Usage
```typescript
import * as dxt from "https://denopkg.com/Liamolucko/deno-dxt/mod.ts";
const imageData = getRawRGBADataFromSomeWhere();
const compressedData = dxt.compress(imageData, 256, 256, dxt.flags.DXT5);
const uncompressedData = dxt.decompress(imageData, 256, 256, dxt.flags.DXT5);
```

## Build
### Requirements
- [wasi-sdk](https://github.com/WebAssembly/wasi-sdk)
```sh
sh build.sh [WASI_SDK_PATH]
```
