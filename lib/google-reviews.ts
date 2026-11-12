import type { Locale } from "./i18n/config";

// Live rating and reviews from the restaurant's Google Business Profile, via the Google Places API (New).
// Needs GOOGLE_PLACES_API_KEY in Vercel. GOOGLE_PLACE_ID is optional: without it the place is looked up by name once.
// Results are cached and refreshed every 6 hours, so the site stays fast and within Google's free tier.
// Google returns at most 5 reviews per request (the ones it considers most relevant); we show the newest first.

const REFRESH_SECONDS = 6 * 60 * 60;
const SEARCH = "Azafrán Pérsico, Carrer de Girona 127, 08037 Barcelona";

export type GoogleReview = {
  author: string;
  authorUrl?: string;
  authorPhoto?: string;
  rating: number;
  text: string;
  translated: boolean;
  when: string; // "2 weeks ago", already in the visitor's language
  publishedAt: string;
};
export type GoogleReviews = { rating: number; count: number; mapsUrl: string; reviews: GoogleReview[] };

type PlaceReview = {
  rating?: number;
  text?: { text: string; languageCode: string };
  originalText?: { text: string; languageCode: string };
  relativePublishTimeDescription?: string;
  publishTime?: string;
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
};

async function findPlaceId(key: string): Promise<string | null> {
  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Goog-Api-Key": key, "X-Goog-FieldMask": "places.id" },
    body: JSON.stringify({ textQuery: SEARCH }),
    next: { revalidate: 7 * 24 * 60 * 60 },
  });
  if (!res.ok) return null;
  const json = (await res.json()) as { places?: { id: string }[] };
  return json.places?.[0]?.id ?? null;
}

export async function getGoogleReviews(locale: Locale): Promise<GoogleReviews | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return null;
  try {
    const placeId = process.env.GOOGLE_PLACE_ID || (await findPlaceId(key));
    if (!placeId) return null;
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}?languageCode=${locale}`, {
      headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": "rating,userRatingCount,reviews,googleMapsUri" },
      next: { revalidate: REFRESH_SECONDS },
    });
    if (!res.ok) {
      console.error("Google Places error", res.status, await res.text());
      return null;
    }
    const p = (await res.json()) as { rating?: number; userRatingCount?: number; googleMapsUri?: string; reviews?: PlaceReview[] };
    const reviews = (p.reviews ?? [])
      .filter((r) => r.text?.text)
      .map((r) => ({
        author: r.authorAttribution?.displayName ?? "Google user",
        authorUrl: r.authorAttribution?.uri,
        authorPhoto: r.authorAttribution?.photoUri,
        rating: r.rating ?? 5,
        text: r.text!.text,
        translated: !!r.originalText && r.originalText.languageCode !== r.text!.languageCode,
        when: r.relativePublishTimeDescription ?? "",
        publishedAt: r.publishTime ?? "",
      }))
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
    return { rating: p.rating ?? 0, count: p.userRatingCount ?? 0, mapsUrl: p.googleMapsUri ?? "", reviews };
  } catch (err) {
    console.error("Google reviews unavailable", err);
    return null;
  }
}
