import Layout from "blocks/layout";
import { NextPage } from "next";
import AppStep from "components/apps/AppStep";
import Button from "components/buttons/Button";
import AppTitle from "blocks/apps/AppTitle";
import { useState } from "react";
import AppResult from "components/apps/AppResult";
import { name, id, description } from "./manifest.json";
import { object, number } from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import { generateAddress } from "./utils";

type FormModel = {
  amount: number;
};
const Index: NextPage = () => {
  const meta = {
    title: name,
    description
  };
  const [result, setResult] = useState<{} | undefined>(undefined);
  const initialValues: FormModel = {
    amount: 1
  };
  const schema = object({
    amount: number().required().min(1)
  });

  const submit = async ({ amount }: FormModel) => {
    const result = Array(Number(amount)).fill(JSON.stringify(await generateAddress()));
    setResult({ ...result });
  };

  return (
    <Layout meta={meta}>
      <div className="flex flex-col gap-4">
        <AppTitle name={name} id={id}></AppTitle>
        <Formik initialValues={initialValues} validationSchema={schema} onSubmit={submit}>
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <AppStep step={1} className="bg-aleo">
                <label>
                  <span className="label">Amount</span>
                  <Field as="input" name="amount" type="number" className="input"></Field>
                  <ErrorMessage name="amount">
                    {(msg) => <div className="text-error">{msg}</div>}
                  </ErrorMessage>
                </label>
              </AppStep>
              <AppStep step={2} className="bg-aleo">
                <div className="w-full">
                  <Button
                    type="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    className="bg-aleo border-aleo mb-4"
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
