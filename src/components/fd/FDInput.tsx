import { useState } from "react";
import { FDDataRow } from "./FDTable";

export default function FDInput({
  setDataArr,
}: {
  setDataArr: (dataArr: FDDataRow[]) => void;
}) {
  const [amount, setAmount] = useState("");
  const [interest, setInterest] = useState("");
  const [yearsAmt, setYearAmt] = useState("");

  const calculateInterest = (currAmt: number) => {
    const yearInterest = (currAmt * parseFloat(interest)) / 100;
    return parseFloat(yearInterest.toFixed(2));
  };

  const generateFDData = () => {
    try {
      const dataArr1: FDDataRow[] = [];
      dataArr1.push({ year: 0, amount: parseInt(amount), credit: 0 });
      let currYear = 1;
      const totalYears = parseFloat(yearsAmt);
      let currAmt = parseInt(amount);
      while (currYear <= totalYears) {
        const currInterest = calculateInterest(currAmt);
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
    } catch (err) {
      console.log(err);
      alert("Invalid Data");
    }
  };

  return (
    <div className="flex flex-wrap justify-center ">
      <input
        type="text"
        className="input-bordered input-secondary input m-2 w-full max-w-xs"
        placeholder="Initial Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        className="input-bordered input-secondary input m-2 w-full max-w-xs"
        placeholder="Yearly Interest (%)"
        value={interest}
        onChange={(e) => setInterest(e.target.value)}
      />
      <input
        type="text"
        className="input-bordered input-secondary input m-2 w-full max-w-xs"
        placeholder="No of Years"
        value={yearsAmt}
        onChange={(e) => setYearAmt(e.target.value)}
      />
      <button className="btn-primary btn m-2" onClick={generateFDData}>
        Calculate
      </button>
    </div>
  );
}
