'use client'
import { useState } from "react";
import LoanInput from "./LoanInput";
import { LoanDataRow } from "../_lib/types";
import LoanTable from "./LoanTable";

export default function Loan() {
  const [dataArr, setDataArr] = useState<LoanDataRow[]>([]);
  const [monthsRequired, setMonthsRequired] = useState(0);
  const [yearsRequired, setYearsRequired] = useState(0);

  return (
    <div className="p-2 py-4 md:px-12">
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
