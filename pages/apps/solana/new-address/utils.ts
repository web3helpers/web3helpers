import { Keypair } from "@solana/web3.js";

export type SolanaAddress = {
  publicKey: string;
  secretKey: string;
};

function toHexString(buffer: Uint8Array | Buffer) {
  // buffer is an ArrayBuffer
  const result = [...buffer].map((x) => x.toString(16).padStart(2, "0")).join("");
  return "0x" + result;
}

export function generateAddress(): SolanaAddress {
  const newAddress = Keypair.generate();
  return {
    publicKey: toHexString(newAddress.publicKey.toBuffer()),
    secretKey: toHexString(newAddress.secretKey)
  };
}
