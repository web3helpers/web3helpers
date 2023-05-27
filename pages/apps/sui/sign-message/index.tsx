import AppTitle from "blocks/apps/AppTitle";
import AppStep from "components/apps/AppStep";
import Layout from "blocks/layout";
import { NextPage } from "next";
import { name, id, description } from "./manifest.json";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Button from "components/buttons/Button";
import WalletPanel from "components/sui/WalletPanel";
import { object, string } from "yup";
import { useState } from "react";
import AppResult from "components/apps/AppResult";
import { ethos } from "ethos-connect";
import { createToast } from "vercel-toast-center";

type SignMessage = {
  value: string;
};
const Index: NextPage = () => {
  const meta = {
    title: name,
    description
  };
  const initialValues: SignMessage = {
    value: ""
  };
  const [result, setResult] = useState<string | undefined>();
  const { wallet } = ethos.useWallet();
  const schema = object({
    value: string().required("Required")
  });

  const submit = async (signMessage: SignMessage) => {
    setResult(undefined);
    const { value } = signMessage;
    if (!wallet) {
      createToast("Wallet not connected", {
        timeout: 4000,
        type: "warning"
      });
      return
    }
    const { signature } = await wallet?.signMessage({ message: value });
    setResult("0x" + Buffer.from(signature.data).toString("hex"));
  };

  return (
    <>
      <Layout meta={meta}>
        <div className="flex flex-col gap-4">
          <AppTitle name={name} id={id}></AppTitle>
          <AppStep step={1} className="bg-substrate">
            <WalletPanel></WalletPanel>
          </AppStep>
          <Formik initialValues={initialValues} validationSchema={schema} onSubmit={submit}>
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-4">
                <AppStep step={2} className="bg-aptos">
                  <label className="w-full">
                    <span className="block text-2xl mb-4">Message</span>
                    <Field className="textarea" as="textarea" rows="10" type="value" name="value" />
                    <ErrorMessage name="value">
                      {(msg) => <div className="text-error">{msg}</div>}
                    </ErrorMessage>
                  </label>
                </AppStep>
                <span className="ml-14">Only Ethos wallet supported.</span>
                <AppStep step={3} className="bg-aptos">
                  <div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-aptos border-aptos mb-4"
                    >
                      Sign
                    </Button>
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
