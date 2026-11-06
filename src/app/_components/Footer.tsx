import Link from "next/link";
import { ShieldCheckIcon, SparklesIcon, CodeBracketIcon } from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <footer className="border-t border-base-content/10 bg-base-200/50 text-base-content/70 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-primary/10 text-primary">
              <SparklesIcon className="w-5 h-5" />
            </span>
            <span className="font-semibold text-base-content text-sm">DevTools Hub</span>
            <span className="text-xs text-base-content/50">| Client-side utility suite</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-base-content/70">
            <div className="flex items-center gap-1.5 text-success">
              <ShieldCheckIcon className="w-4 h-4" />
              <span>100% Client-Side Processing</span>
            </div>
            <span className="text-base-content/20">•</span>
            <div className="flex items-center gap-1.5">
              <CodeBracketIcon className="w-4 h-4" />
              <span>No data logged or transmitted</span>
            </div>
          </div>

          <div className="text-xs text-base-content/50 text-center md:text-right">
            <span>Open Source on </span>
            <a
              href="https://github.com/YoungMahesh/tools"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
