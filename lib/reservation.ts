import { z } from "zod";

// One set of rules, used by the form in the browser and checked again on the server.
export const reservationSchema = z.object({
  name: z.string({ required_error: "Please tell us your name." }).trim().min(2, "Please tell us your name."),
  people: z.coerce.number().int().min(1, "At least one person.").max(30, "For more than 30 people, please call us."),
  date: z
    .string({ required_error: "Please choose a date." })
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a date.")
    .refine((d) => new Date(`${d}T12:00:00`).getDay() !== 1, "We are closed on Mondays. Please choose another day."),
  time: z.string({ required_error: "Please choose a time." }).regex(/^\d{2}:\d{2}$/, "Please choose a time."),
  phone: z.string({ required_error: "Please add a phone number so we can confirm." }).trim().min(6, "Please add a phone number so we can confirm."),
  notes: z.string().trim().max(500).optional().default(""),
  website: z.string().max(0).optional(), // honeypot: real people leave it empty
});

export type Reservation = z.infer<typeof reservationSchema>;

// Times we take bookings: 12:00 to 23:00, every 30 minutes.
export const bookingTimes = Array.from({ length: 23 }, (_, i) => {
  const m = 12 * 60 + i * 30;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
});
