import DashUsers from "@/components/dashboard/DashUsers";
import React from "react";

const page = ({ searchParams }: SearchParamProps) => {
  const pageNumber = Number(searchParams.page || 1);

  return <DashUsers pageNumber={pageNumber} />;
};

export default page;
