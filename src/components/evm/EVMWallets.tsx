import { useState } from "react";
import SectionBox from "./SectionBox";
import { Wallet } from "ethers";

export default function EVMWallets() {
  const [pubkey, setPubkey] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const generateKeyPair = () => {
    const keypair = Wallet.createRandom();

    setPubkey(keypair.address);
    setSecretKey(keypair.privateKey);
  };
  return (
    <SectionBox
      generateFun={generateKeyPair}
      arr1={
        pubkey.length
          ? [
              { title1: "Public Key: ", value1: pubkey },
              { title1: "Private Key: ", value1: secretKey },
            ]
          : []
      }
    />
  );
}
