/**
 * gameboy-emulator allocates SharedArrayBuffer in the APU constructor.
 * Without COOP/COEP, SAB is undefined and `new Gameboy()` throws.
 * ArrayBuffer is enough to boot muted; real SAB is used when cross-origin isolated.
 */
export function ensureSharedArrayBuffer(): boolean {
  if (typeof SharedArrayBuffer !== "undefined") {
    return crossOriginIsolated;
  }

  Object.defineProperty(globalThis, "SharedArrayBuffer", {
    value: ArrayBuffer,
    configurable: true,
    writable: true,
  });

  return false;
}
