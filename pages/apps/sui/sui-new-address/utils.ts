import { Ed25519Keypair } from "@mysten/sui.js";
import * as bip39 from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english";

export type SuiAddress = {
  address: string;
  mnemonic: string;
};

export function generateAddress() {
  const mnemonic = bip39.generateMnemonic(wordlist);
  const keypair = Ed25519Keypair.deriveKeypair(mnemonic);
  const address = keypair.getPublicKey().toSuiAddress();
  return {
    address,
    mnemonic
  };
}
