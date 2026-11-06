"use client";

import { useState } from "react";
import SolanaSingleWallet from "./SolanaSingleWallet";
import SolanaWalletsFromSeedPhrase from "./SolanaWalletsFromSeedPhrase";
import { KeyIcon, RectangleStackIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

export default function SolanaWallets() {
  const [tabIdx, setTabIdx] = useState<0 | 1>(0);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3">
          <ShieldCheckIcon className="w-4 h-4" />
          <span>Client-Side Cryptography</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-base-content tracking-tight mb-2">
          Solana Wallet Generator
        </h1>
        <p className="text-sm text-base-content/70 max-w-xl mx-auto">
          Generate random Solana Ed25519 keypairs or restore Phantom/Solflare-compatible accounts from a BIP-39 seed phrase.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1 rounded-2xl bg-base-200 border border-base-content/10">
          <button
            type="button"
            onClick={() => setTabIdx(0)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              tabIdx === 0
                ? "bg-primary text-primary-content shadow-sm"
                : "text-base-content/70 hover:text-base-content hover:bg-base-300/50"
            }`}
          >
            <KeyIcon className="w-4 h-4" />
            <span>Single Keypair</span>
          </button>
          <button
            type="button"
            onClick={() => setTabIdx(1)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              tabIdx === 1
                ? "bg-primary text-primary-content shadow-sm"
                : "text-base-content/70 hover:text-base-content hover:bg-base-300/50"
            }`}
          >
            <RectangleStackIcon className="w-4 h-4" />
            <span>Seed Phrase (HD Wallets)</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="transition-all duration-200">
        {tabIdx === 0 ? <SolanaSingleWallet /> : <SolanaWalletsFromSeedPhrase />}
      </div>
    </main>
  );
}
