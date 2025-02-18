import type { Metadata } from "next";
import TimeConverter from "./_components/TimeConverter";

export const metadata: Metadata = {
  title: "Time Converter",
  description: "Convert between Unix-time and Calendar-time",
};

export default function Coverter() {
  return <TimeConverter />;
}
