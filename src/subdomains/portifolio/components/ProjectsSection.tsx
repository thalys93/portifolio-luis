
import React, { useState } from 'react';
import { ExternalLink, Github, Calendar, Code, Smartphone, Globe, Rocket, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { FirebaseDB, trackEvent } from '@/services/firebase'
import { collection, getDocs } from 'firebase/firestore'

const ProjectsSection = () => {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState<any[]>([]);
  const [catList, setCatList] = useState<any[]>([]);

  React.useEffect(() => {
    trackEvent("projects_section_viewed", { section: "projects" });
  }, [])

  React.useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDocs(collection(FirebaseDB, 'projects'))
        const items = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }))
        setProjects(items)
      } catch { }
    }
    load()
  }, [])

  React.useEffect(() => {
    const loadCats = async () => {
      try {
        const snap = await getDocs(collection(FirebaseDB, 'categories'))
        setCatList(snap.docs.map((d) => ({ ...(d.data() as any) })))
      } catch {}
    }
    loadCats()
  }, [])

  const categories = React.useMemo(() => {
    const set = new Set<string>(['Todos'])
    projects.forEach((p) => { if (p.category) set.add(p.category) })
    return Array.from(set)
  }, [projects])

  const iconMap: Record<string, any> = { 'code': Code, 'globe': Globe, 'rocket': Rocket, 'dollar-sign': DollarSign }

  const getText = (p: any) => {
    const lang = (i18n.language || 'ptbr') as 'ptbr' | 'en' | 'es'
    const fallbackTitle = p?.i18n?.[lang]?.title || p?.i18n?.ptbr?.title || ''
    const fallbackDesc = p?.i18n?.[lang]?.description || p?.i18n?.ptbr?.description || ''
    return {
      title: p.i18nKey ? t(`${p.i18nKey}.title`, { defaultValue: fallbackTitle }) : fallbackTitle,
      description: p.i18nKey ? t(`${p.i18nKey}.description`, { defaultValue: fallbackDesc }) : fallbackDesc,
    }
  }

  const getCategoryName = (slug: string) => {
    if (!slug || slug === 'Todos') return slug
    const c = catList.find((x) => x.slug === slug)
    if (!c) return slug
    const lang = (i18n.language || 'ptbr') as 'ptbr' | 'en' | 'es'
    const fallback = c?.i18n?.[lang]?.name || c?.i18n?.ptbr?.name || slug
    return c.i18nKey ? t(`${c.i18nKey}.name`, { defaultValue: fallback }) : fallback
  }

  const [activeCategory, setActiveCategory] = useState('Todos');

  const filteredProjects = activeCategory === 'Todos'
    ? projects.sort((a, b) => a.order - b.order)
    : projects?.filter(project => project?.category === activeCategory);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins mb-4">
            {t('projects.title_my')} <span className="text-gradient">{t('projects.title_projects')}</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-slate-500 to-slate-600 mx-auto rounded-full mb-6" />
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {t('projects.description')}
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeCategory === category
                ? 'bg-gradient-to-r from-slate-500 to-slate-600 text-white shadow-lg'
                : 'glass-effect text-slate-300 hover:bg-slate-500/20 hover:text-slate-400'
                }`}
            >
              {category === 'Todos' ? 'Todos' : getCategoryName(category)}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects?.map((project, index) => (
            <div
              key={project.id}
              className="glass-effect rounded-2xl overflow-hidden hover:bg-slate-500/5 transition-all duration-500 hover-lift group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={project.image}
                  alt={getText(project).title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full">
                  {React.createElement(iconMap[project.icon] || Code, { className: "w-4 h-4 text-slate-400" })}
                  <span className="text-slate-400 text-sm font-medium">
                    {getCategoryName(project.category)}
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
                <h3 className="text-xl font-semibold text-slate-400 mb-3 group-hover:text-slate-300 transition-colors">
                  {getText(project).title}
                </h3>

                <p className="text-slate-300 mb-4 leading-relaxed">
                  {getText(project).description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-slate-500/20 text-slate-300 rounded text-xs font-medium"
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
                    className={cn("border-slate-500 text-slate-400 hover:bg-slate-500 hover:text-white flex-1 select-none", !project.github && "opacity-50 cursor-not-allowed")}
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
                    className={cn("bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 flex-1 select-none", !project.demo && "opacity-50 cursor-not-allowed")}
                    asChild
                    disabled={!project.demo}
                  >
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {project.demo ? 'Live' : t('projects.unavaliable')}
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
            className="bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 px-8 py-3"
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
