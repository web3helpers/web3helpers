import Layout from "blocks/layout";
import { NextPage } from "next";
import AppStep from "components/apps/AppStep";
import Button from "components/buttons/Button";
import AppTitle from "blocks/apps/AppTitle";
import { useState } from "react";
import AppResult from "components/apps/AppResult";
import { name, id, description } from "./manifest.json";
import { object, string } from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
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


type GenerateAddressType = {
  type: "bls" | "ecdsa";
};
const Index: NextPage = () => {
  const meta = {
    title: name,
    description
  };
  const [address, setAddresss] = useState<FilecoinAddress | undefined>(undefined);
  const initialValues: GenerateAddressType = {
    type: "ecdsa"
  };
  const schema = object({
    type: string().required()
  });

  const submit = async ({ type }: GenerateAddressType) => {
    const result = await generateAddress(type);
    setAddresss(result);
  };

  return (
    <Layout meta={meta}>
      <div className="flex flex-col gap-4">
        <AppTitle name={name} id={id}></AppTitle>
        <Formik initialValues={initialValues} validationSchema={schema} onSubmit={submit}>
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <AppStep step={1} className="bg-filecoin">
                <label>
                  <span className="block text-2xl mb-4">Address Type</span>
                  <Field as="select" name="type" className="select">
                    <option value="bls">bls</option>
                    <option value="ecdsa">ecdsa</option>
                  </Field>
                  <ErrorMessage name="type">
                    {(msg) => <div className="text-error">{msg}</div>}
                  </ErrorMessage>
                </label>
              </AppStep>
              <AppStep step={2} className="bg-filecoin">
                <div>
                  <Button
                    type="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    className="bg-filecoin border-filecoin mb-4"
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
