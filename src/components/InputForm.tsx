import { useState } from "react";

interface ListProps {
  updateResultText: Function;
  setMessage1: Function;
  setIsLoading: Function;
}

const InputForm = ({
  updateResultText,
  setMessage1,
  setIsLoading,
}: ListProps) => {
  const [inputText, updateInputText] = useState<string>("");
  const [password, updatePassword] = useState<string>("");

  const cryptText = async (type: string) => {
    setMessage1("");
    if (inputText.length === 0 || password.length === 0) {
      return setMessage1("Text or Password should not be empty");
    }

    setIsLoading(true);
    updateResultText("");

    const dataObj = {
      type: type,
      text: inputText,
      password: password,
    };

    const resp0 = await fetch(`/api/crypt`, {
      method: "POST",
      body: JSON.stringify(dataObj),
    });

    if (resp0.status === 400) {
      setIsLoading(false);
      return setMessage1("Text and Password combination is wrong");
    }

    const resp1 = await resp0.json();
    updateResultText(resp1.result);
    setIsLoading(false);
  };

  return (
    <div>
      <div className="form-control">
        <textarea
          className="textarea-primary textarea mb-2 w-full md:w-96"
          placeholder="Text to Encrypt/Decrypt"
          rows={10}
          value={inputText}
          onChange={(e) => updateInputText(e.target.value)}
        ></textarea>

        <input
          className="input-bordered input-primary input"
          placeholder="Password"
          type="text"
          value={password}
          onChange={(e) => updatePassword(e.target.value)}
        />
      </div>

      <div>
        <button
          className="btn-primary btn mt-2 mr-2"
          onClick={() => cryptText("encrypt")}
        >
          Encrypt{" "}
        </button>

        <button
          className="btn-primary btn mt-2 mr-2"
          onClick={() => cryptText("decrypt")}
        >
          Decrypt{" "}
        </button>

        <button
          className="btn-primary btn mt-2"
          onClick={() => {
            updateInputText("");
            updatePassword("");
            updateResultText("");
            setMessage1("");
          }}
        >
          Clear{" "}
        </button>
      </div>
    </div>
  );
};

export default InputForm;
