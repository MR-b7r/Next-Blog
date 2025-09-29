import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import googleIcon from "@/public/google.svg";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";

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
      className={`text-16 rounded-lg font-semibold text-dark-300 bg-gray-100 dark:text-white dark:bg-dark-400 w-full transition duration-200 hover:border-2 border-green-500 hover:bg-gary-100  `}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 size={20} className="animate-spin mr-2" />
      ) : (
        <Image
          src={googleIcon}
          width={20}
          height={20}
          alt="google"
          className="mr-2"
        />
      )}
      continue with google
    </Button>
  );
};

export default OAuth;
