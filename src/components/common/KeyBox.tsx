export default function KeyBox({
  title1,
  value1,
}: {
  title1: string;
  value1: string;
}) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title1}</h2>

        <p className="break-all">{value1}</p>

        <div className="card-actions justify-end">
          <button
            className="btn-primary btn"
            onClick={() => navigator.clipboard.writeText(value1)}
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}
