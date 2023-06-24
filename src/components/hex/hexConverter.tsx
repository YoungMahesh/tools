import { useState } from "react";
import copy from "copy-to-clipboard";

export default function HexConverter() {
  const [num1, setNum1] = useState(0);
  const [isPaddedHex, setIsPaddedHex] = useState(false);
  const [cHex1, setCHex1] = useState("");

  const [hex1, setHex1] = useState("");
  const [cNum, setCNum] = useState("");

  const hexStrToNumber = () => {
    const num = parseInt(hex1, 16);
    setCNum(num.toString());
  };

  const numberToHexStr = () => {
    const hexStr = num1.toString(16);
    if (isPaddedHex) {
      const paddedHex = hexStr.padStart(64, "0");
      return setCHex1(paddedHex);
    }
    setCHex1(hexStr);
  };

  return (
    <div className="flex w-full flex-wrap justify-around">
      <section className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Convert Number to Hex-String</h2>
          <input
            type="number"
            placeholder="Number"
            className="input-bordered input w-full max-w-xs"
            value={num1}
            onChange={(e) => setNum1(parseInt(e.target.value))}
          />
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">64 hex characters</span>
              <input
                type="checkbox"
                checked={isPaddedHex}
                className="checkbox-primary checkbox"
                onChange={(e) => setIsPaddedHex(e.target.checked)}
              />
            </label>
          </div>
          <div className="card-actions justify-end">
            <button onClick={numberToHexStr} className="btn-primary btn">
              Convert
            </button>
          </div>
          {cHex1.length ? (
            <div className="flex flex-wrap items-center">
              <p>{cHex1}</p>
              <button
                onClick={() => {
                  copy(cHex1);
                }}
                className="btn-outline btn-primary btn"
              >
                Copy
              </button>
            </div>
          ) : null}
        </div>
      </section>

      <section className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Convert Hex-string to Number</h2>
          <input
            type="string"
            placeholder="Hex-string"
            className="input-bordered input w-full max-w-xs"
            value={hex1}
            onChange={(e) => setHex1(e.target.value)}
          />
          <div className="card-actions justify-end">
            <button onClick={hexStrToNumber} className="btn-primary btn">
              Convert
            </button>
          </div>
          {cNum.length ? (
            <div className="flex flex-wrap items-center">
              <p>{cNum}</p>
              <button
                onClick={() => {
                  copy(cNum);
                }}
                className="btn-outline btn-primary btn"
              >
                Copy
              </button>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
