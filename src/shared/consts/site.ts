export const SITE = {
  brand: "Thalys Dev",
  personName: "Luis Thalys",
  email: "thalys.dev@gmail.com",
  phoneDisplay: "+55 (51) 99148-5593",
  phoneTel: "+555191485593",
  whatsappPhone: "555191485593",
  location: "Nova Santa Rita, RS",
  locationMapUrl:
    "https://www.google.com/maps/place/Nova+Santa+Rita,+RS/data=!4m2!3m1!1s0x95197c0356569155:0x240770d2c2608863?sa=X&ved=1t:155783&ictx=111",
  threadsUrl: "https://www.threads.com/@luiss_xavierr",
  portraitUrl:
    "https://res.cloudinary.com/dh39ahmpj/image/upload/v1785161831/hd-eu_cscrgv.png",
  leadzApiUrl: import.meta.env.VITE_LEADZ_API_URL ?? "https://leadz-api.thalysdev.com",
  leadzCompanySlug: "thalysdev",
  yearsExperience: 5,
  primaryTechs: [
    "React",
    "Node.js",
    "TypeScript",
    "React Native",
    "PostgreSQL",
    "MongoDB",
    "Nest.js",
    "Docker",
  ],
  socials: [
    { href: "https://github.com/thalys93", label: "GitHub", id: "github" },
    {
      href: "https://linkedin.com/in/thalys-dev202/",
      label: "LinkedIn",
      id: "linkedin",
    },
    { href: "mailto:thalys.dev@gmail.com", label: "Email", id: "email" },
    {
      href: "https://www.instagram.com/thalys.dev25/",
      label: "Instagram",
      id: "instagram",
    },
  ],
} as const;
