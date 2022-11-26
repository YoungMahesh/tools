import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tools</title>
        <meta name="description" content="Collection Tools" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-wrap p-4">
        <Box1 link="/crypt"> Crypt </Box1>
        <Box1 link="/evm"> EVM Wallets </Box1>
        <Box1 link="/solana"> Solana Wallets </Box1>
        <Box1 link="/fd"> Fixed Deposit Calculator</Box1>
        <Box1 link="/loan">Loan Calculator</Box1>
      </main>
    </>
  );
};

const Box1 = ({ children, link }: { children: string; link: string }) => {
  return (
    <div className="m-4 p-2">
      <h3>
        <Link href={link}>{children}</Link>
      </h3>
    </div>
  );
};

export default Home;
