import { useState } from "react";
import Head1 from "../components/common/Head1";
import LoanInput from "../components/loan/LoanInput";
import LoanTable from "../components/loan/LoanTable";
import type { LoanDataRow } from "../components/loan/LoanTable";

export default function Loan() {
  const [dataArr, setDataArr] = useState<LoanDataRow[]>([]);
  const [monthsRequired, setMonthsRequired] = useState(0);
  const [yearsRequired, setYearsRequired] = useState(0);

  return (
    <div className="p-2 py-4 md:px-12">
      <Head1 title="Loan Calculator" description="Calculate EMI of Loan" />
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
