import { ArrowUp, Coffee } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const links = [
    { label: t("navigation.home"), id: "home" },
    { label: t("navigation.about"), id: "about" },
    { label: t("navigation.journey"), id: "journey" },
    { label: t("navigation.habilities"), id: "skills" },
    { label: t("navigation.projects"), id: "projects" },
    { label: t("navigation.contact"), id: "contact" },
  ];

  const handleLinkClick = (sectionId: string) => {
    if (sectionId === "projects") {
      navigate("/projects");
      return;
    }

    if (location.pathname !== "/") {
      navigate("/");
      window.setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 80);
      return;
    }

    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border/70 bg-background px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row md:items-start">
          <div className="text-center md:text-left">
            <p className="font-display text-2xl font-semibold text-foreground">
              Thalys<span className="text-primary">.</span>
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t("footer.footerSlogan")}
            </p>
          </div>

          <nav
            aria-label="Links do rodapé"
            className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-end"
          >
            {links.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleLinkClick(link.id)}
                className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex h-11 w-11 shrink-0 items-center justify-center border border-border/80 text-muted-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Voltar ao topo"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-12 h-px w-full bg-border/60" />

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground sm:flex-row">
          <span>
            © {new Date().getFullYear()} Thalys Xavier. {t("footer.rights")}.
          </span>
          <span className="text-center sm:text-right">
            {t("footer.made")} {t("footer.andMuch")} <Coffee onClick={() => window.open("/admin/oauth/login", "_self")} className="inline-block h-4 w-4 mb-1 ml-1 text-primary animate-pulse" />
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
