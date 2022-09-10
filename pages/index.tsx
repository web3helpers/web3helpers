import type { NextPage } from "next";
import { Condition, Meta } from "types";
import Layout from "blocks/layout";
import TagList from "blocks/home/TagList";
import AppList from "blocks/home/AppList";
import SearchBar from "blocks/home/SearchBar";
import { useReducer } from "react";

function reducer(
  state: Condition,
  action: { type: "search" | "chain"; value: string }
): Condition {
  switch (action.type) {
    case "search":
      return { ...state, search: action.value };
    case "chain":
      return { ...state, chain: action.value };
    default:
      throw new Error();
  }
}
const Home: NextPage = () => {
  const meta: Meta = {};
  const [state, dispatch] = useReducer(reducer, {});

  return (
    <>
      <Layout meta={meta}>
        <div className="grid grid-cols-1 md:grid-cols-[12rem_1fr] gap-12">
          <section className="hidden md:block">
            <TagList
              onChange={(value) => dispatch({ type: "chain", value })}
            ></TagList>
          </section>
          <section className="flex flex-col gap-12">
            <SearchBar></SearchBar>
            <section className="block md:hidden">
              <TagList
                onChange={(value) => dispatch({ type: "chain", value })}
              ></TagList>
            </section>
            <AppList condition={state}></AppList>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default Home;
