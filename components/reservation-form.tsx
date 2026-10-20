"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { bookingTimes, reservationSchema } from "@/lib/reservation";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<string, string[]>>;

const selectClass =
  "flex h-14 w-full appearance-none border-0 border-b border-ink/25 bg-transparent bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22><path d=%22M1 1l5 5 5-5%22 stroke=%22%23372A28%22 stroke-width=%221.5%22 fill=%22none%22/></svg>')] bg-[length:12px_8px] bg-[right_4px_center] bg-no-repeat px-0 text-base text-ink focus-visible:border-saffron-deep focus-visible:outline-none aria-[invalid=true]:border-pomegranate";

export function ReservationForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [message, setMessage] = useState("");
  const today = new Date();
  const min = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = reservationSchema.safeParse(data);
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors);
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/reservations", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        if (json.errors) setErrors(json.errors);
        throw new Error(json.error ?? "Something went wrong.");
      }
      setStatus("sent");
    } catch (err) {
      setStatus("failed");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const err = (k: string) => errors[k]?.[0];
  const field = (k: string) => ({ "aria-invalid": !!err(k), "aria-describedby": err(k) ? `${k}-error` : undefined });

  return (
    <AnimatePresence mode="wait">
      {status === "sent" ? (
        <motion.div key="sent" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-10" role="status">
          <p className="eyebrow mb-4">Request received</p>
          <p className="font-display text-display-md text-ink">
            Thank you<span className="soft-mark">.</span>
          </p>
          <p className="mt-4 max-w-md text-lg text-ink-soft">We will confirm your table by phone or WhatsApp. If it is for today, call us on {site.phone.display}.</p>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={onSubmit} noValidate className="grid gap-x-8 gap-y-8 sm:grid-cols-2" exit={{ opacity: 0, y: -10 }}>
          <div className="sm:col-span-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" autoComplete="name" placeholder="Your name" {...field("name")} />
            <FieldError id="name-error" text={err("name")} />
          </div>
          <div>
            <Label htmlFor="people">People</Label>
            <select id="people" name="people" defaultValue="2" className={selectClass} {...field("people")}>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n} {n === 1 ? "person" : "people"}</option>)}
              <option value="13">More than 12</option>
            </select>
            <FieldError id="people-error" text={err("people")} />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+34 ..." {...field("phone")} />
            <FieldError id="phone-error" text={err("phone")} />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input id="date" name="date" type="date" min={min} {...field("date")} />
            <FieldError id="date-error" text={err("date")} />
          </div>
          <div>
            <Label htmlFor="time">Time</Label>
            <select id="time" name="time" defaultValue="" className={selectClass} {...field("time")}>
              <option value="" disabled>Choose a time</option>
              {bookingTimes.map((t) => <option key={t}>{t}</option>)}
            </select>
            <FieldError id="time-error" text={err("time")} />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea id="notes" name="notes" placeholder="Allergies, a birthday, a high chair..." />
          </div>
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Leave this empty</label>
            <input id="website" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
            <Button type="submit" size="lg" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Request a table"}</Button>
            <p className={cn("text-sm", status === "failed" ? "text-pomegranate" : "text-ink-soft")} role={status === "failed" ? "alert" : undefined}>
              {status === "failed" ? `${message} You can also call ${site.phone.display}.` : "We confirm every booking by phone or WhatsApp."}
            </p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function FieldError({ id, text }: { id: string; text?: string }) {
  return text ? <p id={id} className="mt-2 text-sm text-pomegranate">{text}</p> : null;
}
