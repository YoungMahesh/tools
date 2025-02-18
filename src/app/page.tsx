import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-wrap justify-center p-4">
      <Box1 link="/crypt"> Crypt </Box1>
      <Box1 link="/evm"> EVM Wallets </Box1>
      <Box1 link="/solana"> Solana Wallets </Box1>
      <Box1 link="/fd"> Fixed Deposit Calculator</Box1>
      <Box1 link="/loan">Loan Calculator</Box1>
      <Box1 link="/converter">Coverter</Box1>
      <Box1 link="/hex">Hex Coverter</Box1>
      <Box1 link="/sign">Web3 Sign</Box1>
    </main>
  );
}

const Box1 = ({ children, link }: { children: string; link: string }) => {
  return (
    <div className="m-4 p-2">
      <h3>
        <Link href={link}>{children}</Link>
      </h3>
    </div>
  );
};
