import { useState } from "react";
import { Wallet, wordlists } from "ethers";
import WalletBox from "./WalletBox";

export default function EVMWalletsFromPhrase() {
  const [seedPhrase, setSeedPhrase] = useState("");
  const [seedPhr1, setSeedPhr1] = useState("");
  const [walletsArr, setWalletsArr] = useState<
    { pubAddr: string; privKey: string }[]
  >([]);
  const [isGeneratingWallets, setIsGeneratingWallets] = useState(false);

  const deriveWallets = async () => {
    setWalletsArr([]);
    setIsGeneratingWallets(true);

    // setIsGeneratingWallets(true) is not working without use of Promise
    // reason may be setIsGeneratingWallets(true) is async call, while code below it is sync
    await new Promise((r) => setTimeout(r, 50));

    try {
      const _walletsArr: { pubAddr: string; privKey: string }[] = [];
      for (let i = 0; i < 10; i++) {
        const wallet = Wallet.fromMnemonic(
          seedPhrase,
          `m/44'/60'/0'/0/${i}`,
          wordlists.en
        );
        console.log(wallet);
        _walletsArr.push({
          pubAddr: wallet.address,
          privKey: wallet.privateKey,
        });
      }
      setSeedPhr1(seedPhrase);
      setWalletsArr(_walletsArr);
    } catch (err) {
      alert("Invalid seed phrase");
    }
    setIsGeneratingWallets(false);
  };

  const generateSeedPhrase = () => {
    const _seedPhrase = Wallet.createRandom().mnemonic;
    console.log(_seedPhrase);
    setSeedPhrase(_seedPhrase.phrase);
  };

  return (
    <section className="grid w-screen place-content-center pb-8">
      <div className="m-2 p-1">
        <h3 className="mt-0">Wallets from Seed-Phrase</h3>
        <div className="mb-5 flex flex-wrap items-center justify-center">
          <input
            type="text"
            placeholder="Seed Phrase"
            className="input-bordered input-primary input w-full"
            value={seedPhrase}
            onChange={(e) => setSeedPhrase(e.target.value)}
          />
          <button className="btn-primary btn" onClick={generateSeedPhrase}>
            Generate New
          </button>
          <button className="btn-primary btn m-1" onClick={deriveWallets}>
            Get Wallets
          </button>
        </div>
        {isGeneratingWallets ? (
          <p className="text-center">Loading Wallets List...</p>
        ) : null}

        {walletsArr.length ? (
          <div>
            <div className="mb-2 rounded border p-2">
              <div className="flex items-center justify-between">
                <span>Seed Phrase: </span>
                <button
                  className="btn-sm btn"
                  onClick={() => {
                    navigator.clipboard.writeText(seedPhrase);
                    alert(`Copied: ${seedPhrase}`);
                  }}
                >
                  Copy
                </button>
              </div>
              <p className="m-0 font-bold">{seedPhr1}</p>
              <div className="flex justify-center"></div>
            </div>
            {walletsArr.map((wallet, index) => (
              <WalletBox
                key={index}
                publicKey={wallet.pubAddr}
                privateKey={wallet.privKey}
                title={`Account: ${index + 1}`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
