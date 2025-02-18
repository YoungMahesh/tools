"use client";
import { Bars3Icon, WrenchScrewdriverIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageList } from "../_lib/pagelist";
import Image from "next/image";

export default function Header() {
  const router = useRouter();

  return (
    <header className="navbar ">
      <div className="flex-1 px-2 lg:flex-none">
        <WrenchScrewdriverIcon
          className="h-10 w-10 cursor-pointer text-green-400"
          onClick={() => router.push("/")}
        />
      </div>
      <div className="flex flex-1 justify-end px-2">
        <div className="flex items-center">
          <Image
            src="/github.svg"
            width={27}
            height={27}
            alt="github"
            className="cursor-pointer"
            onClick={() =>
              window.open("https://github.com/YoungMahesh/tools", "_blank")
            }
          />
          <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn-ghost rounded-btn btn">
              <Bars3Icon className="h-10 w-10 cursor-pointer text-green-400" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box mt-4 w-52 bg-base-100 p-2 shadow"
            >
              {PageList.map((item) => (
                <li key={item.link}>
                  <Link href={item.link}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
