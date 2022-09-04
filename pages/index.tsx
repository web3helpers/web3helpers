import type { NextPage } from "next";
import { Chain, Meta } from "types";
import Layout from "blocks/layout";
import TagList from "blocks/home/TagList";
import AppList from "blocks/home/AppList";
import SearchBar from "blocks/home/SearchBar";
import { useState } from "react";

const Home: NextPage = () => {
  const meta: Meta = {};
  const [chain, setChain] = useState<Chain>();

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
            <AppList></AppList>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default Home;
