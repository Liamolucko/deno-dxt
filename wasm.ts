import * as base64 from "https://deno.land/std@0.67.0/encoding/base64.ts";
import bin from "./build/bin.ts";

interface SquishExports {
  GetStorageRequirements(width: number, height: number, flags: number): number;

  CompressImage(
    rgba: number,
    width: number,
    height: number,
    blocks: number,
    flags: number,
    metric?: number,
  ): void;

  DecompressImage(
    rgba: number,
    width: number,
    height: number,
    blocks: number,
    flags: number,
  ): void;

  malloc(size: number): number;
  free(ptr: number): void;

  memory: WebAssembly.Memory;
}

const module = new WebAssembly.Module(base64.decode(bin));
const instance = new WebAssembly.Instance<SquishExports>(module);

export default instance;

export const {
  GetStorageRequirements,
  CompressImage,
  DecompressImage,
  malloc,
  free,
  memory,
} = instance.exports;
