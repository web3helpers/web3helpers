import * as bls from "bls-eth-wasm";
import * as filecoin_signer from "@zondax/filecoin-signing-tools";
import * as bip39 from "bip39";
import * as filecoin_address from "@glif/filecoin-address";

export type FilecoinAddress = {
  address: string;
  privateKey: string;
  mnemonic: string;
};

const path = "m/44'/461'/0/0/1";

export async function generateAddress(type: "bls" | "ecdsa") {
  const mnemonic = bip39.generateMnemonic();

  const key = filecoin_signer.keyDerive(mnemonic, path, "");
  const privateKey: string = key.private_hexstring;
  if (type === "ecdsa") {
    const address: string = key.address;
    return {
      mnemonic,
      privateKey,
      address
    };
  }
  await bls.init(bls.BLS12_381);
  const sec = new bls.SecretKey();
  const sk = bls.fromHexStr(privateKey);
  sec.setLittleEndian(sk);
  sec.dump("secret key ");
  const pubKey = sec.getPublicKey();
  const address = filecoin_address.newBLSAddress(pubKey.serialize()).toString();
  return {
    mnemonic,
    privateKey,
    address
  };
}
