'use client'
import { useState } from "react";
import FDInput from "./FDInput";
import { FDDataRow } from "../_lib/types";
import FDTable from "./FDTable";

export default function FDCalculator() {
  const [dataArr, setDataArr] = useState<FDDataRow[]>([]);

  return (
    <div className="p-2 md:p-6">
      <FDInput setDataArr={setDataArr} />
      <FDTable dataArr={dataArr} />
    </div>
  );
}
