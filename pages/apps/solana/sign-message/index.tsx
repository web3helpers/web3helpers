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

type FormModel = {
  input: string;
};
const Index: NextPage = () => {
  const meta = {};
  const [result, setResult] = useState(undefined);
  const initialValues: FormModel = {
    input: ""
  };
  const schema = object({
    type: string().required()
  });

  const submit = async ({ input }: FormModel) => {
    setResult(undefined);
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
              <AppStep step={1} className="bg-solana">
                <label>
                  <span className="block text-2lg mb-4">Input</span>
                  <Field as="input" name="input" className="input"></Field>
                  <ErrorMessage name="input">
                    {(msg) => <div className="text-error">{msg}</div>}
                  </ErrorMessage>
                </label>
              </AppStep>
              <AppStep step={2} className="bg-solana">
                <div>
                  <Button
                    type="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    className="bg-solana border-solana mb-4"
                  >
                    Generate
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
