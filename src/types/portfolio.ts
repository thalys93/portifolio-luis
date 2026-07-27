export type ContentLocale = "ptbr" | "en" | "es";

export type LocalizedText = {
  title?: string;
  shortTitle?: string;
  description?: string;
  name?: string;
};

export type Project = {
  id: string;
  image?: string;
  technologies?: string[];
  category?: string;
  icon?: string;
  github?: string | null;
  demo?: string | null;
  date?: string;
  order?: number;
  i18nKey?: string;
  i18n?: Partial<Record<ContentLocale, LocalizedText>>;
};

export type Category = {
  id?: string;
  slug?: string;
  i18nKey?: string;
  i18n?: Partial<Record<ContentLocale, LocalizedText>>;
};

export type SkillItem = {
  name: string;
  level?: number;
  icon?: string;
};

export type SkillGroup = {
  id: string;
  title?: string;
  order?: number;
  skills?: SkillItem[];
};
