import * as motion from "motion/react-client";
import { Badge } from "@/components/ui/badge";
import { categoryCount } from "@/lib/actions/post.actions";
import Link from "next/link";

export default async function CategoriesSection() {
  const categories = await categoryCount();
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100/50 dark:bg-dark-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Explore Topics
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dive into the subjects that spark curiosity and drive innovation in
            our digital world.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category, index: number) => (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              key={category.name}
            >
              <Link
                className="group cursor-pointer"
                href={`/search?category=${category.name}`}
              >
                <div className="bg-gray-50 dark:bg-dark-300 rounded-lg p-6 text-center hover:shadow-md transition-all duration-300 hover:scale-[102%] border border-border/80">
                  <div className="mb-4">
                    <div
                      dangerouslySetInnerHTML={{ __html: category.icon }}
                      className="w-8 h-8 mx-auto text-primary transition-transform duration-300"
                    ></div>
                  </div>

                  <h3 className="font-semibold tracking-wide text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {category.name}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {category.count} posts
                  </Badge>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
