import React from "react";
import {
  ChatBubbleBottomCenterIcon,
  DocumentIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import SignoutUser from "../SignoutUser";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LayoutDashboardIcon } from "lucide-react";

const DashSidebar = async () => {
  const session = await auth();
  if (!session?.user) redirect("/");
  const { user } = session;
  return (
    <aside className="md:w-56 h-full overflow-y-auto overflow-x-hidden  bg-gray-100 dark:bg-dark-400  border-t-2 border-gray-200 dark:border-gray-600">
      <div className="h-full px-3 py-4 overflow-y-auto ">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-foreground hover:bg-green-500 dark:hover:bg-dark-200 group"
            >
              <UserIcon width={20} />
              <span className="ms-3">Profile</span>
              <span className="inline-flex tracking-wide items-center justify-center px-2 ms-3 text-[12px] font-medium text-dark-500 bg-gray-200 rounded-full dark:bg-dark-500 dark:text-gray-200">
                {user?.isAdmin ? "Admin" : "User"}
              </span>
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard/posts"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-foreground hover:bg-green-500 dark:hover:bg-dark-200 group"
            >
              <DocumentIcon width={20} />
              <span className="flex-1 ms-3 whitespace-nowrap">Posts</span>
            </Link>
          </li>
          {user?.isAdmin && (
            <>
              <li>
                <Link
                  href="/dashboard/users"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-foreground hover:bg-green-500 dark:hover:bg-dark-200 group"
                >
                  <UsersIcon width={20} />
                  <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/comments"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-foreground hover:bg-green-500 dark:hover:bg-dark-200 group"
                >
                  <ChatBubbleBottomCenterIcon width={20} />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Comments
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/dashboard"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-foreground hover:bg-green-500 dark:hover:bg-dark-200 group"
                >
                  <LayoutDashboardIcon width={20} />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Dashboard
                  </span>
                </Link>
              </li>
            </>
          )}

          <li className="flex items-center p-2 text-gray-900 rounded-lg dark:text-foreground hover:bg-green-500 dark:hover:bg-dark-200 group">
            <SignoutUser icon={true} style="flex-1 ms-3 whitespace-nowrap" />
          </li>
        </ul>
      </div>
    </aside>

    //   <Sidebar className="relative h-full">
    //     <SidebarContent>
    //       <SidebarGroup>
    //         <SidebarGroupContent>
    //           <SidebarMenu>
    //             {items.map((item) => (
    //               <SidebarMenuItem key={item.title}>
    //                 <SidebarMenuButton asChild>
    //                   <Link href={item.url}>
    //                     <item.icon />
    //                     <span>{item.title}</span>
    //                   </Link>
    //                 </SidebarMenuButton>
    //               </SidebarMenuItem>
    //             ))}
    //           </SidebarMenu>
    //         </SidebarGroupContent>
    //       </SidebarGroup>
    //     </SidebarContent>
    //     <SidebarFooter>
    //       <SignoutUser icon={true} style="flex-1 ms-3 whitespace-nowrap" />
    //     </SidebarFooter>
    //   </Sidebar>
    // );
  );
};

export default DashSidebar;
