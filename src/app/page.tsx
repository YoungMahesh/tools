import Link from "next/link";
import { PageList } from "./_lib/pagelist";

export default function Home() {
  return (
    <main className="flex flex-wrap justify-center p-4">
      {PageList.map((item) => (
        <Box1 key={item.link} link={item.link}>
          {item.title}
        </Box1>
      ))}
    </main>
  );
}

const Box1 = ({ children, link }: { children: string; link: string }) => {
  return (
    <div className="m-4 p-2">
      <h3>
        <Link href={link}>{children}</Link>
      </h3>
    </div>
  );
};
