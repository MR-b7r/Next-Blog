"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "./table/DataTable";
import { columns } from "./table/columns";
import { getPosts } from "@/lib/actions/post.actions";
import { postPerPage } from "@/lib/constants";

const DashPosts = ({ pageNumber }: { pageNumber: number }) => {
  const [posts, setposts] = useState([]);
  const [totalPages, setpages] = useState(1);
  useEffect(() => {
    const fetchPosts = async () => {
      const { posts, totalPosts } = await getPosts(pageNumber);
      const totalPages = Math.ceil(totalPosts / postPerPage);
      setposts(posts);
      setpages(totalPages);
    };
    fetchPosts();
  }, [pageNumber]);
  return (
    <div className="data-table">
      <DataTable
        columns={columns}
        data={posts}
        totalPages={totalPages}
        pageNumber={pageNumber}
      />
    </div>
  );
};

export default DashPosts;
