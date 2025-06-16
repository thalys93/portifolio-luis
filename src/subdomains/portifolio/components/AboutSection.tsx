
import { Code, Coffee, Lightbulb, Users } from 'lucide-react';

const AboutSection = () => {
  const highlights = [
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Código limpo e bem estruturado é minha paixão.'
    },
    {
      icon: Lightbulb,
      title: 'Inovação',
      description: 'Sempre em busca de soluções criativas e eficientes.'
    },
    {
      icon: Users,
      title: 'Colaboração',
      description: 'Trabalho em equipe e comunicação clara são essenciais.'
    },
    {
      icon: Coffee,
      title: 'Dedicação',
      description: 'Comprometido com a excelência em cada projeto.'
    }
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins mb-4">
            Sobre <span className="text-gradient">Mim</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="animate-slide-in-left">
            <div className="glass-effect p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold text-orange-400 mb-6">
                Desenvolvedor Full Stack apaixonado por tecnologia
              </h3>
              
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Com mais de 5 anos de experiência em desenvolvimento web, especializo-me em criar 
                  aplicações modernas e escaláveis usando as tecnologias mais atuais do mercado.
                </p>
                
                <p>
                  Minha jornada começou com curiosidade sobre como as coisas funcionam na web, 
                  e hoje transformo ideias complexas em soluções digitais elegantes e funcionais.
                </p>
                
                <p>
                  Acredito que o melhor código é aquele que resolve problemas reais de forma simples, 
                  mantendo sempre o foco na experiência do usuário e na qualidade do produto final.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-700">
                <h4 className="text-lg font-semibold text-orange-400 mb-4">
                  Principais Tecnologias
                </h4>
                <div className="flex flex-wrap gap-3">
                  {['React', 'Node.js', 'TypeScript', 'React Native', 'PostgreSQL', 'MongoDB', 'Nest.js', 'Docker'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm font-medium"
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
                className="flex items-start gap-4 glass-effect p-6 rounded-xl hover:bg-orange-500/5 transition-all duration-300 hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-shrink-0 p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-orange-400 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
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
            { number: '10+', label: 'Projetos Concluídos' },
            { number: '5+', label: 'Anos de Experiência' },
            { number: '20+', label: 'Clientes Satisfeitos' },
            { number: '100%', label: 'Comprometimento' }
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center glass-effect p-6 rounded-xl hover-lift"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-3xl font-bold text-gradient mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm">
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
