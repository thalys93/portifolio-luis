
import { trackEvent } from '@/services/firebase';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FirebaseDB } from '@/services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Code, Globe, Rocket, DollarSign, List, Image, Computer } from 'lucide-react';
import { getIcon } from '@/shared/consts/Icons';

const SkillsSection = () => {  
  const { t } = useTranslation();  

  const [skillGroups, setSkillGroups] = useState<any[]>([]);

  useEffect(() => {
    trackEvent("skills_section_viewed", { section: "skills" });
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDocs(collection(FirebaseDB, 'skills'));
        const items = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
        setSkillGroups(items);
      } catch {}
    };
    load();
  }, []);

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-black/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins mb-4">
            {t("skills.title_my")} <span className="text-gradient">{t("skills.title_skills")}</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("skills.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillGroups.sort((a, b) => a.order - b.order).map((category, categoryIndex) => {
            const gradient = category?.color
              ? `bg-gradient-to-r ${category.color}`
              : 'bg-primary';
            const IconComp = getIcon(category?.icon);

            return (
              <div
                key={category.id || category.title}
                className="glass-effect p-6 rounded-2xl hover:bg-primary/5 transition-all duration-300 hover-lift group"
                style={{ animationDelay: `${categoryIndex * 0.1}s` }}
              >
                {/* Cabeçalho da Categoria */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-lg ${gradient} group-hover:scale-110 transition-transform duration-300`}>
                    {React.cloneElement(IconComp, { className: 'w-6 h-6 text-primary-foreground' })}
                  </div>
                  <h3 className="text-xl font-semibold text-primary">
                    {category?.title ?? '—'}
                  </h3>
                </div>

                {/* Lista de Skills */}
                <div className="space-y-4">
                  {(category?.skills ?? []).map((skill: any, skillIndex: number) => (
                    <div key={`${category.id}-${skill?.name}-${skillIndex}`} className="group/skill">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-muted-foreground font-medium">
                          {skill?.name ?? '—'}
                        </span>
                        <span className="text-muted-foreground text-sm font-semibold">
                          {Number(skill?.level ?? 0)}%
                        </span>
                      </div>

                      {/* Barra de Progresso */}
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full ${gradient} rounded-full transition-all duration-1000 ease-out group-hover/skill:animate-pulse`}
                          style={{
                            width: `${Number(skill?.level ?? 0)}%`,
                            animationDelay: `${(categoryIndex * 0.1) + (skillIndex * 0.05)}s`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Skills adicionais (mantido como antes) */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-primary mb-8">
            {t("skills.otherSkills")}
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Metodologias Ágeis',
              'Scrum',
              'TDD',
              'Clean Architecture',
              'Microservices',
              'RESTful APIs',
              'WebSockets',
              'Performance Optimization',
              'SEO',
              'Accessibility'
            ].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 glass-effect rounded-full text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all duration-300 hover-lift"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
