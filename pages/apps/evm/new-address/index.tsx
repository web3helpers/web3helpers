import Layout from "blocks/layout";
import { NextPage } from "next";
import AppStep from "components/apps/AppStep";
import Button from "components/buttons/Button";
import AppTitle from "blocks/apps/AppTitle";
import { EvmAddress, generateAddress } from "./utils";
import { useState } from "react";
import AppResult from "components/apps/AppResult";
import { name, id, description } from "./manifest.json";

const Index: NextPage = () => {
  const meta = {
    title: name,
    description
  };
  const [address, setAddresss] = useState<EvmAddress | undefined>(undefined);

  return (
    <Layout meta={meta}>
      <div className="flex flex-col gap-4">
        <AppTitle name={name} id={id}></AppTitle>
        <AppStep step={1} className="bg-evm">
          <div>
            <Button
              onClick={() => setAddresss(generateAddress())}
              className="bg-evm border-evm mb-4"
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
