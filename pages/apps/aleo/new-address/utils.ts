import { AleoSdk } from "aleppo-sdk";

export async function generateAddress() {
  const sdk = await AleoSdk.initialize();
  const address = sdk.newAddress();
  return address;
}
