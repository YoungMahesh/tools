import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{ minHeight: "100vh" }}
      className="prose max-w-full"
      data-theme="forest"
    >
      {children}
    </div>
  );
}
