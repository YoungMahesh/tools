import { useState } from "react";
import * as bip39 from "bip39";
import { Keypair } from "@solana/web3.js";
import { base58 } from "ethers/lib/utils";
import WalletBox from "@/app/_components/WalletBox";
//import { HDKey } from "micro-ed25519-hdkey";
// micro-ed25519-hdkey author message: This package has been deprecated; 
//    Switch to micro-key-producer: the package has been merged into it
import HDKey from "micro-key-producer/slip10.js";

export default function SolanaWalletsFromSeedPhrase() {
  const [seedPhrase, setSeedPhrase] = useState("");
  const [seedPhr1, setSeedPhr1] = useState("");
  const [walletsArr, setWalletsArr] = useState<IWallet[]>([]);
  const [isGeneratingWallets, setIsGeneratingWallets] = useState(false);

  const deriveWallets = async () => {
    setWalletsArr([]);
    setIsGeneratingWallets(true);

    try {
      const _walletsArr: IWallet[] = [];
      // https://solana.com/developers/cookbook/wallets/restore-from-mnemonic
      // arguments: (mnemonic, password)
      const seed = bip39.mnemonicToSeedSync(seedPhrase, "");
      const hd = HDKey.fromMasterSeed(seed.toString("hex"));
      for (let i = 0; i < 10; i++) {
        const path = `m/44'/501'/${i}'/0'`;
        const keypair = Keypair.fromSeed(hd.derive(path).privateKey);
        _walletsArr.push({
          pubAddr: keypair.publicKey.toBase58(),
          privKey: keypair.secretKey.toString(),
          privKeyText: base58.encode(keypair.secretKey),
        });
      }
      setSeedPhr1(seedPhrase);
      setWalletsArr(_walletsArr);
    } catch (err) {
      alert("Invalid seed phrase");
      console.error(err)
    }
    setIsGeneratingWallets(false);
  };

  const generateSeedPhrase = () => {
    // https://solana.com/developers/cookbook/wallets/generate-mnemonic
    const mnemonic = bip39.generateMnemonic();
    console.log(mnemonic);
    setSeedPhrase(mnemonic);
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
                privateKey2={wallet.privKeyText}
                title={`Account: ${index + 1}`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

interface IWallet {
  pubAddr: string;
  privKey: string;
  privKeyText: string;
}
