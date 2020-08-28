$1/bin/clang \
  --target=wasm32-unknown-wasi \
  -Wl,--export-all \
  -Wl,--no-entry \
  -nostartfiles \
  -fno-rtti \
  -fno-exceptions \
  --sysroot $1/share/wasi-sysroot \
  -o libsquish.wasm \
  libsquish/*.cpp \
  || exit

echo "export default \"$(base64 -w0 libsquish.wasm)\"" > bin.ts
rm libsquish.wasm