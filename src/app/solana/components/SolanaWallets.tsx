'use client'
import { useState } from "react";
import SolanaSingleWallet from "./SolanaSingleWallet";
import SolanaWalletsFromSeedPhrase from "./SolanaWalletsFromSeedPhrase";

export default function SolanaWallets() {
  const [tabIdx, setTabIdx] = useState(0);
  return (
    <main>
      <div className="mx-auto mb-10 w-full max-w-md">
        <div role="tablist" className="tabs tabs-boxed">
          <a
            role="tab"
            className={`tab text-lg ${tabIdx === 0 ? "tab-active" : ""} no-underline`}
            onClick={() => setTabIdx(0)}
          >
            Single Wallet
          </a>
          <a
            role="tab"
            className={`tab text-lg ${tabIdx === 1 ? "tab-active" : ""} no-underline`}
            onClick={() => setTabIdx(1)}
          >
            Seed Phrase
          </a>
        </div>
      </div>

      {tabIdx === 0 && <SolanaSingleWallet />}
      {tabIdx === 1 && <SolanaWalletsFromSeedPhrase />}
    </main>
  );
}
