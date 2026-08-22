import "server-only";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

// Base content folder
const storiesDir = path.join(process.cwd(), "content/stories");

// Type for story frontmatter
export type StoryMeta = {
  title: string;
  summary?: string;
  image?: string; // ✅ added optional image
};

// Type for story returned by getStoriesByCategory
export type StorySummary = StoryMeta & {
  category: string;
  slug: string;
};

// Type for full story content
export type Story = StoryMeta & {
  category: string;
  slug: string;
  contentHtml: string;
};

export type CategoryMeta = {
  title: string;
  image?: string;
};

export function getCategoryMeta(category: string): CategoryMeta | null {
  const metaPath = path.join(storiesDir, category, "_category.json");

  if (!fs.existsSync(metaPath)) return null;

  const raw = fs.readFileSync(metaPath, "utf8");
  return JSON.parse(raw) as CategoryMeta;
}

// Get all category folder names
export function getCategories(): string[] {
  return fs
    .readdirSync(storiesDir, { withFileTypes: true })
    .filter((dir) => dir.isDirectory())
    .map((dir) => dir.name);
}

 // Get all stories in a category (slug, title, summary, optional image)
export function getStoriesByCategory(category: string): StorySummary[] {
  const categoryPath = path.join(storiesDir, category);

  if (!fs.existsSync(categoryPath)) return [];

  const files = fs
    .readdirSync(categoryPath)
    .filter((file) => file.endsWith(".md"));

  return files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const fullPath = path.join(categoryPath, file);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      category,
      slug,
      title: data.title as string,
      summary: data.summary as string | undefined,
      image: data.image as string | undefined, // ✅ include image if present
    };
  });
}

// Get a single story content as HTML
export async function getStory(category: string, slug: string): Promise<Story> {
  const fullPath = path.join(storiesDir, category, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Story not found: ${category}/${slug}`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(remarkHtml).process(content);

  return {
    category,
    slug,
    title: data.title as string,
    summary: data.summary as string | undefined,
    image: data.image as string | undefined, // ✅ include image if present
    contentHtml: processedContent.toString(),
  };
}
