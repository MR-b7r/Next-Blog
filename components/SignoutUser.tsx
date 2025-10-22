"use client";
import React from "react";
import { userSignOut } from "@/lib/actions/user.actions";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const SignoutUser = ({ icon, style }: { icon?: boolean; style?: string }) => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      // userSignOut();
      await signOut({ redirect: false });

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Link href="/" className="w-full">
      {icon ? (
        <div className="flex items-center gap-1 w-full" onClick={handleSignOut}>
          <ArrowLeftEndOnRectangleIcon width={20} />
          <span className={style}>Sign out</span>
        </div>
      ) : (
        <span className="cursor-pointer" onClick={handleSignOut}>
          Sign Out
        </span>
      )}
    </Link>
  );
};

export default SignoutUser;
