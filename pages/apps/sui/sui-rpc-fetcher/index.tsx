import Layout from "blocks/layout";
import { NextPage } from "next";
import AppStep from "components/apps/AppStep";
import Button from "components/buttons/Button";
import methods from "./methods.json";
import AppTitle from "blocks/apps/AppTitle";
import { useEffect, useState } from "react";
import AppResult from "components/apps/AppResult";
import { name, id, description } from "./manifest.json";
import { object, string } from "yup";
import { ErrorMessage, Formik, Form, Field, useFormikContext, useField } from "formik";
import { Meta } from "types";
import { networks } from "components/sui/NetworkSelector";
import { rpcRequest, arrayToString } from "utils";

type FormValues = {
  method: string;
  data: string;
  network: number;
};

const DataField = (props: any) => {
  const {
    values: { method },
    touched,
    setFieldValue
  } = useFormikContext<FormValues>();
  const [field, meta] = useField(props);
  const [docs, setDocs] = useState("");
  useEffect(() => {
    if (method.trim() !== "" && touched.method) {
      const m = methods.find((m) => m.method === method);
      if (!m) return;
      setFieldValue(props.name, arrayToString(m?.params as any[]));
      setDocs(m?.docs ?? "");
    }
  }, [method, setFieldValue, props.name, touched.method]);

  return (
    <>
      <textarea {...props} {...field} />
      <span>{docs}</span>
    </>
  );
};

const NetworkSelector = (props: any) => {
  const [field, meta] = useField(props);

  return (
    <>
      <select {...props} {...field}>
        {networks.map((n) => (
          <option value={n.id} key={n.id}>
            {n.name}
          </option>
        ))}
      </select>
      {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
    </>
  );
};

const Index: NextPage = () => {
  const meta: Meta = {
    title: name,
    description
  };
  const [result, setResult] = useState<string | undefined>();
  const schema = object({
    network: string().required("Required"),
    method: string().required("Required"),
    data: string().required("Required")
  });
  const initialValues = {
    network: 0x1,
    method: "sui_getTransaction",
    data: '["ECyIV7XCNf7OokHWCVejY1yDh6YdqAdj5aL2Ccb4QyA="]'
  };
  const submit = async ({
    method,
    data,
    network
  }: {
    method: string;
    data: string;
    network: number;
  }) => {
    try {
      const url = networks.find((n) => n.id == network)?.url;
      if (!url || !data) return;
      setResult("");
      const result = await rpcRequest(url, method, JSON.parse(data));
      setResult(result);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) setResult(error.message);
    }
  };
  return (
    <>
      <Layout meta={meta}>
        <div className="flex flex-col gap-4">
          <AppTitle name={name} id={id}></AppTitle>

          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            validateOnBlur
            onSubmit={submit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-4">
                <AppStep step={1} className="bg-sui">
                  <label>
                    <span className="block text-2xl mb-4">Network</span>
                    <NetworkSelector name="network" className="select" />
                    <ErrorMessage name="network">
                      {(msg) => <div className="text-error">{msg}</div>}
                    </ErrorMessage>
                  </label>
                </AppStep>
                <AppStep step={2} className="bg-sui">
                  <label>
                    <span className="block text-2xl mb-4">Jsonrpc method</span>
                    <Field as="select" name="method" className="select">
                      {methods.map((m) => (
                        <option value={m.method} key={m.method} className="mb-2">
                          {m.method}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="method">
                      {(msg) => <div className="text-error">{msg}</div>}
                    </ErrorMessage>
                  </label>
                </AppStep>
                <AppStep step={3} className="bg-sui">
                  <label className="w-full">
                    <span className="block text-2xl mb-4">Params</span>
                    <DataField as="textarea" name="data" rows="5" className="textarea"></DataField>
                  </label>
                </AppStep>
                <AppStep step={4} className="bg-sui">
                  <div className="w-full">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      loading={isSubmitting}
                      className="bg-sui border-sui mb-4"
                    >
                      Post
                    </Button>
                    <AppResult jsonOnly={true} data={result} className="w-full"></AppResult>
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
