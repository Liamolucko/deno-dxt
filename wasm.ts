import * as base64 from "https://deno.land/x/base64@v0.2.1/mod.ts";
import bin from "./build/bin.ts";

interface SquishExports {
  GetStorageRequirements(width: number, height: number, flags: number): number;

  CompressImage(
    rgba: number,
    width: number,
    height: number,
    blocks: number,
    flags: number,
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

const module = new WebAssembly.Module(base64.toUint8Array(bin));
const instance = new WebAssembly.Instance<SquishExports>(module);

export const {
  GetStorageRequirements,
  CompressImage,
  DecompressImage,
  malloc,
  free,
  memory,
} = instance.exports;
