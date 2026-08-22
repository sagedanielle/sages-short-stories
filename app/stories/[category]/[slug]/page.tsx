// app/stories/[category]/[slug]/page.tsx
import Link from "next/link";
import { getCategories, getStoriesByCategory, getStory } from "@/lib/stories";

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

// Pre-build all story pages
export async function generateStaticParams() {
  const categories = getCategories();

  return categories.flatMap((category) => {
    const stories = getStoriesByCategory(category);
    return stories.map((story) => ({
      category,
      slug: story.slug,
    }));
  });
}

export default async function StoryPage({ params }: Props) {
  const { category, slug } = await params; // unwrap the promise

  const story = await getStory(category, slug);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">

      {/* Breadcrumbs */}
      <nav className="mb-6 text-gray-500 text-sm">
        <Link href="/" className="text-blue-600 hover:underline">← Home </Link>{" / "}
        <Link href={`/stories/${category}`} className="hover:underline">
          {category.replace(/-/g, " ")}
        </Link>{" / "}
        <span className="font-semibold">{story.title}</span>
      </nav>

      {/* Story content */}
      <article className="prose">
        <h1 className="text-3xl font-bold mb-6">{story.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: story.contentHtml }} />
      </article>

      {/* Optional ending image - remove prose styling */}
      {story.image && (
        <div className="image-wrapper mb-4">
          <img
            src={story.image}
            alt={story.title}
            className="rounded-image"
          />
        </div>
      )}
    </main>
  );
}
