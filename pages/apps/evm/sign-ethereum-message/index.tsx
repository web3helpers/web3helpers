import AppTitle from "blocks/apps/AppTitle";
import AppStep from "components/apps/AppStep";
import Layout from "blocks/layout";
import { NextPage } from "next";
import { name } from "./manifest.json";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Button from "components/buttons/Button";
import WalletPanel from "components/WalletPanel";
import { object, string } from "yup";
import { useAccount, useSignMessage, useSignTypedData } from "wagmi";
import { useCallback, useState } from "react";
import AppResult from "components/apps/AppResult";

type SignMessage = {
  type: "message" | "typedData";
  value: string;
};
const Index: NextPage = () => {
  const { address } = useAccount();
  const { signTypedDataAsync } = useSignTypedData();
  const { signMessageAsync } = useSignMessage();
  const [result, setResult] = useState<string | undefined>();
  const meta = {};
  const initialValues: SignMessage = {
    type: "message",
    value: "",
  };
  const schema = object({
    type: string().required("Required"),
    value: string().required("Reuqired"),
  });

  const submit = useCallback(
    async (signMessage: SignMessage) => {
      if (!address) return;
      const { type, value } = signMessage;
      let signature: string;
      if (type === "typedData") {
        signature = await signTypedDataAsync(JSON.parse(value));
      } else {
        signature = await signMessageAsync({ message: value });
      }
      setResult(signature);
    },
    [address, signMessageAsync, signTypedDataAsync]
  );

  return (
    <>
      <Layout meta={meta}>
        <div className="flex flex-col gap-4">
          <AppTitle name={name}></AppTitle>
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={submit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-4">
                <AppStep step={1} className="bg-evm">
                  <WalletPanel></WalletPanel>
                </AppStep>
                <AppStep step={2} className="bg-evm">
                  <label>
                    <span className="block text-lg mb-4">Sign Type</span>
                    <Field as="select" name="type" className="select">
                      <option value="message">Message</option>
                      <option value="typedData">Typed Data</option>
                    </Field>
                  </label>
                </AppStep>
                <AppStep step={3} className="bg-evm">
                  <label className="w-full">
                    <span className="block text-lg mb-4">Unsigned Message</span>
                    <Field
                      className="textarea"
                      as="textarea"
                      rows="10"
                      type="value"
                      name="value"
                    />
                    <ErrorMessage name="value">
                      {(msg) => <div className="text-error">{msg}</div>}
                    </ErrorMessage>
                  </label>
                </AppStep>
                <AppStep step={4} className="bg-evm">
                  <div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-evm border-evm mb-4"
                    >
                      Submit
                    </Button>
                    <AppResult data={result} className="w-full"></AppResult>
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
