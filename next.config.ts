import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    // Turbopack requires plugin names as strings, not function references.
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
