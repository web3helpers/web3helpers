import AppTitle from "blocks/apps/AppTitle";
import Layout from "blocks/layout";
import AppStep from "components/apps/AppStep";
import Button from "components/buttons/Button";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { OwnedNft, Nft } from "alchemy-sdk";
import { NextPage } from "next";
import { name, id, description } from "./manifest.json";
import { Meta } from "types";
import { useState } from "react";
import { object, string, number } from "yup";
import { ethAddressRegex } from "utils/regex";
import { Network, Alchemy } from "alchemy-sdk";
import Grid from "./grid";

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

type NftQueryModel = {
  address: string;
  type: "address" | "conrtact";
  network: Network;
};

const Index: NextPage = () => {
  const meta: Meta = {
    title: name,
    description
  };
  const [result, setResult] = useState<Nft[]>([]);

  const initialValues: NftQueryModel = {
    address: "",
    type: "address",
    network: Network.ETH_MAINNET
  };
  const schema = object({
    address: string().required("Required").matches(ethAddressRegex, "Invalid address"),
    type: string().required("Required")
    // network: string().required("Required")
  });
  const submit = async ({ address, network, type }: NftQueryModel) => {
    const result = await getNftsWithAddress(address, network, type);
    setResult("ownedNfts" in result ? result.ownedNfts : result.nfts);
  };
  return (
    <Layout meta={meta}>
      <div className="flex flex-col gap-4">
        <AppTitle name={name} id={id}></AppTitle>

        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          validateOnBlur
          onSubmit={submit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <AppStep step={1} className="bg-evm">
                <label>
                  <span className="block text-2xl mb-4">Network</span>
                  <Field as="select" type="network" className="select">
                    <option value={Network.ETH_MAINNET}>Ethereum</option>
                    <option value={Network.ETH_GOERLI}>Görli</option>
                    <option value={Network.MATIC_MAINNET}>Polygon</option>
                    <option value={Network.MATIC_MUMBAI}>Mumbai</option>
                  </Field>
                  <ErrorMessage name="network">
                    {(msg) => <div className="text-error">{msg}</div>}
                  </ErrorMessage>
                </label>
              </AppStep>
              <AppStep step={2} className="bg-evm">
                <label>
                  <span className="block text-2xl mb-4">Type</span>
                  <Field as="select" name="type" className="select">
                    <option value="address" className="mb-2">
                      Address
                    </option>
                    <option value="contract" className="mb-2">
                      Contract
                    </option>
                  </Field>
                  <ErrorMessage name="method">
                    {(msg) => <div className="text-error">{msg}</div>}
                  </ErrorMessage>
                </label>
              </AppStep>
              <AppStep step={3} className="bg-evm">
                <label className="w-full">
                  <span className="block text-2xl mb-4">Address</span>
                  <Field className="input" as="input" type="value" name="address" />
                  <ErrorMessage name="address">
                    {(msg) => <div className="text-error">{msg}</div>}
                  </ErrorMessage>
                </label>
              </AppStep>
              <AppStep step={4} className="bg-evm">
                <div className="w-full">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    className="bg-evm border-evm mb-4"
                  >
                    Post
                  </Button>
                  {result && <Grid nfts={result} />}
                </div>
              </AppStep>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};
export default Index;
