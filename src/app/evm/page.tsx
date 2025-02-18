import type { NextPage } from "next";
import EVMSingleWallet from "./_components/EVMSingleWallet";
import EVMWalletsFromPhrase from "./_components/EVMWalletsFromPhrase";

export const metadata = {
  title: "EVM Wallets",
  description: "Generate Ethereum / Metamask Wallet",
};

const EVM: NextPage = () => {
  return (
    <main>
      <EVMSingleWallet />
      <hr className="divider"></hr>
      <EVMWalletsFromPhrase />
    </main>
  );
};

export default EVM;
