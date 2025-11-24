
export type SkillsForms = {
    icon: string;
    title: string;
    color: string;
    skills: SkillItem[];
}

export type SkillEntity = {
    id: string;
    icon: string;
    title: string;
    color: string;
    skills: SkillItem[];
    order: number;
}

type SkillItem = {
    name: string;
    level: number;
}