import type { TFunction } from "i18next";
import type { Category, ContentLocale, Project } from "@/types/portfolio";
import { toContentLocale } from "@/lib/locale";
import { toShortTitle } from "@/lib/project-short-title";

export function getProjectText(
  project: Project,
  language: string | undefined,
  t: TFunction
) {
  const lang = toContentLocale(language);
  const fallbackTitle =
    project.i18n?.[lang]?.title || project.i18n?.ptbr?.title || "";
  const fallbackShortTitle =
    project.i18n?.[lang]?.shortTitle ||
    project.i18n?.ptbr?.shortTitle ||
    toShortTitle(fallbackTitle);
  const fallbackDesc =
    project.i18n?.[lang]?.description || project.i18n?.ptbr?.description || "";

  const title = project.i18nKey
    ? t(`${project.i18nKey}.title`, { defaultValue: fallbackTitle })
    : fallbackTitle;

  return {
    title,
    shortTitle: toShortTitle(
      project.i18n?.[lang]?.shortTitle ||
        project.i18n?.ptbr?.shortTitle ||
        fallbackShortTitle ||
        title
    ),
    description: project.i18nKey
      ? t(`${project.i18nKey}.description`, { defaultValue: fallbackDesc })
      : fallbackDesc,
  };
}

export function getCategoryName(
  slug: string | undefined,
  categories: Category[],
  language: string | undefined,
  t: TFunction,
  allLabel?: string
) {
  if (!slug || slug === "Todos" || slug === "All") {
    return allLabel ?? slug ?? "";
  }

  const category = categories.find((item) => item.slug === slug);
  if (!category) return slug;

  const lang = toContentLocale(language) as ContentLocale;
  const fallback =
    category.i18n?.[lang]?.name || category.i18n?.ptbr?.name || slug;

  return category.i18nKey
    ? t(`${category.i18nKey}.name`, { defaultValue: fallback })
    : fallback;
}
