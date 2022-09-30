import AppTitle from "blocks/apps/AppTitle";
import Layout from "blocks/layout";
import AppResult from "components/apps/AppResult";
import AppStep from "components/apps/AppStep";
import Button from "components/buttons/Button";
import { ErrorMessage, Field, Form, Formik, useField, useFormikContext } from "formik";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Meta } from "types";
import { object, string } from "yup";
import { name, id } from "./manifest.json";
import { methods } from "./methods";
import beautify from "json-beautify-fix";
import { Cluster, clusterApiUrl, Connection } from "@solana/web3.js";
import { networks } from "components/solana/NetworkSelector";
import { rpcRequest } from "./utils";

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

type FormValues = {
  method: string;
  data: string;
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
      setFieldValue(props.name, m ? beautify(m.params, [], 4, 40) : "");
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

const Index: NextPage = () => {
  const meta: Meta = {};
  const [result, setResult] = useState<string | undefined>();
  const schema = object({
    network: string().required("Required"),
    method: string().required("Required")
  });
  const initialValues = {
    network: 0x1,
    method: "getSlot",
    data: "[]"
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
                <AppStep step={1} className="bg-evm">
                  <label>
                    <span className="block text-2xl mb-4">Network</span>
                    <NetworkSelector name="network" className="select" />
                    <ErrorMessage name="network">
                      {(msg) => <div className="text-error">{msg}</div>}
                    </ErrorMessage>
                  </label>
                </AppStep>
                <AppStep step={2} className="bg-evm">
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
                <AppStep step={3} className="bg-evm">
                  <label className="w-full">
                    <span className="block text-2xl mb-4">Data</span>
                    <DataField as="textarea" name="data" rows="5" className="textarea"></DataField>
                  </label>
                </AppStep>
                <AppStep step={4} className="bg-evm">
                  <div className="w-full">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      loading={isSubmitting}
                      className="bg-evm border-evm mb-4"
                    >
                      Post
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
