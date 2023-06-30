import type { NextPage } from "next";
import Head1 from "../components/common/Head1";
import EVMWallets from "../components/evm/EVMWallets";
import EVMWalletsFromPhrase from "../components/evm/EVMWalletsFromPhrase";

const EVM: NextPage = () => {
  return (
    <main>
      <Head1
        title="EVM Wallets"
        description="Generate Ethereum / Metamask Wallet"
      />

      <EVMWallets />
      <hr className="divider"></hr>
      <EVMWalletsFromPhrase />
    </main>
  );
};

export default EVM;
