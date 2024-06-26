import { Browser, DeviceMobile, Devices, Envelope, GithubLogo, InstagramLogo, LinkedinLogo, PipeWrench, Users, WebhooksLogo, WhatsappLogo } from '@phosphor-icons/react';

interface socialMediaInterface {
    id: number,
    name: string,
    link: string,
    image?: string,
    icon: JSX.Element,
}

interface servicesInterface {
    id: number,
    title: string,
    short_description: string,
    icon: JSX.Element,
}

export interface languagesInterface {
    id: number,
    name: string,
    icon: string,
    percent?: number
}

interface myInformationsInterface {
    fullName: string,
    birthday: string,
    cellphone: string,
    email: string,
    city: string,
    idioms: string,
    freelancer: boolean
}

export interface projectsInterface {
    id: number | string,
    name: string,
    type: string,
    projectLive: string | null,
    projectRepository?: string | null,
    image: string | null,
    conceptArt?: string,
    description: string,
    details: {
        bigDescription?: string,
        technologies?: languagesInterface[],
    }
}

export interface CompaniesThatIWorkedInterface {
    id: number,
    name: string,
    position: string,
    description: string,
    startDate: string,
    endDate: string,
}

const whatsappAPImessage = encodeURIComponent("Olá Thalys, vi o seu portifólio e me interessei pelo seu trabalho!, podemos conversar?")
const whatsappAPIphone = ("51991485593")

export const myInformations: myInformationsInterface[] = [
    {
        fullName: "Luis Thalys Rodrigues",
        birthday: "17 de Fevereiro de 2002",
        cellphone: "(51) 99148-5593",
        email: "luisthalys1@hotmail.com",
        city: "Canoas - RS",
        idioms: "Português, Inglês",
        freelancer: true
    }
]

export const socialMediaProfiles: socialMediaInterface[] = [
    {
        id: 1,
        name: "Github",
        link: "https://github.com/thalys93",
        image: "https://avatars.githubusercontent.com/u/102838847?s=400&u=02cea61f2704080ae52e8afc090ca92d52e4740a&v=4",
        icon: <GithubLogo />
    },
    {
        id: 2,
        name: "Instagram",
        link: "https://www.instagram.com/luiss_xavierr/",
        icon: <InstagramLogo />
    },
    {
        id: 3,
        name: "Linkedin",
        link: "https://www.linkedin.com/in/thalys-dev202/",
        icon: <LinkedinLogo />
    },
    {
        id: 4,
        name: "Email",
        link: "mailto:luisthalys1@hotmail.com",
        icon: <Envelope />
    },
    {
        id: 5,
        name: "Whatsapp",
        link: `https://api.whatsapp.com/send?phone=${whatsappAPIphone}&text=${whatsappAPImessage}`,
        icon: <WhatsappLogo />
    },
]

export const servicesThatIProvide: servicesInterface[] = [
    {
        id: 1,
        title: "Desenvolvimento de Sites",
        short_description: "Desenvolvimento de sites responsivos e otimizados para SEO",
        icon: <Browser />
    },
    {
        id: 2,
        title: "Desenvolvimento de Aplicativos",
        short_description: "Desenvolvimento de aplicativos móveis para Android e IOS",
        icon: <DeviceMobile />
    },
    {
        id: 3,
        title: "Desenvolvimento de API's",
        short_description: "Desenvolvimento de API's para integração de sistemas",
        icon: <WebhooksLogo />
    },
    {
        id: 4,
        title: "Desenvolvimento de Sistemas",
        short_description: "Desenvolvimento de sistemas web e desktop",
        icon: <Devices />
    },
    {
        id: 5,
        title: "Consultoria em TI",
        short_description: "Consultoria em TI para pequenas e médias empresas",
        icon: <Users />
    },
    {
        id: 6,
        title: "Manutenção de Sites",
        short_description: "Manutenção de sites e sistemas web",
        icon: <PipeWrench />
    }
]

export const languageThatIuse: languagesInterface[] = [
    {
        id: 1,
        name: "HTML",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-plain.svg",
        percent: 90
    },
    {
        id: 2,
        name: "CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg",
        percent: 85
    },
    {
        id: 3,
        name: "Javascript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg",
        percent: 80
    },
    {
        id: 4,
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        percent: 85
    },
    {
        id: 5,
        name: "React Native",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        percent: 80
    },
    {
        id: 6,
        name: "NodeJS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain.svg",
        percent: 80
    },
    {
        id: 7,
        name: "NestJS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg",
        percent: 70
    },
    {
        id: 8,
        name: "Typescript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg",
        percent: 95
    },
    {
        id: 9,
        name: "PHP",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg",
        percent: 40
    },
    {
        id: 10,
        name: "Laravel",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
        percent: 40
    },
    {
        id: 11,
        name: "Lumen",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/lumen/lumen-original.svg",
        percent: 40
    },
    {
        id: 12,
        name: "Python",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        percent: 50
    },
    {
        id: 13,
        name: "C#",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-plain.svg",
        percent: 45
    },
    {
        id: 14,
        name: "Photoshop",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg",
        percent: 75
    },
    {
        id: 15,
        name: "Figma",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
        percent: 80
    }
]

