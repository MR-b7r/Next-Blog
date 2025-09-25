import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import googleWhite from "@/public/googleWhite.svg";
import { signIn } from "next-auth/react";

const OAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleProvider = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    e.preventDefault();
    await signIn("google", { callbackUrl: "/" });
    setIsLoading(false);
  };

  return (
    <Button
      onClick={(e) => handleProvider(e)}
      className={`text-16 rounded-lg font-semibold text-gray-900 bg-gray-200 dark:text-white dark:bg-gray-800 hover:logo-gradient w-full`}
      disabled={isLoading}
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
