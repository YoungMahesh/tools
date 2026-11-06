import type { Metadata } from "next";
import Loan from "./_components/Loan";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Loan Repayment Calculator",
  description: "Calculate loan repayment schedules, EMI payoff duration, interest debits, and total cost of borrowing.",
};

export default function LoanPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3">
          <CurrencyDollarIcon className="w-4 h-4" />
          <span>Debt Amortization</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-base-content tracking-tight mb-2">
          Loan Repayment Calculator
        </h1>
        <p className="text-sm text-base-content/70 max-w-xl mx-auto">
          Determine the exact duration and total interest needed to pay off a loan given your custom EMI payment.
        </p>
      </div>

      <Loan />
    </main>
  );
}
