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

const HeaderProfile = ({ currentUser }) => {
  return (
    <div className="flex gap-2">
      <ThemeSwitcher />

      {currentUser ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            {currentUser?.profilePicture ? (
              <div className="flex items-center justify-center">
                <img
                  src={currentUser?.profilePicture}
                  className="h-10 w-10 rounded-full object-cover"
                />
              </div>
            ) : (
              "Profile"
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="absolute top-0 -right-10">
            <DropdownMenuLabel className="!font-normal !text-[13px]">
              {currentUser?.username}
            </DropdownMenuLabel>
            <DropdownMenuLabel>{currentUser?.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href={"/dashboard"}
                className="flex items-center gap-1 w-full"
              >
                <UserIcon width={20} />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SignoutUser icon={true} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          href="/sign-in"
          className="text-16 rounded-md font-semibold text-gray-900 dark:text-white bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-900  py-2 px-3"
        >
          Sign In
        </Link>
      )}
    </div>
  );
};

export default HeaderProfile;
