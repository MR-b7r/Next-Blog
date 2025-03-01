import FilteredPosts from "@/components/FilteredPosts";
import SearchFilter from "@/components/SearchFilter";
import React from "react";

const page = ({ searchParams }: { searchParams: SearchParamProps }) => {
  const filter = {
    searchTerm: searchParams?.searchTerm,
    sort: searchParams?.sort,
    category: searchParams?.category,
  };
  return (
    <div>
      <SearchFilter />
      <FilteredPosts filter={filter} />
    </div>
  );
};

export default page;
