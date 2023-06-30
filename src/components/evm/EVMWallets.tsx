import { useState } from "react";
import { Wallet } from "ethers";
import KeyBox from "../common/KeyBox";

export default function EVMWallets() {
  const [pubkey, setPubkey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [privateK, setPrivateK] = useState("");
  const [publicK, setPublicK] = useState("");

  const derivePublicKey = () => {
    try {
      const wallet = new Wallet(privateK);
      setPublicK(wallet.address);
    } catch (err) {
      alert("Invalid private key");
    }
  };

  const generateKeyPair = () => {
    const keypair = Wallet.createRandom();

    setPubkey(keypair.address);
    setSecretKey(keypair.privateKey);
  };

  return (
    <section className="grid w-screen place-content-center">
      <div className="m-2 rounded border p-1">
        <div className="mb-5 flex justify-center">
          <button className="btn-primary btn" onClick={generateKeyPair}>
            Generate New
          </button>
        </div>
        {pubkey.length ? (
          <div className="flex flex-wrap">
            <KeyBox title1="Public Key: " value1={pubkey} />
            <KeyBox title1="Private Key: " value1={secretKey} />
          </div>
        ) : null}
      </div>

      <div className="m-2 rounded border p-1">
        <div className="mb-5 flex flex-wrap items-center justify-center">
          <input
            type="text"
            placeholder="Private Key"
            className="input-bordered input-primary input w-full"
            value={privateK}
            onChange={(e) => setPrivateK(e.target.value)}
          />
          <button className="btn-primary btn m-1" onClick={derivePublicKey}>
            Get Public Key
          </button>
        </div>
        <div className="flex ">
          {publicK.length ? (
            <KeyBox title1="Public Key: " value1={publicK} />
          ) : null}
        </div>
      </div>
    </section>
  );
}
