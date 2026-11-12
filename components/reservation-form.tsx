"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useLocale } from "./locale-provider";
import { bookingTimes, reservationSchema, type ErrorCode } from "@/lib/reservation";
import { fill } from "@/lib/i18n/config";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<string, string[]>>;

const selectClass =
  "flex h-14 w-full appearance-none border-0 border-b border-ink/25 bg-transparent bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22><path d=%22M1 1l5 5 5-5%22 stroke=%22%23372A28%22 stroke-width=%221.5%22 fill=%22none%22/></svg>')] bg-[length:12px_8px] bg-[right_4px_center] bg-no-repeat px-0 text-base text-ink focus-visible:border-saffron-deep focus-visible:outline-none aria-[invalid=true]:border-pomegranate rtl:bg-[left_4px_center]";

export function ReservationForm() {
  const { locale, t } = useLocale();
  const f = t.form;
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const min = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Madrid" }).format(new Date());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = { ...Object.fromEntries(new FormData(e.currentTarget)), locale };
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
        throw new Error("failed");
      }
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  }

  // Shows the first problem with a field, in the visitor's language.
  const err = (k: string) => {
    const code = errors[k]?.[0] as ErrorCode | undefined;
    return code ? f.errors[code] ?? f.errors[k as ErrorCode] : undefined;
  };
  const field = (k: string) => ({ "aria-invalid": !!err(k), "aria-describedby": err(k) ? `${k}-error` : undefined });

  return (
    <AnimatePresence mode="wait">
      {status === "sent" ? (
        <motion.div key="sent" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-10" role="status">
          <p className="eyebrow mb-4">{f.receivedEyebrow}</p>
          <p className="font-display text-display-md text-ink">{f.thanks}</p>
          <p className="mt-4 max-w-md text-lg text-ink-soft">{fill(f.receivedText, { phone: site.phone.display })}</p>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={onSubmit} noValidate className="grid gap-x-8 gap-y-8 sm:grid-cols-2" exit={{ opacity: 0, y: -10 }}>
          <div className="sm:col-span-2">
            <Label htmlFor="name">{f.name}</Label>
            <Input id="name" name="name" autoComplete="name" placeholder={f.namePlaceholder} {...field("name")} />
            <FieldError id="name-error" text={err("name")} />
          </div>
          <div>
            <Label htmlFor="people">{f.people}</Label>
            <select id="people" name="people" defaultValue="2" className={selectClass} {...field("people")}>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n} {n === 1 ? f.person : f.persons}</option>)}
              <option value="13">{f.moreThan}</option>
            </select>
            <FieldError id="people-error" text={err("people")} />
          </div>
          <div>
            <Label htmlFor="phone">{f.phone}</Label>
            <Input id="phone" name="phone" type="tel" dir="ltr" autoComplete="tel" placeholder="+34 ..." className="rtl:text-right" {...field("phone")} />
            <FieldError id="phone-error" text={err("phone")} />
          </div>
          <div>
            <Label htmlFor="date">{f.date}</Label>
            <Input id="date" name="date" type="date" min={min} {...field("date")} />
            <FieldError id="date-error" text={err("date")} />
          </div>
          <div>
            <Label htmlFor="time">{f.time}</Label>
            <select id="time" name="time" defaultValue="" className={selectClass} {...field("time")}>
              <option value="" disabled>{f.chooseTime}</option>
              {bookingTimes.map((time) => <option key={time}>{time}</option>)}
            </select>
            <FieldError id="time-error" text={err("time")} />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="notes">{f.notes}</Label>
            <Textarea id="notes" name="notes" placeholder={f.notesPlaceholder} />
          </div>
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Leave this empty</label>
            <input id="website" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
            <Button type="submit" size="lg" disabled={status === "sending"}>{status === "sending" ? f.sending : f.submit}</Button>
            <p className={cn("text-sm", status === "failed" ? "text-pomegranate" : "text-ink-soft")} role={status === "failed" ? "alert" : undefined}>
              {status === "failed" ? fill(f.failed, { phone: site.phone.display }) : f.confirmNote}
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
