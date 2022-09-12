import * as ethers from "ethers";

export type EvmAddress = {
  address: string;
  privateKey: string;
  mnemonic: string;
};
export function generateAddress(): EvmAddress {
  const wallet = ethers.Wallet.createRandom();
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
    mnemonic: wallet.mnemonic.phrase
  };
}
