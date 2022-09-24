export function bytesToHexString(buffer: Uint8Array | Buffer) {
  const result = [...buffer].map((x) => x.toString(16).padStart(2, "0")).join("");
  return "0x" + result;
}

export function bytesToSring(bytes: Uint8Array) {
  const chars: number[] = [];
  for (let i = 0, n = bytes.length; i < n; ) {
    chars.push(((bytes[i++] & 0xff) << 8) | (bytes[i++] & 0xff));
  }
  return String.fromCharCode.apply(null, chars);
}

export function stringToBytes(str: string) {
  const bytes: number[] = [];
  for (let i = 0, n = str.length; i < n; i++) {
    let char = str.charCodeAt(i);
    bytes.push(char >>> 8, char & 0xff);
  }
  return Uint8Array.from(bytes);
}
