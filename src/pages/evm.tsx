import type { NextPage } from "next";
import Head1 from "../components/common/Head1";
import EVMWallets from "../components/evm/EVMWallets";

const EVM: NextPage = () => {
  return (
    <main>
      <Head1
        title="EVM Wallets"
        description="Generate Ethereum / Metamask Wallet"
      />

      <EVMWallets />
    </main>
  );
};

export default EVM;
