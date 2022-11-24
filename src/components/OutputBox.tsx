interface ListProps {
  resultText: string;

}

const OutputBox = ({ resultText }: ListProps) => {
  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`Copied: \n${text}`);
  };

  return (
    <div
      style={{ display: resultText.length ? "block" : "none" }}
      className="card w-96 bg-base-100 shadow-xl"
    >
      <div className="card-body">
        <p className="break-all">{resultText}</p>
        <div className="card-actions justify-end">
          <button
            className="btn-primary btn"
            onClick={() => copyText(resultText)}
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default OutputBox;
