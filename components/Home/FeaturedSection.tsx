import * as motion from "motion/react-client";
import { getAdminPosts, postByCategory } from "@/lib/actions/post.actions";
import PostCard from "@/components/post/PostCard";

const FeaturedSection = async ({
  title,
  postsByAdmins = true,
  category,
  postId,
}: {
  title?: string;
  postsByAdmins?: boolean;
  category?: string;
  postId?: string;
}) => {
  let posts = [];
  if (postsByAdmins) {
    posts = await getAdminPosts();
  } else {
    if (postId && category)
      posts = await postByCategory({
        postId,
        category,
      });
  }
  return (
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
            {title ? title : "Recent Blogs"}
          </h2>

          {!title && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Curated thoughts and discoveries from the intersection of
              technology, design, and human experience.
            </p>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 justify-center">
          {posts.map((post: Post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
