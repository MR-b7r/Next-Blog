import React from "react";
import AuthForm from "@/components/AuthForm";

function SignUp() {
  return (
    <div className="flex-center size-full max-sm:px-6">
      <AuthForm type="sign-up" />
    </div>
  );
}

export default SignUp;
