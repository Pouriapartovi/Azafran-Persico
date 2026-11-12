import { z } from "zod";

// One set of rules, used by the form in the browser and checked again on the server.
// Error messages are short codes; the form shows them in the visitor's language (dictionary: form.errors).
export type ErrorCode = "name" | "people" | "date" | "monday" | "past" | "time" | "phone";

const todayInBarcelona = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Madrid" }).format(new Date());

export const reservationSchema = z.object({
  name: z.string({ required_error: "name" }).trim().min(2, "name"),
  people: z.coerce.number({ invalid_type_error: "people" }).int("people").min(1, "people").max(30, "people"),
  date: z
    .string({ required_error: "date" })
    .regex(/^\d{4}-\d{2}-\d{2}$/, "date")
    .refine((d) => d >= todayInBarcelona(), "past")
    .refine((d) => new Date(`${d}T12:00:00`).getDay() !== 1, "monday"),
  time: z.string({ required_error: "time" }).regex(/^\d{2}:\d{2}$/, "time"),
  phone: z.string({ required_error: "phone" }).trim().min(6, "phone"),
  notes: z.string().trim().max(500).optional().default(""),
  locale: z.string().max(5).optional(),
  website: z.string().max(0).optional(), // honeypot: real people leave it empty
});

export type Reservation = z.infer<typeof reservationSchema>;

// Times we take bookings: 12:00 to 23:00, every 30 minutes.
export const bookingTimes = Array.from({ length: 23 }, (_, i) => {
  const m = 12 * 60 + i * 30;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
});
