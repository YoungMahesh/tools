"use client";

import { useState } from "react";
import TimeConverter from "./_components/TimeConverter";
import HexConverter from "./_components/HexConverter";
import { ClockIcon, CodeBracketIcon, ArrowsRightLeftIcon } from "@heroicons/react/24/outline";

export default function ConverterPage() {
  const [activeTab, setActiveTab] = useState<"time" | "hex">("time");

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3">
          <ArrowsRightLeftIcon className="w-4 h-4" />
          <span>Bi-directional Converters</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-base-content tracking-tight mb-2">
          Format & Data Converter
        </h1>
        <p className="text-sm text-base-content/70 max-w-xl mx-auto">
          Convert between Unix Epoch timestamps and human calendar dates, or convert between decimal integers and hex strings.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1 rounded-2xl bg-base-200 border border-base-content/10">
          <button
            type="button"
            onClick={() => setActiveTab("time")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "time"
                ? "bg-primary text-primary-content shadow-sm"
                : "text-base-content/70 hover:text-base-content hover:bg-base-300/50"
            }`}
          >
            <ClockIcon className="w-4 h-4" />
            <span>Unix Timestamp</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("hex")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "hex"
                ? "bg-primary text-primary-content shadow-sm"
                : "text-base-content/70 hover:text-base-content hover:bg-base-300/50"
            }`}
          >
            <CodeBracketIcon className="w-4 h-4" />
            <span>Hex & Decimal</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="transition-all duration-200">
        {activeTab === "time" ? <TimeConverter /> : <HexConverter />}
      </div>
    </main>
  );
}
