
import { Heart, ArrowUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-background border-t border-border py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo and Description */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold font-poppins text-gradient mb-2">
              Thalys Xavier
            </h3>
            <p className="text-muted-foreground max-w-md">
              {t('footer.footerSlogan')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { label: t("navigation.home"), id: 'home' },
              { label: t("navigation.about"), id: 'about' },
              { label: t("navigation.journey"), id: 'journey' },
              { label: t("navigation.habilities"), id: 'skills' },
              { label: t("navigation.projects"), id: 'projects' },
              { label: t("navigation.contact"), id: 'contact' }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })}
                className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="p-3 glass-effect rounded-full hover:bg-primary/20 transition-all duration-300 hover-lift group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </button>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Thalys Xavier. {t('footer.rights')}.</span>
          </div>

          <div className="flex items-center gap-2">
            <span>{t("footer.made")}</span>
            <Heart className="w-4 h-4 text-destructive fill-current animate-pulse" />
            <span>{t("footer.andMuch")}</span>
            <span className="text-primary">☕</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
