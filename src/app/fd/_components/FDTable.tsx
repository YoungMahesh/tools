"use client";

import { FDDataRow } from "../_lib/types";
import {
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

export default function FDTable({ dataArr }: { dataArr: FDDataRow[] }) {
  if (dataArr.length === 0) {
    return null;
  }

  const initialPrincipal = dataArr[0]?.amount || 0;
  const finalRow = dataArr[dataArr.length - 1];
  const finalAmount = finalRow ? finalRow.amount : 0;
  const totalInterest = Math.max(0, finalAmount - initialPrincipal);
  const totalGainPercent = initialPrincipal > 0 ? (totalInterest / initialPrincipal) * 100 : 0;

  const formatCurrency = (val: number) => {
    return val.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="space-y-6">
      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Principal */}
        <div className="p-4 rounded-2xl bg-base-100 border border-base-content/10 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-semibold text-base-content/60 mb-1">
            <CurrencyDollarIcon className="w-4 h-4 text-primary" />
            <span>Principal Invested</span>
          </div>
          <div className="text-lg sm:text-xl font-bold font-mono text-base-content">
            ${formatCurrency(initialPrincipal)}
          </div>
        </div>

        {/* Total Interest */}
        <div className="p-4 rounded-2xl bg-base-100 border border-base-content/10 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-semibold text-base-content/60 mb-1">
            <ArrowTrendingUpIcon className="w-4 h-4 text-success" />
            <span>Total Interest</span>
          </div>
          <div className="text-lg sm:text-xl font-bold font-mono text-success">
            +${formatCurrency(totalInterest)}
          </div>
        </div>

        {/* Maturity Balance */}
        <div className="p-4 rounded-2xl bg-base-100 border border-base-content/10 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-semibold text-base-content/60 mb-1">
            <BanknotesIcon className="w-4 h-4 text-primary" />
            <span>Maturity Balance</span>
          </div>
          <div className="text-lg sm:text-xl font-bold font-mono text-primary">
            ${formatCurrency(finalAmount)}
          </div>
        </div>

        {/* Overall Yield */}
        <div className="p-4 rounded-2xl bg-base-100 border border-base-content/10 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-semibold text-base-content/60 mb-1">
            <ChartBarIcon className="w-4 h-4 text-info" />
            <span>Total Growth</span>
          </div>
          <div className="text-lg sm:text-xl font-bold font-mono text-info">
            +{totalGainPercent.toFixed(2)}%
          </div>
        </div>
      </div>

      {/* Schedule Table */}
      <div className="rounded-2xl bg-base-100 border border-base-content/10 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-base-content/10 flex items-center justify-between">
          <h4 className="text-sm font-bold text-base-content">
            Annual Compounding Schedule
          </h4>
          <span className="text-xs text-base-content/50">
            {dataArr.length - 1} Years Breakdown
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-xs sm:text-sm">
            <thead>
              <tr className="bg-base-200/50 text-base-content/70">
                <th className="py-3 px-4 font-semibold">Year</th>
                <th className="py-3 px-4 text-right font-semibold">Annual Interest Credited</th>
                <th className="py-3 px-4 text-right font-semibold">End-of-Year Balance</th>
              </tr>
            </thead>
            <tbody>
              {dataArr.map((row) => (
                <tr key={row.year} className="hover:bg-base-200/40 transition-colors">
                  <td className="py-3 px-4">
                    {row.year === 0 ? (
                      <span className="badge badge-sm badge-neutral">Start</span>
                    ) : (
                      <span className="font-medium">Year {row.year}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-success">
                    {row.credit > 0 ? `+$${formatCurrency(row.credit)}` : "—"}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-semibold text-base-content">
                    ${formatCurrency(row.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
