import React from "react";
import { columns } from "@/components/table/commentColumns";
import { DataTable } from "@/components/table/DataTable";
import { auth } from "@/lib/auth";
import { getComments } from "@/lib/actions/comment.actions";
const page = async ({ searchParams }: SearchParamProps) => {
  const session = await auth();
  const userId = session?.user?.id;
  const isAdmin = session?.user?.isAdmin;

  const pageNumber = Number(searchParams.page || 1);
  const { comments, totalComments, totalPages } = await getComments({
    pageNumber,
    isAdmin,
    userId,
  });
  return (
    <div className="data-table flex flex-col p-4">
      <div className="flex justify-between items-center gap-5 py-2 px-2">
        <span className="md:text-lg text-sm ">
          Showing results for{" "}
          <span className="text-green-500">{totalComments}</span> Comments.
        </span>
      </div>
      <DataTable
        columns={columns}
        data={comments}
        totalPages={totalPages}
        pageNumber={pageNumber}
      />
    </div>
  );
};

export default page;
