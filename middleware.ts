import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n/config";

// Sends visitors without a language in the address to their language:
// the one they picked before (cookie), else their browser's, else Spanish.
function pickLocale(req: NextRequest): Locale {
  const saved = req.cookies.get("NEXT_LOCALE")?.value;
  if (isLocale(saved)) return saved;
  const header = req.headers.get("accept-language") ?? "";
  const wanted = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const { lang } of wanted) if ((locales as readonly string[]).includes(lang)) return lang as Locale;
  return defaultLocale;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const first = pathname.split("/")[1];
  if (isLocale(first)) return NextResponse.next();
  const url = req.nextUrl.clone();
  url.pathname = `/${pickLocale(req)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Everything except API routes, Next.js internals and files with an extension (images, videos, icons...).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
