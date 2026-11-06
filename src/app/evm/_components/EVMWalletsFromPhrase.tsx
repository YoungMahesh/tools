"use client";

import { useState } from "react";
import { HDNodeWallet, Wallet } from "ethers";
import WalletBox from "@/app/_components/WalletBox";
import { useToast } from "@/app/_components/ToastProvider";
import {
  SparklesIcon,
  ArrowPathIcon,
  ClipboardDocumentIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function EVMWalletsFromPhrase() {
  const { showToast } = useToast();
  const [seedPhrase, setSeedPhrase] = useState("");
  const [seedPhr1, setSeedPhr1] = useState("");
  const [walletsArr, setWalletsArr] = useState<
    { pubAddr: string; privKey: string }[]
  >([]);
  const [isGeneratingWallets, setIsGeneratingWallets] = useState(false);
  const [copiedMnemonic, setCopiedMnemonic] = useState(false);
  const [walletCount, setWalletCount] = useState(5);

  const deriveWallets = async () => {
    if (!seedPhrase.trim()) {
      showToast("Please enter a mnemonic seed phrase", "error");
      return;
    }

    setWalletsArr([]);
    setIsGeneratingWallets(true);

    try {
      const _walletsArr: { pubAddr: string; privKey: string }[] = [];
      const cleanPhrase = seedPhrase.trim();

      for (let i = 0; i < walletCount; i++) {
        const wallet = HDNodeWallet.fromPhrase(
          cleanPhrase,
          undefined,
          `m/44'/60'/0'/0/${i}`
        );
        _walletsArr.push({
          pubAddr: wallet.address,
          privKey: wallet.privateKey,
        });
      }
      setSeedPhr1(cleanPhrase);
      setWalletsArr(_walletsArr);
      showToast(`Derived ${walletCount} EVM accounts successfully!`, "success");
    } catch (err) {
      showToast("Invalid seed phrase (must be standard BIP-39 mnemonic)", "error");
      console.error(err);
    }
    setIsGeneratingWallets(false);
  };

  const generateSeedPhrase = () => {
    try {
      const randomWallet = Wallet.createRandom();
      if (randomWallet.mnemonic) {
        setSeedPhrase(randomWallet.mnemonic.phrase);
        showToast("Generated new 12-word seed phrase!", "success");
      }
    } catch (err) {
      showToast("Failed to generate seed phrase", "error");
      console.error(err);
    }
  };

  const copyPhrase = () => {
    navigator.clipboard.writeText(seedPhr1 || seedPhrase);
    setCopiedMnemonic(true);
    showToast("Copied seed phrase to clipboard!", "success");
    setTimeout(() => setCopiedMnemonic(false), 2000);
  };

  const clearFields = () => {
    setSeedPhrase("");
    setSeedPhr1("");
    setWalletsArr([]);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="p-6 rounded-2xl bg-base-100 border border-base-content/10 shadow-sm">
        <h3 className="text-base font-bold text-base-content mb-2">
          HD Wallets from Seed Phrase
        </h3>
        <p className="text-xs text-base-content/60 mb-5">
          Enter a 12 or 24-word BIP-39 seed phrase to derive standard Ethereum hierarchy accounts (path:{" "}
          <code className="text-primary font-mono">m/44&apos;/60&apos;/0&apos;/0/i</code>).
        </p>

        <div className="space-y-4">
          <div className="relative">
            <textarea
              rows={3}
              placeholder="Enter 12 or 24 words separated by spaces (e.g., apple banana cherry ...)"
              className="textarea textarea-bordered w-full font-mono text-xs rounded-xl bg-base-200/50 focus:bg-base-100 focus:border-primary"
              value={seedPhrase}
              onChange={(e) => setSeedPhrase(e.target.value)}
            />
            {seedPhrase && (
              <button
                type="button"
                onClick={clearFields}
                className="absolute right-3 top-3 btn btn-ghost btn-xs btn-circle text-base-content/50 hover:text-base-content"
                aria-label="Clear seed phrase"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="btn btn-primary btn-sm rounded-xl gap-1.5"
                onClick={deriveWallets}
                disabled={isGeneratingWallets}
              >
                <ArrowPathIcon
                  className={`w-4 h-4 ${isGeneratingWallets ? "animate-spin" : ""}`}
                />
                <span>Derive Accounts</span>
              </button>
              <button
                type="button"
                className="btn btn-neutral btn-sm rounded-xl gap-1.5"
                onClick={generateSeedPhrase}
              >
                <SparklesIcon className="w-4 h-4" />
                <span>Generate Mnemonic</span>
              </button>
              {seedPhrase && (
                <button
                  type="button"
                  className="btn btn-ghost btn-sm rounded-xl text-base-content/60"
                  onClick={clearFields}
                >
                  Clear
                </button>
              )}
            </div>

            {/* Account Count selector */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-base-content/70">Accounts:</span>
              <select
                className="select select-bordered select-xs rounded-lg bg-base-200"
                value={walletCount}
                onChange={(e) => setWalletCount(Number(e.target.value))}
              >
                <option value={5}>5 accounts</option>
                <option value={10}>10 accounts</option>
                <option value={20}>20 accounts</option>
              </select>
            </div>
          </div>
        </div>

        {isGeneratingWallets && (
          <div className="flex flex-col items-center justify-center py-8">
            <span className="loading loading-spinner loading-md text-primary" />
            <p className="text-xs text-base-content/60 mt-2">
              Deriving cryptographic keypairs...
            </p>
          </div>
        )}

        {walletsArr.length > 0 && !isGeneratingWallets && (
          <div className="mt-8 pt-6 border-t border-base-content/10">
            {/* Active Seed Phrase Banner */}
            <div className="p-4 rounded-xl bg-base-200/70 border border-base-content/10 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-base-content/70 uppercase tracking-wider">
                  Active Seed Phrase
                </span>
                <button
                  type="button"
                  onClick={copyPhrase}
                  className="btn btn-ghost btn-xs gap-1 text-xs hover:text-primary transition-colors"
                >
                  {copiedMnemonic ? (
                    <>
                      <CheckIcon className="w-3.5 h-3.5 text-success" />
                      <span className="text-success font-medium">Copied</span>
                    </>
                  ) : (
                    <>
                      <ClipboardDocumentIcon className="w-3.5 h-3.5" />
                      <span>Copy Phrase</span>
                    </>
                  )}
                </button>
              </div>
              <p className="font-mono text-xs text-base-content font-medium break-words bg-base-100 p-2.5 rounded-lg border border-base-content/5">
                {seedPhr1}
              </p>
            </div>

            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-base-content/70">
                Derived Accounts ({walletsArr.length})
              </h4>
            </div>

            <div className="space-y-3">
              {walletsArr.map((wallet, index) => (
                <WalletBox
                  key={index}
                  publicKey={wallet.pubAddr}
                  privateKey={wallet.privKey}
                  title={`Account #${index + 1} (index: ${index})`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
