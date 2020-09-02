import {
  CompressImage,
  DecompressImage,
  free,
  GetStorageRequirements,
  malloc,
  memory,
} from "./wasm.ts";

export { CompressImage, DecompressImage, GetStorageRequirements };

function read(ptr: number, size: number) {
  return new Uint8Array(memory.buffer, ptr, size);
}

/** Writes data to the WASM module's memory and returns a pointer. */
function write(data: Uint8Array) {
  const ptr = malloc(data.length);
  const buffer = new Uint8Array(memory.buffer);
  buffer.set(data, ptr);
  return ptr;
}

export function compress(
  input: Uint8Array,
  width: number,
  height: number,
  flags: number,
): Uint8Array {
  const inputPtr = write(input);

  const size = GetStorageRequirements(width, height, flags);
  const outputPtr = malloc(size);

  CompressImage(inputPtr, width, height, outputPtr, flags);

  const output = read(outputPtr, size);

  free(inputPtr);
  free(outputPtr);

  return output;
}

export function decompress(
  input: Uint8Array,
  width: number,
  height: number,
  flags: number,
): Uint8Array {
  const inputPtr = write(input);

  const size = width * height * 4;
  const outputPtr = malloc(size);

  DecompressImage(outputPtr, width, height, inputPtr, flags);

  const output = read(outputPtr, size);

  free(inputPtr);
  free(outputPtr);

  return output;
}

export enum flags {
  /** Use DXT1 compression. */
  DXT1 = 1 << 0,

  /** Use DXT3 compression. */
  DXT3 = 1 << 1,

  /** Use DXT5 compression. */
  DXT5 = 1 << 2,

  /** Use BC4 compression. */
  BC4 = 1 << 3,

  /** Use a slow but high quality colour compressor (the default). */
  ColourClusterFit = 1 << 5,

  /** Use a fast but low quality colour compressor. */
  ColourRangeFit = 1 << 6,

  /** Weight the colour by alpha during cluster fit (disabled by default). */
  WeightColourByAlpha = 1 << 7,

  /** Use a very slow but very high quality colour compressor. */
  ColourIterativeClusterFit = 1 << 8,

  /** Source is BGRA rather than RGBA */
  SourceBGRA = 1 << 9,
}
