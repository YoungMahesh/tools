"use client";

import { useMemo } from "react";
import { LoanDataRow } from "../_lib/types";
import {
  CurrencyDollarIcon,
  ClockIcon,
  BanknotesIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline";

export default function LoanTable({
  dataArr,
  monthsRequired,
  yearsRequired,
}: {
  dataArr: LoanDataRow[];
  monthsRequired: number;
  yearsRequired: number;
}) {
  const initialPrincipal = dataArr[0]?.amount || 0;

  // Aggregate monthly debits and credits into clean single rows per month
  const monthlySchedule = useMemo(() => {
    if (dataArr.length === 0) return [];

    const monthMap = new Map<
      number,
      { month: number; interest: number; paid: number; balance: number }
    >();

    for (const row of dataArr) {
      if (row.month === 0) continue;
      const existing = monthMap.get(row.month) || {
        month: row.month,
        interest: 0,
        paid: 0,
        balance: 0,
      };

      if (row.debit > 0) {
        existing.interest += row.debit;
      }
      if (row.credit > 0) {
        existing.paid += row.credit;
        existing.balance = row.amount;
      }
      monthMap.set(row.month, existing);
    }

    return Array.from(monthMap.values());
  }, [dataArr]);

  const totalInterest = useMemo(() => {
    return monthlySchedule.reduce((acc, row) => acc + row.interest, 0);
  }, [monthlySchedule]);

  const totalPaid = initialPrincipal + totalInterest;

  const formatCurrency = (val: number) => {
    return val.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  if (dataArr.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Loan Principal */}
        <div className="p-4 rounded-2xl bg-base-100 border border-base-content/10 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-semibold text-base-content/60 mb-1">
            <CurrencyDollarIcon className="w-4 h-4 text-primary" />
            <span>Loan Principal</span>
          </div>
          <div className="text-lg sm:text-xl font-bold font-mono text-base-content">
            ${formatCurrency(initialPrincipal)}
          </div>
        </div>

        {/* Total Interest */}
        <div className="p-4 rounded-2xl bg-base-100 border border-base-content/10 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-semibold text-base-content/60 mb-1">
            <ArrowTrendingDownIcon className="w-4 h-4 text-error" />
            <span>Total Interest Paid</span>
          </div>
          <div className="text-lg sm:text-xl font-bold font-mono text-error">
            ${formatCurrency(totalInterest)}
          </div>
        </div>

        {/* Total Out-of-Pocket */}
        <div className="p-4 rounded-2xl bg-base-100 border border-base-content/10 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-semibold text-base-content/60 mb-1">
            <BanknotesIcon className="w-4 h-4 text-primary" />
            <span>Total Repayment</span>
          </div>
          <div className="text-lg sm:text-xl font-bold font-mono text-primary">
            ${formatCurrency(totalPaid)}
          </div>
        </div>

        {/* Payoff Timeline */}
        <div className="p-4 rounded-2xl bg-base-100 border border-base-content/10 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-semibold text-base-content/60 mb-1">
            <ClockIcon className="w-4 h-4 text-info" />
            <span>Payoff Duration</span>
          </div>
          <div className="text-lg sm:text-xl font-bold font-mono text-info">
            {monthsRequired} Mo{" "}
            <span className="text-xs font-normal text-base-content/60">
              ({yearsRequired} Yrs)
            </span>
          </div>
        </div>
      </div>

      {/* Amortization Schedule Table */}
      <div className="rounded-2xl bg-base-100 border border-base-content/10 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-base-content/10 flex items-center justify-between">
          <h4 className="text-sm font-bold text-base-content">
            Monthly Amortization Schedule
          </h4>
          <span className="text-xs text-base-content/50">
            {monthlySchedule.length} Months Total
          </span>
        </div>

        <div className="overflow-x-auto max-h-[500px]">
          <table className="table table-zebra table-pin-rows w-full text-xs sm:text-sm">
            <thead>
              <tr className="bg-base-200/80 text-base-content/70">
                <th className="py-3 px-4 font-semibold">Month</th>
                <th className="py-3 px-4 text-right font-semibold">Interest Charged</th>
                <th className="py-3 px-4 text-right font-semibold">EMI Payment</th>
                <th className="py-3 px-4 text-right font-semibold">Remaining Balance</th>
              </tr>
            </thead>
            <tbody>
              {monthlySchedule.map((row) => (
                <tr key={row.month} className="hover:bg-base-200/40 transition-colors">
                  <td className="py-2.5 px-4 font-medium">
                    Month {row.month}{" "}
                    <span className="text-[11px] text-base-content/40 font-mono">
                      (Yr {(row.month / 12).toFixed(1)})
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono text-error/90">
                    +${formatCurrency(row.interest)}
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono text-success">
                    -${formatCurrency(row.paid)}
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono font-semibold text-base-content">
                    ${formatCurrency(row.balance)}
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
