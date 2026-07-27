export const PROJECT_SHORT_TITLE_MAX = 24;

export function toShortTitle(
  value: string | undefined | null,
  max = PROJECT_SHORT_TITLE_MAX
): string {
  const trimmed = (value ?? "").trim();
  if (!trimmed) return "";
  if (trimmed.length <= max) return trimmed;
  return trimmed.slice(0, max).trimEnd();
}
