"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  WrenchScrewdriverIcon,
  Bars3Icon,
  XMarkIcon,
  CommandLineIcon,
} from "@heroicons/react/24/outline";
import { PageList } from "../_lib/pagelist";
import ThemeSelector from "./ThemeSelector";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-base-content/10 bg-base-100/80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo & Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-1"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-content transition-all duration-200">
              <WrenchScrewdriverIcon className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-base-content group-hover:text-primary transition-colors flex items-center gap-1.5">
                DevTools
                <span className="badge badge-xs badge-primary font-normal">v1.3</span>
              </span>
              <span className="text-[11px] text-base-content/50 -mt-0.5 hidden sm:inline">
                Web3 • Finance • Utilities
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {PageList.map((item) => {
              const isActive = pathname === item.link;
              return (
                <Link
                  key={item.link}
                  href={item.link}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? "bg-primary text-primary-content shadow-sm"
                      : "text-base-content/75 hover:text-base-content hover:bg-base-200"
                  }`}
                >
                  {item.shortTitle || item.title}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons: Theme, GitHub, Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Theme Selector */}
            <ThemeSelector />

            {/* GitHub Repo */}
            <a
              href="https://github.com/YoungMahesh/tools"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              className="btn btn-ghost btn-sm btn-circle text-base-content/70 hover:text-base-content border border-base-content/10 hover:border-base-content/20"
              title="View on GitHub"
            >
              <Image
                src="/github.svg"
                width={18}
                height={18}
                alt="GitHub"
                className="opacity-80 hover:opacity-100 transition-opacity invert dark:invert-0"
              />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden btn btn-ghost btn-sm btn-circle border border-base-content/10"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="w-5 h-5" />
              ) : (
                <Bars3Icon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-base-content/10 py-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {PageList.map((item) => {
                const isActive = pathname === item.link;
                return (
                  <Link
                    key={item.link}
                    href={item.link}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-primary text-primary-content"
                        : "text-base-content/80 hover:bg-base-200"
                    }`}
                  >
                    <span>{item.title}</span>
                    <span
                      className={`badge badge-xs ${
                        isActive ? "badge-neutral" : "badge-ghost"
                      }`}
                    >
                      {item.badge}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
