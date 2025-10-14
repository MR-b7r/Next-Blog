"use client";
import React from "react";
import { ArrowDownIcon, ArrowUpIcon, PodcastIcon } from "lucide-react";
import {
  ChatBubbleBottomCenterIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { CountingNumber } from "../ui/shadcn-io/counting-number";
import { Badge } from "../ui/badge";

export const EcommerceMetrics = ({
  totalUsers,
  totalPosts,
  totalComments,
}: {
  totalUsers: number;
  totalPosts: number;
  totalComments: number;
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
      <div className="rounded-2xl border border-gray-300 bg-gray-50 p-5 dark:border-gray-500 dark:bg-dark-200  md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-dark-300">
          <UserGroupIcon className="text-green-500 size-6 dark:text-green-500" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Total Users
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-[30px] dark:text-white/90">
              <CountingNumber
                number={totalUsers}
                inView={true}
                transition={{ stiffness: 40, damping: 25 }}
              />
            </h4>
          </div>
          <Badge variant={"default"}>
            <ArrowUpIcon className="size-4" />
            11.01%
          </Badge>
        </div>
      </div>
      <div className="rounded-2xl border border-gray-300 bg-gray-50 p-5 dark:border-gray-500 dark:bg-dark-200 md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-dark-300">
          <PodcastIcon className="text-green-500 size-6 dark:text-green-500" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Total Posts
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-[30px] dark:text-white/90">
              <CountingNumber
                number={totalPosts}
                inView={true}
                transition={{ stiffness: 40, damping: 25 }}
              />
            </h4>
          </div>

          <Badge variant={"destructive"}>
            <ArrowDownIcon className="size-4" />
            9.05%
          </Badge>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-300 bg-gray-50 p-5 dark:border-gray-500 dark:bg-dark-200 md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-dark-300">
          <ChatBubbleBottomCenterIcon className="text-green-500 size-6 dark:text-green-500" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Total Comments
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-[30px] dark:text-white/90">
              <CountingNumber
                number={totalComments}
                inView={true}
                transition={{ stiffness: 40, damping: 25 }}
              />
            </h4>
          </div>

          <Badge variant={"destructive"}>
            <ArrowDownIcon className="size-4" />
            9.05%
          </Badge>
        </div>
      </div>
    </div>
  );
};
