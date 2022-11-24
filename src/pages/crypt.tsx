import { useState } from "react";

import InputForm from "../components/InputForm";
import OutputForm from "../components/OutputForm";
import Head from "next/head";

const Crypt = () => {
  const [message1, setMessage1] = useState<string>("");
  const [resultText, updateResultText] = useState<string>("");
  const [activeTab, setActiveTab] = useState<1 | 2>(1);

  return (
    <main>
      <Head>
        <title>Encrypt-Decrypt Text</title>
      </Head>

      <div className="tabs tabs-boxed">
        <a
          onClick={() => setActiveTab(1)}
          className={`tab ${activeTab === 1 ? "tab-active" : ""}`}
        >
          Input
        </a>
        <a
          onClick={() => setActiveTab(2)}
          className={`tab ${activeTab === 2 ? "tab-active" : ""}`}
        >
          Result
        </a>
      </div>

      <p>{message1}</p>

      <InputForm
        updateResultText={updateResultText}
        setMessage1={setMessage1}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <OutputForm

        resultText={resultText}
        activeTab={activeTab}
      />
    </main>
  );
};

export default Crypt;
