import { useState } from "react";
import { Wallet } from "ethers";
import WalletBox from "./WalletBox";

export default function EVMWallets() {
  const [inputPriKey, setInputPriKey] = useState("");
  const [privateK, setPrivateK] = useState("");
  const [publicK, setPublicK] = useState("");

  const derivePublicKey = () => {
    try {
      const wallet = new Wallet(inputPriKey);
      setPublicK(wallet.address);
      setPrivateK(wallet.privateKey);
    } catch (err) {
      alert("Invalid private key");
    }
  };

  const generateKeyPair = () => {
    const keypair = Wallet.createRandom();
    setInputPriKey(keypair.privateKey);
  };

  return (
    <section className="grid w-screen place-content-center">
      <div className="m-2 p-1">
        <h3>Wallet from Private Key</h3>
        <div className="mb-5 flex flex-wrap items-center justify-center">
          <input
            type="text"
            placeholder="Private Key"
            className="input-bordered input-primary input w-full"
            value={inputPriKey}
            onChange={(e) => setInputPriKey(e.target.value)}
          />
          <button className="btn-primary btn" onClick={generateKeyPair}>
            Generate New
          </button>

          <button className="btn-primary btn m-1" onClick={derivePublicKey}>
            Get Public Key
          </button>
        </div>
        <div className="flex ">
          {publicK.length ? (
            <WalletBox publicKey={publicK} privateKey={privateK} />
          ) : null}
        </div>
      </div>
    </section>
  );
}
