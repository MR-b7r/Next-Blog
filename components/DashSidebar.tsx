import React from "react";
import {
  ChatBubbleBottomCenterIcon,
  DocumentIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
// import { useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import SignoutUser from "./SignoutUser";

const DashSidebar = ({ currentUser }) => {
  // const { currentUser } = useAppSelector((state) => state.user);
  return (
    <aside className="md:w-56 h-full overflow-y-auto overflow-x-hidden  bg-gray-100 dark:bg-gray-800 border-t-2 border-gray-200 dark:border-gray-600">
      <div className="h-full px-3 py-4 overflow-y-auto ">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              href="/dashboard?tab=profile"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <UserIcon width={20} />
              <span className="ms-3">Profile</span>
              <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                {currentUser?.isAdmin ? "Admin" : "User"}
              </span>
            </Link>
          </li>
          {currentUser?.isAdmin && (
            <>
              <li>
                <Link
                  href="/dashboard?tab=posts"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <DocumentIcon width={20} />
                  <span className="flex-1 ms-3 whitespace-nowrap">Posts</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard?tab=users"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <UsersIcon width={20} />
                  <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard?tab=comments"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <ChatBubbleBottomCenterIcon width={20} />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Comments
                  </span>
                  <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    3
                  </span>
                </Link>
              </li>
            </>
          )}

          <li className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <SignoutUser icon={true} style="flex-1 ms-3 whitespace-nowrap" />
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default DashSidebar;
