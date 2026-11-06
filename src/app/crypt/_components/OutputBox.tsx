"use client";

import { useState } from "react";
import { ClipboardDocumentIcon, CheckIcon, KeyIcon } from "@heroicons/react/24/outline";
import { useToast } from "@/app/_components/ToastProvider";

interface OutputBoxProps {
  resultText: string;
}

export default function OutputBox({ resultText }: OutputBoxProps) {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const copyText = () => {
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    showToast("Copied result to clipboard!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  if (!resultText) return null;

  return (
    <div className="w-full mt-6 rounded-2xl bg-base-100 border border-base-content/10 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
      <div className="flex items-center justify-between px-5 py-3 bg-base-200/50 border-b border-base-content/10">
        <div className="flex items-center gap-2">
          <KeyIcon className="w-4 h-4 text-primary" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-base-content">
            Transformation Result
          </h4>
        </div>
        <button
          type="button"
          onClick={copyText}
          className="btn btn-ghost btn-xs gap-1 text-xs hover:text-primary transition-colors"
        >
          {copied ? (
            <>
              <CheckIcon className="w-3.5 h-3.5 text-success" />
              <span className="text-success font-medium">Copied</span>
            </>
          ) : (
            <>
              <ClipboardDocumentIcon className="w-3.5 h-3.5" />
              <span>Copy Result</span>
            </>
          )}
        </button>
      </div>

      <div className="p-5">
        <div className="p-4 rounded-xl bg-base-200/60 border border-base-content/10 font-mono text-xs sm:text-sm text-base-content break-all select-all leading-relaxed max-h-60 overflow-y-auto">
          {resultText}
        </div>
      </div>
    </div>
  );
}
