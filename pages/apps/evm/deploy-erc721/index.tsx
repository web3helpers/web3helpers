import AppTitle from "blocks/apps/AppTitle";
import Layout from "blocks/layout";
import AppResult from "components/apps/AppResult";
import AppStep from "components/apps/AppStep";
import Button from "components/buttons/Button";
import WalletPanel from "components/evm/WalletPanel";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { NextPage } from "next";
import { Meta } from "types";
import { object, string, number } from "yup";
import { useState } from "react";
import NetworkSelector from "components/evm/NetworkSelector";
import { name, id } from "./manifest.json";
import { ContractFactory } from "ethers";
import { useAccount, useSigner } from "wagmi";
import { abi, bytecode } from "./abi.json";

const Index: NextPage = () => {
  const { address } = useAccount();
  const { data: signer } = useSigner();

  const [result, setResult] = useState<{ address: string; hash: string } | undefined>(undefined);
  const meta: Meta = {};
  const initialValues = {
    symbol: "W3H",
    name: "Web3helpers",
    amount: 100
  };
  const schema = object({
    symbol: string().required("Required"),
    name: string().required("Required"),
    amount: number()
      .integer("Must be interger")
      .positive("Must be postive number")
      .required("Required")
  });
  const submit = async ({ symbol, name, amount }: typeof initialValues) => {
    if (!address) return;

    const erc721ContractFactory = new ContractFactory(abi, bytecode, signer!);
    const erc721Contract = await erc721ContractFactory.deploy(
      [{ holder: address, amount }],
      name,
      symbol
    );
    const contractAddress = erc721Contract.address;
    const result = await erc721Contract.deployTransaction.wait();
    setResult({ address: contractAddress, hash: result.blockHash });
  };
  return (
    <>
      <Layout meta={meta}>
        <div className="flex flex-col gap-4">
          <AppTitle name={name} id={id}></AppTitle>
          <AppStep step={1} className="bg-evm">
            <WalletPanel></WalletPanel>
          </AppStep>
          <AppStep step={2} className="bg-evm">
            <label>
              <span className="label">Network</span>
              <NetworkSelector className="select" />
            </label>
          </AppStep>
          <Formik initialValues={initialValues} validationSchema={schema} onSubmit={submit}>
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-4">
                <AppStep step={3} className="bg-evm">
                  <label>
                    <span className="label">Token name</span>
                    <Field as="input" name="name" className="select"></Field>
                    <ErrorMessage name="name">
                      {(msg) => <div className="text-error">{msg}</div>}
                    </ErrorMessage>
                  </label>
                </AppStep>
                <AppStep step={4} className="bg-evm">
                  <label>
                    <span className="label">Token symbol</span>
                    <Field as="input" name="symbol" className="select"></Field>
                    <ErrorMessage name="symbol">
                      {(msg) => <div className="text-error">{msg}</div>}
                    </ErrorMessage>
                  </label>
                </AppStep>
                <AppStep step={5} className="bg-evm">
                  <label>
                    <span className="label">Mint amount</span>
                    <Field as="input" type="number" name="amount" className="select"></Field>
                    <ErrorMessage name="amount">
                      {(msg) => <div className="text-error">{msg}</div>}
                    </ErrorMessage>
                  </label>
                </AppStep>
                <AppStep step={6} className="bg-evm">
                  <div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-evm border-evm mb-4"
                    >
                      Submit
                    </Button>
                    {isSubmitting && <span className="block mb-2">May take 1~2 mins</span>}
                    {result && <AppResult data={result} className="w-full"></AppResult>}
                  </div>
                </AppStep>
              </Form>
            )}
          </Formik>
        </div>
      </Layout>
    </>
  );
};
export default Index;
