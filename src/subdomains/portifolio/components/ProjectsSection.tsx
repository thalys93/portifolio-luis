
import { useState } from 'react';
import { ExternalLink, Github, Calendar, Code, Smartphone, Globe, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

const ProjectsSection = () => {
  const { t } = useTranslation();
  const projects = [
    {
      title: t('projects.portifolio'),
      description: t('projects.portifolioDescription'),
      image: 'https://avatars.githubusercontent.com/u/102838847?v=4',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Vercel', 'Shadcn UI'],
      category: 'Front-End',
      icon: Code,
      github: 'https://github.com/thalys93/portifolio-luis',
      demo: 'https://portifolio-luis-thalys.web.app/home',
      date: '2025'
    },
    {
      title: t("projects.tchepi"),
      description: t('projects.tchepiDescription'),
      image: "https://res.cloudinary.com/dh39ahmpj/image/upload/v1750106821/projects-images/tchepi_dark_p3hy7e.jpg",
      technologies: ['React', 'Nest.js', 'PostgreSQL', 'Docker', 'Tailwind CSS', 'Shadcn UI'],
      category: 'Eccomerce',
      icon: Globe,
      github: null,
      demo: "https://tchepi-hml.web.app/",
      date: '2025'
    },
    {
      title: t("projects.docgen"),
      description: t("projects.docgenDescription"),
      image: "https://res.cloudinary.com/dh39ahmpj/image/upload/v1750107244/projects-images/docgen_yekrmx.jpg",
      technologies: ['React', 'Nest.js', 'PostgreSQL', 'Docker', 'Shadcn UI', "Python"],      
      category: 'SASS',
      icon: Rocket,
      github: null,
      demo: "https://docgen.com.br/",
      date: '2025'
    },
    {
      title: t('projects.carteira'),
      description: t('projects.carteiraDescription'),
      image: 'https://res.cloudinary.com/dh39ahmpj/image/upload/v1716829255/carteira_de_saude/adaptive-icon_pfyg0a.png',
      technologies: ['React Native', 'Nest.js', 'PostgreSQL', 'Docker'],
      category: 'Mobile',
      icon: Smartphone,
      github: null,
      demo: null,
      date: '2024'
    },
    {
      title: t('projects.cadeMeuRango'),
      description: t('projects.cadeMeuRangoDescription'),
      image: 'https://res.cloudinary.com/dh39ahmpj/image/upload/v1684280950/Cad%C3%AA%20Meu%20Rango/thumb_do_site_knjbzn.png',
      technologies: ['React.Js', 'Firebase', 'Redux',],
      category: 'Front-End',
      icon: Code,
      github: 'https://github.com/thalys93/cade-meu-rango-front',
      demo: 'https://cade-meu-rango-front.web.app/',
      date: '2022'
    },
    {
      title: t('projects.theFilmDB'),
      description: t('projects.theFilmDBDescription'),
      image: 'https://res.cloudinary.com/dh39ahmpj/image/upload/v1729102237/the-film-db/Designer_bujy3v.jpg',
      technologies: ['React.Js', 'Typescript', 'Axios'],
      category: 'Front-End',
      icon: Code,
      github: 'https://github.com/thalys93/the-film-db',
      demo: 'https://the-film-db.web.app/',
      date: '2023'
    },
  ];

  const categories = ['Todos', 'Fullstack', 'Frontend', 'Mobile'];
  const [activeCategory, setActiveCategory] = useState('Todos');

  const filteredProjects = activeCategory === 'Todos'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins mb-4">
            {t('projects.title_my')} <span className="text-gradient">{t('projects.title_projects')}</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t('projects.description')}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeCategory === category
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                : 'glass-effect text-gray-300 hover:bg-orange-500/20 hover:text-orange-400'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.title}
              className="glass-effect rounded-2xl overflow-hidden hover:bg-orange-500/5 transition-all duration-500 hover-lift group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full">
                  <project.icon className="w-4 h-4 text-orange-400" />
                  <span className="text-orange-400 text-sm font-medium">
                    {project.category}
                  </span>
                </div>

                {/* Date */}
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full">
                  <Calendar className="w-3 h-3 text-gray-300" />
                  <span className="text-gray-300 text-xs">
                    {project.date}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-orange-400 mb-3 group-hover:text-orange-300 transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn("border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white flex-1 select-none", !project.github && "opacity-50 cursor-not-allowed")}
                    asChild
                    disabled={!project.github}
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      {project.github ? 'GitHub' : t('projects.unavaliable')}
                    </a>
                  </Button>

                  <Button
                    size="sm"
                    className={cn("bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 flex-1 select-none", !project.demo && "opacity-50 cursor-not-allowed")}
                    asChild
                    disabled={!project.demo}
                  >
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {project.demo ? 'Demo' : t('projects.unavaliable')}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">
            {t('projects.interest')}
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 px-8 py-3"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t('projects.interestButton')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
