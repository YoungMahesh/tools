import { Wallet } from "ethers";
import { useState } from "react";
import KeyBox from "../common/KeyBox";

export default function SectionBox({
  generateFun,
  arr1,
}: {
  generateFun: () => void;
  arr1: { title1: string; value1: string }[];
}) {
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

  return (
    <section className="grid w-screen place-content-center">
      <div className="m-2 rounded border p-1">
        <div className="mb-5 flex justify-center">
          <button className="btn-primary btn" onClick={generateFun}>
            Generate New
          </button>
        </div>
        <div className="flex flex-wrap">
          {arr1.map((obj1, idx) => (
            <KeyBox key={idx} title1={obj1.title1} value1={obj1.value1} />
          ))}
        </div>
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
