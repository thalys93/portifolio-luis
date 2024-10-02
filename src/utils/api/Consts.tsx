import { Browser, DeviceMobile, Devices, Envelope, GithubLogo, InstagramLogo, LinkedinLogo, PipeWrench, Users, WebhooksLogo, WhatsappLogo } from '@phosphor-icons/react';
import { STATUSES, Types } from '../enums';

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
    status: string,
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
        type: Types.WEB,
        status: STATUSES.DESIGN,
        projectLive: "https://cade-meu-rango-front.web.app/",
        projectRepository: "https://github.com/thalys93/cade-meu-rango-front",
        image: "https://res.cloudinary.com/dh39ahmpj/image/upload/v1684280950/Cad%C3%AA%20Meu%20Rango/thumb_do_site_knjbzn.png",
        conceptArt: "https://res.cloudinary.com/dh39ahmpj/image/upload/v1719691919/projects/Tela_1_Desktop_lj7px3.png",
        description: "Plataforma de Listagem de Receitas Culinárias",
        details: {
            bigDescription: "A Cade Meu Rango é uma plataforma de listagem de receitas culinárias, onde os usuários podem cadastrar suas receitas e compartilhar com outros usuários. A plataforma tem como objetivo ajudar os usuários a encontrar receitas de acordo com suas necessidades e preferências. Além disso, a plataforma tem como objetivo ajudar os usuários a manterem um registro de suas receitas e a compartilhar com outros usuários.",
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
        type: Types.WEB,
        status: STATUSES.DONE,
        projectLive: "https://dream-nexus-studios.web.app/",
        projectRepository: "https://github.com/thalys93/dreamNexus",
        image: "https://res.cloudinary.com/dh39ahmpj/image/upload/v1727896963/projects-images/dream-nexus-logo.jpg",
        // conceptArt: "https://res.cloudinary.com/dh39ahmpj/image/upload/v1719692053/projects/Home_V2_zvsabo.png",
        description: "Landing Page de Empresa de Desenvolvimento de Jogos",
        details: {
            bigDescription: "A Dream Nexus Studios é uma landing page de empresa de desenvolvimento de jogos, onde o usuário pode ver os jogos desenvolvidos pela empresa. A página tem como objetivo apresentar a empresa e seus jogos de forma mais atraente e interativa.",
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
        name: "Carteira de Saúde",
        type: Types.MOBILE,
        status: STATUSES.DEVELOPING,
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
        id: 4,
        name: "Portifólio",
        type: Types.WEB,
        status: STATUSES.DONE,
        projectLive: "https://portifolio-luis-thalys.web.app/home",
        projectRepository: "https://github.com/thalys93/portifolio-luis",
        image: "https://avatars.githubusercontent.com/u/102838847?v=4",
        conceptArt: "https://res.cloudinary.com/dh39ahmpj/image/upload/v1716906633/portifolio.dev/Contact_-_WireFrame_tvspui.png",
        description: "Site Atual, onde o usuário pode ver os projetos desenvolvidos por mim",
        details: {
            bigDescription: "O Portifólio é um site de portifólio, onde o usuário pode ver os projetos desenvolvidos por mim, além disso, o usuário pode ver as informações sobre mim, e também pode entrar em contato comigo.",
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
        id: 5,
        name: "Barber Pro",
        type: Types.MOBILE,
        status: STATUSES.PAUSED,
        projectLive: null,
        projectRepository: null,
        image: "https://res.cloudinary.com/dh39ahmpj/image/upload/v1727900084/projects-images/barber-pro-logo.png",
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
        id: 6,
        name: "The Film DB",
        type: Types.WEB,
        status: STATUSES.DESIGN,
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
    },
    {
        id: 7,
        name: "Home Stock",
        type: Types.MOBILE,
        status: STATUSES.NEW,
        projectLive: null,
        projectRepository: null,
        image: "https://res.cloudinary.com/dh39ahmpj/image/upload/v1727897477/projects-images/home-stock-logo.png",
        description: "Aplicativo de Controle de Estoques e Contas Pessoais",
        details: {
            bigDescription: "O Home Stock é um aplicativo de Controle de Estoques e Contas Pessoais, onde o usuário pode adicionar as compras e vendas, o usuário pode ver o historico de compras e vendas.",
            technologies: [
                {
                    id: 1,
                    name: "React Native",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                },
                {
                    id: 2,
                    name: "NestJS",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg",
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
        id: 8,
        name: "Crypto Currency",
        type: Types.WEB,
        status: STATUSES.DONE,
        projectLive: "https://crypto-currency-33a47.web.app/home",
        projectRepository: "https://github.com/thalys93/crypto-currency",
        image: "https://res.cloudinary.com/dh39ahmpj/image/upload/v1727902070/projects-images/crypto-currency-logo.png",
        conceptArt: "https://res.cloudinary.com/dh39ahmpj/image/upload/v1727902107/projects-images/crypto-currency-concept_tnsuec.png",
        description: "Website de Listagem de Cripto Moedas",
        details: {
            bigDescription: "O Crypto Currency é um website de Listagem de Cripto Moedas, onde o usuário pode ver as informações sobre as cripto moedas.",
            technologies: [
                {
                    id: 1,
                    name: "React",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                },
            ]
        }
    },
    {
        id: 9,
        name: "Gerenciamento de Clientes",
        type: Types.SYSTEM,
        status: STATUSES.DONE,
        projectLive: null,
        projectRepository: "https://github.com/thalys93/Desafio-Gerenciamento_de_clientes",
        image: "https://res.cloudinary.com/dh39ahmpj/image/upload/v1727902411/projects-images/gerenciamento-clientes-logo_w2lkm3.jpg",
        conceptArt: "https://private-user-images.githubusercontent.com/102838847/310619547-61c75638-a4e8-419e-8643-8a5dbeabd9a4.gif?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Mjc5MDI3NDYsIm5iZiI6MTcyNzkwMjQ0NiwicGF0aCI6Ii8xMDI4Mzg4NDcvMzEwNjE5NTQ3LTYxYzc1NjM4LWE0ZTgtNDE5ZS04NjQzLThhNWRiZWFiZDlhNC5naWY_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQxMDAyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MTAwMlQyMDU0MDZaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1hM2EwOGMxNzA1MjgwMzA1Y2Q0Y2Q1NDE5MDVkMmVmZWQwMmFhM2Y0N2NkNjVlNDIwNmU3NTdmNDA2M2M1MjYxJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.xE4RLQ2eyC0G__RyGmmuRoeKh6rfQcAopdIA7_Bgrhw",
        description: "Sistema de Gerenciamento de Clientes",
        details: {
            bigDescription: "O Gerenciamento de Clientes é um sistema de Gerenciamento de Clientes e Cálculo de Rota, onde o usuário pode ver as informações sobre os clientes e as rotas.",
            technologies: [
                {
                    id: 1,
                    name: "React",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",                    
                },
                {
                    id: 2,
                    name: "NodeJS",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg",
                },
                {
                    id: 3,
                    name: "PostgresSQL",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
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

