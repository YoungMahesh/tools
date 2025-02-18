import type { Metadata } from "next";
import TimeConverter from "./_components/TimeConverter";
import HexConverter from "./_components/HexConverter";

export const metadata: Metadata = {
  title: "Converter",
  description:
    "Convert between Unix-time and Calendar-time, hex-string and number",
};

export default function Coverter() {
  return (
    <div>
      <TimeConverter />
      <hr className="divider" />
      <HexConverter />
    </div>
  );
}
