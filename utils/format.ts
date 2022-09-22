
export function toHexString(buffer: Uint8Array | Buffer) {
  const result = [...buffer].map((x) => x.toString(16).padStart(2, "0")).join("");
  return "0x" + result;
}