import AppTitle from "blocks/apps/AppTitle";
import AppStep from "components/apps/AppStep";
import Layout from "blocks/layout";
import { NextPage } from "next";
import { name } from "./manifest.json";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Button from "components/buttons/Button";

const Index: NextPage = () => {
  const meta = {};
  const initialValues = {
    type: "message",
    value: "",
  };

  const submit = (values: any, { setSubmitting }: any) => {};

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
                  <label>
                    <span className="block text-lg mb-4">Sign Type</span>
                    <Field
                      as="select"
                      name="type"
                      className="border-2 w-40 h-12 border-black rounded-md bg-white"
                    >
                      <option value="message">Message</option>
                      <option value="typedData">Typed Data</option>
                    </Field>
                  </label>
                </AppStep>
                <AppStep step={2} className="bg-evm">
                  <label className="w-full">
                    <span className="block text-lg mb-4">Unsigned Message</span>
                    <Field
                      className="p-2 border-2 border-black rounded-md w-full"
                      as="textarea"
                      rows="10"
                      type="value"
                      name="email"
                    />
                    <ErrorMessage name="email" component="div" />
                  </label>
                </AppStep>
                <AppStep step={3} className="bg-evm">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-evm border-evm mb-4"
                  >
                    Submit
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
