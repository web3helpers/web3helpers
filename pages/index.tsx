import type { NextPage } from "next";
import { Meta } from "types";
import Layout from "blocks/layout";
import TagList from "blocks/home/TagList"
import AppList from 'blocks/home/AppList'
import SearchBar from 'blocks/home/SearchBar'

const Home: NextPage = () => {
  const meta: Meta = {
    
  };
  return (
    <>
      <Layout meta={meta}>
        <div className="grid grid-cols-[12rem_1fr] gap-12">
          <section>
            <TagList></TagList> 
          </section>
          <section className="flex flex-col gap-12">
            <SearchBar></SearchBar>
            <AppList></AppList>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default Home;
