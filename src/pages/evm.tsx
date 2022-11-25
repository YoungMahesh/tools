import type { NextPage } from "next";
import Head from "next/head";
import EVMWallets from "../components/evm/EVMWallets";

const EVM: NextPage = () => {
  return (
    <main>
      <Head>
        <title>EVM Wallets</title>
        <meta
          name="description"
          content="Generate Ethereum / Metamask Wallet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EVMWallets />
    </main>
  );
};

export default EVM;
