// app/shorts/[slug]/page.tsx
import Link from "next/link";
import { getShorts, getShortBySlug } from "@/lib/shorts";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getShorts().map((entry) => ({
    slug: entry.slug,
  }));
}

export default async function ShortsPage({ params }: Props) {
  const { slug } = await params;

  // ✅ await the async function
  const entry = await getShortBySlug(slug);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">

      <Link href="/" className="text-blue-600 hover:underline"> ← Home </Link>

      {/* short content */}
      <article className="proseShort">
        <div dangerouslySetInnerHTML={{ __html: entry.contentHtml }} />
      </article>

      {/* Optional image */}
      {entry.image && (
        <div className="image-wrapper mt-8">
          <img
            src={entry.image}
            alt=""
            className="rounded-image"
          />
        </div>
      )}

    </main>
  );
}