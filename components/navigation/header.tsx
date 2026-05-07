"use client";

import { ChevronDown } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full h-[68px] px-3 sm:px-4 flex items-center bg-white">
      <Link className="text-gray-900 text-2xl font-semibold" href="/">
        ticktock
      </Link>
      <ul className="pl-4 sm:pl-8 grow">
        <li>
          <Link
            className="text-sm font-medium text-gray-900 hover:text-primary-700"
            href="/"
          >
            Timesheets
          </Link>
        </li>
      </ul>
      <div className="flex gap-1 text-gray-500 items-center cursor-pointer hover:opacity-75">
        <h5 className="font-medium text-sm sm:text-base">
          {session?.user?.name || "Anonymous"}
        </h5>
        <ChevronDown className="size-4 sm:size-5 stroke-3" />
      </div>
    </header>
  );
}

export default Header;
