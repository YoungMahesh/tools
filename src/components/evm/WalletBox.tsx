export default function WalletBox({
  publicKey,
  privateKey,
  title,
}: {
  publicKey: string;
  privateKey: string;
  title?: string;
}) {
  return (
    <div className="my-2 rounded border">
      {title ? <h5 className="text-center font-bold">{title}</h5> : null}
      <div className="p-2">
        <div className="flex items-center justify-between">
          <span>PublicKey:</span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(publicKey);
              alert(`Copied: ${publicKey}`);
            }}
            className="btn-sm btn"
          >
            Copy
          </button>
        </div>
        <p className="m-0 break-all font-bold">{publicKey}</p>
      </div>
      <hr className="m-0" />
      <div className="p-2">
        <div className="flex items-center justify-between">
          <span>PrivateKey:</span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(privateKey);
              alert(`Copied: ${privateKey}`);
            }}
            className="btn-sm btn"
          >
            Copy
          </button>
        </div>
        <p className="m-0 break-all font-bold">{privateKey}</p>
      </div>
    </div>
  );
}
