"use client";

import { authFormSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomForm from "./CustomForm";
import { Loader2 } from "lucide-react";
import { userSignIn, userSignUp } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

import OAuth from "./OAuth";
import toast from "react-hot-toast";

export enum FormFieldType {
  INPUT = "input",
  PASSWORD = "password",
  TEXTAREA = "textarea",
  SELECT = "select",
  IMAGE = "image",
}

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      // Sign up
      console.log(data);
      if (type === "sign-up") {
        const userData = {
          username: data.username!,
          email: data.email,
          password: data.password,
        };
        const newUser = await userSignUp(userData);

        setUser(newUser);
        const response = await userSignIn({
          email: data.email,
          password: data.password,
        });
        if (response) toast.success("A new Account created successfully");
        if (response) router.push("/");
      }
      // Sign In
      if (type === "sign-in") {
        const getUser = await userSignIn({
          email: data.email,
          password: data.password,
        });
        // console.log(response);
        if (!getUser)
          toast.error("cannot get the user. Email or Password is incorrect");
        setUser(getUser);
        router.refresh();
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div className=" w-full">
      <div className="flex p-5 max-w-3xl mx-auto flex-col md:flex-row md:items-center md:gap-10 gap-7">
        {/* left */}
        <div className="md:flex-1">
          <Link
            href="/"
            className="font-bold dark:text-white sm:text-4xl text-2xl text-gray-700"
          >
            <span className="px-2 py-1 logo-gradient rounded-lg text-white">
              Dev&apos;s
            </span>
            Blog
          </Link>
        </div>

        {/* right */}
        <div className="flex-1 ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              {type === "sign-up" && (
                <CustomForm
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="username"
                  label="username"
                  placeholder=""
                />
              )}
              <CustomForm
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="email"
                label="email"
                placeholder="b7r@dev.net"
              />
              <CustomForm
                fieldType={FormFieldType.PASSWORD}
                control={form.control}
                name="password"
                label="password"
                placeholder=""
              />
              <div className="flex flex-col gap-4 ">
                <Button
                  type="submit"
                  className="text-16 rounded-lg  logo-gradient font-semibold text-white"
                >
                  {false ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <div className="w-full my-3">
            <OAuth />
          </div>
          <div className="flex gap-2 text-sm mt-5">
            {type === "sign-in" ? (
              <>
                <span>Don&apos;t Have an account?</span>
                <Link href="/sign-up" className="text-green-500 underline">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                <span>Already Have an account?</span>
                <Link href="/sign-in" className="text-green-500">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
