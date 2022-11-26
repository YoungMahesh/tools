export interface LoanDataRow {
  month: number;
  debit: number;
  credit: number;
  amount: number;
}

export default function LoanTable({ dataArr }: { dataArr: LoanDataRow[] }) {
  return (
    <section className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <td>Month</td>
            <td align="right">Debit</td>
            <td align="right">Credit</td>
            <td align="right">Amount Remaining</td>
          </tr>
        </thead>
        <tbody>
          {dataArr.map((row, idx) => (
            <tr key={idx}>
              <td>{row.month}</td>
              <td align="right">{row.debit}</td>
              <td align="right">{row.credit}</td>
              <td align="right">{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
