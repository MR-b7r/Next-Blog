import React from "react";
import PostCard from "./PostCard";
import { getFilteredPosts } from "@/lib/actions/post.actions";
import searchEmpty from "@/public/search-empty.svg";
import Image from "next/image";

const FilteredPosts = async ({ filter }: { filter: searchFiterParams }) => {
  const filteredPosts = await getFilteredPosts(filter);
  return (
    <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-3xl mt-5 font-semibold tracking-wide">
          Blogs Results
        </h1>
        <div className="flex flex-wrap gap-5 mt-5 justify-center">
          {filteredPosts ? (
            filteredPosts.map((post: Post) => (
              <PostCard key={post._id} post={post} />
            ))
          ) : (
            <div className="mt-5 flex flex-col items-center justify-center">
              <Image
                className="pb-5"
                src={searchEmpty}
                width={500}
                height={500}
                alt="search"
              />
              <p className="text-[15px] mt-5 font-semibold tracking-wide">
                Waiting to search!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FilteredPosts;
