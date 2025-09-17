import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import HeaderProfile from "./HeaderProfile";
import SearchBar from "./SearchBar";
import MobNav from "./MobNav";
import { auth } from "@/lib/auth";
import { userSignIn } from "@/lib/actions/user.actions";
const Navbar = async () => {
  const session = await auth();
  let currentUser;
  if (session) {
    currentUser = await userSignIn(session?.user, true);
  }
  return (
    <nav className="bg-gray-100 dark:bg-dark-200 w-full">
      <div className="max-w-screen-xl flex items-center justify-between flex-wrap mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse self-center whitespace-nowrap text-sm sm:text-xl font-semibold text-gray-700 dark:text-white"
        >
          <span className="px-2 py-1  logo-gradient rounded-lg text-white">
            Dev&apos;s
          </span>
          Blog
        </Link>

        <div className="flex max-md:order-1">
          <Link
            href={"/search"}
            className="md:hidden text-dark-500 dark:text-dark-400 hover:bg-green-800 dark:hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-800 dark:focus:ring-green-700 rounded-lg text-sm p-2.5 me-1"
          >
            <MagnifyingGlassIcon type="button" className="w-5 h-5 " />
          </Link>
          <SearchBar />
        </div>
        <MobNav />
        <HeaderProfile currentUser={currentUser} />
      </div>
    </nav>
  );
};

export default Navbar;
