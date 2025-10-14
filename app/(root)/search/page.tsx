import SearchFilter from "@/components/SearchFilter";
import React from "react";
import { getFilteredPosts } from "@/lib/actions/post.actions";
import searchEmpty from "@/public/search-empty.svg";
import Image from "next/image";
import * as motion from "motion/react-client";
import PostCard from "@/components/post/PostCard";

const page = async ({ searchParams }: { searchParams: searchFiterParams }) => {
  const filter = {
    searchTerm: searchParams?.searchTerm,
    sort: searchParams?.sort,
    category: searchParams?.category,
  };
  const filteredPosts = await getFilteredPosts(filter);
  return (
    <div>
      <SearchFilter />
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Blogs Results
            </h2>
          </motion.div>

          {filteredPosts?.length ? (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 justify-center">
              {filteredPosts.map((post: Post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="mt-5 flex flex-col items-center justify-center">
              <Image
                className="pb-5"
                src={searchEmpty}
                width={500}
                height={500}
                alt="search"
              />
              <p className="text-[15px] mt-5 tracking-wide">
                Can&apos;t find what you&apos;re looking for? Try adjusting your
                search or filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default page;
