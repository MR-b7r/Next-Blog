"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="p-2 border border-gray-300 rounded-full bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 duration-200 dark:border-gray-600  dark:text-white flex-center cursor-pointer"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <button className="w-5 h-5 ">
        {theme === "light" ? <MoonIcon /> : <SunIcon />}
      </button>
    </div>
  );
}
