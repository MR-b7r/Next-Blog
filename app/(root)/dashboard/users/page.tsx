import { DataTable } from "@/components/table/DataTable";
import { columns } from "@/components/table/userColumns";
import { getUsers, getUsersByMonth } from "@/lib/actions/user.actions";
import { auth } from "@/lib/auth";
import { userPerPage } from "@/lib/constants";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ searchParams }: SearchParamProps) => {
  const session = await auth();
  const isAdmin = session?.user?.isAdmin;
  if (!isAdmin) redirect("/dashboard");

  const pageNumber = Number(searchParams.page || 1);
  const { users, totalUsers } = await getUsers(pageNumber);
  const totalPages = Math.ceil(totalUsers / userPerPage);

  const usersby = await getUsersByMonth();
  console.log(usersby);
  return (
    <div className="data-table">
      <div className="flex justify-between items-center gap-5 py-5 px-3">
        <span className="md:text-lg text-sm ">
          Showing results for{" "}
          <span className="text-green-500">{totalUsers}</span> users.
        </span>
      </div>
      <DataTable
        columns={columns}
        data={users}
        totalPages={totalPages}
        pageNumber={pageNumber}
      />
    </div>
  );
};

export default page;
