"use client";

import { useState } from "react";
import { ClipboardDocumentIcon, CheckIcon, KeyIcon } from "@heroicons/react/24/outline";
import { useToast } from "./ToastProvider";

export default function KeyBox({
  title1,
  value1,
}: {
  title1: string;
  value1: string;
}) {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const copyValue = () => {
    navigator.clipboard.writeText(value1);
    setCopied(true);
    showToast(`Copied ${title1.replace(":", "")} to clipboard!`, "success");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full my-2 rounded-2xl bg-base-200/60 border border-base-content/10 shadow-sm overflow-hidden p-4 transition-all hover:border-base-content/20">
      <div className="flex items-center justify-between mb-2">
        <h4 className="flex items-center gap-1.5 text-xs font-semibold text-base-content/70">
          <KeyIcon className="w-3.5 h-3.5 text-primary" />
          {title1.replace(":", "")}
        </h4>
        <button
          type="button"
          onClick={copyValue}
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
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="p-3 rounded-xl bg-base-100 border border-base-content/10 font-mono text-xs break-all text-base-content select-all">
        {value1}
      </div>
    </div>
  );
}
