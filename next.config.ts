import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  /* config options here */
  // reactStrictMode: false, //Disable strict mode
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);

// export default nextConfig;