export const projects: projectsInterface[] = [
    {
        id: 1,
        name: "Cade Meu Rango",
        type: "Web",
        projectLive: "https://cade-meu-rango-front.web.app/",
        projectRepository: "https://github.com/thalys93/cade-meu-rango-front",
        image: "https://camo.githubusercontent.com/2a5dabb558def59ac722c6a6d98aa15fce4fabb0a51688d33b06598af308f60f/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f6468333961686d706a2f696d6167652f75706c6f61642f76313730363035383331382f4769746875622f4c6f676f5f315f6c383634746f2e706e67",
        conceptArt: "https://res.cloudinary.com/dh39ahmpj/image/upload/v1719691919/projects/Tela_1_Desktop_lj7px3.png",
        description: "Plataforma de delivery de comida",
        details: {
            bigDescription: "O Cade Meu Rango é uma plataforma de delivery de comida, onde o usuário pode escolher o restaurante e o prato que deseja, além disso, o usuário pode ver o histórico de pedidos e avaliar o restaurante.",
            technologies: [
                {
                    id: 1,
                    name: "React",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                },
                {
                    id: 2,
                    name: "NodeJS",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg",
                },
                {
                    id: 3,
                    name: 'NestJS',
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg"
                },
                {
                    id: 4,
                    name: "TypeScript",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg"
                }
            ]
        }
    },
    {
        id: 2,
        name: "Dream Nexus Studios",
        type: "Web",
        projectLive: "https://dream-nexus-studios.web.app/",
        projectRepository: "https://github.com/thalys93/dreamNexus",
        image: "https://camo.githubusercontent.com/f56f7f60ecc2084ccf644ae236c99714d3b21341a512ac107891fd48699d7e62/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f6468333961686d706a2f696d6167652f75706c6f61642f76313730363035383239322f4769746875622f4c6f676f5f325f696d79747a6e2e706e67",
        conceptArt: "https://res.cloudinary.com/dh39ahmpj/image/upload/v1719692053/projects/Home_V2_zvsabo.png",
        description: "Site de uma empresa de desenvolvimento de jogos",
        details: {
            bigDescription: "O Dream Nexus Studios é uma empresa de desenvolvimento de jogos, onde o usuário pode ver os jogos desenvolvidos pela empresa, além disso, o usuário pode ver as vagas de emprego disponíveis na empresa.",
            technologies: [
                {
                    id: 1,
                    name: "React",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                },
                {
                    id: 4,
                    name: "TypeScript",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg"
                }
            ]
        }
    },
    {
        id: 3,
        name: "Vida Sustentável",
        type: "Web",
        projectLive: "https://vida-sustentavel-61c19.web.app/",
        projectRepository: "https://github.com/thalys93/vida-sustentavel",
        image: "https://camo.githubusercontent.com/da596dacf61cf9c75fc2c5cd7cc65a709091759a03a7df865aea0fc1600be892/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f6468333961686d706a2f696d6167652f75706c6f61642f76313730363035383431332f4769746875622f4c6f676f5f335f71646a6273782e706e67",        
        description: "Site de uma empresa de produtos sustentáveis",
        details: {
            bigDescription: "O Vida Sustentável é uma empresa de produtos sustentáveis, onde o usuário pode ver os produtos vendidos pela empresa, além disso, o usuário pode ver as informações sobre a empresa.",
            technologies: [
                {
                    id: 1,
                    name: "React",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                },
                {
                    id: 4,
                    name: "TypeScript",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg"
                }
            ]
        }
    },
    {
        id: 4,
        name: "Tooth Wallet",
        type: "Mobile",
        projectLive: null,
        projectRepository: "https://github.com/thalys93/tooth-walletV2",
        image: "https://camo.githubusercontent.com/bed48af3367757526f2cc7b819cd4c45381af8663cc4ac0986cea62a51783049/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f6468333961686d706a2f696d6167652f75706c6f61642f76313730363035383535342f4769746875622f4c6f676f5f345f6c78706a6d332e706e67",        
        description: "Aplicativo de controle financeiro",
        details: {
            bigDescription: "O Tooth Wallet é um aplicativo de controle financeiro, onde o usuário pode adicionar as despesas e receitas, além disso, o usuário pode ver o saldo atual.",
            technologies: [
                {
                    id: 1,
                    name: "React Native",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                },
                {
                    id: 2,
                    name: "NodeJS",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg",
                },
                {
                    id: 3,
                    name: "Firebase",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
                }
            ]
        }
    },
    {
        id: 5,
        name: "Carteira de Saúde",
        type: "Mobile",
        projectLive: null,
        projectRepository: null,
        image: "https://res.cloudinary.com/dh39ahmpj/image/upload/v1716829255/carteira_de_saude/adaptive-icon_pfyg0a.png",
        description: "Aplicativo de controle de saúde",
        details: {
            bigDescription: "O Carteira de Saúde é um aplicativo de controle de saúde, onde o usuário pode adicionar os exames e consultas, além disso, o usuário pode ver o histórico de exames e consultas.",
            technologies: [
                {
                    id: 1,
                    name: "React Native",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                },
                {
                    id: 2,
                    name: "NestJS",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg",
                },
                {
                    id: 3,
                    name: "Typesrcript",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg",
                }
            ]
        }
    },
    {
        id: 6,
        name: "Portifólio",
        type: "Web",
        projectLive: "https://portifolio-luis-thalys.web.app/home",
        projectRepository: "https://github.com/thalys93/portifolio-luis",
        image: "https://res.cloudinary.com/dh39ahmpj/image/upload/v1719693913/projects/Perfil_2024_mvj0g9.jpg",
        description: "Site de portifólio",
        details: {
            bigDescription: "O Portifólio é um site de portifólio, onde o usuário pode ver os projetos desenvolvidos por mim, além disso, o usuário pode ver as informações sobre mim.",
            technologies: [
                {
                    id: 1,
                    name: "React",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                },
                {
                    id: 2,
                    name: "Typescript",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg",
                }
            ]
        }
    },
    {
        id: 7,
        name: "EC-Gestor",
        type: "Web",
        projectLive: null,
        projectRepository: null,
        image: "https://res.cloudinary.com/dh39ahmpj/image/upload/v1719694037/projects/Login_-_Var_01_w2ss2l.png",
        description: "Sistema de gestão de pequenos ecommerces",
        details: {
            bigDescription: "O EC-Gestor é um sistema de gestão de pequenos ecommerces, onde o usuário pode adicionar os produtos e gerenciar os pedidos, além disso, o usuário pode ver o histórico de pedidos.",
            technologies: [
                {
                    id: 1,
                    name: "React",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                },
                {
                    id: 2,
                    name: "NodeJS",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg",
                },
                {
                    id: 3,
                    name: "NestJS",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg",
                },
                {
                    id: 4,
                    name: "Typescript",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg",
                },
                {
                    id: 5,
                    name: "Firebase",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
                }
            ]
        }
    },
    {
        id: 8,
        name: "Barber Pro",
        type: "Mobile",
        projectLive: null,
        projectRepository: null,
        image: "https://res.cloudinary.com/dh39ahmpj/image/upload/v1718391971/Barber%20Pro/adaptive-icon_aakttu.png",
        description: "Aplicativo de agendamento de barbearias",
        details: {
            bigDescription: "O Barber Pro é um aplicativo de agendamento de barbearias, onde o usuário pode agendar um horário, além disso, o usuário pode ver o histórico de agendamentos.",
            technologies: [
                {
                    id: 1,
                    name: "React Native",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                },
                {
                    id: 2,
                    name: "NestJS",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg",
                },
                {
                    id: 3,
                    name: "Firebase",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
                }
            ]
        }
    },
    {
        id: 9,
        name: "The Film DB",
        type: "Web",
        projectLive: "https://the-film-db.web.app/",
        projectRepository: "https://github.com/thalys93/the-film-db",
        image: "https://res.cloudinary.com/dh39ahmpj/image/upload/v1718286930/the-film-db/metawallpapers_p9iimp.jpg",
        description: "Aplicativo para buscar informações sobre filmes e séries",
        details: {
            bigDescription: "O The Film DB é um aplicativo para buscar informações sobre filmes e séries, onde o usuário pode buscar o filme ou série desejada, além disso, o usuário pode ver as informações sobre o filme ou série.",
            technologies: [
                {
                    id: 1,
                    name: "React",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                },
                {
                    id: 2,
                    name: "Typescript",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg",
                },
                {
                    id: 3,
                    name: "Axios",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/axios/axios-plain.svg",
                }
            ]
        }
    }
]

