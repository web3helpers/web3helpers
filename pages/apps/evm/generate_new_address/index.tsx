import Layout from "blocks/layout";
import { NextPage } from "next";
import AppStep from "components/apps/AppStep";
import Button from "components/buttons/Button";
import AppTitle from "blocks/apps/AppTitle";
import { EvmAddress, generateAddress } from "./utils";
import { useState } from "react";
import AppResult from "components/apps/AppResult";
import { chain, name } from "./manifest.json";
import { chains } from "utils";

const Index: NextPage = () => {
  const meta = {};
  const [address, setAddresss] = useState<EvmAddress | undefined>(undefined);
  const color = chains.find((c) => c.name === chain)?.color ?? "primary";

  return (
    <Layout meta={meta}>
      <div className="flex flex-col gap-4">
        <AppTitle name={name}></AppTitle>
        <AppStep step={1}>
          <div>
            <Button
              onClick={() => setAddresss(generateAddress())}
              className={`bg-${color}mb-4`}
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
