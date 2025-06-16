
import { Database, Globe, Smartphone, Server, Palette, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SkillsSection = () => {
  const skillCategories = [
    {
      icon: Globe,
      title: 'Frontend',
      color: 'from-orange-500 to-red-500',
      skills: [
        { name: 'React', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Tailwind CSS', level: 92 },
        { name: "Angular", level: 75 },
        { name: 'Vue.js', level: 20 }
      ]
    },
    {
      icon: Server,
      title: 'Backend',
      color: 'from-orange-600 to-yellow-500',
      skills: [
        { name: 'Node.js', level: 90 },
        { name: 'Nest.js', level: 85 },
        { name: 'Express.js', level: 88 },
        { name: 'PHP', level: 20 },
        { name: 'C#', level: 23 },
      ]
    },
    {
      icon: Database,
      title: 'Database',
      color: 'from-yellow-500 to-orange-500',
      skills: [
        { name: 'PostgreSQL', level: 95 },
        { name: 'MongoDB', level: 85 },
        { name: 'MySQL', level: 80 },
      ]
    },
    {
      icon: Zap,
      title: 'DevOps & Tools',
      color: 'from-red-500 to-orange-600',
      skills: [
        { name: 'Docker', level: 82 },
        { name: 'AWS', level: 78 },
        { name: 'Git', level: 95 },
        { name: 'CI/CD', level: 80 },
        { name: 'Vercel', level: 90 }
      ]
    },
    {
      icon: Smartphone,
      title: 'Mobile',
      color: 'from-orange-500 to-orange-700',
      skills: [
        { name: 'React Native', level: 85 },
        { name: 'Expo', level: 88 },
        { name: 'Flutter', level: 35 },
        { name: 'Ionic', level: 15 }
      ]
    },
    {
      icon: Palette,
      title: 'Design',
      color: 'from-yellow-500 to-red-500',
      skills: [
        { name: 'Figma', level: 85 },
        { name: 'UI/UX', level: 80 },
        { name: 'Photoshop', level: 75 },
        { name: 'Prototyping', level: 82 },
        { name: 'Design Systems', level: 88 }
      ]
    }
  ];

  const { t } = useTranslation();


  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-orange-950/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins mb-4">
            {t("skills.title_my")} <span className="text-gradient">{t("skills.title_skills")}</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t("skills.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className="glass-effect p-6 rounded-2xl hover:bg-orange-500/5 transition-all duration-300 hover-lift group"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-orange-400">
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="group/skill">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 font-medium">
                        {skill.name}
                      </span>
                      <span className="text-orange-400 text-sm font-semibold">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${category.color} rounded-full transition-all duration-1000 ease-out group-hover/skill:animate-pulse`}
                        style={{
                          width: `${skill.level}%`,
                          animationDelay: `${(categoryIndex * 0.1) + (skillIndex * 0.05)}s`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-orange-400 mb-8">
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
                className="px-4 py-2 glass-effect rounded-full text-gray-300 hover:bg-orange-500/20 hover:text-orange-300 transition-all duration-300 hover-lift"
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
