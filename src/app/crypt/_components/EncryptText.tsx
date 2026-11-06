"use client";

import { useState } from "react";
import InputForm from "./InputForm";
import OutputBox from "./OutputBox";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default function EncryptText() {
  const [message1, setMessage1] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resultText, updateResultText] = useState<string>("");

  return (
    <div className="w-full">
      <InputForm
        updateResultText={updateResultText}
        setMessage1={setMessage1}
        setIsLoading={setIsLoading}
      />

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-6">
          <span className="loading loading-spinner loading-md text-primary" />
          <p className="text-xs text-base-content/60 mt-2">
            Computing cryptographic cipher...
          </p>
        </div>
      )}

      {message1 && !isLoading && (
        <div className="alert alert-error text-xs rounded-xl mt-4 shadow-sm">
          <ExclamationCircleIcon className="w-4 h-4 shrink-0" />
          <span>{message1}</span>
        </div>
      )}

      {!isLoading && <OutputBox resultText={resultText} />}
    </div>
  );
}
