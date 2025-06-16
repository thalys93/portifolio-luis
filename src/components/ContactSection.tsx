
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, AtSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Mensagem enviada!",
        description: "Obrigado pelo contato. Responderei em breve!",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'thalys.dev@gmail.com',
      link: 'mailto:thalys.dev@gmail.com'
    },
    {
      icon: Phone,
      title: 'Telefone',
      value: '+55 (51) 99148-5593',
      link: 'tel:+555191485593'
    },
    {
      icon: MapPin,
      title: 'Localização',
      value: 'Canoas, RS - Brasil',
      link: 'https://www.google.com/maps/place/canoas/data=!4m2!3m1!1s0x95197aa8021e5571:0xd0de460f7518f586?sa=X&ved=1t:155783&ictx=111'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      name: 'GitHub',
      url: 'https://github.com/thalys93',
      color: 'hover:text-gray-400'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/thalys-dev202/',
      color: 'hover:text-blue-400'
    },
    {
      icon: AtSign,
      name: 'Twitter',
      url: 'https://www.threads.com/@luiss_xavierr',
      color: 'hover:text-blue-400'
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-orange-950/10 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins mb-4">
            Entre em <span className="text-gradient">Contato</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Vamos transformar sua ideia em realidade! Entre em contato para discutir seu próximo projeto
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="glass-effect p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold text-orange-400 mb-6">
                Informações de Contato
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={info.title}
                    href={info.link}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-orange-500/10 transition-all duration-300 hover-lift group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex-shrink-0 p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <info.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-400 mb-1">
                        {info.title}
                      </h4>
                      <p className="text-gray-300 group-hover:text-orange-300 transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-effect p-8 rounded-2xl">
              <h3 className="text-xl font-semibold text-orange-400 mb-6">
                Redes Sociais
              </h3>
              
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 glass-effect rounded-full transition-all duration-300 hover-lift group ${social.color}`}
                  >
                    <social.icon className="w-5 h-5 text-gray-300 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="glass-effect p-8 rounded-2xl">
              <h3 className="text-xl font-semibold text-orange-400 mb-4">
                Disponibilidade
              </h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-gray-300">
                  Disponível para novos projetos
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Respondo geralmente em até 24 horas
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-effect p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold text-orange-400 mb-6">
              Envie uma Mensagem
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Nome *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500"
                    placeholder="Seu nome"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Assunto *
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500"
                  placeholder="Assunto da mensagem"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Mensagem *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500 resize-none"
                  placeholder="Descreva seu projeto ou dúvida..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 text-lg font-medium transition-all duration-300 hover-lift disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Enviando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Enviar Mensagem
                  </div>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
