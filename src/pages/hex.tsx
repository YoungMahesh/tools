import Head1 from "../components/common/Head1";
import HexConverter from "../components/hex/hexConverter";

export default function Coverter() {
  return (
    <>
      <Head1
        title="Hex Converter"
        description="Convert between hex-string and number"
      />

      <HexConverter />
    </>
  );
}
