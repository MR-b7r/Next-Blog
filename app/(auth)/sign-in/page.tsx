import React from "react";
import AuthForm from "@/components/AuthForm";

function SignIn() {
  return (
    <div className="flex-center size-full max-sm:px-6">
      <AuthForm type="sign-in" />
    </div>
  );
}

export default SignIn;
