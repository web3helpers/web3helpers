import type { NextPage } from "next";
import { Condition, Meta } from "types";
import Layout from "blocks/layout";
import TagList from "blocks/home/ChainList";
import AppList from "blocks/home/AppList";
import SearchBar from "blocks/home/SearchBar";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const meta: Meta = {
    description: "Web3.0 helpers for everyone, free and opensource.",
    logo: "https://web3helpers.xyz/favicon.png",
    ogUrl: "http://web3helpers.xyz",
    title: "Web 3.0 helpers"
  };
  const router = useRouter();

  return (
    <>
      <Layout meta={meta}>
        <div className="grid grid-cols-1 md:grid-cols-[12rem_1fr] gap-12">
          <section className="hidden md:block">
            <TagList></TagList>
          </section>
          <section className="flex flex-col gap-12">
            <SearchBar></SearchBar>
            <section className="block md:hidden">
              <TagList></TagList>
            </section>
            <AppList condition={{ chain: router.query.chain as string | undefined }}></AppList>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default Home;
