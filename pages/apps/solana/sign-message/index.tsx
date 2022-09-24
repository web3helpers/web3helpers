import Layout from "blocks/layout";
import { NextPage } from "next";
import AppStep from "components/apps/AppStep";
import Button from "components/buttons/Button";
import AppTitle from "blocks/apps/AppTitle";
import { useState } from "react";
import AppResult from "components/apps/AppResult";
import { name, id } from "./manifest.json";
import { object, string } from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import WalletPanel from "components/solana/WalletPanel";
import { useWallet } from "@solana/wallet-adapter-react";
import { bytesToHexString, stringToBytes } from "utils";

type FormModel = {
  input: string;
};
const Index: NextPage = () => {
  const meta = {};
  const [result, setResult] = useState<string | undefined>(undefined);
  const initialValues: FormModel = {
    input: ""
  };
  const { signMessage } = useWallet();
  const schema = object({
    input: string().required("Required")
  });

  const submit = async ({ input }: FormModel) => {
    console.log(signMessage);
    if (!signMessage) return;
    const signature = await signMessage(stringToBytes(input));
    setResult(bytesToHexString(signature));
  };

  return (
    <Layout meta={meta}>
      <div className="flex flex-col gap-4">
        <AppTitle name={name} id={id}></AppTitle>
        <AppStep step={1} className="bg-solana">
          <WalletPanel></WalletPanel>
        </AppStep>
        <Formik initialValues={initialValues} validationSchema={schema} onSubmit={submit}>
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <AppStep step={2} className="bg-solana">
                <label className="w-full">
                  <span className="block text-2xl mb-4">Input</span>
                  <Field as="textarea" name="input" rows="4" className="textarea"></Field>
                  <ErrorMessage name="input">
                    {(msg) => <div className="text-error">{msg}</div>}
                  </ErrorMessage>
                </label>
              </AppStep>
              <AppStep step={3} className="bg-solana">
                <div>
                  <Button
                    type="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    className="bg-solana border-solana mb-4"
                  >
                    Sign
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
