import { useState } from "react";
import type { LoanDataRow } from "./LoanTable";

export default function LoanInput({
  setDataArr,
}: {
  setDataArr: (_: LoanDataRow[]) => void;
}) {
  const [amount, setAmount] = useState("");
  const [interest, setInterest] = useState("");
  const [emi, setEmi] = useState("");

  const calculateInterest = (currAmt: number) => {
    const yearInterest = (currAmt * parseFloat(interest)) / 100;
    const monthInterest = yearInterest / 12;
    return parseFloat(monthInterest.toFixed(2));
  };

  const generateLoanData = () => {
    try {
      const dataArr1: LoanDataRow[] = [];
      dataArr1.push({
        month: 0,
        amount: parseInt(amount),
        debit: 0,
        credit: 0,
      });
      let currMonth = 1;
      let currAmt = parseInt(amount);
      while (currAmt > 0) {
        const currInterest = calculateInterest(currAmt);
        currAmt += currInterest;
        currAmt = parseFloat(currAmt.toFixed(2));
        dataArr1.push({
          month: currMonth,
          debit: currInterest,
          credit: 0,
          amount: currAmt,
        });
        currAmt -= parseInt(emi);
        currAmt = parseFloat(currAmt.toFixed(2));
        dataArr1.push({
          month: currMonth,
          debit: 0,
          credit: parseInt(emi),
          amount: currAmt,
        });
        currMonth += 1;
      }
      setDataArr(dataArr1);
    } catch (err) {
      console.log(err);
      alert("Invalid Data");
    }
  };

  return (
    <section className="flex flex-wrap justify-center ">
      <input
        type="text"
        className="input-bordered input-primary input m-2 w-full max-w-xs"
        placeholder="Initial Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        className="input-bordered input-primary input m-2 w-full max-w-xs"
        placeholder="Yearly Interest (%)"
        value={interest}
        onChange={(e) => setInterest(e.target.value)}
      />
      <input
        type="text"
        className="input-bordered input-primary input m-2 w-full max-w-xs"
        placeholder="EMI Amount"
        value={emi}
        onChange={(e) => setEmi(e.target.value)}
      />
      <button className="btn-primary btn m-2" onClick={generateLoanData}>
        Calculate
      </button>
    </section>
  );
}
