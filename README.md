# deno-dxt
DXT (de)compression for Deno, with the same API as [dxt-js](https://www.npmjs.com/package/dxt-js).
## Usage
```typescript
import * as dxt from "https://denopkg.com/Liamolucko/deno-dxt/mod.ts";
const imageData = getRawRGBADataFromSomeWhere();
const compressedData = dxt.compress(imageData, 256, 256, dxt.flags.DXT5); /// assumes 256x256 image
const uncompressedData = dxt.decompress(imageData, 256, 256, dxt.flags.DXT5);
```
Like [dxt-js](https://www.npmjs.com/package/dxt-js), it's based on [libsquish](https://sourceforge.net/projects/libsquish) compiled to WebAssembly, although using WASI instead of Emscripten.