WASI ?= ./wasi-sdk
CC    = $(WASI)/bin/clang

OUT_WA = "libsquish.wasm"
OUT_BN = "bin.ts"

WASI_DLD = "https://github.com/WebAssembly/wasi-sdk/releases/download/wasi-sdk-11/wasi-sdk-11.0-linux.tar.gz"
WASI_TAR = wasi_dl_linux.tar.gz
ifeq ($(shell uname), Darwin)
	WASI_DLD = "https://github.com/WebAssembly/wasi-sdk/releases/download/wasi-sdk-11/wasi-sdk-11.0-macos.tar.gz"
	WASI_TAR = wasi_dl_darwin.tar.gz
endif

CSRC  = ""
CSRC += $(shell find ./src  -name "*.cpp")
FLGS  = -Wall
RFLG  = -Os
DFLG  = -DDEBUG_BUILD
WAFLG = --target=wasm32-unknown-wasi -Wl,--no-entry -nostartfiles --sysroot $(WASI)/share/wasi-sysroot\
        -DWASI_BUILD -Wl,--export,malloc -Wl,--export,free -fno-rtti
INCS  = -Ilib

all: release

build:
	$(CC) $(WAFLG) $(FLGS) $(INCS) $(CSRC) -o $(OUT_WA)

bundle:
	@echo "export default \"$(shell base64 -w0 libsquish.wasm)\";" > $(OUT_BN)

debug: FLGS += $(DFLG)
debug: build
debug: bundle

release: FLGS += $(RFLG)
release: build
release: bundle

dlwasi:
	curl -L "$(WASI_DLD)" -o "$(WASI_TAR)"
	sed -n '/${WASI_TAR}/p' ".checksums" | shasum -c -
	rm -rf "wasi-sdk"
	tar -xzvf "$(WASI_TAR)"
	mv "wasi-sdk-11.0" "wasi-sdk"
	rm "${WASI_TAR}"

setup: dlwasi

.PHONY: build dlwasi