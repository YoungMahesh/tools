import type { Metadata } from "next";
import EncryptText from "./_components/EncryptText";
import { LockClosedIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Text Encryption & Decryption",
  description: "Securely encrypt or decrypt sensitive text and messages with a custom passphrase using AES-192-CBC.",
};

export default function CryptPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3">
          <LockClosedIcon className="w-4 h-4" />
          <span>AES-192 Cryptography</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-base-content tracking-tight mb-2">
          Text Encryption & Decryption
        </h1>
        <p className="text-sm text-base-content/70 max-w-xl mx-auto">
          Protect confidential messages, credentials, and notes with passphrase-protected symmetric encryption.
        </p>
      </div>

      <EncryptText />
    </main>
  );
}
