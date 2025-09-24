import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import googleWhite from "@/public/googleWhite.svg";
import { google } from "@/lib/actions/user.actions";

const OAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  async function handleOAuth() {
    setIsLoading(true);
    const user = await google();
    if (user) {
      // router.push("/");
      // router.refresh();
      setIsLoading(false);
    }
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
