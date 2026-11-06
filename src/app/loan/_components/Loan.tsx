"use client";

import { useState } from "react";
import LoanInput from "./LoanInput";
import { LoanDataRow } from "../_lib/types";
import LoanTable from "./LoanTable";

function getInitialLoanSchedule() {
  const principal = 50000;
  const rate = 8.5;
  const emi = 1200;

  const rows: LoanDataRow[] = [
    { month: 0, amount: principal, debit: 0, credit: 0 },
  ];

  let currMonth = 1;
  let currAmt = principal;

  while (currAmt > 0 && currMonth <= 600) {
    const monthInterest = parseFloat(
      (((currAmt * rate) / 100) / 12).toFixed(2)
    );
    currAmt += monthInterest;
    currAmt = parseFloat(currAmt.toFixed(2));
    rows.push({
      month: currMonth,
      debit: monthInterest,
      credit: 0,
      amount: currAmt,
    });

    const actualPayment = Math.min(currAmt, emi);
    currAmt -= actualPayment;
    currAmt = Math.max(0, parseFloat(currAmt.toFixed(2)));
    rows.push({
      month: currMonth,
      debit: 0,
      credit: actualPayment,
      amount: currAmt,
    });

    if (currAmt <= 0) break;
    currMonth += 1;
  }

  return {
    rows,
    months: currMonth,
    years: parseFloat((currMonth / 12).toFixed(2)),
  };
}

export default function Loan() {
  const [initialData] = useState(getInitialLoanSchedule);
  const [dataArr, setDataArr] = useState<LoanDataRow[]>(initialData.rows);
  const [monthsRequired, setMonthsRequired] = useState(initialData.months);
  const [yearsRequired, setYearsRequired] = useState(initialData.years);

  return (
    <div className="space-y-6">
      <LoanInput
        setDataArr={setDataArr}
        setMonthsRequired={setMonthsRequired}
        setYearsRequired={setYearsRequired}
      />
      <LoanTable
        dataArr={dataArr}
        monthsRequired={monthsRequired}
        yearsRequired={yearsRequired}
      />
    </div>
  );
}
