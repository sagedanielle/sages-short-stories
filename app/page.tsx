// app/page.tsx
import Link from "next/link";
import { getCategories } from "../lib/stories";
import { getShorts } from "@/lib/shorts";

export default function HomePage() {
  const categories = getCategories();
  const shorts = getShorts().slice(0, 4);

  return (
    <main className="max-w-3xl mx-auto">

        <h1 className="heading-1 m-0 mb-6">
          Sage&apos;s Short Stories
        </h1>

        <div className="image-wrapper mb-8">
          <img
            src="/windmill.jpeg"
            alt="Windmill"
            className="rounded-image"
          />
        </div>


      <ul className="image-wrapper grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 text-center">
          <li>
            <Link
              href={`/shorts`}
              className="heading-2 hover:underline"
            >
              Shorts
            </Link>
          </li>

        {categories.map((category) => (
          <li key={category}>
          <Link
            href={`/stories/${category}`}
            className="heading-2 hover:underline"
          >
            {category.replace(/-/g, " ")}
          </Link>
          </li>
        ))}
      </ul>

    </main>
  );
}
