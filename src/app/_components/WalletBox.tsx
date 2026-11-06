"use client";

import { useState } from "react";
import {
  ClipboardDocumentIcon,
  CheckIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";
import { useToast } from "./ToastProvider";

export default function WalletBox({
  publicKey,
  privateKey,
  title,
  privateKey2,
}: {
  publicKey: string;
  privateKey: string;
  title?: string;
  privateKey2?: string;
}) {
  const { showToast } = useToast();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [showPrivateKey2, setShowPrivateKey2] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    showToast(`Copied ${label} to clipboard!`, "success");
    setTimeout(() => {
      setCopiedField((curr) => (curr === label ? null : curr));
    }, 2000);
  };

  return (
    <div className="w-full my-3 rounded-2xl bg-base-200/60 border border-base-content/10 shadow-sm overflow-hidden transition-all hover:border-base-content/20">
      {/* Header if title provided */}
      {title && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-base-300/50 border-b border-base-content/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-base-content">
              {title}
            </h4>
          </div>
          <span className="badge badge-xs badge-neutral font-mono text-[10px]">
            Derived Account
          </span>
        </div>
      )}

      <div className="p-4 space-y-3.5">
        {/* Public Address */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-base-content/70">
              <IdentificationIcon className="w-3.5 h-3.5 text-primary" />
              Public Address
            </span>
            <button
              type="button"
              onClick={() => copyToClipboard(publicKey, "Public Address")}
              className="btn btn-ghost btn-xs gap-1 text-xs hover:text-primary transition-colors"
            >
              {copiedField === "Public Address" ? (
                <>
                  <CheckIcon className="w-3.5 h-3.5 text-success" />
                  <span className="text-success font-medium">Copied</span>
                </>
              ) : (
                <>
                  <ClipboardDocumentIcon className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <div className="p-2.5 rounded-xl bg-base-100 border border-base-content/10 font-mono text-xs break-all text-base-content select-all">
            {publicKey}
          </div>
        </div>

        {/* Private Key */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-base-content/70">
              <KeyIcon className="w-3.5 h-3.5 text-warning" />
              Private Key {privateKey2 ? "(Uint8Array / Raw)" : ""}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setShowPrivateKey(!showPrivateKey)}
                className="btn btn-ghost btn-xs gap-1 text-xs text-base-content/60 hover:text-base-content"
                title={showPrivateKey ? "Hide Key" : "Reveal Key"}
              >
                {showPrivateKey ? (
                  <>
                    <EyeSlashIcon className="w-3.5 h-3.5" />
                    <span>Hide</span>
                  </>
                ) : (
                  <>
                    <EyeIcon className="w-3.5 h-3.5" />
                    <span>Reveal</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => copyToClipboard(privateKey, "Private Key")}
                className="btn btn-ghost btn-xs gap-1 text-xs hover:text-primary transition-colors"
              >
                {copiedField === "Private Key" ? (
                  <>
                    <CheckIcon className="w-3.5 h-3.5 text-success" />
                    <span className="text-success font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <ClipboardDocumentIcon className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-base-100 border border-base-content/10 font-mono text-xs break-all text-base-content select-all">
            {showPrivateKey ? privateKey : "•".repeat(Math.min(privateKey.length, 48))}
          </div>
        </div>

        {/* Optional Secondary Private Key Format */}
        {privateKey2 && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-base-content/70">
                <KeyIcon className="w-3.5 h-3.5 text-warning" />
                Private Key (Base58)
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setShowPrivateKey2(!showPrivateKey2)}
                  className="btn btn-ghost btn-xs gap-1 text-xs text-base-content/60 hover:text-base-content"
                  title={showPrivateKey2 ? "Hide Key" : "Reveal Key"}
                >
                  {showPrivateKey2 ? (
                    <>
                      <EyeSlashIcon className="w-3.5 h-3.5" />
                      <span>Hide</span>
                    </>
                  ) : (
                    <>
                      <EyeIcon className="w-3.5 h-3.5" />
                      <span>Reveal</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => copyToClipboard(privateKey2, "Private Key (Base58)")}
                  className="btn btn-ghost btn-xs gap-1 text-xs hover:text-primary transition-colors"
                >
                  {copiedField === "Private Key (Base58)" ? (
                    <>
                      <CheckIcon className="w-3.5 h-3.5 text-success" />
                      <span className="text-success font-medium">Copied</span>
                    </>
                  ) : (
                    <>
                      <ClipboardDocumentIcon className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-base-100 border border-base-content/10 font-mono text-xs break-all text-base-content select-all">
              {showPrivateKey2 ? privateKey2 : "•".repeat(Math.min(privateKey2.length, 48))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
