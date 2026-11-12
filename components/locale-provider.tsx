"use client";

import { createContext, useContext } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";

type Ctx = { locale: Locale; t: Dictionary };
const LocaleContext = createContext<Ctx | null>(null);

export function LocaleProvider({ locale, t, children }: Ctx & { children: React.ReactNode }) {
  return <LocaleContext.Provider value={{ locale, t }}>{children}</LocaleContext.Provider>;
}

// Current language and its dictionary, for client components.
export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside LocaleProvider");
  return ctx;
}
