import type { NextPage } from "next";
import Head1 from "../components/common/Head1";
import SolanaWallets from "../components/solana/SolanaWallets";

const Solana: NextPage = () => {
  return (
    <main>
      <Head1
        title="Solana Wallets"
        description="Generate Random Solana Wallet"
      />

      <SolanaWallets />
    </main>
  );
};

export default Solana;
