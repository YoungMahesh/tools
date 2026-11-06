"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  ArrowRightIcon,
  SparklesIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  CommandLineIcon,
  CurrencyDollarIcon,
  ArrowsRightLeftIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { PageList, CATEGORIES, ToolPage } from "./_lib/pagelist";

const categoryIcons: Record<string, typeof CommandLineIcon> = {
  "/evm": CpuChipIcon,
  "/solana": CommandLineIcon,
  "/crypt": LockClosedIcon,
  "/fd": CurrencyDollarIcon,
  "/loan": CurrencyDollarIcon,
  "/converter": ArrowsRightLeftIcon,
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredTools = useMemo(() => {
    return PageList.filter((tool) => {
      const matchesCategory =
        selectedCategory === "All" || tool.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        tool.title.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-20 border-b border-base-content/10 bg-gradient-to-b from-base-200/50 to-base-100">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6">
            <SparklesIcon className="w-4 h-4" />
            <span>Fast • 100% Client-Side • Privacy-First</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-base-content mb-4">
            Developer & Financial{" "}
            <span className="text-primary bg-clip-text">
              Utilities
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-base-content/70 mb-8 leading-relaxed">
            A curated suite of fast, reliable tools for crypto wallet generation,
            amortization and compound interest calculations, timestamp conversions, and data cryptography.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative mb-6">
            <div className="relative flex items-center">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-4 text-base-content/40 pointer-events-none" />
              <input
                type="text"
                placeholder="Search tools by name, keyword, or tag (e.g. EVM, Loan, Unix)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input input-bordered w-full pl-11 pr-10 py-6 text-sm bg-base-100 shadow-sm rounded-2xl border-base-content/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 btn btn-ghost btn-xs btn-circle text-base-content/50 hover:text-base-content"
                  aria-label="Clear search"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`btn btn-xs sm:btn-sm rounded-xl font-medium transition-all ${
                  selectedCategory === cat
                    ? "btn-primary shadow-sm"
                    : "btn-ghost border border-base-content/10 text-base-content/70 hover:bg-base-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-base-content flex items-center gap-2">
            <span>Available Utilities</span>
            <span className="badge badge-sm badge-neutral font-mono">
              {filteredTools.length}
            </span>
          </h2>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="text-xs text-primary hover:underline font-medium"
            >
              Reset filters
            </button>
          )}
        </div>

        {filteredTools.length === 0 ? (
          <div className="text-center py-16 bg-base-200/50 rounded-2xl border border-dashed border-base-content/20">
            <MagnifyingGlassIcon className="w-10 h-10 mx-auto text-base-content/30 mb-3" />
            <h3 className="text-base font-semibold text-base-content mb-1">
              No matching tools found
            </h3>
            <p className="text-sm text-base-content/60 max-w-sm mx-auto mb-4">
              Try adjusting your search query or switching to another category.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="btn btn-sm btn-primary"
            >
              Show all tools
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.link} tool={tool} />
            ))}
          </div>
        )}

        {/* Feature Highlights Banner */}
        <div className="mt-16 pt-12 border-t border-base-content/10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-base-200/40 border border-base-content/5">
            <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
              <ShieldCheckIcon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-base-content mb-1">
                100% Client-Side Privacy
              </h4>
              <p className="text-xs text-base-content/65 leading-relaxed">
                Cryptographic keys and inputs are calculated exclusively in your browser memory. Nothing is sent to our servers.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-base-200/40 border border-base-content/5">
            <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
              <SparklesIcon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-base-content mb-1">
                Zero Configuration
              </h4>
              <p className="text-xs text-base-content/65 leading-relaxed">
                No account registration, no API tokens, and no setup required. Instant calculation and derivation out of the box.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-base-200/40 border border-base-content/5">
            <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
              <CpuChipIcon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-base-content mb-1">
                Modern Cryptography
              </h4>
              <p className="text-xs text-base-content/65 leading-relaxed">
                Built on industry-standard libraries including ethers.js, @solana/web3.js, bip39, and slip-10 derivation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ToolCard({ tool }: { tool: ToolPage }) {
  const Icon = categoryIcons[tool.link] || CommandLineIcon;

  return (
    <Link
      href={tool.link}
      className="group flex flex-col justify-between p-6 rounded-2xl bg-base-100 border border-base-content/10 hover:border-primary/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-content transition-colors duration-200">
            <Icon className="w-6 h-6" />
          </div>
          <span className="badge badge-sm badge-outline text-xs font-semibold text-base-content/70">
            {tool.badge}
          </span>
        </div>

        <h3 className="text-lg font-bold text-base-content group-hover:text-primary transition-colors mb-2">
          {tool.title}
        </h3>

        <p className="text-xs text-base-content/70 line-clamp-2 leading-relaxed mb-4">
          {tool.description}
        </p>
      </div>

      <div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tool.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2 py-0.5 rounded-md bg-base-200 text-base-content/70 font-mono"
            >
              {tag}
            </span>
          ))}
          {tool.tags.length > 3 && (
            <span className="text-[11px] px-1.5 py-0.5 text-base-content/40 font-mono">
              +{tool.tags.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
          <span>Launch Tool</span>
          <ArrowRightIcon className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}
