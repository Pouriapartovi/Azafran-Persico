# Azafrán Pérsico website (Next.js)

Marketing site for Azafrán Pérsico, a Persian and Mediterranean restaurant at Carrer de Girona 127, Barcelona.

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, Lenis smooth scrolling and shadcn/ui form components. Deploys to Vercel with no extra setup.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production build
```

## Where things live

| Path | What it is |
| --- | --- |
| `app/` | Pages: `/`, `/menu`, `/our-story`, `/reservations`, `/contact`, plus `api/reservations`, sitemap, robots, favicon and share image |
| `components/` | Nav, footer, hero, parallax image, reveal, menu rail, dish card, gallery strip, reservation form, `ui/` (shadcn) |
| `lib/site.ts` | Address, phone, hours, Instagram, map links. Change details here and every page follows. |
| `lib/menu.ts` | The full carta: sections, dishes, Farsi names, prices, photos |
| `lib/reservation.ts` | Booking form rules (shared by the form and the server) |
| `tailwind.config.ts` | Brand colours (saffron, pomegranate, earth, cream, ink, gold) and display type sizes |
| `public/images/` | Photography and logo |

## Common edits

- **A price or dish:** edit `lib/menu.ts`. Leave `price` out to show "Ask us".
- **A dish photo:** put the JPG in `public/images/` and set `image: "/images/name.jpg"` on the dish. Dishes without a photo show the saffron flower.
- **Hero photos:** `heroSlides` at the top of `app/page.tsx`. To use a film, pass `video="/videos/hero.mp4"` to `<Hero>` and keep the first slide as its poster.
- **Hours, phone, email, Instagram:** `lib/site.ts`. The contact page shows the email as soon as `email` is filled in.

## Reservations

`POST /api/reservations` validates the booking and, for now, only logs it (a placeholder). To receive bookings by email, add these environment variables in Vercel:

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | Your Resend API key |
| `RESERVATIONS_TO` | The inbox that receives bookings |
| `RESERVATIONS_FROM` | Optional. A sender on a domain verified in Resend, e.g. `Azafrán Pérsico <reservas@azafranpersico.online>` |

## Deploy

Import the repository in Vercel, choose this branch, keep the defaults (framework: Next.js), add the variables above and deploy. Point `azafranpersico.online` at the Vercel project under Settings → Domains.
