import type { NextPage } from "next";
import Head1 from "../components/common/Head1";
import EVMSign from "../components/sign/evmSign";

const Solana: NextPage = () => {
  return (
    <main>
      <Head1 title="Web3 Sign" description="Sign Messages using web3 wallet" />

      <EVMSign />
    </main>
  );
};

export default Solana;
