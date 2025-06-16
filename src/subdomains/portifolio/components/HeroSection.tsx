
import { ArrowDown, Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const { t } = useTranslation();

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-background to-orange-800/10" />

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-orange-500/10 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-orange-400/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-orange-600/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-4xl sm:text-6xl lg:text-6xl font-bold font-poppins mb-6">
            {t("hero.title")}{' '}
            <span className="text-gradient">
              Thalys Xavier
            </span>
          </h1>

          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-8 font-light">
            {t("hero.subtitle")}
          </p>

          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t("hero.description")}
          </p>

          <div className="flex justify-center gap-6 mb-12">
            <a
              href="https://github.com/thalys93"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass-effect rounded-full hover:bg-orange-500/20 transition-all duration-300 hover-lift group"
            >
              <Github className="w-6 h-6 text-gray-300 group-hover:text-orange-400 transition-colors" />
            </a>
            <a
              href="https://linkedin.com/in/thalys-dev202/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass-effect rounded-full hover:bg-orange-500/20 transition-all duration-300 hover-lift group"
            >
              <Linkedin className="w-6 h-6 text-gray-300 group-hover:text-orange-400 transition-colors" />
            </a>
            <a
              href="mailto:thalys.dev@gmail.com"
              className="p-3 glass-effect rounded-full hover:bg-orange-500/20 transition-all duration-300 hover-lift group"
            >
              <Mail className="w-6 h-6 text-gray-300 group-hover:text-orange-400 transition-colors" />
            </a>
            <a
              href="https://www.instagram.com/thalys.dev25/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass-effect rounded-full hover:bg-orange-500/20 transition-all duration-300 hover-lift group"
            >
              <Instagram className="w-6 h-6 text-gray-300 group-hover:text-orange-400 transition-colors" />
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 text-lg font-medium transition-all duration-300 hover-lift"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t("hero.button_one")}
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white px-8 py-3 text-lg font-medium transition-all duration-300 hover-lift"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t("hero.button_two")}
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={scrollToAbout}
            className="text-orange-400 hover:text-orange-300 transition-colors"
            aria-label="Scroll to about section"
          >
            <ArrowDown className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
