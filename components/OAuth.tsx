import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import googleWhite from "@/public/googleWhite.svg";
import { google } from "@/lib/actions/user.actions";
// import { getSession } from "next-auth/react";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks";
// import { signSuccess } from "@/lib/features/user/userSlice";

const OAuth = () => {
  // const dispatch = useAppDispatch();
  // const { loading } = useAppSelector((state) => state.user);
  async function handleOAuth() {
    const user = await google();
    // dispatch(signSuccess(user));
  }
  return (
    <Button
      onClick={handleOAuth}
      className={`text-16 rounded-lg font-semibold text-gray-900 bg-gray-200 dark:text-white dark:bg-gray-800 hover:logo-gradient w-full`}
      // disabled={loading}
    >
      <Image
        src={googleWhite}
        width={20}
        height={20}
        alt="google"
        className="mr-2"
      />
      continue with google
    </Button>
  );
};

export default OAuth;
