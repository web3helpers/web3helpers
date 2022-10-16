import Layout from "blocks/layout";
import { utils } from "ethers";
import { NextPage } from "next";
import AppStep from "components/apps/AppStep";
import Button from "components/buttons/Button";
import AppTitle from "blocks/apps/AppTitle";
import { useState } from "react";
import AppResult from "components/apps/AppResult";
import { name, id, description } from "./manifest.json";
import { object, string } from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import { ethAddressRegex } from "utils/regex";

type FormModel = {
  message: string;
  signature: string;
  address: string;
};
const Index: NextPage = () => {
  const meta = {
    title: name,
    description
  };
  const [result, setResult] = useState<string | undefined>(undefined);
  const initialValues: FormModel = {
    message: "",
    signature: "",
    address: ""
  };
  const schema = object({
    message: string().required("Required"),
    signature: string().required("Reuqired"),
    address: string().required().matches(ethAddressRegex, "Invalid address")
  });

  const submit = async ({ message, address, signature }: FormModel) => {
    setResult(undefined);
    const verifyAddress = utils.verifyMessage(message, signature);
    setResult(address === verifyAddress ? "TRUE" : "FALSE");
  };

  return (
    <Layout meta={meta}>
      <div className="flex flex-col gap-4">
        <AppTitle name={name} id={id}></AppTitle>
        <Formik initialValues={initialValues} validationSchema={schema} onSubmit={submit}>
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <AppStep step={1} className="bg-evm">
                <label className="w-full">
                  <span className="label">Message</span>
                  <Field as="textarea" name="message" rows="6" className="textarea"></Field>
                  <ErrorMessage name="input">
                    {(msg) => <div className="text-error">{msg}</div>}
                  </ErrorMessage>
                </label>
              </AppStep>
              <AppStep step={2} className="bg-evm w-full">
                <label className="w-full">
                  <span className="label">Signature</span>
                  <Field as="textarea" name="signature" className="textarea"></Field>
                  <ErrorMessage name="input">
                    {(msg) => <div className="text-error">{msg}</div>}
                  </ErrorMessage>
                </label>
              </AppStep>
              <AppStep step={3} className="bg-evm">
                <label>
                  <span className="label">Address</span>
                  <Field as="input" name="address" className="input"></Field>
                  <ErrorMessage name="input">
                    {(msg) => <div className="text-error">{msg}</div>}
                  </ErrorMessage>
                </label>
              </AppStep>
              <AppStep step={4} className="bg-evm">
                <div className="w-full">
                  <Button
                    type="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    className="bg-evm border-evm mb-4"
                  >
                    Verify
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
