import AppTitle from "blocks/apps/AppTitle";
import AppStep from "components/apps/AppStep";
import Layout from "blocks/layout";
import { NextPage } from "next";
import { name, id } from "./manifest.json";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Button from "components/buttons/Button";
import WalletPanel from "components/substrate/WalletPanel";
import { object, string } from "yup";
import { useState } from "react";
import AppResult from "components/apps/AppResult";

type SignMessage = {
  value: string;
};
const Index: NextPage = () => {
  const meta = {};
  const initialValues: SignMessage = {
    value: ""
  };
  const [result, setResult] = useState();
  const schema = object({
    value: string().required("Reuqired")
  });

  const submit = async (signMessage: SignMessage) => {
    const { value } = signMessage;
  };

  return (
    <>
      <Layout meta={meta}>
        <div className="flex flex-col gap-4">
          <AppTitle name={name} id={id}></AppTitle>
          <AppStep step={1} className="bg-evm">
            <WalletPanel></WalletPanel>
          </AppStep>
          <Formik initialValues={initialValues} validationSchema={schema} onSubmit={submit}>
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-4">
                <AppStep step={2} className="bg-evm">
                  <label className="w-full">
                    <span className="block text-lg mb-4">Unsigned Message</span>
                    <Field className="textarea" as="textarea" rows="10" type="value" name="value" />
                    <ErrorMessage name="value">
                      {(msg) => <div className="text-error">{msg}</div>}
                    </ErrorMessage>
                  </label>
                </AppStep>
                <AppStep step={3} className="bg-evm">
                  <div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-evm border-evm mb-4"
                    >
                      Submit
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
