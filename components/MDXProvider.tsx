import type { MDXComponents } from "mdx/types";
// import Image, { ImageProps } from "next/image";

const components = {
  h1: (props) => <h1 className="text-4xl font-bold my-4" {...props} />,
  p: (props) => <p className="my-2 leading-relaxed text-gray-700" {...props} />,
  code: (props) => (
    <code
      className="bg-gray-100 text-pink-600 px-1 py-0.5 rounded"
      {...props}
    />
  ),
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
