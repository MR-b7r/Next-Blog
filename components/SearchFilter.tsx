"use client";
import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { filterschema } from "@/lib/utils";
import { Input } from "./ui/input";
import toast from "react-hot-toast";

const SearchFilter = () => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const formSchema = filterschema();
  // 1. Define the form.
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
        <div className="relative block md:hidden ">
          <div className="absolute inset-y-0  flex items-center ps-3 pointer-events-none">
            <MagnifyingGlassIcon
              type="button"
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
            />
          </div>
          <FormField
            control={form.control}
            name="searchTerm"
            render={({ field }) => (
              <FormControl>
                <Input
                  type="text"
                  className="block w-full mb-3 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search..."
                  {...field}
                />
              </FormControl>
            )}
          />
        </div>
        <nav className="flex justify-between items-center ">
          <h2 className="md:block hidden text-3xl font-bold">Search results</h2>

          <div className="flex items-center gap-2 flex-wrap">
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
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select the date" />
                      </SelectTrigger>
                      <SelectContent className="flex flex-nowrap py-1">
                        <SelectItem value="desc">Newest</SelectItem>
                        <SelectItem value="asc">Oldest</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                )}
              />
              {/* <li className=" group px-3 py-2  hover:bg-gray-200 dark:hover:bg-gray-950 duration-200 rounded-md cursor-pointer">
            <Link href={`#`} className="w-full">
              <span className="text-gray-950 dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-600 duration-200 rounded-md">
                Newest
              </span>
            </Link>
          </li>

          <li className="group px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-950 duration-200 rounded-md cursor-pointer">
            <Link href={`#`} className="w-full">
              <span className="text-gray-950 dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-600 duration-200 rounded-md">
                Oldest
              </span>
            </Link>
          </li> */}
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
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select the date" />
                      </SelectTrigger>
                      <SelectContent className="flex flex-nowrap py-1">
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="javascript">Javascript</SelectItem>
                        <SelectItem value="reactjs">ReactJs</SelectItem>
                        <SelectItem value="nextjs">NextJs</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                )}
              />
              {/* <li className="group px-3 py-2  hover:bg-gray-200 dark:hover:bg-gray-950 duration-200 rounded-md cursor-pointer">
          <Link href={`#`} className="w-full">
            <span className="text-gray-950 dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-600 duration-200 rounded-md">
              Javascript
            </span>
          </Link>
        </li>

        <li className="group px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-950 duration-200 rounded-md cursor-pointer">
          <Link href={`#`} className="w-full">
            <span className="text-gray-950 dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-600 duration-200 rounded-md">
              ReactJs
            </span>
          </Link>
        </li>
        <li className="group px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-950 duration-200 rounded-md cursor-pointer">
          <Link href={`#`} className="w-full">
            <span className="text-gray-950 dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-600 duration-200 rounded-md">
              NextJs
            </span>
          </Link>
        </li> */}
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
