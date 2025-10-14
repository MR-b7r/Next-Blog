import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-dark-200 border-t border-green-500 dark:border-green-600 ">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link
              href="https://haitham-bahr-portfolio.vercel.app/"
              className="flex items-center mb-2"
            >
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-950 dark:text-white">
                Portfolio
              </span>
            </Link>

            <p className="text-muted-foreground mb-4 max-w-md break-words">
              Writing that DevBlog with the curious minds of the digital age.
              Exploring the intersection of technology, design, and creativity.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Follow us
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link
                    href="https://github.com/MR-b7r"
                    className="hover:underline"
                  >
                    Github
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.linkedin.com/in/haitham-bahr-b33b1224b/"
                    className="hover:underline"
                  >
                    Linkedin
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="#" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-4 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-6" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2025{" "}
            <Link
              href="https://haitham-bahr-portfolio.vercel.app/"
              className="hover:underline"
            >
              Dev Blog™
            </Link>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <Link
              href="https://www.linkedin.com/in/haitham-bahr-b33b1224b/"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <Linkedin className="w-5 h-5" />
              <span className="sr-only">Linkedin page</span>
            </Link>

            <Link
              href="https://github.com/MR-b7r"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <Github className="w-5 h-5" />
              <span className="sr-only">GitHub account</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
