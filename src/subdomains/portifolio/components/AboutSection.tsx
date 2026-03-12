
import { trackEvent } from '@/services/firebase';
import { Code, Coffee, Lightbulb, Users } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const AboutSection = () => {
  const { t } = useTranslation();
  const highlights = [
    {
      icon: Code,
      title: t('about.cards.cleanCode'),
      description: t('about.cards.cleanCodeDescription')
    },
    {
      icon: Lightbulb,
      title: t('about.cards.innovation'),
      description: t('about.cards.innovationDescription')
    },
    {
      icon: Users,
      title: t('about.cards.collaboration'),
      description: t('about.cards.collaborationDescription')
    },
    {
      icon: Coffee,
      title: t('about.cards.dedication'),
      description: t('about.cards.dedicationDescription')
    }
  ];

  useEffect(() => {
    trackEvent("about_section_viewed", { section: "about" });
  }, [])

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins mb-4">
            {t("about.title_about")} <span className="text-gradient">{t("about.title_me")}</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="animate-slide-in-left">
            <div className="glass-effect p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold text-primary mb-6">
                {t("about.cardTitle")}
              </h3>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  {t("about.cardParagraph1")}
                </p>

                <p>
                  {t("about.cardParagraph2")}
                </p>

                <p>
                  {t("about.cardParagraph3")}
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <h4 className="text-lg font-semibold text-primary mb-4">
                  {t("about.primaryTechs")}
                </h4>
                <div className="flex flex-wrap gap-3">
                  {['React', 'Node.js', 'TypeScript', 'React Native', 'PostgreSQL', 'MongoDB', 'Nest.js', 'Docker'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary/20 text-primary-foreground rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Highlights */}
          <div className="space-y-6">
            {highlights.map((item, index) => (
              <div
                key={item.title}
                className="flex items-start gap-4 glass-effect p-6 rounded-xl hover:bg-primary/5 transition-all duration-300 hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-shrink-0 p-3 bg-gradient-to-r from-primary to-accent rounded-lg">
                  <item.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-primary mb-2">
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: '10+', label: t('about.expCards.projectsDone') },
            { number: '5+', label: t('about.expCards.yearsOfExperience') },
            { number: '20+', label: t('about.expCards.clientSatisfaction') },
            { number: '100%', label: t('about.expCards.commitment') },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center glass-effect p-6 rounded-xl hover-lift"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-3xl font-bold text-gradient mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
