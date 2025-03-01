"use client";
import React, { useEffect } from "react";

import { updateProfile } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomForm from "./CustomForm";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks";
// import {
//   updateEnd,
//   updateFailure,
//   updateStart,
//   updateSuccess,
// } from "@/lib/features/user/userSlice";
import { updateUser } from "@/lib/actions/user.actions";
import toast from "react-hot-toast";
import DeleteUser from "./DeleteUser";
import { FormFieldType } from "./AuthForm";

const DashProfile = ({ currentUser }) => {
  // const dispatch = useAppDispatch();
  // const {
  //   loading,
  //   error: errorMessage,
  //   currentUser,
  // } = useAppSelector((state) => state.user);
  const router = useRouter();
  const formSchema = updateProfile();
  // 1. Define the form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: currentUser?.username,
      email: currentUser?.email,
    },
  });
  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      // dispatch(updateStart());
      if (!data.profilePicture)
        data.profilePicture = currentUser?.profilePicture;
      // Update Account
      if (data) {
        const updateData = {
          _id: currentUser?._id!,
          username: data.username || currentUser?.username,
          email: data.email || currentUser?.username,
          password: data.password,
          profilePicture: data?.profilePicture || currentUser?.profilePicture,
        };

        const updatedUser = await updateUser(updateData);
        // dispatch(updateSuccess(updatedUser));
        toast.success("profile updated successfully");
      }
    } catch (error: any) {
      // dispatch(updateFailure(error.message));
      toast.error(`Error: ${error.message}`);
    } finally {
      // dispatch(updateEnd());
    }
  };

  // useEffect(() => {
  //   if (!currentUser || currentUser == null) {
  //     router.push("/");
  //   }
  // }, [currentUser, router]);

  return (
    <div className="max-w-lg mx-auto p-3 w-full mb-5">
      <h1 className="my-7 text-center font-semibold text-3xl text-gray-900 dark:text-gray-200">
        {currentUser?.username}&apos;s profile
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <CustomForm
            fieldType={FormFieldType.IMAGE}
            control={form.control}
            name="profilePicture"
          />
          <CustomForm
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="username"
            label="username"
          />
          <CustomForm
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="email"
          />
          <CustomForm
            fieldType={FormFieldType.PASSWORD}
            control={form.control}
            name="password"
            label="password"
          />

          <Button
            // disabled={loading}
            type="submit"
            className="text-16 rounded-lg  logo-gradient font-semibold text-white"
          >
            {false ? (
              <>
                <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
              </>
            ) : (
              "Update"
            )}
          </Button>

          {currentUser?.isAdmin && (
            <Link href={"/create-post"} className="w-fit">
              <Button className="text-16 rounded-lg font-semibold text-gray-900 bg-gray-200 dark:text-white dark:bg-gray-800 hover:logo-gradient w-fit">
                Create a Blug
              </Button>
            </Link>
          )}
        </form>
      </Form>

      <DeleteUser currentUser={currentUser} />
    </div>
  );
};

export default DashProfile;
