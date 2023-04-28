import { useState } from "react";
import type { LoanDataRow } from "./LoanTable";

export default function LoanInput({
  setDataArr,
  setMonthsRequired,
  setYearsRequired,
}: {
  setDataArr: (_: LoanDataRow[]) => void;
  setMonthsRequired: (_: number) => void;
  setYearsRequired: (_: number) => void;
}) {
  const [amount, setAmount] = useState("");
  const [interest, setInterest] = useState("");
  const [emi, setEmi] = useState("");

  const monthlyInterest = (currAmt: number) => {
    const _interest = parseFloat(interest.replace(/,/g, ""));

    const yearInterest = (currAmt * _interest) / 100;
    const monthInterest = yearInterest / 12;
    return parseFloat(monthInterest.toFixed(2));
  };

  const generateLoanData = () => {
    try {
      const _amount = parseFloat(amount.replace(/,/g, ""));
      const _emi = parseFloat(emi.replace(/,/g, ""));

      const dataArr1: LoanDataRow[] = [];
      dataArr1.push({
        month: 0,
        amount: _amount,
        debit: 0,
        credit: 0,
      });
      let currMonth = 1;
      let currAmt = _amount;
      while (currAmt > 0) {
        const monthInterest = monthlyInterest(currAmt);

        if (monthInterest > _emi)
          return alert(
            "EMI is less than monthly-interest, loan will never be paid off"
          );

        currAmt += monthInterest;
        currAmt = parseFloat(currAmt.toFixed(2));
        dataArr1.push({
          month: currMonth,
          debit: monthInterest,
          credit: 0,
          amount: currAmt,
        });
        currAmt -= _emi;
        currAmt = parseFloat(currAmt.toFixed(2));
        dataArr1.push({
          month: currMonth,
          debit: 0,
          credit: _emi,
          amount: currAmt,
        });
        currMonth += 1;
      }
      setMonthsRequired(currMonth - 1);
      setYearsRequired(parseFloat(((currMonth - 1) / 12).toFixed(2)));
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
