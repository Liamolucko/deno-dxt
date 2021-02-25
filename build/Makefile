WASI ?= ./wasi-sdk
CC    = $(WASI)/bin/clang++

OUT_WA = "libsquish.wasm"
OUT_TS = "bin.ts"

WASI_DLD = "https://github.com/WebAssembly/wasi-sdk/releases/download/wasi-sdk-11/wasi-sdk-11.0-linux.tar.gz"
WASI_TAR = wasi_dl_linux.tar.gz
ifeq ($(shell uname), Darwin)
	WASI_DLD = "https://github.com/WebAssembly/wasi-sdk/releases/download/wasi-sdk-11/wasi-sdk-11.0-macos.tar.gz"
	WASI_TAR = wasi_dl_darwin.tar.gz
endif

CSRC  = $(shell find ./src  -name "*.cpp")
FLGS  = -Wall -Os
WAFLG = --target=wasm32-unknown-wasi -Wl,--no-entry -nostartfiles --sysroot $(WASI)/share/wasi-sysroot
EXPORTS = -Wl,--export,malloc,--export,free,--export,GetStorageRequirements,--export,CompressImage,--export,DecompressImage

all: build
all: bundle

build:
	$(CC) $(WAFLG) $(FLGS) $(CSRC) $(EXPORTS) -o $(OUT_WA)

bundle:
	@echo "export default \"$(shell base64 -w0 libsquish.wasm)\";" > $(OUT_TS)

dlwasi:
	curl -L "$(WASI_DLD)" -o "$(WASI_TAR)"
	rm -rf "wasi-sdk"
	tar -xzvf "$(WASI_TAR)"
	mv "wasi-sdk-11.0" "wasi-sdk"
	rm "${WASI_TAR}"

setup: dlwasi

.PHONY: build dlwasi setup