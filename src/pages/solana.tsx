import type { NextPage } from "next";
import Head from "next/head";
import SolanaWallets from "../components/solana/SolanaWallets";

const Solana: NextPage = () => {
  return (
    <main>
      <Head>
        <title>Solana Wallets</title>
        <meta name="description" content="Generate Random Solana Wallet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SolanaWallets />
    </main>
  );
};

export default Solana;
