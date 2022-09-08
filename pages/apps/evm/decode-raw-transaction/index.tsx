import AppTitle from "blocks/apps/AppTitle";
import AppStep from "components/apps/AppStep";
import Button from "components/buttons/Button";
import Layout from "blocks/layout";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { NextPage } from "next";
import { Meta } from "types";
import { name } from "./manifest.json";

const Index: NextPage = () => {
  const meta: Meta = {};
  const initialValues = {
    rawTransaction: "",
  };
  const submit = () => {};
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
                      name="type"
                      rows="5"
                      className="border-2 w-full p-2 border-black rounded-md bg-white"
                    ></Field>
                  </label>
                </AppStep>
                <AppStep step={2} className="bg-evm">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-evm border-evm mb-4"
                  >
                    Decode
                  </Button>
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
