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
import { userSignIn } from "@/lib/actions/user.actions";
// import { SessionProvider, useSession } from "next-auth/react";

const HeaderProfile = ({ currentUser }) => {
  // const session = await auth();
  // let currentUser;
  // if (session) {
  //   currentUser = await userSignIn(session?.user, true);
  // }
  // console.log(currentUser);
  return (
    <div className="flex gap-2 ">
      <ThemeSwitcher />

      {currentUser ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            {currentUser?.profilePicture ? (
              <img
                src={currentUser.profilePicture}
                width={40}
                height={40}
                alt="profile"
                className="rounded-full"
              />
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
