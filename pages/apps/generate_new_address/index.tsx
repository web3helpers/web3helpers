import Layout from "blocks/layout";
import { NextPage } from "next";
import AppStep from "../../../components/AppStep";
import Button from "components/buttons/Button";
import AppTitle from "blocks/apps/AppTitle";
import { EvmAddress, generateAddress } from "./utils";
import { useState } from "react";

const Index: NextPage = () => {
  const meta = {};
  const [address, setAddresss] = useState<EvmAddress | undefined>(undefined);

  return (
    <Layout meta={meta}>
      <div className="flex flex-col gap-4">
        <AppTitle name="Generate new address"></AppTitle>
        <AppStep step={1}>
          <div>
            <Button
              onClick={() => setAddresss(generateAddress())}
              className="bg-solana mb-4"
            >
              Generate
            </Button>
            {address && (
              <ul className="text-xl">
                <li>Address: {address.address}</li>
                <li>Mnemonic: {address.mnemonic}</li>
                <li>Private Key: {address.privateKey}</li>
              </ul>
            )}
          </div>
        </AppStep>
      </div>
    </Layout>
  );
};

export default Index;
