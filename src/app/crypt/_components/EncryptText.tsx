"use client";
import { useState } from "react";
import InputForm from "./InputForm";
import OutputBox from "./OutputBox";

export default function EncryptText() {
  const [message1, setMessage1] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resultText, updateResultText] = useState<string>("");

  return (
    <main className="grid place-items-center md:pt-16">
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
}
