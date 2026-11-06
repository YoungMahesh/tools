"use client";

import { useState } from "react";
import { useToast } from "@/app/_components/ToastProvider";
import {
  LockClosedIcon,
  LockOpenIcon,
  EyeIcon,
  EyeSlashIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

interface ListProps {
  updateResultText: (result: string) => void;
  setMessage1: (message: string) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export default function InputForm({
  updateResultText,
  setMessage1,
  setIsLoading,
}: ListProps) {
  const { showToast } = useToast();
  const [inputText, updateInputText] = useState<string>("");
  const [password, updatePassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const cryptText = async (type: "encrypt" | "decrypt") => {
    setMessage1("");
    if (!inputText.trim()) {
      showToast("Please enter text to encrypt or decrypt", "error");
      return;
    }
    if (!password) {
      showToast("Please enter a secret passphrase", "error");
      return;
    }

    setIsLoading(true);
    updateResultText("");

    try {
      const dataObj = {
        type: type,
        text: inputText,
        password: password,
      };

      const resp0 = await fetch(`/api/crypt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataObj),
      });

      if (!resp0.ok) {
        setIsLoading(false);
        const errDesc =
          type === "decrypt"
            ? "Decryption failed: Incorrect passphrase or corrupted ciphertext"
            : "Encryption failed";
        setMessage1(errDesc);
        showToast(errDesc, "error");
        return;
      }

      const resp1 = await resp0.json();
      updateResultText(resp1.result);
      showToast(
        type === "encrypt" ? "Text encrypted successfully!" : "Text decrypted successfully!",
        "success"
      );
    } catch (err) {
      console.error(err);
      showToast("An unexpected error occurred", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    updateInputText("");
    updatePassword("");
    updateResultText("");
    setMessage1("");
    showToast("Cleared inputs", "info");
  };

  return (
    <div className="w-full p-6 rounded-2xl bg-base-100 border border-base-content/10 shadow-sm">
      <div className="space-y-4">
        {/* Text Area */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-base-content/70">
              Input Text / Ciphertext
            </label>
            <span className="text-[11px] text-base-content/40 font-mono">
              {inputText.length} characters
            </span>
          </div>
          <textarea
            className="textarea textarea-bordered w-full font-mono text-xs sm:text-sm rounded-xl bg-base-200/50 focus:bg-base-100 focus:border-primary leading-relaxed"
            placeholder="Type or paste text to encrypt, or hex ciphertext to decrypt..."
            rows={6}
            value={inputText}
            onChange={(e) => updateInputText(e.target.value)}
          />
        </div>

        {/* Passphrase Input */}
        <div>
          <label className="block text-xs font-semibold text-base-content/70 mb-1.5">
            Secret Passphrase
          </label>
          <div className="relative">
            <input
              className="input input-bordered w-full pr-10 text-sm rounded-xl bg-base-200/50 focus:bg-base-100 focus:border-primary font-mono"
              placeholder="Enter encryption passphrase"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => updatePassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeSlashIcon className="w-4 h-4" />
              ) : (
                <EyeIcon className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="btn btn-primary btn-sm rounded-xl gap-1.5"
              onClick={() => cryptText("encrypt")}
            >
              <LockClosedIcon className="w-4 h-4" />
              <span>Encrypt</span>
            </button>

            <button
              type="button"
              className="btn btn-neutral btn-sm rounded-xl gap-1.5"
              onClick={() => cryptText("decrypt")}
            >
              <LockOpenIcon className="w-4 h-4" />
              <span>Decrypt</span>
            </button>
          </div>

          {(inputText || password) && (
            <button
              type="button"
              className="btn btn-ghost btn-sm rounded-xl text-base-content/60 gap-1"
              onClick={handleClear}
            >
              <TrashIcon className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
