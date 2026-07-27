import type { TFunction } from "i18next";
import type { PublicCatalogService } from "@/types/catalog-service";

const DEADLINE_I18N_KEYS: Record<string, string> = {
  "1-2 dias uteis": "services.deadlines.d1_2",
  "3-5 dias uteis": "services.deadlines.d3_5",
  "1 semana": "services.deadlines.w1",
  "2 semanas": "services.deadlines.w2",
  "3-4 semanas": "services.deadlines.w3_4",
  "1 mes": "services.deadlines.m1",
  "a combinar": "services.deadlines.tbd",
};

function normalizeDeadline(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function toNumberFormatLocale(language: string | undefined): string {
  if (language?.startsWith("en")) return "en-US";
  if (language?.startsWith("es")) return "es-ES";
  return "pt-BR";
}

export function formatServicePrice(
  value: string | null,
  language: string | undefined
): string | null {
  if (value == null || value === "") return null;
  const amount = Number(value);
  if (!Number.isFinite(amount)) return null;
  return new Intl.NumberFormat(toNumberFormatLocale(language), {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatServicePriceRange(
  service: PublicCatalogService,
  language: string | undefined,
  t: TFunction
): string | null {
  const min = formatServicePrice(service.minPrice, language);
  const ideal = formatServicePrice(service.idealPrice, language);
  if (min && ideal) {
    return t("services.priceRange", { min, ideal });
  }
  return min ?? ideal;
}

export function translateServiceDeadline(
  deadline: string | null,
  t: TFunction,
  exists: (key: string) => boolean
): string | null {
  if (!deadline) return null;
  const key = DEADLINE_I18N_KEYS[normalizeDeadline(deadline)];
  if (key && exists(key)) return t(key);
  return deadline;
}

export function translateServiceName(
  service: PublicCatalogService,
  t: TFunction,
  exists: (key: string) => boolean
): string {
  if (service.translateKey && exists(service.translateKey)) {
    return t(service.translateKey);
  }
  return service.name;
}
