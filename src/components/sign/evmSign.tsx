import { useState } from "react";
import KeyBox from "../common/KeyBox";
import {
  ThirdwebProvider,
  ChainId,
  ConnectWallet,
  useSigner,
} from "@thirdweb-dev/react";

function EVMSign1() {
  const signer = useSigner();

  const [isObject, setIsObject] = useState(false);
  const [inputText, setInputText] = useState("");
  const [signature, setSignature] = useState("");

  const signMessage = async () => {
    try {
      if (!signer) return alert("Wallet is not connected");
      if (!isObject) {
        const _signature = await signer.signMessage(inputText);
        setSignature(_signature);
      } else {
        let parsedMessage;
        try {
          parsedMessage = await JSON.parse(inputText);
        } catch (err) {
          alert("Invalid Javascript/JSON Object");
        }

        const _signature = await signer.signMessage(
          JSON.stringify(parsedMessage)
        );
        setSignature(_signature);
      }
    } catch (err) {
      alert("Got Error while signing message");
      console.log(err);
    }
  };

  const pasteText = async () => {
    const text = await navigator.clipboard.readText();
    setInputText(text);
  };

  const clearFields = () => {
    setInputText("");
    setSignature("");
  };

  return (
    <section className="grid w-screen place-content-center">
      <h2>EVM Signature</h2>
      <div className="flex">
        <ConnectWallet accentColor="black" />
      </div>
      <div className="mb-4 items-center justify-center">
        <div className="flex flex-col">
          <b>Input Format: &nbsp; &nbsp;</b>

          <Input1
            name="Message/String"
            onChange={() => setIsObject(false)}
            checked={!isObject}
          />
          <Input1
            name="Javascript-Object/JSON-Object"
            onChange={() => setIsObject(true)}
            checked={isObject}
          />
        </div>
        <textarea
          className="textarea-primary textarea mb-2 w-full md:w-96"
          placeholder={isObject ? "Javascript/JSON Object" : "Message"}
          rows={10}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>

        <div className="flex flex-wrap">
          <button
            className="btn-outline btn-primary btn m-2"
            onClick={pasteText}
          >
            Paste
          </button>
          <button className="btn-primary btn m-2" onClick={signMessage}>
            Sign Message
          </button>
          <button
            className="btn-outline btn-primary btn m-2"
            onClick={clearFields}
          >
            Clear
          </button>
        </div>
      </div>
      <div className="flex flex-wrap">
        {signature.length
          ? [{ title1: "Signature: ", value1: signature }].map((obj1, idx) => (
              <KeyBox key={idx} title1={obj1.title1} value1={obj1.value1} />
            ))
          : null}
      </div>
    </section>
  );
}

const Input1 = ({
  name,
  onChange,
  checked,
}: {
  name: string;
  onChange: () => void;
  checked: boolean;
}) => (
  <div className="form-control ">
    <label className="label w-fit cursor-pointer">
      <input
        type="radio"
        name="radio-10"
        className="radio checked:bg-green-500"
        onChange={onChange}
        checked={checked}
      />
      <span className="label-text ml-2">{name}</span>
    </label>
  </div>
);

const desiredChainId = ChainId.Mumbai;
export default function EVMSign() {
  return (
    <ThirdwebProvider desiredChainId={desiredChainId}>
      <EVMSign1 />
    </ThirdwebProvider>
  );
}
