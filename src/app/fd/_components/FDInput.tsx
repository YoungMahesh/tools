"use client";

import { useState } from "react";
import { FDDataRow } from "../_lib/types";
import { useToast } from "@/app/_components/ToastProvider";
import { CalculatorIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

export default function FDInput({
  setDataArr,
}: {
  setDataArr: (dataArr: FDDataRow[]) => void;
}) {
  const { showToast } = useToast();
  const [amount, setAmount] = useState("10000");
  const [interest, setInterest] = useState("7.5");
  const [yearsAmt, setYearAmt] = useState("5");

  const calculateInterest = (currAmt: number, rate: number) => {
    const yearInterest = (currAmt * rate) / 100;
    return parseFloat(yearInterest.toFixed(2));
  };

  const generateFDData = () => {
    const cleanAmount = parseFloat(amount.replace(/,/g, ""));
    const cleanInterest = parseFloat(interest);
    const totalYears = parseFloat(yearsAmt);

    if (isNaN(cleanAmount) || cleanAmount <= 0) {
      showToast("Please enter a valid positive initial deposit amount", "error");
      return;
    }
    if (isNaN(cleanInterest) || cleanInterest <= 0) {
      showToast("Please enter a valid annual interest rate", "error");
      return;
    }
    if (isNaN(totalYears) || totalYears <= 0 || totalYears > 100) {
      showToast("Please enter a duration between 1 and 100 years", "error");
      return;
    }

    try {
      const dataArr1: FDDataRow[] = [];
      dataArr1.push({ year: 0, amount: cleanAmount, credit: 0 });

      let currYear = 1;
      let currAmt = cleanAmount;

      while (currYear <= totalYears) {
        const currInterest = calculateInterest(currAmt, cleanInterest);
        currAmt += currInterest;
        currAmt = parseFloat(currAmt.toFixed(2));
        dataArr1.push({
          year: currYear,
          credit: currInterest,
          amount: currAmt,
        });
        currYear += 1;
      }
      setDataArr(dataArr1);
      showToast("Calculation completed successfully!", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to calculate fixed deposit schedule", "error");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      generateFDData();
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-base-100 border border-base-content/10 shadow-sm mb-6">
      <h3 className="text-base font-bold text-base-content mb-4 flex items-center gap-2">
        <CalculatorIcon className="w-5 h-5 text-primary" />
        <span>Investment Parameters</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4" onKeyDown={handleKeyDown}>
        {/* Deposit Amount */}
        <div>
          <label className="block text-xs font-semibold text-base-content/70 mb-1.5">
            Initial Deposit Amount
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/50 text-xs font-semibold">
              $
            </span>
            <input
              type="number"
              min="1"
              step="any"
              className="input input-bordered w-full pl-8 text-sm rounded-xl bg-base-200/50 focus:bg-base-100 focus:border-primary font-mono"
              placeholder="10000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <label className="block text-xs font-semibold text-base-content/70 mb-1.5">
            Annual Interest Rate
          </label>
          <div className="relative">
            <input
              type="number"
              min="0.1"
              max="100"
              step="0.05"
              className="input input-bordered w-full pr-8 text-sm rounded-xl bg-base-200/50 focus:bg-base-100 focus:border-primary font-mono"
              placeholder="7.5"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-base-content/50 text-xs font-semibold">
              %
            </span>
          </div>
        </div>

        {/* Duration Years */}
        <div>
          <label className="block text-xs font-semibold text-base-content/70 mb-1.5">
            Duration (Years)
          </label>
          <div className="relative">
            <input
              type="number"
              min="1"
              max="100"
              className="input input-bordered w-full pr-14 text-sm rounded-xl bg-base-200/50 focus:bg-base-100 focus:border-primary font-mono"
              placeholder="5"
              value={yearsAmt}
              onChange={(e) => setYearAmt(e.target.value)}
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-base-content/50 text-xs">
              Yrs
            </span>
          </div>
        </div>
      </div>

      {/* Quick duration presets and Action Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-1.5 text-xs text-base-content/60">
          <span>Quick Years:</span>
          {[1, 3, 5, 10, 20].map((y) => (
            <button
              key={y}
              type="button"
              onClick={() => setYearAmt(y.toString())}
              className={`btn btn-xs rounded-lg ${
                yearsAmt === y.toString() ? "btn-neutral" : "btn-ghost border border-base-content/10"
              }`}
            >
              {y}y
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={generateFDData}
          className="btn btn-primary btn-sm rounded-xl gap-1.5 px-5"
        >
          <ArrowPathIcon className="w-4 h-4" />
          <span>Calculate Growth</span>
        </button>
      </div>
    </div>
  );
}
