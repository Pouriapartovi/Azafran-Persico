# Azafrán Pérsico website (Next.js)

Marketing site for Azafrán Pérsico, a Persian and Mediterranean restaurant at Carrer de Girona 127, Barcelona.

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, Lenis smooth scrolling and shadcn/ui form components. Deploys to Vercel with no extra setup.

The site is in five languages: Spanish (default), English, Catalan, French and Persian (right to left). Every page lives under its language, e.g. `/es/menu`, `/fa/menu`. Visiting `/` sends people to their browser's language, or to the one they last picked.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production build
```

## Where things live

| Path | What it is |
| --- | --- |
| `app/[locale]/` | Pages: home, `/menu`, `/our-story`, `/reservations`, `/contact`, one copy per language |
| `app/` | `api/reservations`, sitemap, robots, favicon and share image |
| `middleware.ts` | Sends visitors without a language in the URL to the right one |
| `lib/i18n/dictionaries/` | Every piece of site text, one file per language (`es.ts`, `en.ts`, `ca.ts`, `fr.ts`, `fa.ts`) |
| `components/` | Nav, language switcher, footer, hero, kebab video, menu categories pop-up, gallery, reviews, reservation form, `ui/` (shadcn) |
| `lib/google-reviews.ts` | Fetches the latest Google reviews |
| `lib/site.ts` | Address, phone, hours, Instagram, map links. Change details here and every page follows. |
| `lib/menu.ts` | The full carta: sections, dishes, names in each language, prices, photos |
| `lib/reservation.ts` | Booking form rules (shared by the form and the server) |
| `tailwind.config.ts` | Brand colours (saffron, pomegranate, earth, cream, ink, gold) and display type sizes |
| `public/images/` | Dish photography and logo |
| `public/gallery/` | Real photos of the restaurant shown in the home page gallery |
| `public/videos/` | The kebab video and its poster |

## Common edits

- **A price or dish:** edit `lib/menu.ts`. Leave `price` out to show "Ask us".
- **A dish photo:** put the JPG in `public/images/` and set `image: "/images/name.jpg"` on the dish. Dishes without a photo show the saffron flower.
- **Gallery photos:** drop JPG or PNG files into `public/gallery/` (on GitHub: open the folder, Add file, Upload files). They appear on the home page on the next deploy. The file name becomes the description, so `saffron-rice-on-the-pass.jpg` reads "Saffron rice on the pass". Keep each under about 500 KB.
- **Site text:** edit the language files in `lib/i18n/dictionaries/`. Change the same key in all five.
- **Hero photos:** `heroSlides` at the top of `app/[locale]/page.tsx`. The restaurant photo next to the map is `restaurantPhoto` in the same file.
- **Videos:** compress before adding, with no sound, e.g. `ffmpeg -i in.mp4 -an -vf scale=720:-2 -c:v libx264 -crf 28 -preset slow -movflags +faststart out.mp4`.
- **Hours, phone, email, Instagram:** `lib/site.ts`. The contact page shows the email as soon as `email` is filled in.

## Reservations

`POST /api/reservations` validates the booking and, for now, only logs it (a placeholder). To receive bookings by email, add these environment variables in Vercel:

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | Your Resend API key |
| `RESERVATIONS_TO` | The inbox that receives bookings |
| `RESERVATIONS_FROM` | Optional. A sender on a domain verified in Resend, e.g. `Azafrán Pérsico <reservas@azafranpersico.online>` |

## Google reviews

The reviews section updates itself from Google every 6 hours. Until a key is set it shows the rating and a link to Google instead. Google only gives out the 5 most relevant reviews per request, so the site shows those, newest first.

1. In Google Cloud Console, create a project, enable **Places API (New)** and create an API key (restrict it to that API).
2. In Vercel, Settings → Environment Variables, add:

| Variable | Value |
| --- | --- |
| `GOOGLE_PLACES_API_KEY` | The key |
| `GOOGLE_PLACE_ID` | Optional. The restaurant's place ID. Without it the site looks it up by name and address. |

3. Redeploy.

## Deploy

Import the repository in Vercel, choose this branch, keep the defaults (framework: Next.js), add the variables above and deploy. Point `azafranpersico.online` at the Vercel project under Settings → Domains.
