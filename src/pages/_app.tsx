import { type AppType } from "next/dist/shared/lib/utils";
import Header from "../components/Header";
import Layout from "../components/Layout";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Header />
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
