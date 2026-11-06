"use client";

import { useState, useSyncExternalStore } from "react";
import { SwatchIcon } from "@heroicons/react/24/outline";

export const THEMES = [
  { id: "forest", label: "Forest (Default)" },
  { id: "night", label: "Night" },
  { id: "dracula", label: "Dracula" },
  { id: "dim", label: "Dim" },
  { id: "dark", label: "Dark" },
  { id: "emerald", label: "Emerald" },
  { id: "synthwave", label: "Synthwave" },
  { id: "nord", label: "Nord" },
  { id: "light", label: "Light" },
];

function subscribe() {
  return () => {};
}

export default function ThemeSelector() {
  const isClient = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  const [currentTheme, setCurrentTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("app_theme") || "forest";
    }
    return "forest";
  });

  const changeTheme = (theme: string) => {
    setCurrentTheme(theme);
    if (typeof window !== "undefined") {
      localStorage.setItem("app_theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
    }
  };

  if (!isClient) {
    return (
      <button className="btn btn-ghost btn-circle btn-sm" aria-label="Theme">
        <SwatchIcon className="w-5 h-5 text-base-content/70" />
      </button>
    );
  }

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-sm gap-1.5 px-2.5 rounded-lg border border-base-content/10 hover:border-base-content/20"
        title="Change Theme"
      >
        <SwatchIcon className="w-4 h-4 text-primary" />
        <span className="hidden sm:inline capitalize text-xs font-medium">
          {currentTheme}
        </span>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu menu-sm z-[60] mt-2 p-2 shadow-2xl bg-base-200 border border-base-content/10 rounded-box w-44 max-h-80 overflow-y-auto"
      >
        <li className="menu-title text-xs uppercase font-semibold text-base-content/60 px-2 py-1">
          Select Theme
        </li>
        {THEMES.map((theme) => (
          <li key={theme.id}>
            <button
              type="button"
              className={`flex items-center justify-between text-xs py-1.5 px-2.5 rounded-md ${
                currentTheme === theme.id ? "active font-bold" : ""
              }`}
              onClick={() => changeTheme(theme.id)}
            >
              <span>{theme.label}</span>
              {currentTheme === theme.id && (
                <span className="w-2 h-2 rounded-full bg-primary" />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
