import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tools</title>
        <meta name="description" content="Collection Tools" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <button className="btn-primary btn">Button</button>
      </main>
    </>
  );
};

export default Home;
