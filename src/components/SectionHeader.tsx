type SectionHeaderProps = {
  title: string;
  highlight?: string;
  description?: string;
  centered?: boolean;
  eyebrow?: string;
};

export function SectionHeader({
  title,
  highlight,
  description,
  centered = true,
  eyebrow,
}: SectionHeaderProps) {
  return (
    <div className={centered ? "mb-14 text-center" : "mb-10"}>
      {eyebrow ? (
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {title}{" "}
        {highlight ? <span className="text-primary">{highlight}</span> : null}
      </h2>
      {description ? (
        <p
          className={`mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg ${
            centered ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      ) : null}
      <div
        className={`mt-6 h-px w-16 bg-border ${centered ? "mx-auto" : ""}`}
        aria-hidden
      />
    </div>
  );
}
