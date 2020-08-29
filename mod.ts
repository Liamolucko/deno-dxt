import {
  CompressImage,
  DecompressImage,
  GetStorageRequirements,
  memory,
  malloc,
  free,
} from "./wasm.ts";

export {
  CompressImage,
  DecompressImage,
  GetStorageRequirements,
} from "./wasm.ts";

/** Writes data to the WASM module's memory and returns a pointer. */
function write(data: Uint8Array) {
  const ptr = malloc(data.length);
  const buffer = new Uint8Array(memory.buffer);
  buffer.set(data, ptr);
  return ptr;
}

function read(ptr: number, size: number) {
  const buffer = new Uint8Array(memory.buffer);
  return buffer.slice(ptr, ptr + size);
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

export const flags = {
  /** Use DXT1 compression. */
  DXT1: (1 << 0),
  /** Use DXT3 compression. */
  DXT3: (1 << 1),
  /** Use DXT5 compression. */
  DXT5: (1 << 2),
  /** Use a very slow but very high quality colour compressor. */
  ColourIterativeClusterFit: (1 << 8),
  /**! Use a slow but high quality colour compressor (the default). */
  ColourClusterFit: (1 << 3),
  /**! Use a fast but low quality colour compressor. */
  ColourRangeFit: (1 << 4),
  /**! Use a perceptual metric for colour error (the default). */
  ColourMetricPerceptual: (1 << 5),
  /**! Use a uniform metric for colour error. */
  ColourMetricUniform: (1 << 6),
  /**! Weight the colour by alpha during cluster fit (disabled by default). */
  WeightColourByAlpha: (1 << 7),
};
