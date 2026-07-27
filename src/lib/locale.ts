import type { ContentLocale } from "@/types/portfolio";

const LOCALE_MAP: Record<string, ContentLocale> = {
  "pt-BR": "ptbr",
  ptbr: "ptbr",
  pt: "ptbr",
  en: "en",
  es: "es",
};

export function toContentLocale(language?: string | null): ContentLocale {
  if (!language) return "ptbr";
  return LOCALE_MAP[language] ?? LOCALE_MAP[language.split("-")[0]] ?? "ptbr";
}
