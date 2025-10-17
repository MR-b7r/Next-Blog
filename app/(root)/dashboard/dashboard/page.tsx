import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { EcommerceMetrics } from "@/components/dashboard/EcommerceMetrics";
import RecentUsers from "@/components/dashboard/RecentUsers";
import RecentPosts from "@/components/dashboard/RecentPosts";
import { StatisticChart } from "@/components/dashboard/StatisticChart";
import {
  getTotalUsers,
  getUserAndPostsByMonth,
  getUsers,
} from "@/lib/actions/user.actions";
import { getAllPosts, getTotalPosts } from "@/lib/actions/post.actions";
import { getComments, getTotalComments } from "@/lib/actions/comment.actions";
import RecentComments from "@/components/dashboard/RecentComments";

const page = async () => {
  const session = await auth();
  const isAdmin = session?.user?.isAdmin;
  if (!isAdmin) redirect("/dashboard");

  const statistics = await getUserAndPostsByMonth();
  const totalUsers = await getTotalUsers();
  const users = await getUsers(1);
  const totalPosts = await getTotalPosts();
  const totalComments = await getTotalComments();
  const { recentPosts } = await getAllPosts({});
  const { recentComments } = await getComments({});
  return (
    <div className="w-full flex flex-col gap-6 mx-auto p-3">
      <EcommerceMetrics
        totalUsers={totalUsers ?? 0}
        totalPosts={totalPosts ?? 0}
        totalComments={totalComments ?? 0}
      />
      <StatisticChart statistics={statistics} />
      <div className="flex flex-col md:flex-row md:flex-wrap justify-center md:items-center gap-6">
        <RecentUsers recentUsers={users} />
        <RecentPosts recentPosts={recentPosts} />
        <RecentComments recentComments={recentComments} />
      </div>
    </div>
  );
};

export default page;
