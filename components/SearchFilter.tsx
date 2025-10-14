"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { filterschema } from "@/lib/utils";
import { Input } from "./ui/input";
import toast from "react-hot-toast";
import { categoriesNames } from "@/lib/constants";

const SearchFilter = () => {
  const pathName = usePathname();
  const router = useRouter();

  const formSchema = filterschema();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchTerm: "",
      sort: "desc",
      category: "all",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const params = new URLSearchParams(data);
      router.replace(`${pathName}?${params.toString()}`, { scroll: false });
    } catch (error: any) {
      toast.error(`cannot find Blog with this specifications`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="px-3 py-5">
        <nav className="flex justify-end items-center max-md:flex-col gap-3">
          <div className="relative block">
            <FormField
              control={form.control}
              name="searchTerm"
              render={({ field }) => (
                <FormControl>
                  <Input
                    type="text"
                    className=" text-dark-400  border bg-gray-50 outline-none dark:bg-dark-400 dark:border-gray-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-0 dark:focus:border-green-500
                    py-3 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-green-500 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none  dark:focus:ring-neutral-600"
                    style={{ boxShadow: "none" }}
                    placeholder="Search Term"
                    {...field}
                  />
                </FormControl>
              )}
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap max-md:flex-col">
            <ul className="flex flex-nowrap py-1">
              <FormField
                control={form.control}
                name="sort"
                render={({ field }) => (
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px] shad-select-trigger">
                        <SelectValue placeholder="Select the date" />
                      </SelectTrigger>
                      <SelectContent className="shad-select-content">
                        <SelectItem value="desc" className="shad-select-item">
                          Newest
                        </SelectItem>
                        <SelectItem value="asc" className="shad-select-item">
                          Oldest
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                )}
              />
            </ul>

            <ul className="flex flex-nowrap py-1 md:justify-end">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px] shad-select-trigger">
                        <SelectValue placeholder="Select the date" />
                      </SelectTrigger>
                      <SelectContent className="shad-select-content">
                        <SelectItem value="all" className="shad-select-item">
                          All
                        </SelectItem>
                        {categoriesNames.map((category) => (
                          <SelectItem
                            value={category}
                            key={category}
                            className="shad-select-item"
                          >
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                )}
              />
            </ul>

            <Button
              type="submit"
              className="text-16 rounded-sm logo-gradient font-semibold text-white"
            >
              Apply
            </Button>
          </div>
        </nav>
      </form>
    </Form>
  );
};

export default SearchFilter;
