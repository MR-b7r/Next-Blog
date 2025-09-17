import DashPosts from "@/components/dashboard/DashPosts";
import React from "react";

const page = ({ searchParams }: SearchParamProps) => {
  const page = searchParams.tab || "profile";
  const pageNumber = Number(searchParams.page || 1);

  return <DashPosts pageNumber={pageNumber} />;
};

export default page;
