import { useState } from "react";
import Head1 from "../components/common/Head1";
import Layout from "../components/common/Layout";
import FDInput from "../components/fd/FDInput";
import FDTable, { FDDataRow } from "../components/fd/FDTable";

export default function FD() {
  const [dataArr, setDataArr] = useState<FDDataRow[]>([]);

  return (
    <Layout>
      <Head1 title="FD Calculator" />
      <div className="p-2 md:p-6">
        <FDInput setDataArr={setDataArr} />
        <FDTable dataArr={dataArr} />
      </div>
    </Layout>
  );
}
