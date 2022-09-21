import Head from "next/head";
import { NextSeo } from "next-seo";
import { Meta } from "../../types";
import Footer from "./Footer";
import NavBar from "./NavBar";

export interface LayoutProps {
  meta: Meta;
  children?: React.ReactNode;
}

const Layout = ({ children, meta }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{meta?.title ?? "Web3.0 Helpers"}</title>
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="theme-color" content="#00501e" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={meta?.description} />

        <link rel="shortcut icon" type="image/x-icon" href={meta?.logo} />
        <link rel="apple-touch-icon" sizes="180x180" href={meta?.logo} />
      </Head>
      <NextSeo
        title={meta.title}
        description={meta?.description}
        openGraph={{
          url: meta.ogUrl,
          title: meta.title,
          description: meta.description,
          images: [
            {
              url: meta.ogImage ?? "",
              alt: "Web3.0 Helpers",
              type: "image/jpeg"
            }
          ],
          site_name: "Web3.0 Helperss"
        }}
        twitter={{
          handle: "@_lens.ink",
          site: meta.twitter,
          cardType: "summary_large_image"
        }}
      />
      <div className="bg-gradient-to-br from-red-200 via-red-100 to-green-100 dark:from-black dark:via-black dark:to-gray-800 relative w-full min-h-screen flex flex-col items-center">
        <NavBar></NavBar>
        <div className="max-w-6xl w-full px-4 py-10 min-h-[80vh]">{children}</div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default Layout;
