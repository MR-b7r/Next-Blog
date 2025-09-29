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
      className="w-10 h-10 flex items-center justify-center border border-green-500 rounded-full bg-gray-100 hover:bg-gray-50 dark:bg-dark-200 dark:hover:bg-dark-400 duration-200  dark:text-white cursor-pointer"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <button className="w-5 h-5">
        {theme === "light" ? <MoonIcon /> : <SunIcon />}
      </button>
    </div>
  );
}
