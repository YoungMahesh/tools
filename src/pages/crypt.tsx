import { useState } from "react";

import InputForm from "../components/crypt/InputForm";
import OutputBox from "../components/crypt/OutputBox";
import Head1 from "../components/common/Head1";

const Crypt = () => {
  const [message1, setMessage1] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resultText, updateResultText] = useState<string>("");

  return (
    <main className="grid place-items-center md:pt-16">
      <Head1 title="Text-Encryption" description="Encryp Decrypt Text" />

      <h2>Encrypt / Decrypt Text</h2>

      <InputForm
        updateResultText={updateResultText}
        setMessage1={setMessage1}
        setIsLoading={setIsLoading}
      />

      {isLoading ? (
        <progress className="progress progress-primary mt-4 w-56"></progress>
      ) : (
        <>
          <p className="mt-4">{message1}</p>
          <OutputBox resultText={resultText} />
        </>
      )}
    </main>
  );
};

export default Crypt;
