import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import SignoutUser from "./SignoutUser";
import { auth } from "@/lib/auth";

const HeaderProfile = async () => {
  const session = await auth();
  const user = session?.user;
  return (
    <div className="flex gap-2 items-center justify-between">
      <ThemeSwitcher />

      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            {user?.profilePicture ? (
              <div className="flex items-center justify-center">
                <img
                  src={user?.profilePicture}
                  className="h-10 w-10 rounded-full object-cover"
                />
              </div>
            ) : (
              "Profile"
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="absolute top-0 -right-10 dark:bg-dark-200">
            <DropdownMenuLabel className="!font-normal !text-[13px] text-dark-400 dark:text-gray-100">
              {user?.username}
            </DropdownMenuLabel>
            <DropdownMenuLabel className="text-dark-300 dark:text-gray-50">
              {user?.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:!bg-green-200 dark:hover:!bg-green-600">
              <Link
                href={"/dashboard"}
                className="flex items-center gap-1 w-full"
              >
                <UserIcon width={20} />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:!bg-green-200 dark:hover:!bg-green-600">
              <SignoutUser icon={true} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          href="/sign-in"
          className="text-16 font-semibold py-2 px-3 rounded-lg transition-colors duration-150 hover:text-gray-50 hover:bg-gradient-to-r from-[#43b692] to-[#099773] text-dark-300 dark:text-gray-100 border-2 border-green-500"
        >
          Sign In
        </Link>
      )}
    </div>
  );
};

export default HeaderProfile;
