import Layout from "blocks/layout";
import { NextPage } from "next";
import AppStep from "components/apps/AppStep";
import Button from "components/buttons/Button";
import AppTitle from "blocks/apps/AppTitle";
import { useState } from "react";
import AppResult from "components/apps/AppResult";
import { name, id, description } from "./manifest.json";
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

const Index: NextPage = () => {
  const meta = {
    title: name,
    description
  };
  const [address, setAddresss] = useState<SolanaAddress | undefined>(undefined);

  return (
    <Layout meta={meta}>
      <div className="flex flex-col gap-4">
        <AppTitle name={name} id={id}></AppTitle>
        <AppStep step={1} className="bg-solana">
          <div>
            <Button
              onClick={() => setAddresss(generateAddress())}
              className="bg-solana border-solana mb-4"
            >
              Generate
            </Button>
            {address && <AppResult data={address}></AppResult>}
          </div>
        </AppStep>
      </div>
    </Layout>
  );
};

export default Index;
