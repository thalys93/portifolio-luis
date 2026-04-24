import { useState } from "react";
import { Mail, Phone, MapPin, Send, Github, Linkedin, AtSign, Trash, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { SectionHeader } from "@/components/SectionHeader";

const ContactSection = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResetForm = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

      if (!accessKey) {
        throw new Error("Missing VITE_WEB3FORMS_ACCESS_KEY");
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          from_name: formData.name,
          replyto: formData.email,
          subject: formData.subject,
          message: formData.message,
          botcheck: "",
        }),
      });

      const result = (await response.json()) as { success?: boolean };

      if (!response.ok || !result.success) {
        throw new Error("Failed to submit contact form");
      }

      toast({
        title: t("contact.form.toast.title"),
        description: t("contact.form.toast.description"),
      });
      handleResetForm();
    } catch {
      toast({
        title: t("contact.form.toast.error"),
        description: t("contact.form.toast.error_description"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: t("contact.email"),
      value: "thalys.dev@gmail.com",
      link: "mailto:thalys.dev@gmail.com",
    },
    {
      icon: Phone,
      title: t("contact.cellphone"),
      value: "+55 (51) 99148-5593",
      link: "tel:+555191485593",
    },
    {
      icon: MapPin,
      title: t("contact.localization"),
      value: "Nova Santa Rita, RS - Brasil",
      link: "https://www.google.com/maps/place/Nova+Santa+Rita,+RS/data=!4m2!3m1!1s0x95197c0356569155:0x240770d2c2608863?sa=X&ved=1t:155783&ictx=111",
    },
  ];

  const socialLinks = [
    { icon: Github, name: "GitHub", url: "https://github.com/thalys93" },
    { icon: Linkedin, name: "LinkedIn", url: "https://linkedin.com/in/thalys-dev202/" },
    { icon: AtSign, name: "Threads", url: "https://www.threads.com/@luiss_xavierr" },
    { icon: Instagram, name: "Instagram", url: "https://www.instagram.com/thalys.dev25/" },
  ];

  return (
    <section
      id="contact"
      className="border-t border-border/60 bg-muted/10 py-20 px-4 sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={t("navigation.contact")}
          title={t("contact.title_start")}
          highlight={t("contact.title_contact")}
          description={t("contact.description")}
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-8">
            <div className="border border-border/70 bg-card/40 p-8">
              <h3 className="font-display text-2xl font-semibold text-primary">
                {t("contact.contactInfo")}
              </h3>
              <div className="mt-8 space-y-2">
                {contactInfo.map((info) => (
                  <a
                    key={info.title}
                    href={info.link}
                    className="group flex items-center gap-4 border border-transparent px-0 py-4 transition-colors hover:border-b hover:border-primary/40"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-primary/50 text-primary">
                      <info.icon className="h-5 w-5" aria-hidden />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                        {info.title}
                      </h4>
                      <p className="mt-1 text-sm text-foreground group-hover:text-primary">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="border border-border/70 bg-card/40 p-8">
              <h3 className="font-display text-xl font-semibold text-primary">
                {t("contact.socialMedia")}
              </h3>
              <div className="mt-6 flex flex-wrap gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center border border-border/80 text-muted-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="border border-border/70 bg-card/40 p-8">
              <h3 className="font-display text-xl font-semibold text-primary">
                {t("contact.avaliability")}
              </h3>
              <div className="mt-4 flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                </span>
                <span className="text-sm text-muted-foreground">{t("contact.avaliability_text1")}</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{t("contact.avaliability_text2")}</p>
            </div>
          </div>

          <div className="border border-border/70 bg-card/40 p-8 sm:p-10">
            <h3 className="font-display text-2xl font-semibold text-primary">
              {t("contact.form.contactForm")}
            </h3>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground"
                  >
                    {t("contact.form.name")} <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="rounded-none border-border bg-background focus-visible:ring-ring"
                    placeholder={t("contact.form.placeholder")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground"
                  >
                    {t("contact.form.email")} <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="rounded-none border-border bg-background focus-visible:ring-ring"
                    placeholder={t("contact.form.placeholder_email")}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground"
                >
                  {t("contact.form.subject")} <span className="text-destructive">*</span>
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="rounded-none border-border bg-background focus-visible:ring-ring"
                  placeholder={t("contact.form.placeholder_subject")}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground"
                >
                  {t("contact.form.message")} <span className="text-destructive">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="resize-none rounded-none border-border bg-background focus-visible:ring-ring"
                  placeholder={t("contact.form.placeholder_message")}
                />
              </div>

              <div className="flex flex-col-reverse gap-3 md:flex-row md:justify-end">
                <Button
                  type="reset"
                  onClick={handleResetForm}
                  variant="outline"
                  className="rounded-none border-border md:w-auto"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  {t("contact.form.reset")}
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-none bg-primary px-8 text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      {t("contact.form.sendAction")}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-5 w-5" />
                      {t("contact.form.sendButton")}
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
