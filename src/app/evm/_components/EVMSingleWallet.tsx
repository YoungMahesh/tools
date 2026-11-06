"use client";

import { useState } from "react";
import { Wallet } from "ethers";
import WalletBox from "@/app/_components/WalletBox";
import { useToast } from "@/app/_components/ToastProvider";
import { SparklesIcon, ArrowPathIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function EVMSingleWallet() {
  const { showToast } = useToast();
  const [inputPriKey, setInputPriKey] = useState("");
  const [privateK, setPrivateK] = useState("");
  const [publicK, setPublicK] = useState("");

  const derivePublicKey = () => {
    if (!inputPriKey.trim()) {
      showToast("Please enter a private key", "error");
      return;
    }
    try {
      const wallet = new Wallet(inputPriKey.trim());
      setPublicK(wallet.address);
      setPrivateK(wallet.privateKey);
      showToast("Derived public address successfully!", "success");
    } catch (err) {
      showToast("Invalid private key format", "error");
      console.error(err);
    }
  };

  const generateKeyPair = () => {
    try {
      const keypair = Wallet.createRandom();
      setInputPriKey(keypair.privateKey);
      setPublicK(keypair.address);
      setPrivateK(keypair.privateKey);
      showToast("Generated new random EVM keypair!", "success");
    } catch (err) {
      showToast("Failed to generate keypair", "error");
      console.error(err);
    }
  };

  const clearFields = () => {
    setInputPriKey("");
    setPrivateK("");
    setPublicK("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="p-6 rounded-2xl bg-base-100 border border-base-content/10 shadow-sm">
        <h3 className="text-base font-bold text-base-content mb-2">
          Derive from Private Key
        </h3>
        <p className="text-xs text-base-content/60 mb-5">
          Enter an existing 64-character hex private key (with or without 0x) or generate a new cryptographically random keypair.
        </p>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="0x... Private key"
              className="input input-bordered w-full font-mono text-xs pr-10 rounded-xl bg-base-200/50 focus:bg-base-100 focus:border-primary"
              value={inputPriKey}
              onChange={(e) => setInputPriKey(e.target.value)}
            />
            {inputPriKey && (
              <button
                type="button"
                onClick={clearFields}
                className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-ghost btn-xs btn-circle text-base-content/50 hover:text-base-content"
                aria-label="Clear input"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="btn btn-primary btn-sm rounded-xl gap-1.5"
              onClick={derivePublicKey}
            >
              <ArrowPathIcon className="w-4 h-4" />
              <span>Derive Address</span>
            </button>
            <button
              type="button"
              className="btn btn-neutral btn-sm rounded-xl gap-1.5"
              onClick={generateKeyPair}
            >
              <SparklesIcon className="w-4 h-4" />
              <span>Generate Random</span>
            </button>
            {inputPriKey && (
              <button
                type="button"
                className="btn btn-ghost btn-sm rounded-xl text-base-content/60"
                onClick={clearFields}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {publicK && (
          <div className="mt-6 pt-6 border-t border-base-content/10">
            <h4 className="text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-2">
              Resulting Wallet
            </h4>
            <WalletBox publicKey={publicK} privateKey={privateK} />
          </div>
        )}
      </div>
    </div>
  );
}
