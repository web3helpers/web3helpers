import Layout from "blocks/layout";
import { NextPage } from "next";
import AppStep from "components/apps/AppStep";
import Button from "components/buttons/Button";
import AppTitle from "blocks/apps/AppTitle";
import { useState } from "react";
import AppResult from "components/apps/AppResult";
import { name, id, description } from "./manifest.json";
import { number, object, string } from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import WalletPanel from "components/aptos/WalletPanel";
import { useNetwork, useAccounts } from "@web3helpers/aptos-wallet";
import { AptosClient } from "aptos";
import { createToast } from "vercel-toast-center";

const MAX_U64_BIG_INT = BigInt(2 ** 64) - BigInt(1);

type FormModel = {
  name: string;
  description: string;
  uri: string;
  tokenName: string;
  amount: number;
};
const Index: NextPage = () => {
  const meta = {
    title: name,
    description
  };
  const [result, setResult] = useState(undefined);
  const initialValues: FormModel = {
    name: "",
    description: "",
    uri: "",
    tokenName: "",
    amount: 1
  };
  const schema = object({
    name: string().required("Required"),
    description: string().required("Required"),
    uri: string().required("Required"),
    tokenName: string().required("Required"),
    amount: number().required("Required")
  });
  const { url } = useNetwork();
  const { address } = useAccounts();
  const submit = async ({ name, description, uri, tokenName }: FormModel, actions) => {
    if (!url) return;
    const client = new AptosClient(url);
    const createTokenTransaction = {
      arguments: [
        name,
        tokenName,
        description,
        10,
        MAX_U64_BIG_INT.toString(),
        uri,
        address,
        0,
        0,
        [false, false, false, false, false],
        [],
        [],
        []
      ],
      type_arguments: [],
      function: "0x3::token::create_token_script",
      type: "entry_function_payload"
    };
    try {
      const createToken = await (window as any).aptos.signAndSubmitTransaction(
        createTokenTransaction
      );
      console.log(createToken.hash);
      await client.waitForTransaction(createToken.hash);
      actions.resetForm({ value: initialValues });
      setResult(createToken.hash);
    } catch (error) {
      if (error instanceof Error) {
        createToast(error.message, {
          timeout: 4000,
          type: "error"
        });
      }
    }
  };

  return (
    <Layout meta={meta}>
      <div className="flex flex-col gap-4">
        <AppTitle name={name} id={id} description={description}></AppTitle>
        <AppStep step={1} className="bg-aptos">
          <WalletPanel></WalletPanel>
        </AppStep>
        <Formik initialValues={initialValues} validationSchema={schema} onSubmit={submit}>
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <AppStep step={2} className="bg-aptos">
                <label>
                  <span className="label">Token name</span>
                  <Field as="input" name="tokenName" className="input"></Field>
                  <ErrorMessage name="tokenName">
                    {(msg) => <div className="text-error">{msg}</div>}
                  </ErrorMessage>
                </label>
              </AppStep>
              <AppStep step={3} className="bg-aptos">
                <label>
                  <span className="label">Collection name</span>
                  <Field as="input" name="name" className="input"></Field>
                  <ErrorMessage name="name">
                    {(msg) => <div className="text-error">{msg}</div>}
                  </ErrorMessage>
                </label>
              </AppStep>
              <AppStep step={4} className="bg-aptos">
                <label>
                  <span className="label">Url</span>
                  <Field as="input" name="uri" className="input"></Field>
                  <ErrorMessage name="uri">
                    {(msg) => <div className="text-error">{msg}</div>}
                  </ErrorMessage>
                </label>
              </AppStep>
              <AppStep step={5} className="bg-aptos">
                <label className="w-full">
                  <span className="label">Description</span>
                  <Field as="textarea" rows="5" name="description" className="textarea"></Field>
                  <ErrorMessage name="name">
                    {(msg) => <div className="text-error">{msg}</div>}
                  </ErrorMessage>
                </label>
              </AppStep>
              <AppStep step={6} className="bg-aptos">
                <label>
                  <span className="label">Mint amount</span>
                  <Field as="input" type="number" name="amount" className="select"></Field>
                  <ErrorMessage name="amount">
                    {(msg) => <div className="text-error">{msg}</div>}
                  </ErrorMessage>
                </label>
              </AppStep>
              <AppStep step={7} className="bg-aptos">
                <div className="w-full">
                  <Button
                    type="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    className="bg-aptos border-aptos mb-4"
                  >
                    Create
                  </Button>
                  {result && <AppResult data={result}></AppResult>}
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
