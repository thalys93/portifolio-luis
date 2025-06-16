
import { User, Code2, Heart, Lightbulb } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const JourneySection = () => {
  const { t } = useTranslation();
  return (
    <section id="journey" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent" />
      <div className="absolute top-10 right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-orange-400/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-4">
            {t("journey.title_my")} <span className="text-gradient">{t("journey.title_journey")}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t("journey.description")}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Column */}
          <div className="animate-slide-in-left">
            <div className="relative group">
              {/* Main image container */}
              <div className="relative overflow-hidden rounded-2xl glass-effect p-1">
                <img
                  src="https://res.cloudinary.com/dh39ahmpj/image/upload/v1750092499/portifolio.dev/portifolio_profile_tvpbpg.png"
                  alt="Thalys Xavier - Desenvolvedor Full Stack"
                  className="w-full h-[600px] object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent rounded-xl" />
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 glass-effect p-3 rounded-xl hover-lift">
                <Code2 className="w-6 h-6 text-orange-400" />
              </div>
              <div className="absolute -bottom-4 -left-4 glass-effect p-3 rounded-xl hover-lift">
                <Heart className="w-6 h-6 text-orange-500 fill-current" />
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {/* Story blocks */}
            <div className="space-y-8">
              <div className="flex gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 glass-effect rounded-full flex items-center justify-center group-hover:bg-orange-500/20 transition-all duration-300">
                  <Lightbulb className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-orange-400 mb-2 font-poppins">
                    {t("journey.firstClick")}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {t("journey.firstDescription")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 glass-effect rounded-full flex items-center justify-center group-hover:bg-orange-500/20 transition-all duration-300">
                  <Code2 className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-orange-400 mb-2 font-poppins">
                    {t("journey.continousLearning")}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {t("journey.continousDescription")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 glass-effect rounded-full flex items-center justify-center group-hover:bg-orange-500/20 transition-all duration-300">
                  <User className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-orange-400 mb-2 font-poppins">
                    {t("journey.connectingPeople")}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {t("journey.connectingPeopleDescription")}
                  </p>
                </div>
              </div>
            </div>

            {/* Call to action */}
            <div className="pt-6">
              <div className="glass-effect p-6 rounded-xl border border-orange-500/20">
                <p className="text-gray-300 mb-4 italic">
                  {t("journey.quote")}
                </p>
                <p className="text-orange-400 font-medium">
                  {t("journey.quoteConnect")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
