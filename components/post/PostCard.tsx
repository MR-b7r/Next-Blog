import Link from "next/link";
import React from "react";
import * as motion from "motion/react-client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { ArrowRight, Calendar } from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";

const PostCard = ({ post }: { post: Post }) => {
  const { title, image, category, slug } = post;
  return (
    <motion.div
      key={post._id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <Card className="group flex flex-col max-w-sm bg-gray-100 border border-gray-200 rounded-lg shadow dark:bg-dark-400 dark:border-gray-700 overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300 backdrop-blur-xs py-0">
        <CardHeader className="p-0">
          <div className="relative">
            <div className="w-full h-[188px] relative overflow-hidden">
              <Image
                alt={title}
                src={image}
                className="rounded-t-lg object-cover duration-200 group-hover:scale-[102%]"
                fill
              />
            </div>

            <div className="absolute top-4 left-4">
              <Link href={`/search?category=${category}`} className="">
                <Badge
                  variant="secondary"
                  className="bg-background/80 backdrop-blur-xs"
                >
                  {post && post.category}
                </Badge>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent className="w-full p-3 flex flex-col items-start gap-2">
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <Calendar className="h-4 w-4 mr-2" />
            {post.createdAt ? formatDateTime(post.createdAt).dateOnly : "N/A"}
          </div>
          <h5 className="text-foreground mb-3 group-hover:text-primary transition-colors duration-300 my-1 text-lg font-semibold text-gray-800 dark:text-gray-100">
            {post.title}
          </h5>

          <div className="flex justify-between items-center py-1 w-full group-hover:px-[4px] duration-200">
            <span className="text-[14px] text-grey-600 dark:text-gray-200">
              {(post && post.username) || ""}
            </span>
            <Link
              href={`/post/${slug}`}
              className="flex items-center text-primary font-medium group-hover:underline"
            >
              Read more
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PostCard;
