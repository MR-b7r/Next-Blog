"use client";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const navElements = [
  { name: "Home", link: "/" },
  { name: "About", link: "#" },
  { name: "Projects", link: "#" },
];
const MobNav = () => {
  const [isCollapse, setIsCollapse] = useState(true);
  const ref = React.useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsCollapse(true);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);

  return (
    <>
      <button
        // ref={ref}
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
        <ul className="flex flex-col md:p-0 mt-4 font-medium border border-gray-300 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
          {navElements.map((el) => (
            <li key={el.name}>
              <Link
                href={el.link}
                className="block py-2 px-3 text-gray-800 rounded hover:bg-gray-200 dark:hover:bg-dark-500 md:hover:bg-transparent dark:md:hover:bg-transparent md:p-0 hover:text-green-500 dark:text-gray-100 dark:hover:text-green-500  dark:border-gray-700"
              >
                {el.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MobNav;
