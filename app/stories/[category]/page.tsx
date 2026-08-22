// app/stories/[category]/page.tsx
import { assetPath } from "@/lib/assetPath";
import Link from "next/link";
import { getStoriesByCategory, getCategories } from "@/lib/stories";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map((category) => ({ category }));
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params; // unwrap the promise

  const categoryImage = assetPath(`/images/${category}.jpg`); // dynamically picks the image based on category

  const stories = getStoriesByCategory(category);

  return (
    <main className="mx-auto max-w-3xl">

        {/* Home link */}
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:underline">  ← Home </Link>
        </div>

      {/* Category Title */}
      <h1 className="heading-1 m-0 mb-6">{category}</h1>

      {/* Category Image */}
      <div className="image-wrapper">
        <img
          src={categoryImage}
          alt={category.replace(/-/g, " ")}
          className="rounded-image"
        />
      </div>

      {/* Stories List */}
      {stories.length === 0 ? (
        <p className="heading-2 content-indent">This category is empty so far.</p>
      ) : (
        <div className="image-wrapper">
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
            {stories.map((story) => (
              <li key={story.slug} className="pad flex flex-col">
                  <Link
                    href={`/stories/${category}/${story.slug}`}
                    className="heading-2 hover:underline leading-tight m-6"
                  >
                    {story.title}
                  </Link>
                  {story.summary && (
                    <p className="body-1">
                      {story.summary}
                    </p>
                  )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
