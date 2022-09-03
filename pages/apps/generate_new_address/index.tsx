import Layout from "blocks/layout";
import { NextPage } from "next";
import AppStep from "../../../components/AppStep";
import Button from "components/buttons/Button";
import AppTitle from "blocks/apps/AppTitle";

const Index: NextPage = () => {
  const meta = {};
  return (
    <Layout meta={meta}>
      <div className="flex flex-col gap-4">
        <AppTitle name="Generate new address"></AppTitle>
        <AppStep step={1}>
          <div>
            <Button className="bg-solana">Generate</Button>
          </div>
        </AppStep>
      </div>
    </Layout>
  );
};

export default Index;
