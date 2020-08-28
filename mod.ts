import squish from "./wasm.ts";

export const { GetStorageRequirements, CompressImage, DecompressImage } =
  squish;

const buffer = new Uint8Array(squish.memory.buffer);

/** Ensures instance's memory is larger than a given size. */
function alloc(size: number, offset = 0): void {
  if (buffer.length - offset < size) {
    squish.memory.grow(Math.ceil((size - (buffer.length - offset)) / 65536));
  }
}

export function compress(
  inputData: Uint8Array,
  width: number,
  height: number,
  flags: number,
): Uint8Array {
  const inputPointer = 0;
  const outputPointer = inputData.length;

  const targetSize = GetStorageRequirements(width, height, flags);
  alloc(inputData.length + targetSize);
  buffer.set(inputData, inputPointer);

  CompressImage(inputPointer, width, height, outputPointer, flags);

  return buffer.slice(outputPointer, outputPointer + targetSize);
}

export function decompress(
  inputData: Uint8Array,
  width: number,
  height: number,
  flags: number,
): Uint8Array {
  const inputPointer = 0;
  const outputPointer = inputData.length;

  const targetSize = width * height * 4;
  alloc(inputData.length + targetSize);
  buffer.set(inputData, inputPointer);

  DecompressImage(outputPointer, width, height, inputPointer, flags);
  
  return buffer.slice(outputPointer, outputPointer + targetSize);
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
