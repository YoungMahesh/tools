"use client";

import { useState } from "react";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import WalletBox from "@/app/_components/WalletBox";
import { useToast } from "@/app/_components/ToastProvider";
import { SparklesIcon, ArrowPathIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function SolanaSingleWallet() {
  const { showToast } = useToast();
  const [pubkey, setPubkey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [secretKey2, setSecretKey2] = useState("");
  const [privateK, setPrivateK] = useState("");

  const derivePublicKey = async () => {
    if (!privateK.trim()) {
      showToast("Please enter a private key", "error");
      return;
    }
    try {
      let _secKey: Uint8Array = new Uint8Array([]);
      const trimmed = privateK.trim();
      if (trimmed[0] !== "[") {
        _secKey = bs58.decode(trimmed);
      } else {
        _secKey = Uint8Array.from(JSON.parse(trimmed));
      }
      const keypair = await Keypair.fromSecretKey(_secKey);
      setPubkey(keypair.publicKey.toString());
      setSecretKey("[" + Array.from(keypair.secretKey).join(",") + "]");
      setSecretKey2(bs58.encode(keypair.secretKey));
      showToast("Derived Solana public key successfully!", "success");
    } catch (err) {
      showToast("Invalid private key (must be Base58 string or Uint8Array JSON)", "error");
      console.error(err);
    }
  };

  const generateKeyPair = async () => {
    try {
      const keypair = await Keypair.generate();
      setPubkey(keypair.publicKey.toString());
      setSecretKey("[" + Array.from(keypair.secretKey).join(",") + "]");
      setSecretKey2(bs58.encode(keypair.secretKey));
      setPrivateK(bs58.encode(keypair.secretKey));
      showToast("Generated new random Solana keypair!", "success");
    } catch (err) {
      showToast("Failed to generate Solana keypair", "error");
      console.error(err);
    }
  };

  const clearFields = () => {
    setPubkey("");
    setSecretKey("");
    setSecretKey2("");
    setPrivateK("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="p-6 rounded-2xl bg-base-100 border border-base-content/10 shadow-sm">
        <h3 className="text-base font-bold text-base-content mb-2">
          Derive from Secret Key
        </h3>
        <p className="text-xs text-base-content/60 mb-5">
          Enter a Base58-encoded secret key or a byte array like <code className="text-primary font-mono">[12, 45, ...]</code>, or generate a fresh keypair.
        </p>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Base58 secret key or [uint8array...]"
              className="input input-bordered w-full font-mono text-xs pr-10 rounded-xl bg-base-200/50 focus:bg-base-100 focus:border-primary"
              value={privateK}
              onChange={(e) => setPrivateK(e.target.value)}
            />
            {privateK && (
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
              <span>Derive Public Key</span>
            </button>
            <button
              type="button"
              className="btn btn-neutral btn-sm rounded-xl gap-1.5"
              onClick={generateKeyPair}
            >
              <SparklesIcon className="w-4 h-4" />
              <span>Generate Random</span>
            </button>
            {privateK && (
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

        {pubkey && (
          <div className="mt-6 pt-6 border-t border-base-content/10">
            <h4 className="text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-2">
              Resulting Solana Wallet
            </h4>
            <WalletBox
              publicKey={pubkey}
              privateKey={secretKey}
              privateKey2={secretKey2}
            />
          </div>
        )}
      </div>
    </div>
  );
}
