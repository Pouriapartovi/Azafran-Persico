import { Star } from "lucide-react";
import type { GoogleReviews } from "@/lib/google-reviews";
import type { Dictionary } from "@/lib/i18n";
import { fill } from "@/lib/i18n/config";
import { site } from "@/lib/site";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

function Stars({ value, label, className }: { value: number; label: string; className?: string }) {
  return (
    <span className={cn("inline-flex gap-0.5", className)} role="img" aria-label={label}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} className={cn("h-4 w-4", n <= Math.round(value) ? "fill-brand text-brand" : "text-line")} aria-hidden="true" />
      ))}
    </span>
  );
}

// Latest reviews from Google. Without live data it shows the known rating and a link, never made-up reviews.
export function Reviews({ data, t }: { data: GoogleReviews | null; t: Dictionary }) {
  const rating = data?.rating ? data.rating.toFixed(1) : site.rating;
  const reviewsUrl = data?.mapsUrl || site.mapsLink;
  const title = t.reviews.title.split(/(&|\.)/);

  return (
    <section className="bg-mist py-24 md:py-32" aria-labelledby="reviews-title">
      <div className="container">
        <Reveal className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-5">{t.reviews.eyebrow}</p>
            <h2 id="reviews-title" className="font-display text-display-md font-medium text-ink">
              {title.map((p, i) => (p === "&" || p === "." ? <span key={i} className="soft-mark">{p}</span> : p))}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <p className="font-display text-6xl leading-none text-ink" dir="ltr">{rating}</p>
            <div>
              <Stars value={Number(rating)} label={fill(t.reviews.stars, { n: rating })} />
              <p className="mt-1 text-sm text-ink-soft">
                {data?.count ? fill(t.reviews.basedOn, { rating, count: data.count }) : fill(t.reviews.fallback, { rating })}
              </p>
            </div>
          </div>
        </Reveal>

        {data && data.reviews.length > 0 && (
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {data.reviews.slice(0, 6).map((r, i) => (
              <li key={`${r.author}-${i}`}>
                <Reveal delay={(i % 3) * 0.08} className="flex h-full flex-col bg-paper p-7">
                  <Stars value={r.rating} label={fill(t.reviews.stars, { n: r.rating })} />
                  <blockquote className="mt-4 flex-1 text-ink">
                    <p className="line-clamp-[8]">{r.text}</p>
                  </blockquote>
                  <footer className="mt-6 flex items-center gap-3 border-t border-line pt-4">
                    {r.authorPhoto && (
                      // eslint-disable-next-line @next/next/no-img-element -- Google author photos, shown as Google provides them
                      <img src={r.authorPhoto} alt="" width={36} height={36} className="h-9 w-9 rounded-full" referrerPolicy="no-referrer" />
                    )}
                    <div className="min-w-0 text-sm">
                      {r.authorUrl ? (
                        <a href={r.authorUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink hover:text-brand-deep">{r.author}</a>
                      ) : (
                        <p className="font-semibold text-ink">{r.author}</p>
                      )}
                      <p className="text-ink-soft">{r.when}{r.translated ? ` · ${t.reviews.translated}` : ""}</p>
                    </div>
                  </footer>
                </Reveal>
              </li>
            ))}
          </ul>
        )}

        <Reveal className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
          <a href={reviewsUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold uppercase tracking-[0.16em] text-ink underline decoration-line underline-offset-8 hover:decoration-brand">
            {t.reviews.readAll}
          </a>
          {data && <p className="text-xs text-ink-soft">Google</p>}
        </Reveal>
      </div>
    </section>
  );
}
