import { useState } from "react";
import { Keypair } from "@solana/web3.js";
import { base58 } from "ethers/lib/utils";
import KeyBox from "../common/KeyBox";

export default function SolanaWallets() {
  const [pubkey, setPubkey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [secretKey2, setSecretKey2] = useState("");

  const [privateK, setPrivateK] = useState("");

  const derivePublicKey = () => {
    try {
      let _secKey = new Uint8Array([]);
      if (privateK[0] !== "[") {
        _secKey = base58.decode(privateK.trim());
      } else {
        _secKey = Uint8Array.from(JSON.parse(privateK.trim()));
      }
      const keypair = Keypair.fromSecretKey(_secKey);
      setPubkey(keypair.publicKey.toString());
      setSecretKey("[" + keypair.secretKey + "]");
      setSecretKey2(base58.encode(keypair.secretKey));
    } catch (err) {
      alert("Invalid private key");
    }
  };

  const generateKeyPair = () => {
    const keypair = Keypair.generate();

    setPubkey(keypair.publicKey.toString());
    setSecretKey("[" + keypair.secretKey + "]");
    setSecretKey2(base58.encode(keypair.secretKey));
  };

  const clearFields = () => {
    setPubkey("");
    setSecretKey("");
    setSecretKey2("");
    setPrivateK("");
  };

  return (
    <section className="grid w-screen place-content-center">
      <div className="mb-4 items-center justify-center">
        <input
          type="text"
          placeholder="Secret Key"
          className="input-bordered input-primary input w-full"
          value={privateK}
          onChange={(e) => setPrivateK(e.target.value)}
        />
        <div className="flex flex-wrap justify-center">
          <button className="btn-primary btn m-2" onClick={derivePublicKey}>
            Get Public Key
          </button>
          <button className="btn-primary btn m-2" onClick={generateKeyPair}>
            Generate New
          </button>
          <button className="btn-primary btn m-2" onClick={clearFields}>
            Clear
          </button>
        </div>
      </div>
      <div className="flex flex-wrap">
        {pubkey.length
          ? [
              { title1: "Public Key: ", value1: pubkey },
              { title1: "Secret Key (Uint8Array): ", value1: secretKey },
              { title1: "Secret Key (Base58): ", value1: secretKey2 },
            ].map((obj1, idx) => (
              <KeyBox key={idx} title1={obj1.title1} value1={obj1.value1} />
            ))
          : null}
      </div>
    </section>
  );
}
