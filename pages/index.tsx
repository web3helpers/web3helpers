import type { NextPage } from "next";
import { Meta } from "types";
import Layout from "blocks/layout";

const Home: NextPage = () => {
  const meta: Meta = {
    
  };
  return (
    <>
      <Layout meta={meta}></Layout>
    </>
  );
};

export default Home;
