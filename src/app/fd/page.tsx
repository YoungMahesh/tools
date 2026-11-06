import type { Metadata } from "next";
import FDCalculator from "./_components/FDCalculator";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Fixed Deposit Calculator",
  description: "Calculate compound interest growth, annual returns, and final maturity balance for fixed deposits and savings.",
};

export default function FDPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3">
          <CurrencyDollarIcon className="w-4 h-4" />
          <span>Compound Growth</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-base-content tracking-tight mb-2">
          Fixed Deposit Calculator
        </h1>
        <p className="text-sm text-base-content/70 max-w-xl mx-auto">
          Simulate compound growth on your investments. View year-by-year interest accrual and total maturity payout.
        </p>
      </div>

      <FDCalculator />
    </main>
  );
}
