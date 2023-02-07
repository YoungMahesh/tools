import { useState } from "react";
import Head1 from "../components/common/Head1";
import FDInput from "../components/fd/FDInput";
import FDTable from "../components/fd/FDTable";
import type { FDDataRow } from "../components/fd/FDTable";

export default function FD() {
  const [dataArr, setDataArr] = useState<FDDataRow[]>([]);

  return (
    <div className="p-2 md:p-6">
      <Head1
        title="FD Calculator"
        description="Calculate monthly balance of Fixed-Deposit"
      />
      <FDInput setDataArr={setDataArr} />
      <FDTable dataArr={dataArr} />
    </div>
  );
}
