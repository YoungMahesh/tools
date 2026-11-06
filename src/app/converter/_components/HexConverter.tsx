"use client";

import { useState } from "react";
import copy from "copy-to-clipboard";
import { useToast } from "@/app/_components/ToastProvider";
import {
  CodeBracketIcon,
  ClipboardDocumentIcon,
  CheckIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

export default function HexConverter() {
  const { showToast } = useToast();
  const [num1, setNum1] = useState<string>("255");
  const [isPaddedHex, setIsPaddedHex] = useState(false);
  const [includePrefix, setIncludePrefix] = useState(true);
  const [cHex1, setCHex1] = useState("0xff");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const [hex1, setHex1] = useState<string>("0xff");
  const [cNum, setCNum] = useState<string>("255");

  const numberToHexStr = (val = num1, padded = isPaddedHex, prefix = includePrefix) => {
    const num = parseInt(val, 10);
    if (isNaN(num)) {
      setCHex1("");
      return;
    }
    let hexStr = num.toString(16);
    if (padded) {
      hexStr = hexStr.padStart(64, "0");
    }
    const result = prefix ? `0x${hexStr}` : hexStr;
    setCHex1(result);
  };

  const hexStrToNumber = (val = hex1) => {
    const cleanHex = val.trim().replace(/^0x/i, "");
    if (!cleanHex) {
      setCNum("");
      return;
    }
    const num = parseInt(cleanHex, 16);
    if (isNaN(num)) {
      setCNum("Invalid hexadecimal string");
    } else {
      setCNum(num.toString());
    }
  };

  const copyResult = (text: string, label: string) => {
    copy(text);
    setCopiedKey(label);
    showToast(`Copied ${label}!`, "success");
    setTimeout(() => {
      setCopiedKey((curr) => (curr === label ? null : curr));
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 1. Number to Hex-String */}
      <div className="p-6 rounded-2xl bg-base-100 border border-base-content/10 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="p-2 rounded-xl bg-primary/10 text-primary">
              <CodeBracketIcon className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-base-content">
                Decimal Integer → Hex String
              </h3>
              <p className="text-xs text-base-content/60">
                Convert base-10 number to hexadecimal
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-5">
            <div>
              <label className="block text-xs font-semibold text-base-content/70 mb-1">
                Decimal Number
              </label>
              <input
                type="number"
                placeholder="e.g. 255"
                className="input input-bordered w-full font-mono text-sm rounded-xl bg-base-200/50 focus:bg-base-100 focus:border-primary"
                value={num1}
                onChange={(e) => {
                  setNum1(e.target.value);
                  numberToHexStr(e.target.value, isPaddedHex, includePrefix);
                }}
              />
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs">
              <label className="label cursor-pointer gap-2 p-0">
                <input
                  type="checkbox"
                  checked={includePrefix}
                  className="checkbox checkbox-primary checkbox-xs rounded"
                  onChange={(e) => {
                    setIncludePrefix(e.target.checked);
                    numberToHexStr(num1, isPaddedHex, e.target.checked);
                  }}
                />
                <span className="label-text text-xs text-base-content/80">
                  Include 0x prefix
                </span>
              </label>

              <label className="label cursor-pointer gap-2 p-0">
                <input
                  type="checkbox"
                  checked={isPaddedHex}
                  className="checkbox checkbox-primary checkbox-xs rounded"
                  onChange={(e) => {
                    setIsPaddedHex(e.target.checked);
                    numberToHexStr(num1, e.target.checked, includePrefix);
                  }}
                />
                <span className="label-text text-xs text-base-content/80">
                  Pad to 64 chars (32 bytes)
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Result */}
        {cHex1 && (
          <div className="p-4 rounded-xl bg-base-200/60 border border-base-content/10">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-base-content/60 uppercase tracking-wider">
                Hexadecimal Output
              </span>
              <button
                type="button"
                onClick={() => copyResult(cHex1, "Hex Output")}
                className="btn btn-ghost btn-xs gap-1 text-[11px] text-base-content/60 hover:text-primary"
              >
                {copiedKey === "Hex Output" ? (
                  <CheckIcon className="w-3.5 h-3.5 text-success" />
                ) : (
                  <ClipboardDocumentIcon className="w-3.5 h-3.5" />
                )}
                <span>{copiedKey === "Hex Output" ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <p className="font-mono text-sm text-base-content font-bold break-all bg-base-100 p-2.5 rounded-lg border border-base-content/5 select-all">
              {cHex1}
            </p>
          </div>
        )}
      </div>

      {/* 2. Hex-String to Number */}
      <div className="p-6 rounded-2xl bg-base-100 border border-base-content/10 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="p-2 rounded-xl bg-primary/10 text-primary">
              <CodeBracketIcon className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-base-content">
                Hex String → Decimal Integer
              </h3>
              <p className="text-xs text-base-content/60">
                Supports optional 0x prefix and arbitrary length
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-5">
            <div>
              <label className="block text-xs font-semibold text-base-content/70 mb-1">
                Hexadecimal String
              </label>
              <input
                type="text"
                placeholder="e.g. 0xff or ff"
                className="input input-bordered w-full font-mono text-sm rounded-xl bg-base-200/50 focus:bg-base-100 focus:border-primary"
                value={hex1}
                onChange={(e) => {
                  setHex1(e.target.value);
                  hexStrToNumber(e.target.value);
                }}
              />
            </div>
          </div>
        </div>

        {/* Result */}
        {cNum && (
          <div className="p-4 rounded-xl bg-base-200/60 border border-base-content/10">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-base-content/60 uppercase tracking-wider">
                Decimal Integer Output
              </span>
              <button
                type="button"
                onClick={() => copyResult(cNum, "Decimal Number")}
                className="btn btn-ghost btn-xs gap-1 text-[11px] text-base-content/60 hover:text-primary"
              >
                {copiedKey === "Decimal Number" ? (
                  <CheckIcon className="w-3.5 h-3.5 text-success" />
                ) : (
                  <ClipboardDocumentIcon className="w-3.5 h-3.5" />
                )}
                <span>{copiedKey === "Decimal Number" ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <p className="font-mono text-base text-primary font-bold break-all bg-base-100 p-2.5 rounded-lg border border-base-content/5 select-all">
              {cNum}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
