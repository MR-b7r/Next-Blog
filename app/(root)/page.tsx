import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import heroImg from "@/public/hero-img.jpg";
import RecentPosts from "@/components/RecentPosts";

export default async function Home() {
  return (
    <div className="bg-primary-50 dark:bg-gray-900 flex flex-col">
      <section className="bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 ">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold text-gray-950 dark:text-gray-200">
              Create, Share: Your Blugs, Our Dev Platform!
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Variety of articles and tutorials on topics such as web
              development, software engineering, and programming languages.
            </p>
            <Button
              size="lg"
              asChild
              className="rounded-full py-5 w-full sm:w-fit"
            >
              <Link href="search" className="dark:text-white">
                Explore Now
              </Link>
            </Button>
          </div>

          <Image
            src={heroImg}
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>

      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold text-gray-950 dark:text-gray-200">
          Trust by <br /> Thousands of Developers
        </h2>

        <RecentPosts />
      </section>
    </div>
  );
}
