import { Button } from "@/components/ui/moving-border";
import Link from "next/link";
import * as motion from "motion/react-client";
import { ArrowRight } from "lucide-react";
import { Spotlight } from "../ui/spotlight";

const HeroSection = () => {
  return (
    <section className="min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="overflow-hidden max-md:hidden">
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw] " fill="green" />
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-tight mb-6 h1-bold text-neutral-900 dark:text-gray-100">
              Join the community for devs who{" "}
              <span className="text-green-700 dark:text-green-500 italic">
                blog
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl place-self-center">
              Variety of articles and tutorials on topics such as web
              development, software engineering, and programming languages.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Link href="search">
                <Button
                  borderRadius="12px"
                  borderClassName="dark:bg-[radial-gradient(#F6F6F6_40%,transparent_60%)]"
                  className="bg-primary text-primary-foreground hover:bg-primary/60 inline-flex items-center  text-sm"
                >
                  Explore Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl absolute -top-10 -right-10"></div>
              <div className="w-96 h-96 bg-gradient-to-tl from-secondary/40 to-primary/40 rounded-2xl transform rotate-6 shadow-2xl"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
