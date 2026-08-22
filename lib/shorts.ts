import "server-only";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

// Base content folder
const shortsDir = path.join(process.cwd(), "content/shorts");

// Type for short frontmatter
export type ShortMeta = {
  image?: string;
  date: string;
  location: string;
};

export type Short = ShortMeta & {
  slug: string;
  contentHtml: string;
};

export type ShortListItem = {
  slug: string;
  image?: string;
};

export function getShorts() {
  const files = fs.readdirSync(shortsDir);

  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const fullPath = path.join(shortsDir, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        date: data.date as string,
        image: data.image as string | undefined,
      };
    });
}

// Get a single short content as HTML
export async function getShortBySlug(slug: string): Promise<Short> {
  const fullPath = path.join(shortsDir, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(remarkHtml).process(content);

  return {
    slug,
    date: data.date as string,
    image: data.image as string | undefined,
    location: data.location ?? null,
    contentHtml: processedContent.toString(),
  };
}