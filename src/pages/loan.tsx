import { useState } from "react";
import Head1 from "../components/common/Head1";
import LoanInput from "../components/loan/LoanInput";
import LoanTable from "../components/loan/LoanTable";
import type { LoanDataRow } from "../components/loan/LoanTable";

export default function Loan() {
  const [dataArr, setDataArr] = useState<LoanDataRow[]>([]);

  return (
    <div className="p-2 md:p-6">
      <Head1 title="Loan Caculator" description="Calculate EMI of Loan" />
      <LoanInput setDataArr={setDataArr} />
      <LoanTable dataArr={dataArr} />
    </div>
  );
}
