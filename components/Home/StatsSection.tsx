import {
  ChatBubbleBottomCenterIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { PodcastIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import * as motion from "motion/react-client";
import { CountingNumber } from "@/components/ui/shadcn-io/counting-number/index";
import { getTotalUsers } from "@/lib/actions/user.actions";
import { getTotalPosts } from "@/lib/actions/post.actions";
import { cn } from "@/lib/utils";
import { getTotalComments } from "@/lib/actions/comment.actions";

const StatsSection = async () => {
  const totalUsers = await getTotalUsers();
  const totalPosts = await getTotalPosts();
  const totalComments = await getTotalComments();
  return (
    <>
      <div className="relative flex h-[50rem] w-full items-center justify-center flex-col bg-gray-50 dark:bg-dark-200">
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:40px_40px]",
            "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,#131619_1px,transparent_1px),linear-gradient(to_bottom,#131619_1px,transparent_1px)]"
          )}
        />
        {/* Radial gradient for the container to give a faded look */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gray-50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-dark-200"></div>

        <div className="max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Stats
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay informed with our latest stats and updates by subscribing to
              our newsletter.
            </p>
          </motion.div>
          <div className="grid gap-6 grid-cols-2 sm:gap-12 lg:grid-cols-3 lg:gap-8 w-full mx-auto">
            <div>
              <h4 className="text-lg sm:text-xl font-semibold text-foreground flex items-center justify-start gap-2">
                Total Users
                <UserGroupIcon className="size-6" />
              </h4>
              <p className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-green-500">
                <CountingNumber
                  number={totalUsers ?? 0}
                  inView={true}
                  transition={{ stiffness: 40, damping: 25 }}
                />
              </p>
            </div>

            <div>
              <h4 className="text-lg sm:text-xl font-semibold text-foreground flex items-center justify-start gap-2">
                Total Blogs
                <PodcastIcon className="size-6" />
              </h4>
              <p className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-green-500">
                <CountingNumber
                  number={totalPosts ?? 0}
                  inView={true}
                  transition={{ stiffness: 40, damping: 25 }}
                />
              </p>
            </div>

            <div>
              <h4 className="text-lg sm:text-xl font-semibold text-foreground flex items-center justify-start gap-2">
                Total Comments
                <ChatBubbleBottomCenterIcon className="size-6" />
              </h4>
              <p className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-green-500">
                <CountingNumber
                  number={totalComments ?? 0}
                  inView={true}
                  transition={{ stiffness: 40, damping: 25 }}
                />
              </p>
            </div>
          </div>
        </div>
        {/* Subscribe Newsletter */}
        <div className="max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16 mx-auto z-10">
          <div className="grid md:grid-cols-2 gap-8 w-full mx-auto items-start">
            <div className="max-w-md">
              <h4 className="font-semibold text-foreground mb-4 text-2xl md:text-3xl md:leading-tight">
                Stay Updated
              </h4>
              <p className="mt-3 text-muted-foreground ">
                Get the latest blog updates delivered to your inbox.
              </p>
            </div>
            <div className="flex max-w-sm items-center gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="dark:bg-dark-200"
              />
              <Button type="submit" variant="default">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatsSection;
