import Layout from "blocks/layout";
import { NextPage } from "next";
import AppStep from "components/apps/AppStep";
import Button from "components/buttons/Button";
import AppTitle from "blocks/apps/AppTitle";
import { useState } from "react";
import AppResult from "components/apps/AppResult";
import { name, id, description } from "./manifest.json";
import { object, string, number } from "yup";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { Meta } from "types";
import { Keyring } from "@polkadot/keyring";
import { mnemonicGenerate } from "@polkadot/util-crypto";

export type SubstrateAddress = {
  address: string;
  mnemonic: string;
};
export function generateAddress(
  type: "sr25519" | "ed25519" | "ecdsa",
  ss58Format: 0 | 2
): SubstrateAddress {
  const keyring = new Keyring({ type, ss58Format });
  const mnemonic = mnemonicGenerate();
  const pair = keyring.addFromUri(mnemonic, { name: "web3helpers" });

  return {
    address: pair.address,
    mnemonic: mnemonic
  };
}

type GenerateAddressType = {
  type: "sr25519" | "ed25519" | "ecdsa";
  format: 0 | 2;
};
const Index: NextPage = () => {
  const meta: Meta = {
    title: name,
    description
  };
  const [address, setAddresss] = useState<SubstrateAddress | undefined>(undefined);
  const initialValues: GenerateAddressType = {
    type: "sr25519",
    format: 2
  };
  const schema = object({
    type: string().required(),
    format: number().required()
  });

  const submit = (
    { type, format }: GenerateAddressType,
    { setSubmitting }: FormikHelpers<GenerateAddressType>
  ) => {
    setAddresss(() => undefined);
    setSubmitting(true);
    const result = generateAddress(type, format);
    setAddresss(() => result);
    setSubmitting(false);
  };

  return (
    <Layout meta={meta}>
      <div className="flex flex-col gap-4">
        <AppTitle name={name} id={id}></AppTitle>
        <Formik initialValues={initialValues} validationSchema={schema} onSubmit={submit}>
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <AppStep step={1} className="bg-substrate">
                <label>
                  <span className="label">Address Type</span>
                  <Field as="select" name="type" className="select">
                    <option value="sr25519">sr25519</option>
                    <option value="ed25519">ed25519</option>
                    <option value="ecdsa">ecdsa</option>
                  </Field>
                </label>
              </AppStep>
              <AppStep step={2} className="bg-substrate">
                <label>
                  <span className="block text-2xl mb-4">Format</span>
                  <Field as="select" name="format" className="select">
                    <option value={2}>Polkadot</option>
                    <option value={0}>Kusama</option>
                  </Field>
                </label>
              </AppStep>
              <AppStep step={3} className="bg-substrate">
                <div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-substrate border-substrate mb-4"
                  >
                    Generate
                  </Button>
                  {address && <AppResult data={address}></AppResult>}
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
