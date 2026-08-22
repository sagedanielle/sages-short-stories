import { assetPath } from "@/lib/assetPath";
import { getShorts, getShortBySlug } from "@/lib/shorts";
import Link from "next/link";

export default async function ShortsPage() {
  const shorts = getShorts().sort((a, b) => {
    const [ay, am, ad] = a.date.split("-").map(Number);
    const [by, bm, bd] = b.date.split("-").map(Number);
    return (
      new Date(by, bm - 1, bd).getTime() -
      new Date(ay, am - 1, ad).getTime()
    );
  });

  const entries = await Promise.all(
    shorts.map((s) => getShortBySlug(s.slug))
  );

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <Link href="/" className="text-blue-600 hover:underline">
        ← Home
      </Link>

      <h1 className="heading-1 mb-12">Shorts</h1>

      <div className="space-y-24">
        {entries.map((entry) => {
          const [y, m, d] = entry.date.split("-").map(Number);
          const formattedDate = new Date(y, m - 1, d).toLocaleDateString(
            "en-US",
            {
              month: "long",
              year: "numeric",
            }
          );

          return (
            <article key={entry.slug}>
              {/* date + location */}
              <p className="content-indent text-sm text-gray-500">
                {formattedDate}
                {entry.location && <> — {entry.location}</>}
              </p>

              {/* text */}
              <div className="short-row">
                <div
                  className="proseShort short-text"
                  dangerouslySetInnerHTML={{ __html: entry.contentHtml }}
                />

                <div className="short-image">
                  {entry.image && (
                    <img
                      src={assetPath(entry.image)}
                      alt={entry.location ?? "Short journal image"}
                      className="rounded-image"
                    />
                  )}
                  </div>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}