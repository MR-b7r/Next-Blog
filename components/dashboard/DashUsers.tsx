// "use client";
// import React, { useEffect, useState } from "react";
import { columns } from "../table/userColumns";
import { getUsers } from "@/lib/actions/user.actions";
import { userPerPage } from "@/lib/constants";
import { DataTable } from "../table/DataTable";

const DashUsers = async ({ pageNumber }: { pageNumber: number }) => {
  const { users, totalUsers } = await getUsers(pageNumber);
  const totalPages = Math.ceil(totalUsers / userPerPage);

  return (
    <div className="data-table">
      <DataTable
        columns={columns}
        data={users}
        totalPages={totalPages}
        pageNumber={pageNumber}
      />
    </div>
  );
};

export default DashUsers;
