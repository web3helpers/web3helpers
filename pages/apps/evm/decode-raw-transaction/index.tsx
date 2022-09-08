import AppTitle from "blocks/apps/AppTitle";
import AppStep from "components/apps/AppStep";
import Button from "components/buttons/Button";
import Layout from "blocks/layout";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { NextPage } from "next";
import { Meta } from "types";
import { name } from "./manifest.json";
import { useState } from "react";
import AppResult from "components/apps/AppResult";
import { decode } from "./utils";

const Index: NextPage = () => {
  const meta: Meta = {};
  const [result, setResult] = useState<any>(null);
  const initialValues = {
    rawTransaction: "",
  };
  const submit = (values: { rawTransaction: string }) => {
    console.log(values);

    const decoded = decode(values.rawTransaction);
    setResult(decoded);
  };
  return (
    <>
      <Layout meta={meta}>
        <div className="flex flex-col gap-4">
          <AppTitle name={name}></AppTitle>
          <Formik
            initialValues={initialValues}
            validate={(values) => {
              const errors = {};
              return errors;
            }}
            onSubmit={submit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-4">
                <AppStep step={1} className="bg-evm">
                  <label className="w-full">
                    <span className="block text-2xl mb-4">Raw transaction</span>
                    <Field
                      as="textarea"
                      name="rawTransaction"
                      rows="5"
                      className="border-2 w-full p-2 border-black rounded-md bg-white"
                    ></Field>
                  </label>
                </AppStep>
                <AppStep step={2} className="bg-evm">
                  <div>
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
