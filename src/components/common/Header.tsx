import { useRouter } from "next/router";
import { Bars3Icon, WrenchScrewdriverIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

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
        <div className="flex items-stretch">
          <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn-ghost rounded-btn btn">
              <Bars3Icon className="h-10 w-10 cursor-pointer text-green-400" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box mt-4 w-52 bg-base-100 p-2 shadow"
            >
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/crypt">Crypt</Link>
              </li>
              <li>
                <Link href="/evm">EVM Wallets</Link>
              </li>
              <li>
                <a
                  href="https://github.com/YoungMahesh/tools"
                  target="_blank"
                  rel="noreferrer"
                >
                  Source Code
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
