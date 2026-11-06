"use client";

import { useState } from "react";
import FDInput from "./FDInput";
import { FDDataRow } from "../_lib/types";
import FDTable from "./FDTable";

function getInitialFDData(): FDDataRow[] {
  const initialAmount = 10000;
  const rate = 7.5;
  const years = 5;
  const rows: FDDataRow[] = [{ year: 0, amount: initialAmount, credit: 0 }];
  let curr = initialAmount;
  for (let y = 1; y <= years; y++) {
    const interest = parseFloat(((curr * rate) / 100).toFixed(2));
    curr = parseFloat((curr + interest).toFixed(2));
    rows.push({ year: y, credit: interest, amount: curr });
  }
  return rows;
}

export default function FDCalculator() {
  const [dataArr, setDataArr] = useState<FDDataRow[]>(getInitialFDData);

  return (
    <div className="space-y-6">
      <FDInput setDataArr={setDataArr} />
      <FDTable dataArr={dataArr} />
    </div>
  );
}