export const CompaniesThatIWorked: CompaniesThatIWorkedInterface[] = [
    {
        id: 1,
        name: "Meraking",
        position: "Desenvolvedor Mobile",
        description: "Desenvolvimento de aplicativos mobile utilizando React Native",
        startDate: "11/2023",
        endDate: "Atual"
    },
    {
        id: 2,
        name: "Target IT",
        position: "Desenvolvedor Back End Jr",
        description: "Desenvolvimento de API's utilizando PHP e Lumen",
        startDate: "02/2024",
        endDate: "07/2024"
    },
    {
        id: 3,
        name: "Brasil Distribuidora de Lubrificantes LTDA",
        position: "Estágio - Suporte",
        description: "Atuação na área de TI, auxiliando no Suporte técnico aos usuários utilizando o Protheus da TOTVS",
        startDate: "03/2023",
        endDate: "11/2023"
    },
    {
        id: 4,
        name: "DWU",
        position: "Estagio - Desenvolvedor Web",
        description: "Desenvolvimento de sites e sistemas web, além disso, criação de manuais utilizando o SAP",
        startDate: "03/2022",
        endDate: "03/2023"
    },
    {
        id: 5,
        name: "Grêmio Náutico União",
        position: "Jovem Aprendiz TI",
        description: "Atuação na área de TI, auxiliando na manutenção de computadores e suporte aos usuários",
        startDate: "02/2021",
        endDate: "03/2022"
    },
]

