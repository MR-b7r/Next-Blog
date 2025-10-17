"use client";
import React, { useEffect, useState } from "react";
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
import { useSession } from "next-auth/react";

const DashProfile = () => {
  const { data: session, update } = useSession();
  const user = session?.user;
  console.log(user);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const formSchema = updateProfile();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profilePicture: user?.profilePicture,
      username: user?.username,
      email: user?.email,
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (!user || !user.id) return;
      setIsLoading(true);

      if (data) {
        const updateData: User = {
          ...user,
          username: data.username,
          email: data.email ?? user?.email ?? "",
          password: data.password ?? "",
          profilePicture: data.profilePicture ?? user?.profilePicture ?? "",
        };
        await updateUser(updateData);

        await update({ ...session?.user, ...data });
        toast.success("profile updated successfully");
        router.refresh();
      }
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      form.reset({
        profilePicture: user.profilePicture || "",
        username: user.username || "",
        email: user.email || "",
      });
    }
  }, [user]);

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
          disabled={isLoading}
        />
        <CustomForm
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="email"
          disabled={true}
        />
        <CustomForm
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="username"
          label="username"
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
