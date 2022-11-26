export interface FDDataRow {
  year: number;
  credit: number;
  amount: number;
}

export default function FDTable({ dataArr }: { dataArr: FDDataRow[] }) {
  return (
    <section className="overflow-x-auto ">
      <table className="table w-full">
        <thead>
          <tr>
            <td>Year</td>
            <td align="right">Interest</td>
            <td align="right">Total Amount</td>
          </tr>
        </thead>
        <tbody>
          {dataArr.map((row, idx) => (
            <tr key={idx}>
              <td>{row.year}</td>
              <td align="right">{row.credit}</td>
              <td align="right">{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
