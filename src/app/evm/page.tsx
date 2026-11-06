"use client";

import { useState } from "react";
import EVMSingleWallet from "./_components/EVMSingleWallet";
import EVMWalletsFromPhrase from "./_components/EVMWalletsFromPhrase";
import { KeyIcon, RectangleStackIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

export default function EVM() {
  const [activeTab, setActiveTab] = useState<"single" | "phrase">("single");

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3">
          <ShieldCheckIcon className="w-4 h-4" />
          <span>Client-Side Cryptography</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-base-content tracking-tight mb-2">
          EVM Wallet Generator
        </h1>
        <p className="text-sm text-base-content/70 max-w-xl mx-auto">
          Generate or inspect Ethereum / Metamask-compatible wallets using private keys or BIP-39 mnemonic seed phrases.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1 rounded-2xl bg-base-200 border border-base-content/10">
          <button
            type="button"
            onClick={() => setActiveTab("single")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "single"
                ? "bg-primary text-primary-content shadow-sm"
                : "text-base-content/70 hover:text-base-content hover:bg-base-300/50"
            }`}
          >
            <KeyIcon className="w-4 h-4" />
            <span>Single Private Key</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("phrase")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "phrase"
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
        {activeTab === "single" ? <EVMSingleWallet /> : <EVMWalletsFromPhrase />}
      </div>
    </main>
  );
}
