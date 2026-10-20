import { NextResponse } from "next/server";
import { reservationSchema } from "@/lib/reservation";

// Placeholder endpoint. It validates the request and logs it.
// To deliver bookings by email, set RESEND_API_KEY and RESERVATIONS_TO in Vercel
// (and optionally RESERVATIONS_FROM, a sender on a domain verified in Resend).
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = reservationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 422 });
  }
  const r = parsed.data;
  if (r.website) return NextResponse.json({ ok: true }); // quietly drop bots

  const summary = `${r.name} · ${r.people} ${r.people === 1 ? "person" : "people"} · ${r.date} at ${r.time} · ${r.phone}${r.notes ? ` · ${r.notes}` : ""}`;

  const key = process.env.RESEND_API_KEY;
  const to = process.env.RESERVATIONS_TO;
  if (key && to) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.RESERVATIONS_FROM ?? "Azafrán Pérsico <onboarding@resend.dev>",
        to: [to],
        subject: `New booking request: ${r.date} ${r.time}, ${r.people} pax`,
        text: `New booking request from the website\n\n${summary}`,
      }),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text());
      return NextResponse.json({ ok: false, error: "We could not send your request. Please call us." }, { status: 502 });
    }
  } else {
    console.log("[reservation:placeholder]", summary);
  }

  return NextResponse.json({ ok: true });
}
