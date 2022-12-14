import { Keypair } from "@solana/web3.js";
import { bytesToHexString } from "utils";

export type SolanaAddress = {
  address: string;
  publicKey: string;
  secretKey: string;
};

export function generateAddress(): SolanaAddress {
  const newAddress = Keypair.generate();
  return {
    address: newAddress.publicKey.toBase58(),
    publicKey: bytesToHexString(newAddress.publicKey.toBuffer()),
    secretKey: bytesToHexString(newAddress.secretKey)
  };
}
