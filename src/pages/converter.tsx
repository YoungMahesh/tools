import Head1 from "../components/common/Head1";
import TimeConverter from "../components/converter/timeConverter";

export default function Coverter() {
  return (
    <>
      <Head1
        title="Time Converter"
        description="Convert between Unix-time and Calendar-time"
      />

      <TimeConverter />
    </>
  );
}
