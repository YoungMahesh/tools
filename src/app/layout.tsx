import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { ToastProvider } from "./_components/ToastProvider";
import "react-datepicker/dist/react-datepicker.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | DevTools Hub",
    default: "DevTools Hub - Developer & Financial Utilities",
  },
  description: "Fast, client-side, privacy-first developer and financial utilities: EVM & Solana wallet generators, compound interest & loan calculators, time & hex converters, and cryptography.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="forest">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen flex flex-col bg-base-100 text-base-content selection:bg-primary/20 selection:text-primary`}
      >
        <ToastProvider>
          <Header />
          <div className="flex-1 w-full">
            {children}
          </div>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
