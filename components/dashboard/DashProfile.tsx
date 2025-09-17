"use client";
import React, { useState } from "react";

import { updateProfile } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomForm from "../CustomForm";
import { Loader2 } from "lucide-react";
import { updateUser } from "@/lib/actions/user.actions";
import toast from "react-hot-toast";
import { FormFieldType } from "../AuthForm";
import { useRouter } from "next/navigation";

const DashProfile = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const formSchema = updateProfile();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: currentUser?.username,
      email: currentUser?.email,
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      if (!data.profilePicture)
        data.profilePicture = currentUser?.profilePicture;
      if (!data.password) data.password = currentUser?.password;
      if (data) {
        const updateData: User = {
          ...currentUser,
          username: data.username,
          email: data.email,
          password: data.password,
          profilePicture: data.profilePicture,
        };

        await updateUser(updateData);
        toast.success("profile updated successfully");
        router.refresh();
      }
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
          disabled={isLoading}
          type="submit"
          className="text-16 rounded-lg  logo-gradient font-semibold text-white"
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
            </>
          ) : (
            "Update"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default DashProfile;
