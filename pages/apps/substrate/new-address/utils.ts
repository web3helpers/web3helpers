import { Keyring } from "@polkadot/keyring";
import { mnemonicGenerate } from "@polkadot/util-crypto";

export type SubstrateAddress = {
  address: string;
  mnemonic: string;
};
export function generateAddress(
  type: "sr25519" | "ed25519" | "ecdsa",
  ss58Format: 0 | 2
): SubstrateAddress {
  const keyring = new Keyring({ type, ss58Format });
  const mnemonic = mnemonicGenerate();
  const pair = keyring.addFromUri(mnemonic, { name: "web3helpers" });

  return {
    address: pair.address,
    mnemonic: mnemonic,
  };
}
