import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getAllPosts } from "@/lib/actions/post.actions";
import { auth } from "@/lib/auth";
import React from "react";

const page = async ({ searchParams }: SearchParamProps) => {
  const session = await auth();
  const userId = session?.user?.id;
  const isAdmin = session?.user?.isAdmin;

  const pageNumber = Number(searchParams.page || 1);
  const { posts, totalPosts, totalPages } = await getAllPosts({
    pageNumber,
    isAdmin,
    userId,
  });
  return (
    <div className="data-table flex flex-col p-4">
      <div className="flex justify-between items-center gap-5 py-2 px-2">
        <span className="md:text-lg text-sm ">
          Showing results for{" "}
          <span className="text-green-500">{totalPosts}</span> posts.
        </span>
      </div>
      <DataTable
        columns={columns}
        data={posts}
        totalPages={totalPages}
        pageNumber={pageNumber}
      />
    </div>
  );
};

export default page;
