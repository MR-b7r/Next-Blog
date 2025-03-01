"use client";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useState } from "react";

const MobNav = () => {
  const [isCollapse, setIsCollapse] = useState(true);

  return (
    <>
      <button
        onClick={() => setIsCollapse(!isCollapse)}
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 mr-0"
      >
        <Bars3Icon className="w-5 h-5" />
      </button>
      <div
        className={`w-full md:flex-center md:w-auto max-md:order-4 ${
          isCollapse && "max-md:hidden"
        }`}
      >
        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-100 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800  dark:border-gray-700">
          <li>
            <Link
              href="/"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/projects"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              Projects
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MobNav;
