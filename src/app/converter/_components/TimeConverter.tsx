"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import { useToast } from "@/app/_components/ToastProvider";
import {
  ClockIcon,
  CalendarDaysIcon,
  ClipboardDocumentIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

function formatTimestampData(seconds: number) {
  if (isNaN(seconds)) {
    return { local: "", utc: "", relative: "" };
  }
  const d = new Date(seconds * 1000);
  const local = d.toLocaleString(undefined, { dateStyle: "full", timeStyle: "long" });
  const utc = d.toUTCString();

  const diff = Math.floor(seconds - Date.now() / 1000);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  let relative = "";
  if (Math.abs(diff) < 60) {
    relative = rtf.format(diff, "second");
  } else if (Math.abs(diff) < 3600) {
    relative = rtf.format(Math.round(diff / 60), "minute");
  } else if (Math.abs(diff) < 86400) {
    relative = rtf.format(Math.round(diff / 3600), "hour");
  } else {
    relative = rtf.format(Math.round(diff / 86400), "day");
  }

  return { local, utc, relative };
}

export default function TimeConverter() {
  const { showToast } = useToast();

  const [unixInput, setUnixInput] = useState<string>("1700000000");
  const [formattedTimes, setFormattedTimes] = useState(() =>
    formatTimestampData(1700000000)
  );
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Calendar to Unix
  const [date, setDate] = useState<Date | null>(() => new Date(1700000000 * 1000));
  const [convertedSeconds, setConvertedSeconds] = useState<string>("1700000000");

  const handleTimestampChange = (val: string) => {
    setUnixInput(val);
    const num = parseInt(val, 10);
    setFormattedTimes(formatTimestampData(num));
  };

  const setTimestampToNow = () => {
    const now = Math.floor(Date.now() / 1000);
    setUnixInput(now.toString());
    setFormattedTimes(formatTimestampData(now));
    showToast("Updated to current Unix timestamp", "info");
  };

  const pasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const num = parseInt(text.trim(), 10);
      if (!isNaN(num)) {
        setUnixInput(num.toString());
        setFormattedTimes(formatTimestampData(num));
        showToast("Pasted timestamp from clipboard!", "success");
      } else {
        showToast("Clipboard does not contain a valid number", "error");
      }
    } catch {
      showToast("Could not access clipboard", "error");
    }
  };

  const copyResult = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    showToast(`Copied ${label}!`, "success");
    setTimeout(() => {
      setCopiedKey((curr) => (curr === label ? null : curr));
    }, 2000);
  };

  const handleCalendarConvert = (selected: Date | null) => {
    setDate(selected);
    if (selected) {
      const sec = Math.floor(selected.getTime() / 1000);
      setConvertedSeconds(sec.toString());
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 1. Unix Timestamp to Calendar */}
      <div className="p-6 rounded-2xl bg-base-100 border border-base-content/10 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="p-2 rounded-xl bg-primary/10 text-primary">
              <ClockIcon className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-base-content">
                Unix Timestamp → Human Date
              </h3>
              <p className="text-xs text-base-content/60">
                Seconds elapsed since Jan 01 1970 (UTC)
              </p>
            </div>
          </div>

          <div className="space-y-3 mb-5">
            <div className="relative">
              <input
                type="number"
                placeholder="e.g. 1700000000"
                className="input input-bordered w-full font-mono text-sm rounded-xl bg-base-200/50 focus:bg-base-100 focus:border-primary pr-20"
                value={unixInput}
                onChange={(e) => handleTimestampChange(e.target.value)}
              />
              <button
                type="button"
                onClick={setTimestampToNow}
                className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-xs btn-primary rounded-lg font-medium"
              >
                Now
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={pasteClipboard}
                className="btn btn-xs btn-ghost border border-base-content/10 rounded-lg text-base-content/70 hover:text-base-content"
              >
                Paste
              </button>
              <button
                type="button"
                onClick={() => {
                  const num = (parseInt(unixInput, 10) || 0) + 3600;
                  setUnixInput(num.toString());
                  setFormattedTimes(formatTimestampData(num));
                }}
                className="btn btn-xs btn-ghost border border-base-content/10 rounded-lg text-base-content/70 hover:text-base-content"
              >
                +1 Hour
              </button>
              <button
                type="button"
                onClick={() => {
                  const num = (parseInt(unixInput, 10) || 0) + 86400;
                  setUnixInput(num.toString());
                  setFormattedTimes(formatTimestampData(num));
                }}
                className="btn btn-xs btn-ghost border border-base-content/10 rounded-lg text-base-content/70 hover:text-base-content"
              >
                +1 Day
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {formattedTimes.local && (
          <div className="p-4 rounded-xl bg-base-200/60 border border-base-content/10 space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-semibold text-base-content/60 uppercase tracking-wider">
                  Local Timezone
                </span>
                <button
                  type="button"
                  onClick={() => copyResult(formattedTimes.local, "Local Date")}
                  className="btn btn-ghost btn-xs gap-1 text-[11px] text-base-content/60 hover:text-primary"
                >
                  {copiedKey === "Local Date" ? (
                    <CheckIcon className="w-3.5 h-3.5 text-success" />
                  ) : (
                    <ClipboardDocumentIcon className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedKey === "Local Date" ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-base-content font-mono">
                {formattedTimes.local}
              </p>
            </div>

            <div className="pt-2 border-t border-base-content/10">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-semibold text-base-content/60 uppercase tracking-wider">
                  UTC Time (GMT)
                </span>
                <button
                  type="button"
                  onClick={() => copyResult(formattedTimes.utc, "UTC Date")}
                  className="btn btn-ghost btn-xs gap-1 text-[11px] text-base-content/60 hover:text-primary"
                >
                  {copiedKey === "UTC Date" ? (
                    <CheckIcon className="w-3.5 h-3.5 text-success" />
                  ) : (
                    <ClipboardDocumentIcon className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedKey === "UTC Date" ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-base-content font-mono">
                {formattedTimes.utc}
              </p>
            </div>

            {formattedTimes.relative && (
              <div className="pt-2 border-t border-base-content/10 flex items-center justify-between text-xs text-base-content/60">
                <span>Relative:</span>
                <span className="badge badge-sm badge-neutral font-medium">
                  {formattedTimes.relative}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 2. Calendar to Unix Timestamp */}
      <div className="p-6 rounded-2xl bg-base-100 border border-base-content/10 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="p-2 rounded-xl bg-primary/10 text-primary">
              <CalendarDaysIcon className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-base-content">
                Human Date → Unix Timestamp
              </h3>
              <p className="text-xs text-base-content/60">
                Pick a date & time to calculate the exact epoch seconds
              </p>
            </div>
          </div>

          <div className="space-y-3 mb-5">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="flex-1 [&_.react-datepicker-wrapper]:w-full">
                <DatePicker
                  showTimeSelect
                  selected={date}
                  onChange={handleCalendarConvert}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  showYearDropdown
                  className="input input-bordered w-full text-sm rounded-xl bg-base-200/50 focus:bg-base-100 focus:border-primary font-mono cursor-pointer"
                />
              </div>
              <button
                type="button"
                onClick={() => handleCalendarConvert(new Date())}
                className="btn btn-neutral btn-sm rounded-xl"
              >
                Set to Now
              </button>
            </div>
          </div>
        </div>

        {/* Converted timestamp result */}
        {convertedSeconds && (
          <div className="p-4 rounded-xl bg-base-200/60 border border-base-content/10 space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-semibold text-base-content/60 uppercase tracking-wider">
                  Epoch Timestamp (Seconds)
                </span>
                <button
                  type="button"
                  onClick={() => copyResult(convertedSeconds, "Unix Seconds")}
                  className="btn btn-ghost btn-xs gap-1 text-[11px] text-base-content/60 hover:text-primary"
                >
                  {copiedKey === "Unix Seconds" ? (
                    <CheckIcon className="w-3.5 h-3.5 text-success" />
                  ) : (
                    <ClipboardDocumentIcon className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedKey === "Unix Seconds" ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <p className="text-lg font-bold text-primary font-mono select-all">
                {convertedSeconds}
              </p>
            </div>

            <div className="pt-2 border-t border-base-content/10">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-semibold text-base-content/60 uppercase tracking-wider">
                  Milliseconds (JS timestamp)
                </span>
                <button
                  type="button"
                  onClick={() =>
                    copyResult(`${convertedSeconds}000`, "Unix Milliseconds")
                  }
                  className="btn btn-ghost btn-xs gap-1 text-[11px] text-base-content/60 hover:text-primary"
                >
                  {copiedKey === "Unix Milliseconds" ? (
                    <CheckIcon className="w-3.5 h-3.5 text-success" />
                  ) : (
                    <ClipboardDocumentIcon className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedKey === "Unix Milliseconds" ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <p className="text-xs font-mono text-base-content/80 select-all">
                {convertedSeconds}000
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
