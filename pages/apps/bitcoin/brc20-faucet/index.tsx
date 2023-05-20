import Layout from "blocks/layout";
import { NextPage } from "next";
import ReCAPTCHA from "react-google-recaptcha";
import AppStep from "components/apps/AppStep";
import Button from "components/buttons/Button";
import AppTitle from "blocks/apps/AppTitle";
import { useState } from "react";
import { name, id, description } from "./manifest.json";
import { object, string } from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import { REG_BTC } from "utils/regex";
import React from "react";

type FormModel = {
  ticker: string;
  address: string;
};
const Index: NextPage = () => {
  const meta = {
    title: name,
    description
  };
  const [result, setResult] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const recaptchaRef = React.createRef();
  const initialValues: FormModel = {
    ticker: "gitt",
    address: ""
  };
  const schema = object({
    ticker: string().required(),
    address: string().required().matches(REG_BTC, "Invalid address")
  });

  function onReCAPTCHAChange() {}
  const submit = async ({ ticker, address }: FormModel) => {
    setError(undefined);
    setResult(undefined);
    const data = await fetch(`/api/faucet?ticker=${ticker}&address=${address}`);
    const result = await data.json();
    if (result.error) {
      setError(result.error);
    }
    if (result.hash) {
      const scanUrl = "https://chain.so/tx/BTCTEST/" + result.hash;
      setResult(scanUrl);
    }
  };

  return (
    <Layout meta={meta}>
      <div className="flex flex-col gap-4">
        <AppTitle name={name} id={id}></AppTitle>
        <Formik initialValues={initialValues} validationSchema={schema} onSubmit={submit}>
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <AppStep step={1} className="bg-bitcoin">
                <label>
                  <span className="label">Ticker</span>
                  <Field as="select" name="ticker" className="input">
                    <option value="gitt">gitt</option>
                    <option value="giee">giee</option>
                    <option value="bool">bool</option>
                  </Field>
                  <ErrorMessage name="ticker">
                    {(msg) => <div className="text-error">{msg}</div>}
                  </ErrorMessage>
                </label>
              </AppStep>
              <AppStep step={2} className="bg-bitcoin">
                <label>
                  <span className="label">Address</span>
                  <Field as="input" name="address" className="input" placeholder="tb1..."></Field>
                  <ErrorMessage name="address">
                    {(msg) => <div className="text-error">{msg}</div>}
                  </ErrorMessage>
                </label>
              </AppStep>
              <ReCAPTCHA
                ref={recaptchaRef}
                size="invisible"
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                onChange={onReCAPTCHAChange}
              />
              <AppStep step={3} className="bg-bitcoin">
                <div className="w-full">
                  <Button
                    type="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    className="bg-bitcoin border-bitcoin mb-4"
                  >
                    Request
                  </Button>
                  {result && (
                    <div>
                      Faucet successfully, view on{" "}
                      <a className="text-bitcoin" href={result} target="_blank" rel="noreferrer">
                        explorer.
                      </a>
                    </div>
                  )}
                  {error && <div className="text-error">{error}</div>}
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
