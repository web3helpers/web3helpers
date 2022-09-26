import { Network, Alchemy } from "alchemy-sdk";

export async function getNftsWithAddress(
  address: string,
  network: Network,
  type: "address" | "conrtact"
) {
  const settings = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API, // Replace with your Alchemy API Key.
    network: network // Replace with your network.
  };

  const alchemy = new Alchemy(settings);
  if (type === "address") return alchemy.nft.getNftsForOwner(address, { omitMetadata: false });
  return alchemy.nft.getNftsForContract(address, { omitMetadata: false });
}
