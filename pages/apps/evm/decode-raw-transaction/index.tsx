import AppTitle from "blocks/apps/AppTitle";
import AppStep from "components/apps/AppStep";
import Button from "components/buttons/Button";
import Layout from "blocks/layout";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { NextPage } from "next";
import { Meta } from "types";
import { name, id, description } from "./manifest.json";
import { useState } from "react";
import AppResult from "components/apps/AppResult";
import { createToast } from "vercel-toast-center";
import { object, string } from "yup";
import * as ethers from "ethers";

export function decode(rawTransaction: string) {
  const transaction = ethers.utils.parseTransaction(rawTransaction);
  const types = ["legacy", "eip2930", "eip1559"];
  const BN = ethers.BigNumber;
  Object.keys(transaction).forEach((value) => {
    if (BN.isBigNumber(transaction[value])) transaction[value] = transaction[value].toHexString();
  });
  return { ...transaction, type: types[transaction.type ?? 0] };
}

const Index: NextPage = () => {
  const meta: Meta = {
    title: name,
    description
  };
  const [result, setResult] = useState<any>(null);
  const initialValues = {
    rawTransaction: ""
  };
  const schema = object({
    rawTransaction: string()
      .matches(/^0x[0-9a-fA-F]*$/, "Invalid raw transaction")
      .required("Required")
  });
  const submit = (values: { rawTransaction: string }, { setSubmitting }) => {
    setResult(() => undefined);
    try {
      setSubmitting(true);
      const decoded = decode(values.rawTransaction);
      setResult(decoded);
    } catch (error) {
      if (error instanceof Error) {
        createToast(error.message, {
          timeout: 4000,
          type: "error"
        });
      }
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <Layout meta={meta}>
        <div className="flex flex-col gap-4">
          <AppTitle name={name} id={id}></AppTitle>
          <Formik initialValues={initialValues} validationSchema={schema} onSubmit={submit}>
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-4">
                <AppStep step={1} className="bg-evm">
                  <label className="w-full">
                    <span className="block text-2xl mb-4">Raw transaction</span>
                    <Field
                      as="textarea"
                      name="rawTransaction"
                      rows="5"
                      className="textarea"
                      placeholder="Start with 0x"
                    ></Field>
                    <ErrorMessage name="rawTransaction">
                      {(msg) => <div className="text-error">{msg}</div>}
                    </ErrorMessage>
                  </label>
                </AppStep>
                <AppStep step={2} className="bg-evm">
                  <div className="w-full">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-evm border-evm mb-4"
                    >
                      Decode
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
